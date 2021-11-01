'use strict';

(function () {
  var LOAD_STATUS_OK = 200;
  var TIMEOUT = 1000;
  var Url = {
    SEND_ADDRESS: 'https://js.dump.academy/keksobooking',
    LOAD_ADDRESS: 'https://js.dump.academy/keksobooking/data'
  };
  var LoadingError = {
    400: 'Неверный запрос',
    401: 'Пользователь не авторизован',
    404: 'Ничего не найдено',
    DEFAULT: 'Произошла ошибка соединения'
  };
  var errorNotificationTemplate = document.querySelector('#error')
    .content.querySelector('.error');
  var errorNotification = errorNotificationTemplate.cloneNode(true);
  var errorNotificationMessage = errorNotification.querySelector('.error__message');
  var errorNotificationButton = errorNotification.querySelector('.error__button');

  var closeErrorNotification = function () {
    window.utils.deleteChild(errorNotification);
    window.removeEventListener('keydown', onErrorNotificationEscape);
    window.removeEventListener('click', onErrorNotificationClick);
    errorNotificationButton.removeEventListener('click', onErrorNotificationClick);
  };

  var onErrorNotificationEscape = function (evt) {
    if (window.utils.onEscapeKeydown(evt.keyCode)) {
      closeErrorNotification();
    }
  };

  var onErrorNotificationClick = function () {
    closeErrorNotification();
  };

  var onLoadAndSendError = function (error) {
    var message = (LoadingError[error] || LoadingError.DEFAULT);
    errorNotificationMessage.textContent = message;
    window.utils.addChild(errorNotification);
    window.addEventListener('keydown', onErrorNotificationEscape);
    window.addEventListener('click', onErrorNotificationClick);
    errorNotificationButton.addEventListener('click', onErrorNotificationClick);
  };

  var onLoadAndSendTimeout = function (timeout) {
    errorNotificationMessage.textContent = 'Запрос не успел выполниться за ' + timeout + 'мс';
    window.utils.addChild(errorNotification);
    window.addEventListener('keydown', onErrorNotificationEscape);
    window.addEventListener('click', onErrorNotificationClick);
  };

  var createXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === LOAD_STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError(xhr.status);
      }
    });
    xhr.timeout = TIMEOUT;
    xhr.addEventListener('timeout', function () {
      onLoadAndSendTimeout(xhr.timeout);
    });
    return xhr;
  };

  var send = function (data, onLoad, onError) {
    var xhr = createXhr(onLoad, onError);
    xhr.open('POST', Url.SEND_ADDRESS);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    var xhr = createXhr(onLoad, onError);
    xhr.open('GET', Url.LOAD_ADDRESS);
    xhr.send();
  };

  window.backend = {
    send: send,
    load: load,
    onError: onLoadAndSendError
  };
})();
