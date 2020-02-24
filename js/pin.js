'use strict';

(function () {
  var mapPinsBlock = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin')
     .content
     .querySelector('.map__pin');
  var mapPin = document.querySelector('.map__pin');

  var clonePins = function (item) {
    var mapPinElement = mapPinTemplate.cloneNode(true);

    mapPinElement.querySelector('img').src = item.author.avatar;
    mapPinElement.querySelector('img').alt = item.offer.title;
    mapPinElement.style.left = (item.location.x - 25) + 'px';
    mapPinElement.style.top = (item.location.y - 70) + 'px';
    // mapPinElement.addEventListener('click', mapPinElementClickHandler);

    return mapPinElement;
  };

  var renderPins = function (array) {
    var fragment = document.createDocumentFragment();

    array.forEach(function (it) {
      fragment.appendChild(clonePins(it));
    });
    mapPinsBlock.appendChild(fragment);
  };

  var deletePins = function () {
    var pins = document.querySelectorAll('.map__pin');
    pins.forEach(function (it) {
      if (!it.classList.contains('map__pin--main')) {
        it.remove();
      }
    });
  };

  mapPin.addEventListener('click', function () {
    window.backend.load(window.card.render, window.modal.errorHandler);
  });

  window.pin = {
    render: renderPins,
    delete: deletePins
  };
})();
