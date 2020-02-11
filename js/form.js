'use strict';

(function() {
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
  var activateForm = function () {
    for (var i = 0; i < formElements.length - 1; i++) {
      formElements[i].disabled = false;
    }
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
  disableForm();

  window.form = {
    activateForm: activateForm,
    addressInput: addressInput
  }
})();
