'use strict';

(function () {
  var EFFECTS_FILTER_MAX_VALUE = 100;
  var EFFECTS = ['effects__preview--none', 'effects__preview--chrome', 'effects__preview--sepia',
    'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat'];
  var photoEditorBlock = document.querySelector('.img-upload__effects');
  var photoEditorEffects = photoEditorBlock.querySelectorAll('input[type="radio"]');
  var photoEditorEffectsInput = document.querySelector('input[name="effect-level"]');
  var newPhotoPreview = document.querySelector('.img-upload__preview img');
  var defaultEffect = document.querySelector('#effect-none');
  var EffectSetting = {
    none: {
      MAX: 0,
      setValue: function () {
        return 'initial';
      }
    },
    chrome: {
      MAX: 1,
      setValue: function (value) {
        return 'grayscale(' + value + ')';
      }
    },
    sepia: {
      MAX: 1,
      setValue: function (value) {
        return 'sepia(' + value + ')';
      }
    },
    marvin: {
      MAX: 100,
      setValue: function (value) {
        return 'invert(' + value + '%)';
      }
    },
    phobos: {
      MAX: 3,
      setValue: function (value) {
        return 'blur(' + value + 'px)';
      }
    },
    heat: {
      MAX: 3,
      setValue: function (value) {
        return 'brightness(' + value + ')';
      }
    }
  };

  var resetPreview = function () {
    EFFECTS.forEach(function (item) {
      newPhotoPreview.classList.remove(item);
    });
  };

  var setRangeBlockVisibility = function (item) {
    if (item.id === 'effect-none') {
      window.range.hideBlock();
    } else {
      window.range.showBlock();
    }
  };

  var setEffect = function (rangeValue) {
    photoEditorEffects.forEach(function (item, index) {
      if (item.checked) {
        var effectValue = EffectSetting[item.value].MAX / EFFECTS_FILTER_MAX_VALUE * rangeValue;
        newPhotoPreview.classList.add(EFFECTS[index]);
        newPhotoPreview.style.filter = EffectSetting[item.value].setValue(effectValue);
        photoEditorEffectsInput.value = Math.round(rangeValue);
        setRangeBlockVisibility(item);
      }
    });
  };

  var onEffectChange = function (evt) {
    if (evt.target.classList.contains('effects__radio')) {
      resetPreview();
      window.range.resetPin();
      setEffect(window.range.getValue());
    }
  };

  var setDefaultEffect = function () {
    defaultEffect.checked = true;
  };

  window.filters = {
    setEffect: setEffect,
    setDefaultEffect: setDefaultEffect,
    onEffectChange: onEffectChange
  };
})();
