'use strict';

(function() {
  var MAP_PIN_MAIN = {
    width: 62,
    height: 62
  };
  var form = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var mapPinsBlock = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin')
     .content
     .querySelector('.map__pin');
  var mapPinMain = document.querySelector('.map__pin--main');

  var setCoordinates = function () {
    return {
      x: Math.floor(parseInt(mapPinMain.style.left, 10)),
      y: Math.floor(parseInt(mapPinMain.style.top, 10))
    };
  };

  var addCoordinates = function (indent) {
    var coordinates = setCoordinates();
    var x = coordinates.x + MAP_PIN_MAIN.width/2;
    var y = coordinates.y + MAP_PIN_MAIN.height/2 + indent;
    window.form.addressInput.value = x + ' , ' + y;
  }

  addCoordinates(0);

  var activatePage = function () {
    window.form.activateForm();
    window.util.deleteClass(map, 'map--faded');
    window.util.deleteClass(form, 'ad-form--disabled');
    window.pin.renderPins();
    addCoordinates(53);
    mapPinMain.removeEventListener('keydown', mapPinMainKeydownHandler);
    mapPinMain.removeEventListener('mousedown', mapPinMainKeydownHandler);
  };

  var mapPinMainClickHandler = function (evt) {
    if (evt.button === window.util.LEFT_BUTTON) {
      activatePage();
    }
  };

  var mapPinMainKeydownHandler = function (evt) {
    if (evt.key === window.util.KEY_ENTER) {
      activatePage();
    }
  };

  mapPinMain.addEventListener('mousedown', mapPinMainClickHandler);

  mapPinMain.addEventListener('keydown', mapPinMainKeydownHandler);
})()
