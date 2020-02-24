'use strict';

(function () {
  var LEFT_BUTTON = 0;
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
    formElements.forEach(function (it) {
      it.disabled = false;
    });
  };

  var disableForm = function () {
    formElements.forEach(function (it) {
      it.disabled = true;
    });
  };

  var deactivatePage = function () {
    map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
    disableForm();
  }

  var activatePage = function () {
    activateForm();
    window.util.deleteClass(map, 'map--faded');
    window.util.deleteClass(form, 'ad-form--disabled');
    window.backend.load(window.pin.render, window.modal.errorHandler);
    addCoordinates(53);
    window.backend.load(window.card.render, window.modal.errorHandler);
    mapPinMain.removeEventListener('keydown', mapPinMainKeydownHandler);
    mapPinMain.removeEventListener('mousedown', mapPinMainClickHandler);
  };

  var mapPinMainClickHandler = function (evt) {
    if (evt.button === LEFT_BUTTON) {
      activatePage();
    }
  };

  var mapPinMainKeydownHandler = function (evt) {
    if (evt.key === window.util.KEY_ENTER) {
      activatePage();
    }
  };

  deactivatePage();

  mapPinMain.addEventListener('mousedown', mapPinMainClickHandler);
  mapPinMain.addEventListener('keydown', mapPinMainKeydownHandler);

  window.map = {
    addCoordinates: addCoordinates,
    deactivatePage: deactivatePage
  }
})();
