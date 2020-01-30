'use strict';

var adverts = []; //  массив объектов предложений
var offerNumber; // пордяковый номер предложения
var x; // координата Х
var y; // координата У

//  генерирует случайную цену
var generatePrice = function () {
  var roomPrice = Math.floor(Math.random() * 10000);
  if (roomPrice === 0) {
    roomPrice = 10000;
  }
  return roomPrice;
};

//  генерирует тип размещения
var generateType = function () {
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var key = Math.floor(Math.random() * types.length);
  return types[key];
};

//  генерирует количество комнат
var generateRoom = function () {
  var room = Math.floor(Math.random() * 5);
  if (room === 0) {
    room = 1;
  }
  return room;
};

//  генерирует количество гостей
var generateGuests = function () {
  var guests = Math.floor(Math.random() * 10);
  if (guests === 0) {
    guests = 1;
  }
  return guests;
};

//  генерирует время
var generateTime = function () {
  var times = ['12.00', '13.00', '14.00'];
  var key = Math.floor(Math.random() * 3);
  return times[key];
};

//  генерирует массив с удобствами
var generateFeatures = function () {
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var generatedFeatures = [];
  var generatedFeaturesLength = Math.floor(Math.random() * features.length);
  if (generatedFeaturesLength === 0) {
    generatedFeaturesLength = 1;
  }

  for (var i = 0; i < features.length; i++) {
    var key = Math.floor(Math.random() * features.length);
    generatedFeatures[i] = features[key];
  }
  return generatedFeatures;
};

//  генерирует фотографии
var generatePhotos = function () {
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var generatedPhotos = [];
  var generatedPhotosLength = Math.floor(Math.random() * photos.length);
  if (generatedPhotosLength === 0) {
    generatedPhotosLength = 1;
  }
  for (var i = 0; i < generatedPhotosLength; i++) {
    var key = Math.floor(Math.random() * photos.length);
    generatedPhotos[i] = photos[key];
  }
  return generatedPhotos;
};

//  генерирует координату Х
var generateX = function () {
  var screenWidth = document.body.clientWidth;
  x = Math.floor(Math.random() * screenWidth);
  return x;
};

//  генерирует координату У
var generateY = function () {
  y = Math.floor(Math.random() * 630);
  if (y < 130) {
    y = 130;
  }
  return y;
};

for (var i = 0; i < 8; i++) {
  offerNumber = i + 1;
  x = generateX();
  y = generateY();
  adverts[i] = {
    'author': {
      'avatar': 'img/avatars/user0' + offerNumber + '.png'
    },

    'offer': {
      'title': 'Offer' + offerNumber,
      'address': x + ',' + y,
      'price': generatePrice(),
      'type': generateType(),
      'rooms': generateRoom(),
      'guests': generateGuests(),
      'checkin': generateTime(),
      'checkout': generateTime(),
      'features': generateFeatures(),
      'description': 'Description' + offerNumber,
      'photos': generatePhotos()
    },

    'location': {
      'x': x,
      'y': y
    }
  };
}

//  убираем класс map--faded
var map = document.querySelector('.map');
map.classList.remove('map--faded');

//  находим блок, в который будем клонировать элементы
var mapPinsBlock = document.querySelector('.map__pins');

//  находим содержание шаблона
var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

//  создаем фрагмент
var fragment = document.createDocumentFragment();


//  клонируем элементы
for (i = 0; i < adverts.length; i++) {
  var mapPin = mapPinTemplate.cloneNode(true);
  mapPin.querySelector('img').src = adverts[i].author.avatar;
  mapPin.querySelector('img').alt = adverts[i].offer.title;
  mapPin.style.left = (adverts[i].location.x - 25) + 'px';
  mapPin.style.top = (adverts[i].location.y - 70) + 'px';

  fragment.appendChild(mapPin);
}

//  вставляем фрагмент в блок
mapPinsBlock.appendChild(fragment);
