'use strict';

(function () {
  var cardElementTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var map = document.querySelector('.map');
  var mapFiltertsContainer = document.querySelector('.map__filters-container');

  var getType = function (item) {
    switch (item.offer.type) {
      case 'flat':
        return 'Квартира';
      case 'bungalo':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      case 'palace':
        return 'Дворец';
      default:
        return '';
    }
  };

  var generateFeatures = function (item, cardElement) {
    var fragment = document.createDocumentFragment();

    item.forEach(function (it) {
      var featureItem = document.createElement('li');
      featureItem.className = ('popup__feature popup__feature--') + it.offer.features;
      fragment.appendChild(featureItem);
    });
    cardElement.querySelector('.popup__features').appendChild(fragment);
  };

  var generatePhotos = function (item, cardElement) {
    var photoItemTemplate = cardElement.querySelector('.popup__photo');
    var photoItem = photoItemTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();

    item.forEach(function (it) {
      photoItem.src = it.offer.photos;
      fragment.appendChild(photoItem);
    });
    cardElement.querySelector('.popup__photo').remove();
    cardElement.querySelector('.popup__photos').appendChild(fragment);
  };

  var generateCard = function (item) {
    var cardElement = cardElementTemplate.cloneNode(true);

    cardElement.querySelector('.popup__avatar').src = item.author.avatar;
    cardElement.querySelector('.popup__title').textContent = item.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = item.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = item.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = getType(item);
    cardElement.querySelector('.popup__text--capacity').textContent = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
    generateFeatures(item, cardElement);
    cardElement.querySelector('.popup__description').textContent = item.offer.description;
    generatePhotos(item, cardElement);
    cardElement.addEventListener('keydown', cardElementKeydownHandler);

    return cardElement;
  };

  var closeCardElement = function () {
    event.target.remove();
  };

  var cardElementKeydownHandler = function (evt) {
    if (evt.key === window.util.KEY_ESC) {
      closeCardElement();
    }
  };

  var renderCard = function (item) {
    map.insertBefore(generateCard(item), mapFiltertsContainer);
  };

  window.card = {
    render: renderCard
  };
})();
