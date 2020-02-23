'use strict';

(function () {
  var KEY_ENTER = 'Enter';
  var KEY_ESC = 'Escape';

  var deleteClass = function (element, className) {
    element.classList.remove(className);
  };

  window.util = {
    KEY_ENTER: KEY_ENTER,
    KEY_ESC: KEY_ESC,
    deleteClass: deleteClass
  };
})();
