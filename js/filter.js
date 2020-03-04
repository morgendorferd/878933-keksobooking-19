'use strict';

(function () {
  var filters = document.querySelector('.map__filters');

  var filterByType = function (data, value, filterType) {
    return data.filter(function (item) {
      return item.offer[filterType].toString() === value;
    });
  };

  var updateFilters = function (data) {
    var selects = filters.querySelectorAll('select');

    selects = Array.from(selects).filter(function (it) {
      return it.value !== 'any';
    });

    var copyData = data.slice();

    selects.forEach(function (it) {
      switch (it.id) {
        case 'housing-type':
          copyData = filterByType(copyData, it.value, 'type');
          break;
        case 'housing-rooms':
          copyData = filterByType(copyData, it.value, 'rooms');
          break;
        case 'housing-guests':
          copyData = filterByType(copyData, it.value, 'guests');
          break;
      }
    });

    if (copyData.length > 5) {
      copyData.length = 5;
    }
    return copyData;
  };

  window.filter = updateFilters;
})();
