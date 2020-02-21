'use strict';

(function () {
  var mainBlock = document.querySelector('main');
  var successPopupTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  var errorPopupTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var successPopup = successPopupTemplate.cloneNode(true);
  var errorPopup = errorPopupTemplate.cloneNode(true);

  var successHandler = function () {
    mainBlock.appendChild(successPopup);
    successPopup.addEventListener('click', successPopupClickHandler);
    successPopup.addEventListener('keydown', successPopupKeydownHandler);
  };

  var errorHandler = function () {
    mainBlock.appendChild(errorPopup);
    errorPopup.addEventListener('click', errorPopupClickHandler);
    errorPopup.addEventListener('keydown', errorPopupKeydownHandler);
  };

  var closeSuccessPopup = function () {
    successPopup.remove();
  };

  var closeErrorPopup = function () {
    errorPopup.remove();
  };

  var successPopupClickHandler = function (evt) {
    if (evt.button === window.util.LEFT_BUTTON) {
      closeSuccessPopup();
    }
  };

  var successPopupKeydownHandler = function (evt) {
    if (evt.key === window.util.KEY_ESC) {
      closeSuccessPopup();
    }
  };

  var errorPopupClickHandler = function (evt) {
    if (evt.button === window.util.LEFT_BUTTON) {
      closeErrorPopup();
    }
  };

  var errorPopupKeydownHandler = function (evt) {
    if (evt.key === window.util.KEY_ESC) {
      closeErrorPopup();
    }
  };

  window.modal = {
    successPopup: successPopup,
    errorPopup: errorPopup,
    successHandler: successHandler,
    errorHandler: errorHandler,
    successPopupClickHandler: successPopupClickHandler,
    successPopupKeydownHandler: successPopupKeydownHandler
  };
})();
