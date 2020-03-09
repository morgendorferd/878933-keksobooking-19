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

    array.length = array.length < 5 ? array.length : 5;
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
