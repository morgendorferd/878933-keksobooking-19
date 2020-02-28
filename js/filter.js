'use strict';

(function () {
  var filter = document.querySelector('.map__filters');
  var selectType = filter.querySelector('#housing-type');
  var selectPrice = filter.querySelector('#housing-price');
  var selectRooms = filter.querySelector('#housing-rooms');
  var selectGuests = filter.querySelector('#housing-guests');
  var featuresList = filter.querySelector('#housing-features');

  var filterByType = function (data) {
    return data.filter(function (item) {
      return item.offer.type === selectType.value;
    });
  };

  selectType.addEventListener('change', function () {
      window.data.updateAdvert();
  })

  window.filter = {
    byType: filterByType
  }
})()
