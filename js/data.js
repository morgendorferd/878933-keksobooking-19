'use strict';

(function () {
  var adverts = [];

  var successHandler = function (data) {
    adverts = data;
    window.pin.render(window.filter(adverts));
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
    window.pin.render(window.filter(adverts));
  };

  window.data = {
    defaultAdvert: defaultAdvert,
    updateAdvert: window.util.debounce(updateAdvert)
  };

})();
