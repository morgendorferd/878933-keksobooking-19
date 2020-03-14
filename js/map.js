'use strict';

(function () {
  var LEFT_BUTTON = 0;
  var MAP_PIN_MAIN = {
    width: 62,
    height: 62,
    tailHeight: 22,
    indent: 0,
    activeIndent: 53
  };
  var DRAG_LIMIT = {
    X: {
      MIN: 0,
      MAX: 1200
    },
    Y: {
      MIN: 130,
      MAX: 630
    }
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

  addCoordinates(MAP_PIN_MAIN.indent);

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mapPinPosition = {
        x: mapPinMain.offsetLeft - shift.x,
        y: mapPinMain.offsetTop - shift.y
      };

      if (mapPinPosition.x < DRAG_LIMIT.X.MIN) {
        mapPinPosition.x = DRAG_LIMIT.X.MIN;
      } else if (mapPinPosition.x > DRAG_LIMIT.X.MAX) {
        mapPinPosition.x = DRAG_LIMIT.X.MAX - MAP_PIN_MAIN.width;
      } else if (mapPinPosition.y < DRAG_LIMIT.Y.MIN) {
        mapPinPosition.y = DRAG_LIMIT.Y.MIN;
      } else if (mapPinPosition.y > DRAG_LIMIT.Y.MAX) {
        mapPinPosition.y = DRAG_LIMIT.Y.MAX;
      }

      mapPinMain.style.top = mapPinPosition.y + 'px';
      mapPinMain.style.left = mapPinPosition.x + 'px';
      addCoordinates(MAP_PIN_MAIN.indent);
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  var setDisabled = function (array) {
    array.forEach(function (it) {
      it.disabled = !it.disabled;
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
    addCoordinates(MAP_PIN_MAIN.activeIndent);
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

  var filtersChangeHandler = window.util.debounce(window.data.updateAdvert);

  deactivatePage();

  mapPinMain.addEventListener('mousedown', mapPinMainClickHandler);
  mapPinMain.addEventListener('keydown', mapPinMainKeydownHandler);

  filters.addEventListener('change', filtersChangeHandler);

  window.map = {
    addCoordinates: addCoordinates,
    deactivatePage: deactivatePage
  };
})();
