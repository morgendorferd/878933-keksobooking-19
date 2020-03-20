'use strict';

(function () {
  var VALIDITY_OPTIONS = {
    rooms: 100,
    guests: 0
  };
  var BORDER_COLOR = {
    valid: '#d9d9d3',
    invalid: '#ff0000'
  };
  var TITLE_LENGTH = {
    min: 30,
    max: 100
  };
  var typeToPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var form = document.querySelector('.ad-form');
  var titleField = form.querySelector('#title');
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

  typeSelect.addEventListener('change', function () {
    priceSelect.min = typeToPrice[typeSelect.value];
    priceSelect.placeholder = typeToPrice[typeSelect.value];
  });

  var checkValidityTypeAndPrice = function () {
    var type = typeSelect;
    var price = priceSelect;
    var priceValue = parseInt((price.value), 10);

    if (priceValue < typeToPrice[type.value]) {
      price.setCustomValidity('Минимальная цена: ' + typeToPrice[type.value]);
      setBorder(price, BORDER_COLOR.invalid);
    } else {
      price.setCustomValidity('');
      setBorder(price, BORDER_COLOR.valid);
    }
  };

  var checkValidityTitle = function () {
    setBorder(titleField, BORDER_COLOR.invalid);

    if (titleField.value.length < TITLE_LENGTH.min) {
      titleField.setCustomValidity('Минимальная длина названия 30 символов, сейчас ' + titleField.value.length);
    } else if (titleField.value.length > TITLE_LENGTH.max) {
      titleField.setCustomValidity('Слишком длинное название');
    } else {
      titleField.setCustomValidity('');
      setBorder(titleField, BORDER_COLOR.valid);
    }
  };

  titleField.addEventListener('input', checkValidityTitle);
  priceSelect.addEventListener('input', checkValidityTypeAndPrice);
  typeSelect.addEventListener('change', checkValidityTypeAndPrice);
  timeInSelect.addEventListener('change', timeInChangeHandler);
  timeOutSelect.addEventListener('change', timeOutChangeHandler);

  var checkValidityGuestsAndRooms = function () {
    var rooms = parseInt((roomsSelect.value), 10);
    var guests = parseInt((guestsSelect.value), 10);

    setBorder(guestsSelect, BORDER_COLOR.invalid);
    if ((rooms < guests) && (rooms !== VALIDITY_OPTIONS.rooms) && (guests !== VALIDITY_OPTIONS.guests)) {
      guestsSelect.setCustomValidity('Максимальное число гостей: ' + rooms);
    } else if ((rooms === VALIDITY_OPTIONS.rooms) && (guests !== VALIDITY_OPTIONS.guests)) {
      guestsSelect.setCustomValidity('Выбранное количество комнат не подходит для гостей');
    } else if ((guests === VALIDITY_OPTIONS.guests) && (rooms !== VALIDITY_OPTIONS.rooms)) {
      guestsSelect.setCustomValidity('Размещение невозможно');
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

  var buttonSubmitClickHandler = function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(form), window.modal.createSuccess, window.modal.createError);
    form.reset();
    window.map.deactivatePage();
  };

  var buttonResetClickHandler = function (evt) {
    evt.preventDefault();

    form.reset();
    window.filter.reset();
    window.map.deactivatePage();
    window.photo.activate();
  };

  guestsSelect.addEventListener('change', guestsSelectChangeHandler);
  roomsSelect.addEventListener('change', roomsSelectChangeHandler);

  form.addEventListener('submit', buttonSubmitClickHandler);
  formReset.addEventListener('click', buttonResetClickHandler);
})();
