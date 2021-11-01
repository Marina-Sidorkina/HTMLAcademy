'use strict';

(function () {
  var WIZARD_OBJECTS_ARRAY_LENGTH = 4;
  var setupBlock = document.querySelector('.setup');
  var similarWizardsBlock = document.querySelector('.setup-similar');
  var similarWizardsListBlock = document.querySelector('.setup-similar-list');
  var setupOpenButton = document.querySelector('.setup-open');
  var setupCloseButton = document.querySelector('.setup-close');
  var setupOpenIcon = document.querySelector('.setup-open-icon');
  var wizardSetupBlock = document.querySelector('.setup-wizard');
  var wizardCoatSetupBlock = wizardSetupBlock.querySelector('.wizard-coat');
  var wizardCoatSetupInput = setupBlock.querySelector('input[name="coat-color"]');
  var wizardEyesSetupBlock = wizardSetupBlock.querySelector('.wizard-eyes');
  var wizardEyesSetupInput = setupBlock.querySelector('input[name="eyes-color"]');
  var wizardFireballSetupBlock = document.querySelector('.setup-fireball-wrap');
  var wizardFireballSetupInput = wizardFireballSetupBlock.querySelector('input[name="fireball-color"]');
  var wizardTemplate = document.querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');
  var popup = document.createElement('dialog');
  var listFromServer = [];

  var wizardParams = {
    COAT_COLORS: [
      'rgb(101, 137, 164)',
      'rgb(241, 43, 107)',
      'rgb(146, 100, 161)',
      'rgb(56, 159, 117)',
      'rgb(215, 210, 55)',
      'rgb(0, 0, 0)'
    ],
    EYES_COLORS: [
      'black',
      'red',
      'blue',
      'yellow',
      'green'
    ],
    FIREBALL_COLORS: [
      '#ee4830',
      '#30a8ee',
      '#5ce6c0',
      '#e848d5',
      '#e6e848'
    ]
  };

  var setupBlockCoordinates = {
    TOP: '80px',
    LEFT: '50%'
  };

  var getRandomArrayElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var renderSimilarWizard = function (wizardObject) {
    var similarWizard = wizardTemplate.cloneNode(true);
    similarWizard.querySelector('.setup-similar-label').textContent = wizardObject.name;
    similarWizard.querySelector('.wizard-coat').style.fill = wizardObject.colorCoat;
    similarWizard.querySelector('.wizard-eyes').style.fill = wizardObject.colorEyes;
    return similarWizard;
  };

  var getSimilarWizardsRating = function (array) {
    var coatColor = wizardCoatSetupInput.value;
    var eyesColor = wizardEyesSetupInput.value;
    array.forEach(function (item) {
      item.rating = 0;
      if (item.colorCoat === coatColor) {
        item.rating += 3;
      }
      if (item.colorEyes === eyesColor) {
        item.rating += 2;
      }
    });
    return array;
  };

  var renderSimilarWizardsList = function (array) {
    var fragment = document.createDocumentFragment();
    listFromServer = array.slice();
    array = getSimilarWizardsRating(array);
    array.sort(function (a, b) {
      return (b.rating - a.rating);
    });
    for (var i = 0; i < WIZARD_OBJECTS_ARRAY_LENGTH; i++) {
      fragment.appendChild(renderSimilarWizard(array[i]));
    }
    return fragment;
  };

  var onSetupOpenIconEnter = function (evt) {
    if (evt.keyCode === window.keyCodes.ENTER) {
      showSetupBlock();
    }
  };

  var onSetupCloseButtonEnter = function (evt) {
    if (evt.keyCode === window.keyCodes.ENTER) {
      hideSetupBlock();
    }
  };

  var renderWizardsByRating = window.debounce(function () {
    similarWizardsListBlock.innerHTML = '';
    similarWizardsListBlock.appendChild(renderSimilarWizardsList(listFromServer));
  });

  var setWizardElementColor = function (wizardElementBlock, hiddenInput, array) {
    var color = getRandomArrayElement(array);
    wizardElementBlock.setAttribute('fill', color);
    hiddenInput.value = color;
  };

  var onWizardCoatSetupBlockClick = function () {
    wizardCoatSetupBlock.removeAttribute('style');
    setWizardElementColor(wizardCoatSetupBlock, wizardCoatSetupInput, wizardParams.COAT_COLORS);
    renderWizardsByRating();
  };

  var onWizardEyesSetupBlockClick = function () {
    setWizardElementColor(wizardEyesSetupBlock, wizardEyesSetupInput, wizardParams.EYES_COLORS);
    renderWizardsByRating();
  };

  var onWizardFireballSetupBlockClick = function () {
    var color = getRandomArrayElement(wizardParams.FIREBALL_COLORS);
    wizardFireballSetupBlock.style.backgroundColor = color;
    wizardFireballSetupInput.value = color;
  };

  var setInitialCoordinates = function () {
    setupBlock.style.top = setupBlockCoordinates.TOP;
    setupBlock.style.left = setupBlockCoordinates.LEFT;
  };

  var setSetupBlockCoordinates = function (shift) {
    setupBlock.style.top = (setupBlock.offsetTop - shift.y) + 'px';
    setupBlock.style.left = (setupBlock.offsetLeft - shift.x) + 'px';
  };

  var onWizardsLoadSuccess = function (wizards) {
    similarWizardsListBlock.innerHTML = '';
    similarWizardsListBlock.appendChild(renderSimilarWizardsList(wizards));
  };

  var onLoadError = function () {
    popup.show();
  };

  var showSetupBlock = function () {
    window.backend.load(onWizardsLoadSuccess, onLoadError);
    setInitialCoordinates();
    setupBlock.classList.remove('hidden');
    similarWizardsBlock.classList.remove('hidden');
    document.addEventListener('keydown', window.validation.onEscapeKeyDown);
    setupCloseButton.addEventListener('click', hideSetupBlock);
    setupCloseButton.addEventListener('keydown', onSetupCloseButtonEnter);
    wizardCoatSetupBlock.addEventListener('click', onWizardCoatSetupBlockClick);
    wizardEyesSetupBlock.addEventListener('click', onWizardEyesSetupBlockClick);
    wizardFireballSetupBlock.addEventListener('click', onWizardFireballSetupBlockClick);
    setupOpenButton.removeEventListener('click', showSetupBlock);
    setupOpenIcon.removeEventListener('keydown', onSetupOpenIconEnter);
    window.validation.addUserNameFieldListeners();
  };

  var hideSetupBlock = function () {
    setupBlock.classList.add('hidden');
    popup.close();
    setupOpenButton.addEventListener('click', showSetupBlock);
    setupOpenIcon.addEventListener('keydown', onSetupOpenIconEnter);
    setupCloseButton.removeEventListener('click', hideSetupBlock);
    setupCloseButton.removeEventListener('keydown', onSetupCloseButtonEnter);
    wizardCoatSetupBlock.removeEventListener('click', onWizardCoatSetupBlockClick);
    wizardEyesSetupBlock.removeEventListener('click', onWizardEyesSetupBlockClick);
    wizardFireballSetupBlock.removeEventListener('click', onWizardFireballSetupBlockClick);
    document.removeEventListener('keydown', window.validation.onEscapeKeyDown);
    window.validation.removeUserNameFieldListeners();
  };

  popup.textContent = 'Oooops! Кажется, что-то пошло не так...';
  popup.style.top = '0px';
  setupBlock.append(popup);
  setupOpenIcon.addEventListener('keydown', onSetupOpenIconEnter);
  setupOpenButton.addEventListener('click', showSetupBlock);

  window.setup = {
    hideBlock: hideSetupBlock,
    setBlockCoordinates: setSetupBlockCoordinates,
    onLoadError: onLoadError
  };
})();
