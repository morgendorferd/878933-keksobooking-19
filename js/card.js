'use strict';

(function () {
  // находим шаблон, который будем копировать
  var cardElement = document.querySelector('#card')
    .content
    .querySelector('.map__card');
    // найдем элемент, в который будем вставлять карточку
  var map = document.querySelector('.map');
  // вставлять перед этим элементом
  var mapFiltertsContainer = document.querySelector('.map__filters-container');

// определяет тип размещения
  var getType= function (item) {
    if (item.offer.type === 'flat') {
      cardElement.querySelector('.popup__type').content = 'Квартира';
    } else if (item.offer.type === 'bungalo') {
      cardElement.querySelector('.popup__type').content = 'Бунгало';
    } else if (item.offer.type === 'house') {
      cardElement.querySelector('.popup__type').content = 'Дом';
    } else if (item.offer.type === 'palace') {
      cardElement.querySelector('.popup__type').content = 'Дворец'
    } else {
      cardElement.querySelector('.popup__type').style.display.none;
    }
  }

  var getCard = function (item) {
    cardElement.querySelector('.popup__title').content = item.offer.title;
    cardElement.querySelector('.popup__text--address').content = item.offer.address;
    cardElement.querySelector('.popup__text--price').content = item.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').content = getType(item);
    cardElement.querySelector('.popup__text--capacity').content =  item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').content = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
    // cardElement.querySelector('.popup__features');
    cardElement.querySelector('.popup__description').content = item.offer.description;
    cardElement.querySelector('.popup__photos img').src = item.author.avatar;
    }

  getCard(window.data[0]);
  console.log(cardElement.querySelector('.popup__photos img').src)

})();
