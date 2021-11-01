'use strict';

(function () {
  var rangeBlock = document.querySelector('.effect-level');
  var rangeLine = document.querySelector('.effect-level__line');
  var rangeLineWidth = parseInt(getComputedStyle(rangeLine.parentElement).width, 10)
    - parseInt(getComputedStyle(rangeLine).right, 10)
    - parseInt(getComputedStyle(rangeLine).left, 10);
  var rangeLineStep = rangeLineWidth / 100;
  var rangeLineDepth = document.querySelector('.effect-level__depth');
  var rangePin = document.querySelector('.effect-level__pin');
  var rangePinShift = parseInt(getComputedStyle(rangePin).width, 10) / 2;
  var RangePinBreakpoint = {
    LEFT: 0 + rangePinShift,
    RIGHT: rangeLineWidth - rangePinShift
  };

  var getRangeValue = function () {
    return (parseInt(getComputedStyle(rangePin).left, 10) + rangePinShift) / rangeLineStep;
  };

  var checkMoveCoordinateValue = function (coordinate, max, min) {
    var value = coordinate;
    if (value > max) {
      value = max;
    } else if (value < min) {
      value = min;
    }
    return value;
  };

  var setRangePinCoordinates = function (shift) {
    rangePin.style.left = checkMoveCoordinateValue((rangePin.offsetLeft - shift), RangePinBreakpoint.RIGHT, RangePinBreakpoint.LEFT) + 'px';
  };

  var setRangeLineDepth = function () {
    rangeLineDepth.style.width = getRangeValue() + '%';
  };

  var onMouseDown = function (evt) {
    evt.preventDefault();
    var startCoordinates = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      setRangePinCoordinates(startCoordinates - moveEvt.clientX);
      startCoordinates = moveEvt.clientX;
      setRangeLineDepth();
      window.filters.setEffect(getRangeValue());
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.filters.setEffect(getRangeValue());
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var resetRangePin = function () {
    rangePin.style.left = RangePinBreakpoint.RIGHT + 'px';
    rangeLineDepth.style.width = '100%';
  };

  var hideRangeBlock = function () {
    rangeBlock.classList.add('visually-hidden');
  };

  var showRangeBlock = function () {
    rangeBlock.classList.remove('visually-hidden');
  };

  rangePin.addEventListener('mousedown', onMouseDown);

  window.range = {
    getValue: getRangeValue,
    resetPin: resetRangePin,
    setLineDepth: setRangeLineDepth,
    showBlock: showRangeBlock,
    hideBlock: hideRangeBlock
  };
})();
