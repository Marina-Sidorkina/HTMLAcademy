'use strict';
(function () {
  var GOODS_TYPES = [
    'Мороженое',
    'Газировка',
    'Жевательная резинка',
    'Мармелад',
    'Зефир'
  ];
  var catalogCardsBlock = document.querySelector('.catalog__cards');
  var typeFilters = document.querySelectorAll('.input-btn__input--type');
  var sortingFilters = document.querySelectorAll('.input-btn__input--sorting');
  var strongFilters = document.querySelectorAll('.input-btn__input--strong');
  var filtersBlock = document.querySelector('.catalog__sidebar');
  var allFilters = filtersBlock.querySelectorAll('.input-btn__input');
  var priceRangeCount = document.querySelector('.range__count');
  var goodsFavoriteCount = document.querySelector('.input-btn__item-count--favorite');
  var goodsInStockCount = document.querySelector('.input-btn__item-count--instock');
  var goodsByTypeCounts = document.querySelectorAll('.input-btn__item-count--type');
  var goodsByContentCounts = document.querySelectorAll('.input-btn__item-count--content');
  var noResultBlock = document.querySelector('#empty-filters').content.querySelector('div');
  var sortingVariants = {
    0: function (a, b) {
      return b.rating.number - a.rating.number;
    },
    1: function (a, b) {
      return b.price - a.price;
    },
    2: function (a, b) {
      return a.price - b.price;
    },
    3: function (a, b) {
      return b.rating.value - a.rating.value;
    }
  };
  var filterByContentVariants = {
    sugar: function (item) {
      return (!item.nutritionFacts.sugar);
    },
    vegetarian: function (item) {
      return (item.nutritionFacts.vegetarian);
    },
    gluten: function (item) {
      return (!item.nutritionFacts.gluten);
    }
  };

  var createCatalogElements = function (array) {
    var catalogFragment = document.createDocumentFragment();
    array.forEach(function (item) {
      var element = window.catalog.renderDomElements(item);
      catalogFragment.appendChild(element);
    });
    return catalogFragment;
  };

  var onCatalogCardsLoading = function () {
    catalogCardsBlock.classList.remove('catalog__cards--load');
  };

  var replaceCardsInCatalog = function (array) {
    catalogCardsBlock.innerHTML = '';
    catalogCardsBlock.appendChild(createCatalogElements(array));
  };

  var showNoResultBlock = function () {
    catalogCardsBlock.innerHTML = '';
    catalogCardsBlock.appendChild(noResultBlock);
  };

  var checkContent = function (item) {
    var check = true;
    var contentFiltersChecked = document.querySelectorAll('.input-btn__input--content:checked');
    if (contentFiltersChecked.length) {
      var array = Array.from(contentFiltersChecked);
      check = array.every(function (input) {
        return filterByContentVariants[input.value](item);
      });
    }
    return check;
  };

  var checkType = function (item) {
    var condition = [];
    var check = true;
    typeFilters.forEach(function (filter, index) {
      if (filter.checked) {
        condition[condition.length] = GOODS_TYPES[index];
      }
    });
    if (condition.length) {
      check = condition.some(function (kind) {
        return kind === item.kind;
      });
    }
    return check;
  };

  var sortGoods = function (catalog) {
    sortingFilters.forEach(function (item, index) {
      if (item.checked) {
        catalog.sort(function (a, b) {
          return sortingVariants[index](a, b);
        });
      }
    });
    return catalog;
  };

  var onSpecialFiltersCancel = window.debounce(function () {
    strongFilters.forEach(function (item) {
      item.disabled = false;
    });
    window.catalog.checkListFromServerPrice();
    window.catalog.getInitialCardsList();
  });

  var onSpecialFiltersChange = window.debounce(function (filterChanged, filterToBlock, array) {
    if (filterChanged.checked) {
      window.filter.resetPriceButtonsValues();
      strongFilters.forEach(function (item) {
        item.checked = false;
        item.disabled = true;
      });
      filterToBlock.checked = false;
      return (!array.length) ? showNoResultBlock() : replaceCardsInCatalog(array);
    } else {
      return onSpecialFiltersCancel();
    }
  });

  var onFiltersChange = window.debounce(function (catalog, listFromServer) {
    var array;
    window.catalog.checkListFromServerPrice();
    sortGoods(catalog, listFromServer);
    array = catalog.filter(function (item) {
      return (checkContent(item) && checkType(item));
    });
    return (!array.length) ? showNoResultBlock() : replaceCardsInCatalog(array);
  });

  var onShowAllClick = window.debounce(function () {
    allFilters.forEach(function (item) {
      item.checked = false;
    });
    strongFilters.forEach(function (item) {
      item.disabled = false;
    });
    window.filter.resetPriceButtonsValues();
    window.catalog.checkListFromServerPrice();
    window.catalog.getInitialCardsList();
  });

  var getAmountByType = function (index, kind, listFromServer) {
    var amount = listFromServer.filter(function (item) {
      return item.kind === kind;
    });
    goodsByTypeCounts[index].textContent = '(' + amount.length + ')';
  };

  var getAmountByContent = function (listFromServer) {
    goodsByContentCounts.forEach(function (span, index) {
      var amount = listFromServer.filter(function (item) {
        return filterByContentVariants[span.id](item);
      });
      goodsByContentCounts[index].textContent = '(' + amount.length + ')';
    });
  };

  var getInStockAmount = function (listFromServer) {
    var amount = listFromServer.filter(function (item) {
      return (item.amount > 0);
    });
    goodsInStockCount.textContent = '(' + amount.length + ')';
  };

  var getAmountByPrice = function (listFromServer) {
    var amount = listFromServer.filter(window.filter.checkPriceRange);
    priceRangeCount.textContent = '(' + amount.length + ')';
  };

  var getGoodsAmount = function (listFromServer, favoriteGoodsList) {
    GOODS_TYPES.forEach(function (type, index) {
      getAmountByType(index, type, listFromServer);
    });
    getAmountByContent(listFromServer);
    goodsFavoriteCount.textContent = '(' + favoriteGoodsList.length + ')';
    getInStockAmount(listFromServer);
    getAmountByPrice(listFromServer);
  };

  window.sorting = {
    replaceCardsInCatalog: replaceCardsInCatalog,
    showNoResultBlock: showNoResultBlock,
    onFiltersChange: onFiltersChange,
    onShowAllClick: onShowAllClick,
    getGoodsAmount: getGoodsAmount,
    onCatalogCardsLoading: onCatalogCardsLoading,
    onSpecialFiltersChange: onSpecialFiltersChange
  };
})();
