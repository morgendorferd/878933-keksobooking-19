'use strict';

(function () {
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
    mapPinElement.addEventListener('click', function () {
      var card = document.querySelector('.map__card');
      if (card) {
        card.remove();
      }
      window.card.render(item);
      mapPinElement.classList.add('map-pin--active');
    });
    mapPinElement.addEventListener('keydown', function (evt) {
      if (evt.key === window.util.KEY_ENTER) {
        var card = document.querySelector('.map__card');
        if (card) {
          card.remove();
        }
        window.card.render(item);
        mapPinElement.classList.add('map-pin--active');
      }
    });

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

  window.pin = {
    render: renderPins,
    delete: deletePins
  };
})();
