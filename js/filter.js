'use strict';

(function () {
  var PRICE_RANGE = {
    min: 10000,
    max: 50000
  };
  var filters = document.querySelector('.map__filters');

  var filterByType = function (data, value, filterType) {
    return data.filter(function (item) {
      return item.offer[filterType].toString() === value;
    });
  };

  var priceMap = {
    'low': function (price) {
      return price < PRICE_RANGE.min;
    },
    'middle': function (price) {
      return price >= PRICE_RANGE.min && price <= PRICE_RANGE.max;
    },
    'high': function (price) {
      return price > PRICE_RANGE.max;
    }
  };

  var filterByPrice = function (data, priceValue) {
    return data.filter(function (item) {
      return priceMap[priceValue](item.offer.price);
    });
  };

  var filterByFeatures = function (data, featureValue) {
    return data.filter(function (item) {
      return item.offer.features.includes(featureValue);
    });
  };

  var updateFilters = function (data) {
    var selects = filters.querySelectorAll('select');
    var inputChecked = filters.querySelectorAll('.map__checkbox:checked');

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
        case 'housing-price':
          copyData = filterByPrice(copyData, it.value);
          break;
      }
    });

    inputChecked.forEach(function (it) {
      copyData = filterByFeatures(copyData, it.value);
    });

    return copyData;
  };

  var resetFilters = function () {
    filters.reset();
  };

  window.filter = {
    update: updateFilters,
    reset: resetFilters
  };
})();
