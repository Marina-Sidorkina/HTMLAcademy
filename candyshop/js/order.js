'use strict';

(function () {
  var order = [];
  var orderTemplate = document.querySelector('#card-order').content.querySelector('article');
  var cartBlock = document.querySelector('.goods__cards');
  var emptyBlock = document.querySelector('.goods__card-empty');
  var headerBasket = document.querySelector('.main-header__basket');
  var emptyBlockTemplate = emptyBlock.cloneNode(true);
  var orderForm = document.querySelector('.buy');
  var orderFormInputs = orderForm.querySelectorAll('input');
  var deliveryTextArea = orderForm.querySelector('.deliver__textarea');
  var submitButton = document.querySelector('.buy__submit-btn');

  var editValues = function (object, element) {
    element.querySelector('.card-order__count').value = object.orderAmount;
    element.querySelector('.card-order__price').textContent = object.orderAmount * object.price;
  };

  var onDecreaseButtonClick = function (object, element) {
    if (object.orderAmount === 1) {
      onOrderCardCloseClick(object);
      headerBasket.textContent = 'В корзине: ' + order.length + ' ' + window.utils.getDeclension(order.length, ['товар', 'товара', 'товаров']);
      if (!order.length) {
        disableOrderFormInputs();
      }
    } else {
      object.orderAmount--;
      editValues(object, element);
      window.catalog.checkGoodsLeft(object);
    }
  };

  var onIncreaseButtonClick = function (object, element) {
    if (object.amount > object.orderAmount) {
      object.orderAmount++;
      editValues(object, element);
    }
  };

  var renderOrderDomElements = function (object) {
    var orderElement = orderTemplate.cloneNode(true);
    var orderCardClose = orderElement.querySelector('.card-order__close');
    var decreaseBtn = orderElement.querySelector('.card-order__btn--decrease');
    var increaseBtn = orderElement.querySelector('.card-order__btn--increase');
    orderCardClose.addEventListener('click', function (evt) {
      evt.preventDefault();
      onOrderCardCloseClick(object);
    });
    decreaseBtn.addEventListener('click', function () {
      onDecreaseButtonClick(object, orderElement);
    });
    increaseBtn.addEventListener('click', function () {
      onIncreaseButtonClick(object, orderElement);
      window.catalog.checkGoodsLeft(object);
    });
    orderElement.querySelector('.card-order__title').textContent = object.name;
    orderElement.querySelector('.card-order__img').src = 'img/cards/' + object.picture;
    orderElement.querySelector('.card-order__img').alt = object.name;
    orderElement.querySelector('.card-order__count').value = object.orderAmount;
    var amount = orderElement.querySelector('.card-order__count').value;
    orderElement.querySelector('.card-order__price').textContent = amount * object.price;
    return orderElement;
  };

  var createOrderElements = function (array) {
    var orderFragment = document.createDocumentFragment();
    array.forEach(function (item) {
      var element = renderOrderDomElements(item);
      orderFragment.appendChild(element);
    });
    return orderFragment;
  };

  var addGoodToCart = function (object) {
    var index = checkGoodsInOrder(order, object.name);
    if (index === -1 && object.amount) {
      if (!order.length) {
        cartBlock.innerHTML = '';
      }
      var orderObject = Object.assign({}, object);
      var orderGoodsArray = [];
      orderObject.orderAmount = 1;
      orderGoodsArray[orderGoodsArray.length] = orderObject;
      cartBlock.appendChild(createOrderElements(orderGoodsArray));
      order[order.length] = orderGoodsArray[0];
      headerBasket.textContent = 'В корзине: ' + order.length + ' ' + window.utils.getDeclension(order.length, ['товар', 'товара', 'товаров']);
    } else if (object.amount > order[index].orderAmount) {
      var currentAmount = order[index].orderAmount;
      order[index].orderAmount = currentAmount + 1;
      cartBlock.innerHTML = '';
      cartBlock.appendChild(createOrderElements(order));
    }
  };

  var checkGoodsInOrder = function (array, objectName) {
    var indexInArray = -1;
    array.forEach(function (item, index) {
      if (item.name === objectName) {
        indexInArray = index;
      }
    });
    return indexInArray;
  };

  var checkCatalogGoodAmount = function (object) {
    var index = checkGoodsInOrder(order, object.name);
    var amount;
    if (index === -1) {
      amount = object.amount;
    } else {
      amount = object.amount - order[index].orderAmount;
    }
    return amount;
  };

  var onOrderCardCloseClick = function (object) {
    var index = checkGoodsInOrder(order, object.name);
    order.splice(index, 1);
    cartBlock.innerHTML = '';
    if (order.length) {
      cartBlock.appendChild(createOrderElements(order));
    } else {
      cartBlock.appendChild(emptyBlockTemplate);
      disableOrderFormInputs();
    }
    window.catalog.returnInitialAmount(object);
    headerBasket.textContent = 'В корзине: ' + order.length + ' ' + window.utils.getDeclension(order.length, ['товар', 'товара', 'товаров']);
  };

  var disableOrderFormInputs = function () {
    orderFormInputs.forEach(function (item) {
      item.disabled = true;
      submitButton.disabled = true;
    });
    deliveryTextArea.disabled = true;
  };

  var enableOrderFormInputs = function () {
    orderFormInputs.forEach(function (item) {
      item.disabled = false;
      submitButton.disabled = false;
    });
    deliveryTextArea.disabled = false;
    window.tabs.setInputsAbility(window.tabs.deliveryByCourierInputs, false);
  };

  var setTextAreaAbility = function (abilityStatus) {
    deliveryTextArea.disabled = abilityStatus;
  };

  var returnInitialValues = function () {
    cartBlock.innerHTML = '';
    cartBlock.appendChild(createOrderElements(order));
  };

  var checkGoodInOrderAmount = function (object) {
    var check = order.some(function (item) {
      return (item.name === object.name && item.amount === object.amount);
    });
    return check;
  };

  disableOrderFormInputs();

  window.order = {
    addGoodToCart: addGoodToCart,
    enableFormInputs: enableOrderFormInputs,
    checkGoods: checkGoodsInOrder,
    checkGoodAmount: checkGoodInOrderAmount,
    checkCatalogGoodAmount: checkCatalogGoodAmount,
    setTextAreaAbility: setTextAreaAbility,
    returnInitialValues: returnInitialValues
  };
})();
