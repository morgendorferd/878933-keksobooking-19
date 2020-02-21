'use strict';

(function () {

  var StatusCode = {
    OK: 200
  };
  var URL = 'https://js.dump.academy/keksobooking';
  var TIMEOUT_IN_MS = 10000;
  var createRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT_IN_MS;

    return xhr;
  };

  var loadData = function (onSuccess, onError) {
    var xhr = createRequest(onSuccess, onError);
    xhr.open('GET', URL + '/data');
    xhr.send();
  };

  var saveData = function (data, onSuccess, onError) {
    var xhr = createRequest(onSuccess, onError);
    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    load: loadData,
    save: saveData
  };
})();
