'use strict';

(function () {
  var paymentToggleTab = document.querySelector('.payment__method');
  var paymentByCardButton = document.querySelector('#payment__card');
  var paymentByCashButton = document.querySelector('#payment__cash');
  var paymentByCardBlock = document.querySelector('.payment__card-wrap');
  var paymentByCardBlockInputs = paymentByCardBlock.querySelectorAll('input');
  var paymentByCashBlock = document.querySelector('.payment__cash-wrap');
  var deliveryToggleTab = document.querySelector('.deliver__toggle');
  var deliveryInStoreButton = document.querySelector('#deliver__store');
  var deliveryByCourierButton = document.querySelector('#deliver__courier');
  var deliveryInStoreBlock = document.querySelector('.deliver__store');
  var deliveryByCourierBlock = document.querySelector('.deliver__courier');
  var deliveryByCourierInputs = deliveryByCourierBlock.querySelectorAll('input');
  var paymentClickTargetId = 'payment__card';
  var deliveryClickTargetId = 'deliver__store';

  var setInputsAbility = function (inputs, abilityStatus) {
    inputs.forEach(function (item) {
      item.disabled = abilityStatus;
    });
  };

  var setPaymentInputsAbility = function () {
    if (paymentByCardBlock.classList.contains('visually-hidden')) {
      paymentByCashButton.checked = true;
      setInputsAbility(paymentByCardBlockInputs, true);
    } else {
      paymentByCardButton.checked = true;
      setInputsAbility(paymentByCardBlockInputs, false);
    }
  };

  var setDeliveryInputsAbility = function () {
    if (deliveryClickTargetId === 'deliver__courier') {
      deliveryByCourierButton.checked = true;
      setInputsAbility(deliveryByCourierInputs, false);
      window.order.setTextAreaAbility(false);
    } else {
      deliveryInStoreButton.checked = true;
      setInputsAbility(deliveryByCourierInputs, true);
      window.order.setTextAreaAbility(true);
    }
  };

  var onPaymentTabChange = function (evt) {
    if ((evt.target === paymentByCardButton || evt.target === paymentByCashButton)
    && paymentClickTargetId !== evt.target.id) {
      paymentByCardBlock.classList.toggle('visually-hidden');
      paymentByCashBlock.classList.toggle('visually-hidden');
      paymentClickTargetId = evt.target.id;
    }
    setPaymentInputsAbility();
  };

  var onDeliveryTabChange = function (evt) {
    if ((evt.target === deliveryInStoreButton || evt.target === deliveryByCourierButton)
    && deliveryClickTargetId !== evt.target.id) {
      deliveryInStoreBlock.classList.toggle('visually-hidden');
      deliveryByCourierBlock.classList.toggle('visually-hidden');
      deliveryClickTargetId = evt.target.id;
    }
    setDeliveryInputsAbility();
  };

  paymentToggleTab.addEventListener('change', onPaymentTabChange);
  deliveryToggleTab.addEventListener('change', onDeliveryTabChange);

  window.tabs = {
    setInputsAbility: setInputsAbility,
    deliveryByCourierInputs: deliveryByCourierInputs,
    setDeliveryInputsAbility: setDeliveryInputsAbility,
    setPaymentInputsAbility: setPaymentInputsAbility
  };
})();
