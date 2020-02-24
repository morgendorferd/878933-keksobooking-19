'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var formElements = form.querySelectorAll('fieldset');
  var roomsSelect = form.querySelector('#room_number');
  var guestsSelect = form.querySelector('#capacity');

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

  var successFormHandler = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), window.modal.createSuccessPopup, window.modal.createErrorPopup);
    window.map.deactivatePage();
    window.pin.delete();
    form.reset();
    window.map.addCoordinates(53);
  }

  guestsSelect.addEventListener('change', guestsSelectChangeHandler);
  roomsSelect.addEventListener('change', roomsSelectChangeHandler);

  form.addEventListener('submit', successFormHandler);
})();
