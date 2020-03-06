'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var roomsSelect = form.querySelector('#room_number');
  var guestsSelect = form.querySelector('#capacity');
  var formReset = form.querySelector('.ad-form__reset');

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

  checkValidityGuestsAndRooms();

  var submitFormHandler = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), window.modal.createSuccess, window.modal.createError);
    window.map.deactivatePage();
    window.pin.delete();
    form.reset();
    window.map.addCoordinates(53);

  };

  var resetFormClickHandler = function (evt) {
    evt.preventDefault();
    form.reset();
  };

  var resetFormKeydownHandler = function (evt) {
    evt.preventDefault();
    if (evt.key === window.util.KEY_ENTER) {
      form.reset();
    }
  };

  guestsSelect.addEventListener('change', guestsSelectChangeHandler);
  roomsSelect.addEventListener('change', roomsSelectChangeHandler);

  form.addEventListener('submit', submitFormHandler);
  formReset.addEventListener('click', resetFormClickHandler);
  formReset.addEventListener('keydown', resetFormKeydownHandler);
})();
