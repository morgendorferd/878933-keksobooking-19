'use strict';

(function () {
  var VALIDITY_OPTIONS = {
    rooms: 100,
    guests: 0
  };
  var MAP_PIN_MAIN = {
    activeIndent: 53
  };
  var TYPE_TO_PRICE = {
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

  var timeInChangeHandler = function () {
    timeOutSelect.value = timeInSelect.value;
  };

  var timeOutChangeHandler = function () {
    timeInSelect.value = timeOutSelect.value;
  };

  timeInSelect.addEventListener('change', timeInChangeHandler);

  timeOutSelect.addEventListener('change', timeOutChangeHandler);

  typeSelect.addEventListener('change', function () {
    priceSelect.min = TYPE_TO_PRICE[typeSelect.value];
    priceSelect.placeholder = TYPE_TO_PRICE[typeSelect.value];
  });

  var checkValidityGuestsAndRooms = function () {
    var rooms = parseInt((roomsSelect.value), 10);
    var guests = parseInt((guestsSelect.value), 10);

    if ((rooms < guests) && (rooms !== VALIDITY_OPTIONS.rooms) && (guests !== VALIDITY_OPTIONS.guests)) {
      guestsSelect.setCustomValidity('Максимальное число гостей: ' + rooms);
    } else if ((rooms === VALIDITY_OPTIONS.rooms) && (guests !== VALIDITY_OPTIONS.guests)) {
      guestsSelect.setCustomValidity('не для гостей');
    } else if ((guests === VALIDITY_OPTIONS.guests) && (rooms !== VALIDITY_OPTIONS.rooms)) {
      guestsSelect.setCustomValidity('Размещение невозможно');
    } else {
      guestsSelect.setCustomValidity('');
    }
  };

  var guestsSelectChangeHandler = function () {
    checkValidityGuestsAndRooms();
  };

  var roomsSelectChangeHandler = function () {
    checkValidityGuestsAndRooms();
  };

  checkValidityGuestsAndRooms();

  var submitFormHandler = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), window.modal.createSuccess, window.modal.createError);
    window.map.deactivatePage();
    window.pin.delete();
    form.reset();
    mapPinMain.style.top = 375 + 'px';
    mapPinMain.style.left = 570 + 'px';
    window.map.addCoordinates(MAP_PIN_MAIN.activeIndent);
  };

  var resetFormClickHandler = function (evt) {
    evt.preventDefault();
    form.reset();
    mapPinMain.style.top = 375 + 'px';
    mapPinMain.style.left = 570 + 'px';
    window.map.addCoordinates(MAP_PIN_MAIN.activeIndent);
  };

  guestsSelect.addEventListener('change', guestsSelectChangeHandler);
  roomsSelect.addEventListener('change', roomsSelectChangeHandler);

  form.addEventListener('submit', submitFormHandler);
  formReset.addEventListener('click', resetFormClickHandler);
})();
