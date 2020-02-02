'use strict';

var MAX_AMOUNT = 8;

var MOCK_DATA = {
  author: {
    avatar: ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png']
  },

  offer: {
    title: ['Предложение 1', 'Предложение 2', 'Предложение 3', 'Предложение 4', 'Предложение 5', 'Предложение 6', 'Предложение 7', 'Предложение 8'],
    address: '600, 350',
    price: 10000,
    type: ['palace', 'flat', 'house', 'bungalo'],
    rooms: 3,
    guests: 6,
    checkin: ['12.00', '13.00', '14.00'],
    checkout: ['12.00', '13.00', '14.00'],
    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    description: ['Описание 1', 'Описание 2', 'Описание 3', 'Описание 4', 'Описание 5', 'Описание 6', 'Описание 7', 'Описание 8'],
    photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
  },

  location: {
    x: 600,
    y: 350
  }
};

// получить случайное число, включающее min и max
var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min + 1) + min)
}

// получить массив случайной длины
var getRandomArrayLength = function (array) {
  return array.slice(0, getRandomIntInclusive(1, array.length - 1))
}

// получить случайный элемент массива
var getRandomElement = function (array) {
  return array[getRandomIntInclusive(0, array.length - 1)];
};

var getRandomUniqueElement = function (array) {
  return array.splice(getRandomIntInclusive(0, array.length - 1), 1)
}


// генерирует объект
var getItem = function () {
  var x = getRandomIntInclusive(0, 1200);
  var y = getRandomIntInclusive(130, 630);
  var item = {
    author: {
      avatar: getRandomUniqueElement(MOCK_DATA.author.avatar).join()
    },

    offer: {
      title: getRandomUniqueElement(MOCK_DATA.offer.title).join(),
      address: x + ',' + y,
      price: getRandomIntInclusive(1000, 10000),
      type: getRandomElement(MOCK_DATA.offer.type),
      rooms: getRandomIntInclusive(1, 5),
      guests: getRandomIntInclusive(1, 10),
      checkin: getRandomElement(MOCK_DATA.offer.checkin),
      checkout: getRandomElement(MOCK_DATA.offer.checkout),
      features: getRandomArrayLength(MOCK_DATA.offer.features),
      description: getRandomElement(MOCK_DATA.offer.description),
      photos: getRandomArrayLength(MOCK_DATA.offer.photos)
    },

    location: {
      x: x,
      y: y
    }
  };
  return item;
}
console.log(getItem());

// генериует массив объектов
var getAdverts = function () {
  var array = [];

  for (var i = 0; i < MAX_AMOUNT; i++) {
    array.push(getItem());
  }

  return array;
}

console.log(getAdverts());

// убираем класс map--faded
var map = document.querySelector('.map');
map.classList.remove('map--faded');

 // находим блок, в который будем клонировать элементы
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
  return mapPinElement;
}

var renderPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < MAX_AMOUNT; i++) {
    fragment.appendChild(clonePins(getAdverts()[i]));
  }
  mapPinsBlock.appendChild(fragment);
}

renderPins();
