'use strict';

(function () {
  var adverts = [];

  var successHandler = function (data) {
    adverts = data;
    window.pin.render(data);
  };

  var errorHandler = function (message) {
    window.modal.createError(message);
  };

  var defaultAdvert = function () {
    window.backend.load(successHandler, errorHandler);
  };

  var updateAdvert = function () {
    window.pin.delete();
    window.card.delete();
    window.pin.render(window.filter.updateSelects(adverts));
  };

  window.data = {
    defaultAdvert: defaultAdvert,
    updateAdvert: updateAdvert
  };

})();
