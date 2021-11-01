'use strict';

(function () {
  var STATUS_OK = 200;
  var urls = {
    SEND_ADDRESS: 'https://js.dump.academy/code-and-magick',
    LOAD_ADDRESS: 'https://js.dump.academy/code-and-magick/data'
  };
  var script = document.createElement('script');
  var callbackName = 'cb_' + Math.round(100000 * Math.random());
  script.src = urls.LOAD_ADDRESS + '?callback=' + callbackName;

  var addScript = function () {
    document.body.appendChild(script);
    document.body.removeChild(script);
  };

  var load = function (onLoad, onError) {
    window[callbackName] = function (wizards) {
      if (wizards) {
        onLoad(wizards);
      }
    };
    script.addEventListener('error', function () {
      onError();
    });
    addScript(callbackName);
  };

  var createXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError();
      }
    });
    return xhr;
  };

  var send = function (data, onLoad, onError) {
    var xhr = createXhr(onLoad, onError);
    xhr.open('POST', urls.SEND_ADDRESS);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    send: send
  };
})();
