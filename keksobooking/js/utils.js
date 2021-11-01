'use strict';

(function () {
  var ESC = 27;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DeclensionAuxiliaryArray = {
    BREAKPOINTS: [4, 5, 20],
    DIVIDERS: [10, 100],
    CASES: [2, 0, 1, 1, 1, 2]
  };

  var onEscapeKeydown = function (keyCode) {
    return (keyCode === ESC);
  };

  var getRemainder = function (number, divider) {
    return number % divider;
  };

  var checkRemainderByHundred = function (number) {
    return getRemainder(number, DeclensionAuxiliaryArray.DIVIDERS[1]) > DeclensionAuxiliaryArray.BREAKPOINTS[0] && getRemainder(number, DeclensionAuxiliaryArray.DIVIDERS[1]) < DeclensionAuxiliaryArray.BREAKPOINTS[2];
  };

  var checkRemainderByTen = function (number) {
    return getRemainder(number, DeclensionAuxiliaryArray.DIVIDERS[0]) < DeclensionAuxiliaryArray.BREAKPOINTS[1];
  };

  var getDeclension = function (number, wordDeclForOne, wordDeclForFour, wordDeclForFive) {
    var declensionVariants = [wordDeclForOne, wordDeclForFour, wordDeclForFive];
    return declensionVariants[checkRemainderByHundred(number) ?
      2 : DeclensionAuxiliaryArray.CASES[checkRemainderByTen(number) ?
        getRemainder(number, DeclensionAuxiliaryArray.DIVIDERS[0]) : 5]];
  };

  var setItemsAbility = function (array, disabilityValue) {
    array.forEach(function (item) {
      item.disabled = disabilityValue;
    });
  };

  var addChild = function (element) {
    document.querySelector('main').appendChild(element);
  };

  var deleteChild = function (element) {
    document.querySelector('main').removeChild(element);
  };

  var checkFileType = function (file) {
    var fileName = file.name.toLowerCase();
    return FILE_TYPES.some(function (ending) {
      return fileName.endsWith(ending);
    });
  };

  window.utils = {
    onEscapeKeydown: onEscapeKeydown,
    setItemsAbility: setItemsAbility,
    addChild: addChild,
    deleteChild: deleteChild,
    checkFileType: checkFileType,
    getDeclension: getDeclension
  };
})();
