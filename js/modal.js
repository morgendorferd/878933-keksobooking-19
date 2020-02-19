'use strict';

(function() {
  var mainBlock = document.querySelector('main');
  var successPopupTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  var successPopup = successPopupTemplate.cloneNode(true);
  var errorPopupTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var errorPopup = errorPopupTemplate.cloneNode(true);
  successPopup.classList.add('hidden');
  errorPopup.classList.add('hidden');
  mainBlock.appendChild(successPopup);
  mainBlock.appendChild(errorPopup);

  var openSuccessPopup = function () {
    successPopup.classList.remove('hidden');
  };

  var openErrorPopup = function () {
    errorPopup.classList.remove('hidden');
  };

  var closeSuccessPopup = function () {
    successPopup.classList.add('hidden');
  };

  var closeErrorPopup = function () {
    errorPopup.classList.add('hidden');
  };

  var successPopupClickHandler = function (evt) {
    if (evt.button === window.util.LEFT_BUTTON) {
      closeSuccessPopup();
    }
  }

  var successPopupKeydownHandler = function (evt) {
    if (evt === window.util.KEY_ESC) {
      closeSuccessPopup();
    }
  };

  var errorPopupClickHandler = function (evt) {
    if (evt.button === window.util.LEFT_BUTTON) {
      closeErrorPopup();
    }
  }

  var errorPopupKeydownHandler = function (evt) {
    if (evt === window.util.KEY_ESC) {
      closeErrorPopup();
    }
  };

  window.modal = {
    successPopup: successPopup,
    openSuccessPopup: openSuccessPopup,
    successPopupClickHandler: successPopupClickHandler,
    successPopupKeydownHandler: successPopupKeydownHandler
  }
})();
