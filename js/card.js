'use strict';

(function () {
  var cardElementTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var map = document.querySelector('.map');
  var mapFiltertsContainer = document.querySelector('.map__filters-container');
  var featureListElement = document.querySelector('.popup__features');

// определяет тип размещения
  var getType = function (item) {
    switch (item) {
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


  // var featureItemTemplate = document.querySelector('#content')
  //   .content
  //   .querySelector('.popup__feature');

  // var cloneFeatures = function (item) {
  //   var featureItem = featureItemTemplate.cloneNode(true);
  //   featureItem.classList.add('popup__feature--' + i);
  //
  //   return featureItem;
  // }
  //
  // var renderFeatures = function (array) {
  //   var fragment = document.createDocumentFragment();
  //   for (var i = 0; i < array.length - 1; i++) {
  //     fragment.appendChild(cloneFeatures(array[i]));
  //   }
  // }
  var generateFeatures = function(item, cardElement) {
    console.log(cardElement);
    for (var i = 0; i < item.offer.features.length; i++) {
      var featureItem = document.createElement('li');
      featureItem.className = ('popup__feature popup__feature--') + item.offer.features[i];
      cardElement.querySelector('.popup__features').appendChild(featureItem);
    }
  };

  var generateCard = function (item) {
    var cardElement = cardElementTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = item.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = item.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = item.offer.price + ' ₽/ночь';
    // cardElement.querySelector('.popup__type').textContent = getType(item);
    cardElement.querySelector('.popup__text--capacity').textContent =  item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;

    generateFeatures(item, cardElement);

    cardElement.querySelector('.popup__description').textContent = item.offer.description;
    cardElement.querySelector('.popup__photos img').src = item.author.avatar;

    return cardElement;
  }

// getCard(window.data[0]);

for (var i = 0; i < window.data.length; i++) {
  map.insertBefore(generateCard(window.data[i]), mapFiltertsContainer);
}



})();
