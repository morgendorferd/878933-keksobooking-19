'use strict';

(function () {
  var adverts = [];

  var successHandler = function (data) {
    adverts = data;
    window.pin.render(data);
  };

  var errorHandler = function (message) {
    window.modal.createError(mesage);
  };

  var defaultAdvert = function () {
    window.backend.load(successHandler, errorHandler);
  };

  var updateAdvert = function () {
    window.pin.delete();
    window.card.delete();
    window.pin.render(window.filter.byType(adverts));
  }

  // console.log(defaultAdvert())

  window.data = {
    defaultAdvert: defaultAdvert,
    updateAdvert: updateAdvert
  };

})();
