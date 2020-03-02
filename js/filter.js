'use strict';

(function () {
  var filters = document.querySelector('.map__filters');

  var filterByType = function (data, value, filterType) {
    return data.filter(function (item) {
      return item.offer[filterType] === value;
    });
  };

  var updateSelects = function (data) {
    var selects = filters.querySelectorAll('select');

    selects = Array.from(selects).filter(function (it) {
      return it.value !== 'any';
    });

    var copyData = data.slice();

    selects.forEach(function (it) {
      switch (it.id) {
        case 'housing-type':
          copyData = filterByType(data, it.value, 'type');
          break;
        case 'housing-rooms':
          copyData = filterByType(data, Number(it.value), 'rooms');
          break;
        case 'housing-guests':
          copyData = filterByType(data, Number(it.value), 'guests');
          break;
      }
    });

    return copyData;
  };

  window.filter = updateSelects;
})();
