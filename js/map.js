'use strict';

(function () {
  var MAP_PIN_MAIN = {
    width: 62,
    height: 62
  };
  var form = document.querySelector('.ad-form');
  var formElements = form.querySelectorAll('fieldset');
  var addressInput = form.querySelector('#address');
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');

  var setCoordinates = function () {
    return {
      x: Math.floor(parseInt(mapPinMain.style.left, 10)),
      y: Math.floor(parseInt(mapPinMain.style.top, 10))
    };
  };

  var addCoordinates = function (indent) {
    var coordinates = setCoordinates();
    var x = coordinates.x + MAP_PIN_MAIN.width / 2;
    var y = coordinates.y + MAP_PIN_MAIN.height / 2 + indent;
    addressInput.value = x + ' , ' + y;
  };

  addCoordinates(0);

  var activateForm = function () {
    for (var i = 0; i < formElements.length - 1; i++) {
      formElements[i].disabled = false;
    }
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var activatePage = function () {
    activateForm();
    window.util.deleteClass(map, 'map--faded');
    window.util.deleteClass(form, 'ad-form--disabled');
    window.backend.load(window.pin.render, errorHandler);
    addCoordinates(53);
    window.backend.load(window.card.render, errorHandler);
    mapPinMain.removeEventListener('keydown', mapPinMainKeydownHandler);
    mapPinMain.removeEventListener('mousedown', mapPinMainClickHandler);
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
})();
