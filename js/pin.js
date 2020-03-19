'use strict';

(function () {
  var PIN_GEOMETRY = {
    width: 25,
    height: 70
  };
  var MAX_PIN_AMOUNT = 5;
  var mapPinsBlock = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin')
     .content
     .querySelector('.map__pin');

  var clonePins = function (item) {
    var mapPinElement = mapPinTemplate.cloneNode(true);

    mapPinElement.querySelector('img').src = item.author.avatar;
    mapPinElement.querySelector('img').alt = item.offer.title;
    mapPinElement.style.left = (item.location.x - PIN_GEOMETRY.width) + 'px';
    mapPinElement.style.top = (item.location.y - PIN_GEOMETRY.height) + 'px';

    mapPinElement.addEventListener('click', function () {
      var pins = document.querySelectorAll('.map__pin');

      pins.forEach(function (it) {
        it.classList.remove('map__pin--active');
      });
      window.card.delete();
      window.card.render(item);
      mapPinElement.classList.add('map__pin--active');
    });

    return mapPinElement;
  };

  var renderPins = function (array) {
    var fragment = document.createDocumentFragment();

    array.length = array.length < MAX_PIN_AMOUNT ? array.length : MAX_PIN_AMOUNT;
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

  window.pin = {
    render: renderPins,
    delete: deletePins
  };
})();
