'use strict';

(function () {
  var mainBlock = document.querySelector('main');
  var successPopupTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  var errorPopupTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var createSuccessPopup = function () {
    var successPopup = successPopupTemplate.cloneNode(true);

    mainBlock.appendChild(successPopup);
    successPopup.addEventListener('click', successPopupClickHandler);
    document.addEventListener('keydown', successPopupKeydownHandler);
  };

  var createErrorPopup = function (errorMessage) {
    var errorPopup = errorPopupTemplate.cloneNode(true);

    mainBlock.appendChild(errorPopup);
    errorPopup.querySelector('.error__message').textContent = errorMessage;
    errorPopup.addEventListener('click', errorPopupClickHandler);
    document.addEventListener('keydown', errorPopupKeydownHandler);
  };

  var closeSuccessPopup = function () {
    document.querySelector('.success').remove();
    document.removeEventListener('keydown', successPopupKeydownHandler);
  };

  var closeErrorPopup = function () {
    document.querySelector('.error').remove();
    document.removeEventListener('keydown', errorPopupKeydownHandler);
  };

  var successPopupClickHandler = function () {
    closeSuccessPopup();
  };

  var successPopupKeydownHandler = function (evt) {
    if (evt.key === window.util.KEY_ESC) {
      closeSuccessPopup();
    }
  };

  var errorPopupClickHandler = function (evt) {
    closeErrorPopup();
  };

  var errorPopupKeydownHandler = function (evt) {
    if (evt.key === window.util.KEY_ESC) {
      closeErrorPopup();
    }
  };

  window.modal = {
    createSuccessPopup: createSuccessPopup,
    createErrorPopup: createErrorPopup
  };
})();
