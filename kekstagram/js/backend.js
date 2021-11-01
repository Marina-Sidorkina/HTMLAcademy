'use strict';

(function () {
  var REQUEST_STATUS_OK = 200;
  var REQUEST_TIMEOUT = 1000;
  var RequestUrl = {
    POST_ADDRESS: 'https://js.dump.academy/kekstagram',
    GET_ADDRESS: 'https://js.dump.academy/kekstagram/data'
  };
  var RequestError = {
    400: 'Неверный запрос',
    401: 'Пользователь не авторизован',
    404: 'Ничего не найдено',
    TIMEOUT: 'Запрос на сервер не успел выполниться за ' + REQUEST_TIMEOUT + ' мс',
    DEFAULT: 'Произошла ошибка соединения'
  };
  var errorBlockTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorBlock = errorBlockTemplate.cloneNode(true);
  var errorBlockText = errorBlock.querySelector('.error__title');
  var errorBlockFirstButton = errorBlock.querySelector('.error__button:first-child');
  var errorBlockSecondButton = errorBlock.querySelector('.error__button:nth-child(2)');

  var addErrorBlock = function () {
    window.utils.addBlock(errorBlock, onErrorBlockEsc, removeErrorBlock);
    errorBlockFirstButton.addEventListener('click', removeErrorBlock);
    errorBlockSecondButton.addEventListener('click', removeErrorBlock);
  };

  var removeErrorBlock = function () {
    window.utils.removeBlock(errorBlock, onErrorBlockEsc, removeErrorBlock);
    errorBlockFirstButton.removeEventListener('click', removeErrorBlock);
    errorBlockSecondButton.removeEventListener('click', removeErrorBlock);
  };

  var onErrorBlockEsc = function (evt) {
    if (window.utils.onEscapeKeydown(evt.keyCode)) {
      removeErrorBlock();
    }
  };

  var onGetError = function (error) {
    errorBlockText.textContent = RequestError[error] || RequestError.DEFAULT;
    errorBlockSecondButton.classList.add('hidden');
    addErrorBlock();
  };

  var onPostError = function (error) {
    errorBlockText.textContent = RequestError[error] || RequestError.DEFAULT;
    errorBlockSecondButton.classList.remove('hidden');
    window.onPhotoEditorClose();
    addErrorBlock();
  };

  var createXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === REQUEST_STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError(xhr.status);
      }
    });
    xhr.timeout = REQUEST_TIMEOUT;
    xhr.addEventListener('timeout', function () {
      var error = 'TIMEOUT';
      onError(error);
    });
    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = createXhr(onLoad, onError);
    xhr.open('GET', RequestUrl.GET_ADDRESS);
    xhr.send();
  };

  var send = function (data, onLoad, onError) {
    var xhr = createXhr(onLoad, onError);
    xhr.open('POST', RequestUrl.POST_ADDRESS);
    xhr.send(data);
  };

  window.backend = {
    send: send,
    load: load,
    onGetError: onGetError,
    onPostError: onPostError
  };
})();
