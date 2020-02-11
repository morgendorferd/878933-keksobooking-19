'use strict';

(function() {
  var MAX_AMOUNT = 8;
  var MOCK_DATA = {
    author: {
      avatar: ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png']
    },
    offer: {
      title: ['Предложение 1', 'Предложение 2', 'Предложение 3', 'Предложение 4', 'Предложение 5', 'Предложение 6', 'Предложение 7', 'Предложение 8'],
      address: '0, 130',
      price: [1000, 10000],
      type: ['palace', 'flat', 'house', 'bungalo'],
      rooms: [1, 5],
      guests: [1, 10],
      checkin: ['12.00', '13.00', '14.00'],
      checkout: ['12.00', '13.00', '14.00'],
      features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      description: ['Описание 1', 'Описание 2', 'Описание 3', 'Описание 4', 'Описание 5', 'Описание 6', 'Описание 7', 'Описание 8'],
      photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
    },
    location: {
      x: [0, 1200],
      y: [130, 630]
    }
  };

  // генерирует объект
  var getItem = function () {

    var x = window.utils.getRandomIntInclusive(MOCK_DATA.location.x[0], MOCK_DATA.location.x[1]);
    var y = window.utils.getRandomIntInclusive(MOCK_DATA.location.y[0], MOCK_DATA.location.y[1]);

    var item = {
      author: {
        avatar: window.utils.getRandomUniqueElement(MOCK_DATA.author.avatar).join()
      },

      offer: {
        title: window.utils.getRandomUniqueElement(MOCK_DATA.offer.title).join(),
        address: x + ',' + y,
        price: window.utils.getRandomIntInclusive(MOCK_DATA.offer.price[0], MOCK_DATA.offer.price[1]),
        type: window.utils.getRandomElement(MOCK_DATA.offer.type),
        rooms: window.utils.getRandomIntInclusive(MOCK_DATA.offer.rooms[0], MOCK_DATA.offer.rooms[1]),
        guests: window.utils.getRandomIntInclusive(MOCK_DATA.offer.guests[0], MOCK_DATA.offer.guests[1]),
        checkin: window.utils.getRandomElement(MOCK_DATA.offer.checkin),
        checkout: window.utils.getRandomElement(MOCK_DATA.offer.checkout),
        features: window.utils.getRandomArrayLength(MOCK_DATA.offer.features),
        description: window.utils.getRandomElement(MOCK_DATA.offer.description),
        photos: window.utils.getRandomArrayLength(MOCK_DATA.offer.photos)
      },

      location: {
        x: x,
        y: y
      }
    };

    return item;
  };

  // генериует массив объектов
  var getAdverts = function () {
    var array = [];

    for (var i = 0; i < MAX_AMOUNT; i++) {
      array.push(getItem());
    }

    return array;
  };

  var adverts = getAdverts();

  window.data = {
    MAX_AMOUNT: MAX_AMOUNT,
    adverts: adverts
  };
})()
