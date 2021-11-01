'use strict';

(function () {
  var buyingForm = document.querySelector('.buy__form');
  var paymentInputsBlock = document.querySelector('.payment__inputs');
  var cardNumberInput = paymentInputsBlock.querySelector('input[name = "card-number"]');
  var dateInput = paymentInputsBlock.querySelector('input[name = "card-date"]');
  var cvcInput = paymentInputsBlock.querySelector('input[name = "card-cvc"]');
  var nameInput = paymentInputsBlock.querySelector('input[name = "cardholder"]');
  var paymentInputs = paymentInputsBlock.querySelectorAll('input');
  var cardStatus = document.querySelector('.payment__card-status');
  var storeImage = document.querySelector('.deliver__store-map-img');
  var stations = buyingForm.elements['store'];
  var successNotification = document.querySelector('.modal--approved');
  var closingButton = successNotification.querySelector('.modal__close');

  var onBuyingFormChange = function (evt) {
    if (evt.target.name === 'store') {
      var label = buyingForm.querySelector('label[for="' + evt.target.id + '"]');
      storeImage.src = 'img/map/' + stations.value + '.jpg';
      storeImage.alt = label.textContent;
    }
  };

  var checkLuhnAlgorithm = function (string) {
    string = string.replace(/\s/g, '');
    var cardNumber = string.split('').map(Number);
    var sum = 0;
    cardNumber.forEach(function (item, index) {
      if ((cardNumber.length - index) % 2 !== 0) {
        sum += item;
      } else {
        if (item * 2 > 9) {
          var multiplication = String(item * 2).split('').map(Number);
          sum += multiplication[0] + multiplication[1];
        } else {
          sum += (item * 2);
        }
      }
    });
    return (sum % 10 === 0);
  };

  var onCardNumberInputInvalid = function (evt) {
    if (evt.target.validity.patternMismatch || evt.target.validity.tooShort) {
      evt.target.setCustomValidity('Введите 16 цифр номера банковской карты в формате ХХХХ ХХХХ ХХХХ ХХХХ');
    } else if (checkLuhnAlgorithm(evt.target.value) === false) {
      evt.target.setCustomValidity('Неправильный номер банковской карты');
    } else {
      evt.target.setCustomValidity('');
    }
    if (!cardNumberInput.checkValidity()) {
      cardStatus.textContent = 'Не определён';
    } else {
      checkValidity();
    }
  };

  var onDateInputInvalid = function (evt) {
    if (evt.target.validity.patternMismatch || evt.target.validity.tooShort) {
      evt.target.setCustomValidity('Введите срок действия карты в формате мм/гг');
    } else {
      evt.target.setCustomValidity('');
    }
    if (!dateInput.checkValidity()) {
      cardStatus.textContent = 'Не определён';
    } else {
      checkValidity();
    }
  };

  var onCvcInputInvalid = function (evt) {
    if (evt.target.validity.patternMismatch || evt.target.validity.tooShort) {
      evt.target.setCustomValidity('Введите CVC в указанном формате: трёхзначное число с диапазоном значений от 100 до 999');
    } else {
      evt.target.setCustomValidity('');
    }
    if (!cvcInput.checkValidity()) {
      cardStatus.textContent = 'Не определён';
    } else {
      checkValidity();
    }
  };

  var checkValidity = function () {
    paymentInputs.forEach(function (item) {
      if (item.checkValidity() && !item.disabled) {
        cardStatus.textContent = 'Одобрен';
      } else {
        cardStatus.textContent = 'Не определён';
      }
    });
  };

  var onFormSubmit = function () {
    if (buyingForm.checkValidity()) {
      successNotification.classList.remove('modal--hidden');
      window.addEventListener('keydown', function (evt) {
        if (window.utils.onEscapeKeydown(evt.keyCode)) {
          onClosingButtonClick();
        }
      });
    }
  };

  var onCardNumberInputKeypress = function () {
    if (cardNumberInput.value.length === 4 || cardNumberInput.value.length === 9 || cardNumberInput.value.length === 14) {
      cardNumberInput.value += ' ';
    }
  };

  var onDateInputKeypress = function () {
    if (dateInput.value.length === 2) {
      dateInput.value += '/';
    }
  };

  var checkStation = function () {
    stations.forEach(function (item) {
      if (item.checked) {
        var label = buyingForm.querySelector('label[for="' + item.id + '"]');
        storeImage.src = 'img/map/' + item.value + '.jpg';
        storeImage.alt = label.textContent;
      }
    });
  };

  var onClosingButtonClick = function () {
    successNotification.classList.add('modal--hidden');
    buyingForm.reset();
    window.tabs.setPaymentInputsAbility();
    window.tabs.setDeliveryInputsAbility();
    checkStation();
    window.order.returnInitialValues();
    setInitialCardStatus();
  };

  var onLoad = function () {
    successNotification.classList.remove('modal--hidden');
    closingButton.addEventListener('click', onClosingButtonClick);
  };

  var setInitialCardStatus = function () {
    cardStatus.textContent = 'Не определён';
  };

  setInitialCardStatus();
  buyingForm.addEventListener('submit', function (evt) {
    window.backend.send(new FormData(buyingForm), onLoad, window.backend.onLoadAndSendDataError);
    evt.preventDefault();
  });
  buyingForm.addEventListener('submit', onFormSubmit);
  buyingForm.addEventListener('change', onBuyingFormChange);
  cardNumberInput.addEventListener('input', onCardNumberInputInvalid);
  dateInput.addEventListener('input', onDateInputInvalid);
  cvcInput.addEventListener('input', onCvcInputInvalid);
  nameInput.addEventListener('input', checkValidity);
  cardNumberInput.addEventListener('keypress', onCardNumberInputKeypress);
  dateInput.addEventListener('keypress', onDateInputKeypress);
})();
