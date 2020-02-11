'use strict';

(function() {
  var mapPinsBlock = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin')
     .content
     .querySelector('.map__pin');
  var clonePins = function (item) {
    var mapPinElement = mapPinTemplate.cloneNode(true);
    mapPinElement.querySelector('img').src = item.author.avatar;
    mapPinElement.querySelector('img').alt = item.offer.title;
    mapPinElement.style.left = (item.location.x - 25) + 'px';
    mapPinElement.style.top = (item.location.y - 70) + 'px';

    return mapPinElement;
  };

  // рендер пинов
  var renderPins = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.MAX_AMOUNT; i++) {
      fragment.appendChild(clonePins(window.data.adverts[i]));
    }
    mapPinsBlock.appendChild(fragment);
  };

  window.pin = {
    clonePins: clonePins,
    renderPins: renderPins
  }
})();
