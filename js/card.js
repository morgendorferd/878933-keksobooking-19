'use strict';

(function () {
  var typeToHouse = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };
  var cardElementTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var map = document.querySelector('.map');
  var mapFiltertsContainer = document.querySelector('.map__filters-container');

  var generateFeatures = function (item, cardElement) {
    if (item.offer.features.length) {
      var fragment = document.createDocumentFragment();

      item.offer.features.forEach(function (it) {
        var featureItem = document.createElement('li');
        featureItem.className = ('popup__feature popup__feature--') + it;
        fragment.appendChild(featureItem);
      });
      cardElement.querySelector('.popup__features').appendChild(fragment);
    } else {
      cardElement.querySelector('.popup__features').classList.add('hidden');
    }
  };

  var generatePhotos = function (item, cardElement) {
    if (item.offer.photos.length > 0) {
      var photoItemTemplate = cardElement.querySelector('.popup__photo');
      var fragment = document.createDocumentFragment();

      item.offer.photos.forEach(function (it) {
        var photoItem = photoItemTemplate.cloneNode(true);
        photoItem.src = it;
        fragment.appendChild(photoItem);
      });
      cardElement.querySelector('.popup__photo').remove();
      cardElement.querySelector('.popup__photos').appendChild(fragment);
    } else {
      cardElement.querySelector('.popup__photos').classList.add('hidden');
    }
  };

  var generateRoomsAndGuests = function (rooms, guests) {
    var guestText = guests === 1 ? ' гостя' : ' гостей';
    var roomText = '';
    switch (rooms) {
      case 1:
        roomText = ' комната для ';
        break;
      case 2:
      case 3:
      case 4:
        roomText = ' комнаты для ';
        break;
      default:
        roomText = ' комнат для ';
    }
    return rooms + roomText + guests + guestText;
  };

  var checkValue = function (value, block) {
    if (value) {
      block.textContent = value;
    } else {
      block.classList.add('hidden');
    }
  };

  var checkPrice = function(value, block) {
    if (value) {
      block.textContent = value + ' ₽/ночь';
    } else {
      block.classList.add('hidden');
    }
  };

  var checkAvatar = function (value, block) {
    if (value) {
      block.src = value;
    } else {
      block.classList.add('hidden');
    }
  };

  var checkType = function (value, block) {
    if (value) {
      block.textContent = typeToHouse[value];
    } else {
      block.classList.add('hidden');
    }
  };

  var generateCard = function (item) {
    var cardElement = cardElementTemplate.cloneNode(true);
    var avatar = cardElement.querySelector('.popup__avatar');
    var title = cardElement.querySelector('.popup__title');
    var address = cardElement.querySelector('.popup__text--address');
    var price = cardElement.querySelector('.popup__text--price');
    var type = cardElement.querySelector('.popup__type');
    var capacity = cardElement.querySelector('.popup__text--capacity');
    var textTime = cardElement.querySelector('.popup__text--time');
    var description = cardElement.querySelector('.popup__description');

    checkAvatar(item.author.avatar, avatar);
    checkValue(item.offer.title, title);
    checkValue(item.offer.address, address);
    checkPrice(item.offer.price, price);
    checkType(item.offer.type, type);
    capacity.textContent = generateRoomsAndGuests(item.offer.rooms, item.offer.guests);
    textTime.textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
    generateFeatures(item, cardElement);
    checkValue(item.offer.description, description);
    generatePhotos(item, cardElement);

    return cardElement;
  };

  var renderCard = function (item) {
    map.insertBefore(generateCard(item), mapFiltertsContainer);

    var card = document.querySelector('.map__card');
    card.querySelector('.popup__close').addEventListener('click', cardClickHandler);
    document.addEventListener('keydown', cardKeydownHandler);
  };

  var closeCard = function () {
    var card = document.querySelector('.map__card');
    card.remove();
  };

  var cardClickHandler = function () {
    closeCard();
  };

  var cardKeydownHandler = function (evt) {
    if (evt.key === window.util.KEY_ESC) {
      closeCard();
    }
    document.removeEventListener('keydown', cardKeydownHandler);
  };

  var deleteCard = function () {
    var card = document.querySelector('.map__card');
    if (card) {
      card.remove();
    }
  };

  window.card = {
    render: renderCard,
    delete: deleteCard
  };
})();
