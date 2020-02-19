'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var formElements = form.querySelectorAll('fieldset');
  var roomsSelect = form.querySelector('#room_number');
  var guestsSelect = form.querySelector('#capacity');
  var formSubmit = form.querySelector('.ad-form__submit');

  var disableForm = function () {
    for (var i = 0; i < formElements.length - 1; i++) {
      formElements[i].disabled = true;
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

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function (response) {
      disableForm();
      window.modal.openSuccessPopup();
      window.modal.successPopup.addEventListener('click', window.modal.successPopupClickHandler);
      window.modal.successPopup.addEventListener('keydown', window.modal.successPopupKeydownHandler);
    });
    evt.preventDefault();
});



})();
