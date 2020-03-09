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
  var filters = document.querySelector('.map__filters');
  var filtersElements = filters.querySelectorAll('select, fieldset');
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

  var setDisabled = function (array) {
    array.forEach(function (it) {
      if (it.disabled === true) {
        it.disabled = false;
      } else {
        it.disabled = true;
      }
    });
  };

  var deactivatePage = function () {
    map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
    setDisabled(formElements);
    setDisabled(filtersElements);
  };

  var activatePage = function () {
    setDisabled(formElements);
    setDisabled(filtersElements);
    window.util.deleteClass(map, 'map--faded');
    window.util.deleteClass(form, 'ad-form--disabled');
    window.data.defaultAdvert();
    addCoordinates(53);
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

  var filtersChangeHandler = function () {
    window.data.updateAdvert();
  };

  deactivatePage();

  mapPinMain.addEventListener('mousedown', mapPinMainClickHandler);
  mapPinMain.addEventListener('keydown', mapPinMainKeydownHandler);

  filters.addEventListener('change', filtersChangeHandler);

  window.map = {
    addCoordinates: addCoordinates,
    deactivatePage: deactivatePage
  };
})();
