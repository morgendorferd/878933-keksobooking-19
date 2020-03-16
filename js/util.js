'use strict';

(function () {
  var KEY_ENTER = 'Enter';
  var KEY_ESC = 'Escape';
  var DEBOUNCE_INTERVAL = 500;

  var deleteClass = function (element, className) {
    element.classList.remove(className);
  };

  var setDebounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.util = {
    KEY_ENTER: KEY_ENTER,
    KEY_ESC: KEY_ESC,
    deleteClass: deleteClass,
    debounce: setDebounce
  };
})();
