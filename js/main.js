'use strict';

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

var MAP_PIN = {
  width: 65,
  height: 87
};

var map = document.querySelector('.map');

var mapPinsBlock = document.querySelector('.map__pins');

var mapPinTemplate = document.querySelector('#pin')
   .content
   .querySelector('.map__pin');

var mapPinMain = document.querySelector('.map__pin--main');

var mapPinMainX = Math.floor(parseInt(mapPinMain.style.left, 10) + MAP_PIN.width / 2);

var mapPinMainY = Math.floor(parseInt(mapPinMain.style.top, 10) + MAP_PIN.height);

var formElements = document.querySelectorAll('.ad-form input, .ad-form select');

var addressInput = document.querySelector('#address');

var titleInput = document.querySelector('#title');

var roomNumberSelect = document.querySelector('#room_number');

var capacitySelect = document.querySelector('#capacity');

// получить случайное число, включающее min и max
var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
};

// получить массив случайной длины
var getRandomArrayLength = function (array) {
  return array.slice(0, getRandomIntInclusive(1, array.length - 1));
};

// получить случайный элемент массива
var getRandomElement = function (array) {
  return array[getRandomIntInclusive(0, array.length - 1)];
};

var getRandomUniqueElement = function (array) {
  return array.splice(getRandomIntInclusive(0, array.length - 1), 1);
};


// генерирует объект
var getItem = function () {

  var x = getRandomIntInclusive(MOCK_DATA.location.x[0], MOCK_DATA.location.x[1]);
  var y = getRandomIntInclusive(MOCK_DATA.location.y[0], MOCK_DATA.location.y[1]);

  var item = {
    author: {
      avatar: getRandomUniqueElement(MOCK_DATA.author.avatar).join()
    },

    offer: {
      title: getRandomUniqueElement(MOCK_DATA.offer.title).join(),
      address: x + ',' + y,
      price: getRandomIntInclusive(MOCK_DATA.offer.price[0], MOCK_DATA.offer.price[1]),
      type: getRandomElement(MOCK_DATA.offer.type),
      rooms: getRandomIntInclusive(MOCK_DATA.offer.rooms[0], MOCK_DATA.offer.rooms[1]),
      guests: getRandomIntInclusive(MOCK_DATA.offer.guests[0], MOCK_DATA.offer.guests[1]),
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

var clonePins = function (item) {
  var mapPinElement = mapPinTemplate.cloneNode(true);
  mapPinElement.querySelector('img').src = item.author.avatar;
  mapPinElement.querySelector('img').alt = item.offer.title;
  mapPinElement.style.left = (item.location.x - 25) + 'px';
  mapPinElement.style.top = (item.location.y - 70) + 'px';

  return mapPinElement;
};

var renderPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < MAX_AMOUNT; i++) {
    fragment.appendChild(clonePins(adverts[i]));
  }
  mapPinsBlock.appendChild(fragment);
};

renderPins();

for (var i = 0; i < formElements.length - 1; i++) {
  formElements[i].setAttribute('disabled', 'disabled');
}

addressInput.setAttribute('value', parseInt(mapPinMain.style.left, 10) + ', ' + parseInt(mapPinMain.style.top, 10));

var mapPinMainClickHandler = function () {
  for (i = 0; i < formElements.length - 1; i++) {
    formElements[i].removeAttribute('disabled', 'disabled');
  }
  map.classList.remove('map--faded');

  addressInput.setAttribute('value', mapPinMainX + ', ' + mapPinMainY);
};

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.which === 1) {
    mapPinMainClickHandler();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    mapPinMainClickHandler();
  }
});
