'use strict';

(function () {
  var LITTLE_AMOUNT = 5;
  var ratingVariants = {
    1: '--one',
    2: '--two',
    3: '--three',
    4: '--four',
    5: '--five'
  };
  var catalogLoad = document.querySelector('.catalog__load');
  var cardTemplate = document.querySelector('#card').content.querySelector('article');
  var showAllButton = document.querySelector('.catalog__submit');
  var favoriteFilter = document.querySelector('#filter-favorite');
  var inStockFilter = document.querySelector('#filter-availability');
  var sortingForm = document.querySelector('.sorting-form');
  var favoriteGoods = [];
  var listFromServerItems = [];
  var catalog = listFromServerItems.slice();

  var getAmountStatus = function (amount) {
    if (!amount) {
      return 'card--soon';
    } else {
      return amount > LITTLE_AMOUNT ? 'card--in-stock' : 'card--little';
    }
  };

  var getAvailability = function (object) {
    var amount = window.order.checkCatalogGoodAmount(object);
    return getAmountStatus(amount);
  };

  var getRatingStars = function (object) {
    return 'stars__rating' + ratingVariants[object.rating.value];
  };

  var onCatalogElementButtonClick = function (evt, object) {
    evt.preventDefault();
    window.order.addGoodToCart(object);
    window.order.enableFormInputs();
    window.tabs.setPaymentInputsAbility();
    window.tabs.setDeliveryInputsAbility();
  };

  var handleAmountStatus = function (object, element) {
    element.classList.remove('card--in-stock', 'card--little', 'card--soon');
    element.classList.add(getAvailability(object));
  };

  var renderCatalogDomElements = function (object) {
    var catalogElement = cardTemplate.cloneNode(true);
    var goodRating = catalogElement.querySelector('.stars__rating');
    var button = catalogElement.querySelector('.card__btn');
    var favoriteButton = catalogElement.querySelector('.card__btn-favorite');
    handleAmountStatus(object, catalogElement);
    button.addEventListener('click', function (evt) {
      onCatalogElementButtonClick(evt, object);
      handleAmountStatus(object, catalogElement);
    });
    catalogElement.id = object.name;
    catalogElement.querySelector('.card__title').textContent = object.name;
    catalogElement.querySelector('.card__img').src = 'img/cards/' + object.picture;
    catalogElement.querySelector('.card__img').alt = object.name;
    catalogElement.querySelector('.card__price').textContent = object.price + ' ';
    catalogElement.querySelector('.card__price').appendChild(window.utils.createTagElement('span', 'card__currency', '₽'));
    catalogElement.querySelector('.card__price').appendChild(window.utils.createTagElement('span', 'card__weight', '/ ' + object.weight + ' Г'));
    goodRating.classList.remove('stars__rating--five');
    goodRating.classList.add(getRatingStars(object));
    catalogElement.querySelector('.star__count').textContent = object.rating.number;
    catalogElement.querySelector('.card__characteristic').textContent = (object.nutritionFacts.sugar ?
      'Содержит сахар, ' : 'Без сахара, ') + object.nutritionFacts.energy + ' ккал';
    catalogElement.querySelector('.card__composition-list').textContent = object.nutritionFacts.contents;
    handleFavoriteStatus(object, favoriteButton);
    favoriteButton.addEventListener('click', function (evt) {
      onFavoriteButtonClick(evt, object);
    });
    return catalogElement;
  };

  var onFavoriteButtonClick = function (evt, object) {
    evt.preventDefault();
    evt.target.classList.toggle('card__btn-favorite--selected');
    if (evt.target.classList.contains('card__btn-favorite--selected') && !object.favorite) {
      object.favorite = true;
      favoriteGoods[favoriteGoods.length] = object;
    } else {
      object.favorite = false;
      favoriteGoods.forEach(function (item, index) {
        if (item.name === object.name) {
          favoriteGoods.splice(index, 1);
        }
      });
    }
  };

  var setAttributeValue = function (object, amount) {
    var card = document.getElementById(object.name);
    var name = getAmountStatus(amount);
    if (card) {
      card.classList.remove('card--in-stock', 'card--little', 'card--soon');
      card.classList.add(name);
    }
  };

  var checkGoodsLeft = function (object) {
    var index = window.order.checkGoods(catalog, object.name);
    if (index) {
      var amount = catalog[index].amount - object.orderAmount;
      setAttributeValue(object, amount);
    }
  };

  var returnInitialAmount = function (object) {
    var index = window.order.checkGoods(catalog, object.name);
    var amount = getAmountStatus(catalog[index].amount);
    setAttributeValue(object, amount);
  };

  var checkSpecialFilters = function () {
    return (favoriteFilter.checked || inStockFilter.checked);
  };

  var checkInStock = function () {
    var array = listFromServerItems.filter(function (item) {
      return (!window.order.checkGoodAmount(item) && item.amount > 0);
    });
    return array;
  };

  var onPriceChangeFilterGoods = function () {
    checkListFromServerPrice();
    window.sorting.onFiltersChange(catalog, listFromServerItems);
  };

  var getInitialCardsList = function () {
    window.sorting.onFiltersChange(catalog, listFromServerItems);
    window.sorting.replaceCardsInCatalog(catalog);
  };

  var checkListFromServerPrice = function () {
    catalog = listFromServerItems.filter(window.filter.checkPriceRange).slice();
  };

  var handleFavoriteStatus = function (object, element) {
    element.classList.toggle('card__btn-favorite--selected', !!object.favorite);
  };

  var onLoad = function (array) {
    listFromServerItems = array.slice();
    catalog = listFromServerItems.filter(function (item) {
      return (window.filter.checkPriceRange(item));
    });
    window.sorting.onFiltersChange(catalog, listFromServerItems);
    window.sorting.getGoodsAmount(listFromServerItems, favoriteGoods);
    window.sorting.replaceCardsInCatalog(catalog);
    window.sorting.onCatalogCardsLoading();
    catalogLoad.classList.add('visually-hidden');
  };

  window.backend.load(onLoad, window.backend.onLoadAndSendDataError);
  sortingForm.addEventListener('change', window.debounce(function (evt) {
    if (evt.target === favoriteFilter) {
      window.sorting.onSpecialFiltersChange(favoriteFilter, inStockFilter, favoriteGoods);
    } else if (evt.target === inStockFilter) {
      window.sorting.onSpecialFiltersChange(inStockFilter, favoriteFilter, checkInStock());
    } else {
      window.sorting.onFiltersChange(catalog, listFromServerItems);
    }
  }));
  showAllButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.sorting.onShowAllClick(catalog);
  });

  window.catalog = {
    checkListFromServerPrice: checkListFromServerPrice,
    renderDomElements: renderCatalogDomElements,
    onPriceChangeFilterGoods: onPriceChangeFilterGoods,
    getInitialCardsList: getInitialCardsList,
    checkSpecialFilters: checkSpecialFilters,
    checkGoodsLeft: checkGoodsLeft,
    returnInitialAmount: returnInitialAmount
  };
})();
