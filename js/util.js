'use strict';

(function () {
  var LEFT_BUTTON = 0;
  var KEY_ENTER = 'Enter';
  var KEY_ESC = 'Escape';

  var getRandomIntInclusive = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  var getRandomArrayLength = function (array) {
    return array.slice(0, getRandomIntInclusive(1, array.length - 1));
  };

  var getRandomElement = function (array) {
    return array[getRandomIntInclusive(0, array.length - 1)];
  };

  var getRandomUniqueElement = function (array) {
    return array.splice(getRandomIntInclusive(0, array.length - 1), 1);
  };

  var deleteClass = function (element, className) {
    element.classList.remove(className);
  };

  window.util = {
    LEFT_BUTTON: LEFT_BUTTON,
    KEY_ENTER: KEY_ENTER,
    KEY_ESC: KEY_ESC,
    getRandomIntInclusive: getRandomIntInclusive,
    getRandomElement: getRandomElement,
    getRandomArrayLength: getRandomArrayLength,
    getRandomUniqueElement: getRandomUniqueElement,
    deleteClass: deleteClass
  };
})();
