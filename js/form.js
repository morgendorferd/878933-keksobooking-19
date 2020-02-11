'use strict';

(function() {
  var MAP_PIN_MAIN = {
    width: 62,
    height: 62
  };
  var mapPinMain = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var formElements = form.querySelectorAll('fieldset');
  var addressInput = form.querySelector('#address');
  var roomsSelect = form.querySelector('#room_number');
  var guestsSelect = form.querySelector('#capacity');
  // блокирует форму
  var disableForm = function () {
    for (var i = 0; i < formElements.length - 1; i++) {
      formElements[i].disabled = true;
    }
  };
  // разблокирует форму
  var unDisableForm = function () {
    for (var i = 0; i < formElements.length - 1; i++) {
      formElements[i].disabled = false;
    }
  };

  var setCoordinates = function (indent) {
    var x = Math.floor(parseInt(mapPinMain.style.left, 10) + MAP_PIN_MAIN.width / 2);
    var y = Math.floor(parseInt(mapPinMain.style.top, 10) + MAP_PIN_MAIN.height / 2 + indent);

    return {
      x: x,
      y: y
    };
  };

  // добавляет координаты интупу
  var addCoordinates = function (element, indent) {
    element.value = setCoordinates(indent).x + ', ' + setCoordinates(indent).y;
  };

  disableForm();
  addCoordinates(addressInput, 0);
  var activateForm = function () {
    unDisableForm();
    window.util.deleteClass(form, 'ad-form--disabled');
    addCoordinates(addressInput, 53);
  };

  var checkValidityGuestsAndRooms = function () {
    var rooms = parseInt((roomsSelect.value), 10);
    var guests = parseInt((guestsSelect.value), 10);
    if ((rooms < guests) && (rooms !== 100) && (guests !== 0)) {
      guestsSelect.setCustomValidity('Максимальное число гостей: ' + rooms);
    } else if ((rooms === 100) && (guests !== 0)) {
      guestsSelect.setCustomValidity('не для гостей');
    } else if ((guests === 0) && (rooms !== 100)) {
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
  guestsSelect.addEventListener('change', guestsSelectChangeHandler);
  roomsSelect.addEventListener('change', roomsSelectChangeHandler);

  window.form = {
    activateForm: activateForm
  }
})();
