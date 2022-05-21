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
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/GianlucaChiarani/AdvancedFilters@v0.6/css/AdvancedFilters.css" />
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/GianlucaChiarani/AdvancedFilters@v0.6/js/AdvancedFilters.js"></script>
```

## Example
```
$(".filters-container").AdvancedFilters({
  fields: {
    "date":{
      "label": "Delivery Date",
      "type": "date"
    },
    "subject": {
      "label": "Email Subject",
      "options": {
        "subject_1": "Subject 1",
        "subject_2": "Subject 2"
      }
    }
  },
  onFilter: function(json) {
     console.log(json);
  },
  activeFiltersJson: '{"filters":{"and":[{"field":"date","operator":"*","value":"2022-04-12"}]},"search":"test"}',
  translations: {
    "contains": "contiene",
    "not contains": "non contiene",
    "equal": "uguale",
    "greater than": "maggiore",
    "greater or equal than": "maggiore o uguale",
    "lesser than": "minore",
    "lesser or equal than": "minore o uguale",
    "different from": "diverso",
    "in set": "nel set",
    "not in set": "non nel set"
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
## Options
| Name  | Type | Default | Description |
| ------------- | ------------- | ------------- | ------------- |
| fields  | `Object`  | `false` | The filterable fields properties. |
| onFilter  | `Function`  | `false` | The function called when the filters change. |
| activeFiltersJson  | `Object`  | `false` | The json of the predefined filters. |
| translations  | `Object`  | `{}` | The translated strings object. |
## Sponsor
- Blupixel IT
