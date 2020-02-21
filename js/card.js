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
    for (var i = 0; i < item.offer.features.length; i++) {
      var featureItem = document.createElement('li');
      featureItem.className = ('popup__feature popup__feature--') + item.offer.features[i];
      fragment.appendChild(featureItem);
    }
    cardElement.querySelector('.popup__features').appendChild(fragment);
  };

  var generatePhotos = function (item, cardElement) {
    var photoItemTemplate = cardElement.querySelector('.popup__photo');
    var photoItem = photoItemTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < item.offer.photos.length; i++) {
      photoItem.src = item.offer.photos[i];
      fragment.appendChild(photoItem);
    }
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

    return cardElement;
  };

  var renderCard = function () {
    map.insertBefore(generateCard(window.data[0]), mapFiltertsContainer);
  };

  window.card = {
    render: renderCard
  };
})();
