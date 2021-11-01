'use strict';

(function () {
  var mainMapPin = document.querySelector('.map__pin--main');
  var newAdAddressField = document.querySelector('#address');
  var PointerOffsetCoordinate = {
    X: Math.floor(mainMapPin.getBoundingClientRect().width / 2),
    Y: Math.floor(mainMapPin.getBoundingClientRect().height - 6) + parseInt(window.getComputedStyle(document.querySelector('.map__pin--main'), ':after').getPropertyValue('height'), 10),
  };
  var MainMapPinCoordinate = {
    INITIAL_X: Math.floor(parseInt(mainMapPin.style.left, 10) + mainMapPin.getBoundingClientRect().width / 2),
    INITIAL_Y: Math.floor(parseInt(mainMapPin.style.top, 10) + mainMapPin.getBoundingClientRect().height / 2)
  };
  var MainMapPinBreakpoint = {
    LEFT_X: 0 - PointerOffsetCoordinate.X,
    RIGHT_X: 1200 - PointerOffsetCoordinate.X,
    TOP_Y: 130 - PointerOffsetCoordinate.Y,
    BOTTOM_Y: 630 - PointerOffsetCoordinate.Y
  };
  var similarPinsAbility = false;

  var getMainMapPinPointerX = function () {
    return parseInt(mainMapPin.style.left, 10) + PointerOffsetCoordinate.X;
  };

  var getMainMapPinPointerY = function () {
    return parseInt(mainMapPin.style.top, 10) + PointerOffsetCoordinate.Y;
  };

  var setAddressFieldValue = function (x, y) {
    newAdAddressField.value = x + ', ' + y;
  };

  var resetMainPin = function () {
    setAddressFieldValue(MainMapPinCoordinate.INITIAL_X, MainMapPinCoordinate.INITIAL_Y);
    mainMapPin.addEventListener('mousedown', onMouseDown);
    mainMapPin.style.top = MainMapPinCoordinate.INITIAL_Y + 'px';
    mainMapPin.style.left = MainMapPinCoordinate.INITIAL_X + 'px';
    similarPinsAbility = false;
  };

  var getClientCoordinates = function (evt) {
    return {
      x: evt.clientX,
      y: evt.clientY
    };
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

  var setPinCoordinates = function (shift) {
    mainMapPin.style.top = checkMoveCoordinateValue((mainMapPin.offsetTop - shift.y), MainMapPinBreakpoint.BOTTOM_Y, MainMapPinBreakpoint.TOP_Y) + 'px';
    mainMapPin.style.left = checkMoveCoordinateValue((mainMapPin.offsetLeft - shift.x), MainMapPinBreakpoint.RIGHT_X, MainMapPinBreakpoint.LEFT_X) + 'px';
  };

  var getShiftCoordinates = function (startCoordinates, moveEvt) {
    return {
      x: startCoordinates.x - moveEvt.clientX,
      y: startCoordinates.y - moveEvt.clientY
    };
  };

  var onMouseDown = function (evt) {
    evt.preventDefault();
    var startCoordinates = getClientCoordinates(evt);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = getShiftCoordinates(startCoordinates, moveEvt);
      startCoordinates = getClientCoordinates(moveEvt);
      setPinCoordinates(shift);
      setAddressFieldValue(getMainMapPinPointerX(), getMainMapPinPointerY());
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      setAddressFieldValue(getMainMapPinPointerX(), getMainMapPinPointerY());
      if (!similarPinsAbility) {
        window.map.enablePage();
        window.validation.enableNewAdForm();
        window.filter.setMapFormAbility(false);
        similarPinsAbility = true;
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  resetMainPin();
  mainMapPin.addEventListener('mousedown', onMouseDown);

  window.resetMainPin = resetMainPin;
})();
