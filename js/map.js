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
      MAX: 1138
    },
    Y: {
      MIN: 68,
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
  var isActive = false;

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

    addressInput.value = x + ', ' + y;
  };

  addCoordinates(MAP_PIN_MAIN.indent);

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    if (evt.button === LEFT_BUTTON) {
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var mapPinMainMouseMoveHandler = function (moveEvt) {
        moveEvt.preventDefault();

        var mapPinIndent = isActive ? MAP_PIN_MAIN.activeIndent : MAP_PIN_MAIN.indent;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        var mapPinPosition = {
          x: mapPinMain.offsetLeft - shift.x,
          y: mapPinMain.offsetTop - shift.y
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        mapPinMain.style.top = mapPinPosition.y + 'px';
        mapPinMain.style.left = mapPinPosition.x + 'px';

        if (mapPinPosition.x < DRAG_LIMIT.X.MIN) {
          mapPinMain.style.left = DRAG_LIMIT.X.MIN + 'px';
        }
        if (mapPinPosition.x > DRAG_LIMIT.X.MAX) {
          mapPinMain.style.left = DRAG_LIMIT.X.MAX + 'px';
        }
        if (mapPinPosition.y < DRAG_LIMIT.Y.MIN) {
          mapPinMain.style.top = DRAG_LIMIT.Y.MIN + 'px';
        }
        if (mapPinPosition.y > DRAG_LIMIT.Y.MAX) {
          mapPinMain.style.top = DRAG_LIMIT.Y.MAX + 'px';
        }

        addCoordinates(mapPinIndent);
      };

      var mapPinMainMouseUpHandler = function (upEvt) {
        upEvt.preventDefault();
        if (!isActive) {
          activatePage();
        }

        document.removeEventListener('mousemove', mapPinMainMouseMoveHandler);
        document.removeEventListener('mouseup', mapPinMainMouseUpHandler);
      };

      document.addEventListener('mousemove', mapPinMainMouseMoveHandler);
      document.addEventListener('mouseup', mapPinMainMouseUpHandler);
    }
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
    isActive = false;
  };

  var activatePage = function () {
    setDisabled(formElements);
    setDisabled(filtersElements);
    window.util.deleteClass(map, 'map--faded');
    window.util.deleteClass(form, 'ad-form--disabled');
    window.data.defaultAdvert();
    addCoordinates(MAP_PIN_MAIN.activeIndent);
    isActive = true;
  };

  // var mapPinMainClickHandler = function (evt) {
  //   if (evt.button === LEFT_BUTTON) {
  //     activatePage();
  //   }
  // };

  var mapPinMainKeydownHandler = function (evt) {
    if (evt.key === window.util.KEY_ENTER) {
      activatePage();
    }
  };

  var filtersChangeHandler = window.util.debounce(window.data.updateAdvert);

  deactivatePage();

  // mapPinMain.addEventListener('mousedown', mapPinMainClickHandler);
  mapPinMain.addEventListener('keydown', mapPinMainKeydownHandler);

  filters.addEventListener('change', filtersChangeHandler);

  window.map = {
    addCoordinates: addCoordinates,
    deactivatePage: deactivatePage
  };
})();
