# AdvancedFilters
A jQuery plugin that provides a flexible and user-friendly advanced table filter.

Main features:
- returns a JSON of the filters set in real time;
- allows the user to create nested AND / OR groups;
- supports multiple inputs types.

[DEMO](https://codepen.io/GianlucaChiarani/pen/NWXLmEY)

## Requirements
- jQuery;
- jQuery UI;
- Font Awesome 5 Free.

## Installation
```
<link rel="stylesheet" href="css/AdvancedFilters.css" />
<script type="text/javascript" src="js/AdvancedFilters.js"></script>
```
OR
```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/GianlucaChiarani/AdvancedFilters@v0.5/css/AdvancedFilters.css" />
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/GianlucaChiarani/AdvancedFilters@v0.5/js/AdvancedFilters.js"></script>
```

## Example
```
$(".filters-container").AdvancedFilters({

  /*  The filterable fields properties */
  fields: {
    "date":{
      "label": "Delivery Date",
      "type": "date"
    },
    "subject": {
      "label": "Email Subject",
      "options": {
        "value1": "label1",
        "value2": "label2"
      }
    }
  },
  
  /*  The function called when the filters change */
  onFilter: function(json) {
     console.log(json);
  },
  
  /*  The json of the predefined filters */
  activeFiltersJson: '{"filters":{"and":[{"field":"date","operator":"*","value":"2022-04-12"}]},"search":"test"}',
  
  /*  The translated strings object */
  translations: {
    "contains": "",
    "not contains": "",
    "equal": "",
    "greater than": "",
    "greater or equal than": "",
    "lesser than": "",
    "lesser or equal than": "",
    "different from": "",
    "in set": "",
    "not in set": ""
  }
});
```
HTML:
```
<div class="filters-container">
    <div class="search-container">
        <input type="text" class="search" placeholder="Search">
        <span class="advanced-filters-btn"><i class="fa fa-filter"></i><span class="counter"></span></span>
    </div>
    <div class="advanced-filters">
        <select class="add-filter">
            <option value="" disabled selected>Add filter</option>
            <option value="andor-group">AND/OR group</option>
        </select>
        <div class="fields-container groups-container"></div>
    </div>
</div>
```
## Sponsor
- Blupixel IT
