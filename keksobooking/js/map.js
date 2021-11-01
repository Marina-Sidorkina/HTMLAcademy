'use strict';

(function () {
  var PINS_AMOUNT = 5;
  var SimilarMapPinParameter = {
    WIDTH: 50,
    HEIGHT: 70
  };
  var mapBlock = document.querySelector('.map');
  var mapPinsBlock = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin')
    .content.querySelector('.map__pin');
  var mapFiltersForm = document.querySelector('.map__filters');
  var listFromServer = [];

  var resetMapBlock = function () {
    var element = mapBlock.querySelector('.map__card');
    if (element) {
      mapBlock.removeChild(element);
      getAndResetActivePin();
      resetMapBlock();
    }
  };

  var resetMapPinsBlock = function () {
    var element = mapPinsBlock.querySelector('.map__pin--similar');
    if (element) {
      mapPinsBlock.removeChild(element);
      resetMapPinsBlock();
    }
  };

  var renderMapPin = function (advertObject) {
    var pin = mapPinTemplate.cloneNode(true);
    var pinImage = pin.querySelector('img');
    pin.classList.add('map__pin--similar');
    pin.style.left = (advertObject.location.x - SimilarMapPinParameter.WIDTH / 2) + 'px';
    pin.style.top = (advertObject.location.y - SimilarMapPinParameter.HEIGHT) + 'px';
    pinImage.src = advertObject.author.avatar;
    pinImage.alt = advertObject.offer.title;
    pin.addEventListener('click', function () {
      resetMapBlock();
      mapBlock.insertBefore(window.renderMapCard(advertObject), mapBlock.children[1]);
      document.addEventListener('keydown', onCardEscape);
      pin.classList.add('map__pin--active');
    });
    return pin;
  };

  var renderMapPinsSet = function (array) {
    listFromServer = array.slice();
    var fragment = document.createDocumentFragment();
    var count = 0;
    var filteredArray = listFromServer.filter(function (item) {
      return window.filter.checkOffer(item);
    });
    for (var i = 0; count < PINS_AMOUNT && count < filteredArray.length; i++) {
      if (filteredArray[i].offer) {
        fragment.appendChild(renderMapPin(filteredArray[i]));
        count += 1;
      }
    }
    resetMapPinsBlock();
    resetMapBlock();
    mapPinsBlock.appendChild(fragment);
  };

  var enablePage = function () {
    mapBlock.classList.remove('map--faded');
    window.backend.load(renderMapPinsSet, window.backend.onLoadAndSendDataError);
  };

  var getAndResetActivePin = function () {
    var element = document.querySelector('.map__pin--active');
    if (element) {
      element.classList.remove('map__pin--active');
    }
  };

  var onCardEscape = function (evt) {
    if (window.utils.onEscapeKeydown(evt.keyCode)) {
      resetMapBlock();
      document.removeEventListener('keydown', onCardEscape);
    }
  };

  var onFormSubmitAndReset = function () {
    mapBlock.classList.add('map--faded');
    document.querySelector('#price').placeholder = 5000;
    window.validation.disableNewAdForm();
    resetMapPinsBlock();
    resetMapBlock();
    mapFiltersForm.reset();
    window.filter.setMapFormAbility(true);
    window.resetMainPin();
    window.resetAvatar();
    window.resetImages();
  };

  mapFiltersForm.addEventListener('change', window.debounce(function () {
    renderMapPinsSet(listFromServer);
  }));

  window.map = {
    resetBlock: resetMapBlock,
    onFormSubmitAndReset: onFormSubmitAndReset,
    enablePage: enablePage,
    onCardEscape: onCardEscape
  };
})();
