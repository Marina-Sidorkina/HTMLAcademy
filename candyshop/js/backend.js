'use strict';

(function () {
  var LOAD_STATUS_OK = 200;
  var TIMEOUT = 1000;
  var urls = {
    SEND_ADDRESS: 'https://js.dump.academy/candyshop',
    LOAD_ADDRESS: 'https://js.dump.academy/candyshop/data'
  };
  var loadingErrors = {
    400: 'Неверный запрос',
    401: 'Пользователь не авторизован',
    404: 'Ничего не найдено',
    DEFAULT: 'Произошла ошибка соединения'
  };
  var modalError = document.querySelector('.modal--error');
  var modalErrorClose = modalError.querySelector('.modal__close');
  var modalErrorMessage = modalError.querySelector('.modal__message');

  var onModalErrorClose = function () {
    modalError.classList.add('modal--hidden');
  };

  var onWindowEscKeydown = function (evt) {
    if (window.utils.onEscapeKeydown(evt.keyCode)) {
      onModalErrorClose();
    }
  };

  var onLoadAndSendError = function (error) {
    error = (loadingErrors[error] || loadingErrors.DEFAULT);
    if (error) {
      modalError.classList.remove('modal--hidden');
      modalErrorClose.addEventListener('click', onModalErrorClose);
      window.addEventListener('keydown', function (evt) {
        window.utils.onEscapeKeydown(evt, modalError);
      });
      modalErrorMessage.textContent = error;
      window.addEventListener('keydown', onWindowEscKeydown);
    }
  };

  var onLoadAndSendTimeout = function (timeout) {
    modalError.classList.remove('modal--hidden');
    modalErrorClose.addEventListener('click', onModalErrorClose);
    modalErrorMessage.textContent = 'Запрос не успел выполниться за ' + timeout + 'мс';
    window.addEventListener('keydown', onWindowEscKeydown);
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
    xhr.open('POST', urls.SEND_ADDRESS);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    var xhr = createXhr(onLoad, onError);
    xhr.open('GET', urls.LOAD_ADDRESS);
    xhr.send();
  };

  window.backend = {
    send: send,
    load: load,
    onError: onLoadAndSendError
  };
})();
