'use strict';

(function () {
  var PRICE_RANGE = 100;
  var priceRangeFilter = document.querySelector('.range__filter');
  var priceRangeFilterCoordinate = priceRangeFilter.getBoundingClientRect();
  var priceRangeStart = priceRangeFilterCoordinate.x;
  var priceRangeEnd = priceRangeFilterCoordinate.right;
  var priceRangWidth = priceRangeFilterCoordinate.width;
  var priceRangeStep = priceRangWidth / PRICE_RANGE;
  var priceRangeLeftButton = document.querySelector('.range__btn--left');
  var priceRangeRightButton = document.querySelector('.range__btn--right');
  var priceRangeMinPinValue = document.querySelector('.range__price--min');
  var priceRangeMaxPinValue = document.querySelector('.range__price--max');
  var priceRangeButtonShift = priceRangeLeftButton.getBoundingClientRect().width / 2;
  var coloredLine = document.querySelector('.range__fill-line');

  var resetPriceButtonsValues = function () {
    priceRangeLeftButton.style.left = (0 - priceRangeButtonShift) + 'px';
    priceRangeRightButton.style.left = (0 + priceRangWidth - priceRangeButtonShift) + 'px';
    coloredLine.style.left = 0 + '%';
    coloredLine.style.right = 0 + '%';
    priceRangeMinPinValue.textContent = getPriceRangePinCoordinate(priceRangeLeftButton);
    priceRangeMaxPinValue.textContent = getPriceRangePinCoordinate(priceRangeRightButton);
  };

  var getPriceRangePinCoordinate = function (evtTarget) {
    var pinCoordinate = evtTarget.getBoundingClientRect();
    var pinX = pinCoordinate.x + (pinCoordinate.width / 2);
    var pinValue = Math.round((pinX - priceRangeStart) / priceRangeStep);
    return pinValue;
  };

  var checkPriceRange = function (item) {
    var min = getPriceRangePinCoordinate(priceRangeLeftButton);
    var max = getPriceRangePinCoordinate(priceRangeRightButton);
    return (item.price >= min && item.price <= max);
  };

  var fillTheLine = function () {
    coloredLine.style.left = priceRangeLeftButton.offsetLeft + 'px';
    coloredLine.style.right = priceRangWidth - priceRangeRightButton.offsetLeft + 'px';
  };

  var onFilterLeftBtnMouseDown = function (evt) {
    if (!window.catalog.checkSpecialFilters()) {
      var startCoord = evt.clientX;
      var secondBtnX = priceRangeRightButton.getBoundingClientRect().x;
      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        if (moveEvt.clientX >= (priceRangeStart + priceRangeButtonShift)
        && moveEvt.clientX < secondBtnX) {
          var shift = startCoord - moveEvt.clientX;
          startCoord = moveEvt.clientX;
          evt.target.style.left = (evt.target.offsetLeft - shift) + 'px';
          priceRangeMinPinValue.textContent = getPriceRangePinCoordinate(evt.target);
          fillTheLine();
        }
      };
      var onMouseUp = window.debounce(function (upEvt) {
        upEvt.preventDefault();
        priceRangeMinPinValue.textContent = getPriceRangePinCoordinate(evt.target);
        window.catalog.onPriceChangeFilterGoods();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      });
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };

  var onFilterRightBtnMouseDown = function (evt) {
    if (!window.catalog.checkSpecialFilters()) {
      var startCoord = evt.clientX;
      var secondBtnRight = priceRangeLeftButton.getBoundingClientRect().right;
      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        if (moveEvt.clientX <= (priceRangeEnd - priceRangeButtonShift)
        && moveEvt.clientX > secondBtnRight) {
          var shift = startCoord - moveEvt.clientX;
          startCoord = moveEvt.clientX;
          evt.target.style.left = (evt.target.offsetLeft - shift) + 'px';
          priceRangeMaxPinValue.textContent = getPriceRangePinCoordinate(evt.target);
          fillTheLine();
        }
      };
      var onMouseUp = window.debounce(function (upEvt) {
        upEvt.preventDefault();
        priceRangeMaxPinValue.textContent = getPriceRangePinCoordinate(evt.target);
        window.catalog.onPriceChangeFilterGoods();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      });
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };

  priceRangeMinPinValue.textContent = getPriceRangePinCoordinate(priceRangeLeftButton);
  priceRangeMaxPinValue.textContent = getPriceRangePinCoordinate(priceRangeRightButton);
  priceRangeLeftButton.addEventListener('mousedown', onFilterLeftBtnMouseDown);
  priceRangeRightButton.addEventListener('mousedown', onFilterRightBtnMouseDown);

  window.filter = {
    checkPriceRange: checkPriceRange,
    resetPriceButtonsValues: resetPriceButtonsValues
  };
})();
