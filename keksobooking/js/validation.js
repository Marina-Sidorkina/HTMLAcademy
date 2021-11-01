'use strict';

(function () {
  var MinPriceVariant = {
    PALACE: 10000,
    FLAT: 1000,
    HOUSE: 5000,
    BUNGALO: 0
  };
  var CapacityVariant = {
    1: ['2', '3', '0'],
    2: ['3', '0'],
    3: ['0'],
    100: ['1', '2', '3']
  };
  var newAdForm = document.querySelector('.ad-form');
  var newAdRoomsField = document.querySelector('#room_number');
  var newAdCapacityField = document.querySelector('#capacity');
  var newAdTimeInField = document.querySelector('#timein');
  var newAdTimeOutField = document.querySelector('#timeout');
  var newAdPriceField = document.querySelector('#price');
  var newAdTypeField = document.querySelector('#type');
  var newAdFieldsets = newAdForm.querySelectorAll('fieldset');
  var newAdSubmitButton = newAdForm.querySelector('.ad-form__submit');
  var newAdResetButton = newAdForm.querySelector('.ad-form__reset');
  var successNotificationTemplate = document.querySelector('#success')
    .content.querySelector('.success');
  var successNotification = successNotificationTemplate.cloneNode(true);

  var setNewAdFormAbility = function (disabilityValue) {
    window.utils.setItemsAbility(newAdFieldsets, disabilityValue);
    newAdSubmitButton.disabled = disabilityValue;
    newAdResetButton.disabled = disabilityValue;
  };

  var disableNewAdForm = function () {
    newAdForm.classList.add('ad-form--disabled');
    newAdForm.reset();
    setNewAdFormAbility(true);
  };

  var enableNewAdForm = function () {
    newAdForm.classList.remove('ad-form--disabled');
    setNewAdFormAbility(false);
  };

  var onTypeChange = function () {
    var min = MinPriceVariant[newAdTypeField.value.toUpperCase()];
    newAdPriceField.min = min;
    newAdPriceField.placeholder = min;
  };

  var onTimeInChange = function () {
    newAdTimeOutField.value = newAdTimeInField.value;
  };

  var onTimeOutChange = function () {
    newAdTimeInField.value = newAdTimeOutField.value;
  };

  var onCapacityInvalid = function () {
    var check = false;
    check = CapacityVariant[newAdRoomsField.value].some(function (item) {
      return item === newAdCapacityField.value;
    });
    if (check) {
      newAdCapacityField.setCustomValidity('Данная опция недоступна для указанного количества комнат');
    } else {
      newAdCapacityField.setCustomValidity('');
    }
  };

  var closeSuccessNotification = function () {
    window.utils.deleteChild(successNotification);
    window.removeEventListener('keydown', onNotificationEscape);
    window.removeEventListener('click', onNotificationClick);
  };

  var onNotificationEscape = function (evt) {
    if (window.utils.onEscapeKeydown(evt.keyCode)) {
      closeSuccessNotification();
    }
  };

  var onNotificationClick = function () {
    closeSuccessNotification();
  };

  var onFormSubmit = function () {
    if (newAdForm.checkValidity()) {
      window.utils.addChild(successNotification);
      window.map.onFormSubmitAndReset();
      window.addEventListener('keydown', onNotificationEscape);
      window.addEventListener('click', onNotificationClick);
    }
  };

  onCapacityInvalid();
  setNewAdFormAbility(true);
  newAdCapacityField.addEventListener('change', onCapacityInvalid);
  newAdRoomsField.addEventListener('change', onCapacityInvalid);
  newAdTimeInField.addEventListener('change', onTimeInChange);
  newAdTimeOutField.addEventListener('change', onTimeOutChange);
  newAdTypeField.addEventListener('change', onTypeChange);
  newAdResetButton.addEventListener('click', window.map.onFormSubmitAndReset);
  newAdForm.addEventListener('submit', function (evt) {
    window.backend.send(new FormData(newAdForm), onFormSubmit, window.backend.onLoadAndSendDataError);
    evt.preventDefault();
  });

  window.validation = {
    disableNewAdForm: disableNewAdForm,
    enableNewAdForm: enableNewAdForm
  };
})();
