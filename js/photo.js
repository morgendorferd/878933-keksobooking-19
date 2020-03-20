'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarUpload = document.querySelector('.ad-form-header__upload');
  var photoUpload = document.querySelector('.ad-form__photo-container');
  var avatarFileChooser = avatarUpload.querySelector('input[type=file]');
  var avatarPreview = avatarUpload.querySelector('.ad-form-header__preview img');
  var photoFileChooser = photoUpload.querySelector('input[type=file]');
  var photoPreview = photoUpload.querySelector('.ad-form__photo');
  var photoPreviewImg;

  var createPhoto = function () {
    photoPreview.innerHTML = '';
    photoPreviewImg = document.createElement('img');
    photoPreviewImg.width = 40;
    photoPreviewImg.height = 44;
    photoPreviewImg.alt = 'Фото жилья';
    photoPreview.appendChild(photoPreviewImg);

    return photoPreviewImg;
  };

  var uploadPhoto = function (fileChooser, element) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        element.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var avatarFileChooserChangeHandler = function () {
    uploadPhoto(avatarFileChooser, avatarPreview);
  };
  var photoFileChooserChangeHandler = function () {
    uploadPhoto(photoFileChooser, createPhoto());
  };

  var activatePhoto = function () {
    avatarFileChooser.addEventListener('change', avatarFileChooserChangeHandler);
    photoFileChooser.addEventListener('change', photoFileChooserChangeHandler);
  };

  var deactivatePhoto = function () {
    avatarPreview.src = 'img/muffin-grey.svg';
    if (photoPreviewImg) {
      photoPreviewImg.src = 'img/muffin-grey.svg';
    }

    avatarFileChooser.removeEventListener('change', avatarFileChooserChangeHandler);
    photoFileChooser.removeEventListener('change', photoFileChooserChangeHandler);
  };

  window.photo = {
    activate: activatePhoto,
    deactivate: deactivatePhoto
  };

  // avatarFileChooser.addEventListener('change', avatarFileChooserChangeHandler);
  // photoFileChooser.addEventListener('change', photoFileChooserChangeHandler);
})();
