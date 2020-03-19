'use strict';

(function () {
  var VALIDITY_OPTIONS = {
    rooms: 100,
    guests: 0
  };
  var MAP_PIN_MAIN = {
    activeIndent: 53,
    defaultX: 570,
    defaultY: 375
  };
  var BORDER_COLOR = {
    valid: '#d9d9d3',
    invalid: '#ff0000'
  };
  var typeToPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var mapPinMain = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var roomsSelect = form.querySelector('#room_number');
  var guestsSelect = form.querySelector('#capacity');
  var timeInSelect = form.querySelector('#timein');
  var timeOutSelect = form.querySelector('#timeout');
  var priceSelect = form.querySelector('#price');
  var typeSelect = form.querySelector('#type');
  var formReset = form.querySelector('.ad-form__reset');

  var setBorder = function (element, color) {
    element.style.border = '1px solid' + color;
  };

  var timeInChangeHandler = function () {
    timeOutSelect.value = timeInSelect.value;
  };

  var timeOutChangeHandler = function () {
    timeInSelect.value = timeOutSelect.value;
  };

  timeInSelect.addEventListener('change', timeInChangeHandler);

  timeOutSelect.addEventListener('change', timeOutChangeHandler);

  typeSelect.addEventListener('change', function () {
    priceSelect.min = typeToPrice[typeSelect.value];
    priceSelect.placeholder = typeToPrice[typeSelect.value];
  });

  var checkValidityTypeAndPrice = function () {
    var type = typeSelect;
    var price = priceSelect;
    var priceValue = parseInt((price.value), 10);

    if (priceValue !== typeToPrice[type.value]) {
      price.setCustomValidity('Минимальная цена: ' + typeToPrice[type.value]);
      setBorder(price, BORDER_COLOR.invalid);
    } else {
      price.setCustomValidity('');
      setBorder(price, BORDER_COLOR.valid);
    }
  };

  priceSelect.addEventListener('change', checkValidityTypeAndPrice);
  typeSelect.addEventListener('change', checkValidityTypeAndPrice);

  var checkValidityGuestsAndRooms = function () {
    var rooms = parseInt((roomsSelect.value), 10);
    var guests = parseInt((guestsSelect.value), 10);

    if ((rooms < guests) && (rooms !== VALIDITY_OPTIONS.rooms) && (guests !== VALIDITY_OPTIONS.guests)) {
      guestsSelect.setCustomValidity('Максимальное число гостей: ' + rooms);
      setBorder(guestsSelect, BORDER_COLOR.invalid);
    } else if ((rooms === VALIDITY_OPTIONS.rooms) && (guests !== VALIDITY_OPTIONS.guests)) {
      guestsSelect.setCustomValidity('не для гостей');
      setBorder(guestsSelect, BORDER_COLOR.invalid);
    } else if ((guests === VALIDITY_OPTIONS.guests) && (rooms !== VALIDITY_OPTIONS.rooms)) {
      guestsSelect.setCustomValidity('Размещение невозможно');
      setBorder(guestsSelect, BORDER_COLOR.invalid);
    } else {
      guestsSelect.setCustomValidity('');
      setBorder(guestsSelect, BORDER_COLOR.valid);
    }
  };

  var guestsSelectChangeHandler = function () {
    checkValidityGuestsAndRooms();
  };

  var roomsSelectChangeHandler = function () {
    checkValidityGuestsAndRooms();
  };

  checkValidityGuestsAndRooms();
  checkValidityTypeAndPrice();

  var buttonSubmitClickHandler = function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(form), window.modal.createSuccess, window.modal.createError);
    window.map.deactivatePage();
    window.pin.delete();
    form.reset();
    mapPinMain.style.top = MAP_PIN_MAIN.defaultY + 'px';
    mapPinMain.style.left = MAP_PIN_MAIN.defaultX + 'px';
    window.map.addCoordinates(MAP_PIN_MAIN.activeIndent);
  };

  var buttonResetClickHandler = function (evt) {
    evt.preventDefault();

    form.reset();
    mapPinMain.style.top = MAP_PIN_MAIN.defaultY + 'px';
    mapPinMain.style.left = MAP_PIN_MAIN.defaultX + 'px';
    window.map.addCoordinates(MAP_PIN_MAIN.activeIndent);
  };

  guestsSelect.addEventListener('change', guestsSelectChangeHandler);
  roomsSelect.addEventListener('change', roomsSelectChangeHandler);

  form.addEventListener('submit', buttonSubmitClickHandler);
  formReset.addEventListener('click', buttonResetClickHandler);
})();
