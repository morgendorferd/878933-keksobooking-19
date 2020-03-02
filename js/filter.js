'use strict';

(function () {
  var filters = document.querySelector('.map__filters');

  var filterByType = function (data, value, filterType) {
    return data.filter(function (item) {
      return item[filterType] === value;
    });
  };

  var updateSelects = function (data) {
    var selects = filters.querySelectorAll('select');
    selects.forEach(function (it) {
      switch (it.id) {
        case 'housing-type':
          return filterByType(data, it.value, 'type');
        case 'housing-rooms':
          return filterByType(data, it.value, 'rooms');
        case 'housing-guests':
          return filterByType(data, it.value, 'guests');
      }
    });
  };

  window.filter = {
    updateSelects: updateSelects
  };
})();
