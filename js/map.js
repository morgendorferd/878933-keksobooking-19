'use strict';

(function() {
  var map = document.querySelector('.map');
  var mapPinsBlock = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin')
     .content
     .querySelector('.map__pin');
  var mapPinMain = document.querySelector('.map__pin--main');

  var clonePins = function (item) {
    var mapPinElement = mapPinTemplate.cloneNode(true);
    mapPinElement.querySelector('img').src = item.author.avatar;
    mapPinElement.querySelector('img').alt = item.offer.title;
    mapPinElement.style.left = (item.location.x - 25) + 'px';
    mapPinElement.style.top = (item.location.y - 70) + 'px';

    return mapPinElement;
  };

  var renderPins = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < MAX_AMOUNT; i++) {
      fragment.appendChild(clonePins(window.data.adverts[i]));
    }
    mapPinsBlock.appendChild(fragment);
  };



  var activateMap = function () {
    util.deleteClass(map, 'map--faded');
    pin.renderPins;
    mapPinMain.removeEventListener('keydown', mapPinMainKeydownHandler);
    mapPinMain.removeEventListener('mousedown', mapPinMainKeydownHandler);
  };

  var mapPinMainClickHandler = function (evt) {
    if (evt.button === window.util.LEFT_BUTTON) {
      activateMap();
      window.form.activateForm;
    }
  };

  var mapPinMainKeydownHandler = function (evt) {
    if (evt.key === window.util.KEY_ENTER) {
      activateMap();
      window.form.activateForm;
    }
  };

  mapPinMain.addEventListener('mousedown', mapPinMainClickHandler);

  mapPinMain.addEventListener('keydown', mapPinMainKeydownHandler);
})()
