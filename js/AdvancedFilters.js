/**
 * AdvancedFilters (https://github.com/GianlucaChiarani/AdvancedFilters)
 * @version 0.6
 * @author Gianluca Chiarani
 * @license The MIT License (MIT)
 */
(function ($) {
    $.fn.AdvancedFilters = function(options) {

        var settings = $.extend({
            fields: false,
            onFilter: false,
            activeFiltersJson: false,
            translations: Object()
        }, options );

        var container = this;
        var advancedFilterContainer = container.find('.advanced-filters');
        var addFilter = container.find('.advanced-filters .add-filter');

        $(document).mouseup(function(e) {
            if (container.children('.search-container').hasClass('opened')) {
                if (!container.is(e.target) && container.has(e.target).length === 0) {
                    container.children('.search-container').removeClass('opened');
                    advancedFilterContainer.slideUp(200);
                }
            }
        });

        container.on('click', '.advanced-filters-btn', function() {
            advancedFilterContainer.slideToggle(200);
            container.children('.search-container').toggleClass('opened');
        });

        advancedFilterContainer.on('click', ".field .delete-btn", function() {
            $(this).parents('.field:first').remove();
            container.find('.counter').html(advancedFilterContainer.find('.field').length);
            filter();
        });
        
        advancedFilterContainer.on('click', ".group .delete-btn", function() {
            $(this).parents('.group:first').remove();
            container.find('.counter').html(advancedFilterContainer.find('.field').length);
            filter();
        });

        container.on('keyup', ".search", function() {
            filter();
        });

        container.on('blur', ".search", function() {
            filter();
        });

        advancedFilterContainer.on('keyup', ".field .value", function() {
            filter();
        });

        advancedFilterContainer.on('change', ".field .value, .field .operator, .group .andor", function() {
            filter();
        });

        addFilter.change(function() {
            var field = $(this).val();

            if (field == 'andor-group') {
                advancedFilterContainer.children('.fields-container').append(getGroupHtml());
                initSort();
            } else {
                advancedFilterContainer.children('.fields-container').append(getFieldHtml(field));
                container.find('.counter').fadeIn(200).html(advancedFilterContainer.find('.field').length);
            }
            $(this).val('');
            filter();
        });

        initSort();

        if (settings.fields) {
            for (let key in settings.fields) {
                var field = settings.fields[key];
                var label = field.label;

                addFilter.append('<option value="'+key+'">'+label+'</option>');
            }
        }

        if (settings.activeFiltersJson) {
            var json = JSON.parse(settings.activeFiltersJson);
            var filters = json.filters;
            var search = json.search;
            container.find('.search').val(search);
            
            for (let key in filters) {
                if (filters[key].length) {
                    advancedFilterContainer.find('.fields-container').html('').append(getGroupHtml(key,filters[key],true));
                }
            }

            container.find('.counter').fadeIn(200).html(advancedFilterContainer.find('.field').length);
        }
        
        function initSort() {
            $(".advanced-filters .fields-container").sortable({
                handle:".sort-btn",
                connectWith: ".fields-container",
                update: filter
            });
        }

        function getFieldHtml(name, operator = '', value = '') {
            var field = settings.fields[name];
            var label = (typeof field.label !== 'undefined'?field.label:name);
            var type = (typeof field.type !== 'undefined'?field.type:'text');
            var options = (typeof field.options !== 'undefined'?field.options:Object());

            var typeD = 'text';

            if (type == 'number' ||
            type == 'date' ||
            type == 'datetime-local' ||
            type == 'email' ||
            type == 'url')
                typeD = type;

            var operators = {
                "*": "contains",
                "!*": "not contains",
                "=": "equal",
                "!=": "different from",
                ">": "greater than",
                ">=": "greater or equal than",
                "<": "lesser than",
                "<=": "lesser or equal than",
                "IN": "in set",
                "NOT_IN": "not in set"
            };

            var html = '<div class="field" data-field="'+name+'">'+
            '<i class="fas fa-ellipsis-v sort-btn"></i>'+
            '<span class="label">'+label+'</span>'+
            '<select class="operator">';

            for (let key in operators) {
                html += '<option value="'+key+'"'+(operator == key?' selected':'')+'>'+t(operators[key])+'</option>';
            }

            html += '</select>';
            
            if (Object.keys(options).length) {
                html += '<select class="value">';
                html += '<option value=""></option>';
                
                for (let key in options) {
                    var optionValue = key;
                    var optionLabel = options[key];

                    html += '<option value="'+optionValue+'"'+(value == optionValue?' selected':'')+'>'+optionLabel+'</option>';
                }
                html += '</select>';
            } else {
                html += '<input type="'+typeD+'" class="value" value="'+value+'" />';
            }
            
            html += '<i class="fa fa-times delete-btn"></i>'+
            '</div>';

            return html;
        }

        function getGroupHtml(andor = '', fields = false, first = false) {
            var fieldsHtml = '';
            if (fields) {
                fields.forEach(function(field) {
                    if (Object.keys(field)[0] == 'field') {
                        fieldsHtml += getFieldHtml(field.field,field.operator,field.value);
                    } else {
                        fieldsHtml += getGroupHtml(Object.keys(field)[0],field[Object.keys(field)[0]]);
                    }
                });
            }

            if (first) {
                return fieldsHtml;
            } else{
                return '<div class="group">'+
                    '<div class="andor-container">'+
                        '<i class="fas fa-ellipsis-v sort-btn"></i>'+
                        '<select class="andor">'+
                            '<option value="and"'+(andor=='and'?' selected':'')+'>'+t('All of the following')+'</option>'+
                            '<option value="or"'+(andor=='or'?' selected':'')+'>'+t('At least one of the following')+'</option>'+
                        '</select>'+
                        '<i class="fa fa-times delete-btn"></i>'+
                    '</div>'+
                    '<div class="fields-container">'+fieldsHtml+
                    '</div>'+
                '</div>';
            }
        }

        function t(string) {
            if (typeof settings.translations[string] !== 'undefined' && settings.translations[string] != '')
                return settings.translations[string];
            else
                return string;
        }

        function filter() {
            function groupObj(el) {
                var type = el.children('.andor-container').children('.andor').val();
                el = el.children('.fields-container');

                if (!type)
                    type = 'and';

                var fields = Array();

                el.children('.field').each(function(){
                    var value = $(this).find('.value').val();

                    if ($(this).find('.value').attr('type') == 'datetime-local')
                        value = value.replace('T',' ');
                        
                    fields.push({
                        'field': $(this).attr('data-field'),
                        'operator': $(this).find('.operator').val(),
                        'value': value
                    });
                });
                el.children('.group').each(function(){
                    fields.push(groupObj($(this)));
                });

                return {[type]: fields};
            }

            var json = Object();

            json.filters = groupObj(advancedFilterContainer);

            json.search = container.find('.search').val();
            
            json = JSON.stringify(json);

            if (settings.onFilter) {
                settings.onFilter(json);
            }
        }

        return true;
    };

}(jQuery));
