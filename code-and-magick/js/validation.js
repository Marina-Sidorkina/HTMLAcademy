'use strict';

(function () {
  var VALIDITY_ERRORS = ['tooShort', 'tooLong', 'valueMissing'];
  var form = document.querySelector('.setup-wizard-form');
  var userNameField = document.querySelector('.setup-user-name');
  var successNotification = document.createElement('dialog');

  var getCustomValidityMessage = function (property) {
    switch (property) {
      case 'tooShort':
        return 'Имя волшебника должно состоять минимум из 2-х символов';
      case 'tooLong':
        return 'Имя волшебника не может превышать 25-ти символов';
      case 'valueMissing':
        return 'Пожалуйста, придумайте имя для волшебника';
      default:
        return '';
    }
  };

  var onUserNameFieldInvalid = function () {
    for (var i = 0; i < VALIDITY_ERRORS.length; i++) {
      if (userNameField.validity[VALIDITY_ERRORS[i]]) {
        userNameField.setCustomValidity(getCustomValidityMessage(VALIDITY_ERRORS[i]));
      }
    }
  };

  var onUserNameFieldInput = function (evt) {
    if (evt.target.value.length >= 2) {
      userNameField.setCustomValidity('');
    }
  };

  var onEscapeKeyDown = function (evt) {
    if (evt.keyCode === window.keyCodes.ESCAPE && evt.target !== userNameField) {
      window.setup.hideBlock();
    }
  };

  var addUserNameFieldListeners = function () {
    userNameField.addEventListener('invalid', onUserNameFieldInvalid);
    userNameField.addEventListener('input', onUserNameFieldInput);
  };

  var removeUserNameFieldListeners = function () {
    userNameField.removeEventListener('invalid', onUserNameFieldInvalid);
    userNameField.removeEventListener('input', onUserNameFieldInput);
  };

  var onSuccessNotificationEscape = function (evt) {
    if (evt.keyCode === window.keyCodes.ESCAPE) {
      successNotification.close();
      document.removeEventListener('keydown', onSuccessNotificationEscape);
    }
  };

  var onFormSubmit = function () {
    if (form.checkValidity()) {
      window.setup.hideBlock();
      successNotification.show();
      document.addEventListener('keydown', onSuccessNotificationEscape);
    }
  };


  successNotification.textContent = 'Отлично! Данные успешно отправлены!';
  successNotification.style.top = '0';
  document.querySelector('header').append(successNotification);

  form.addEventListener('submit', function (evt) {
    window.backend.send(new FormData(form), onFormSubmit, window.setup.onLoadError);
    evt.preventDefault();
  });

  window.validation = {
    addUserNameFieldListeners: addUserNameFieldListeners,
    removeUserNameFieldListeners: removeUserNameFieldListeners,
    onEscapeKeyDown: onEscapeKeyDown
  };
})();
