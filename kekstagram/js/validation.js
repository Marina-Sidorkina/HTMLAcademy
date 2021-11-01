'use strict';

(function () {
  var hashtagInput = document.querySelector('.text__hashtags');
  var commentInput = document.querySelector('.text__description');

  var TestTemplate = {
    FIRST_SYMBOL_ONE: /^#/,
    FIRST_SYMBOL_TWO: /\s[^#]/,
    LENGTH: /#\S{20,}/,
    ONE_SYMBOL: /#\s/,
    SPACE: /\S#/,
    QUANTITY: /#/g
  };

  var checkDoubling = function (array) {
    var result = false;
    for (var i = 0; i < array.length - 1; i++) {
      result = array.some(function (item, index) {
        return array[i].toLowerCase() === item.toLowerCase() && index !== i;
      });
      if (result) {
        break;
      }
    }
    return result;
  };

  var getArray = function (string) {
    var result = string.replace(/#/g, '');
    return result.split(' ');
  };

  var checkTarget = function (evt) {
    return evt.target === hashtagInput || evt.target === commentInput;
  };

  var onHashtagInvalid = function (evt) {
    if (!TestTemplate.FIRST_SYMBOL_ONE.test(evt.target.value)
      || TestTemplate.FIRST_SYMBOL_TWO.test(evt.target.value)) {
      evt.target.setCustomValidity('Хештег должен начинаться с символа #');
    } else if (TestTemplate.ONE_SYMBOL.test(evt.target.value)) {
      evt.target.setCustomValidity('Хештег не может состоять только из символа #');
    } else if (TestTemplate.SPACE.test(evt.target.value)) {
      evt.target.setCustomValidity('Хештеги должны разделяться знаком пробела');
    } else if (TestTemplate.LENGTH.test(evt.target.value)) {
      evt.target.setCustomValidity('Один хештег может содержать не более 20 символов, включая символ #');
    } else if (evt.target.value.match(TestTemplate.QUANTITY).length > 5) {
      evt.target.setCustomValidity('Нельзя указывать более пяти хештегов');
    } else if (checkDoubling(getArray(evt.target.value))) {
      evt.target.setCustomValidity('Хештеги не должны повторяться');
      checkDoubling(getArray(evt.target.value));
    } else {
      evt.target.setCustomValidity('');
    }
  };

  hashtagInput.addEventListener('input', onHashtagInvalid);

  window.checkTarget = checkTarget;
})();
