'use strict';

(function () {
  var photoInput = document.querySelector('#upload-file');
  var photoEditor = document.querySelector('.img-upload__overlay');
  var photoEditorForm = document.querySelector('.img-upload__form');
  var photoEditorCloseButton = document.querySelector('#upload-cancel');
  var successBlockTemplate = document.querySelector('#success').content.querySelector('.success');
  var successBlock = successBlockTemplate.cloneNode(true);
  var successBlockCloseButton = successBlock.querySelector('.success__button');

  var onPhotoUpload = function () {
    photoEditor.classList.remove('hidden');
    window.filters.setDefaultEffect();
    window.filters.setEffect();
    window.range.resetPin();
    photoEditorForm.addEventListener('change', window.filters.onEffectChange);
    document.addEventListener('keydown', onPhotoEditorEscape);
    photoEditorCloseButton.addEventListener('click', onPhotoEditorClose);
  };

  var onPhotoEditorClose = function () {
    photoEditor.classList.add('hidden');
    window.range.resetPin();
    photoInput.value = '';
    photoEditorForm.removeEventListener('change', window.filters.onEffectChange);
    document.removeEventListener('keydown', onPhotoEditorEscape);
    photoEditorCloseButton.removeEventListener('click', onPhotoEditorClose);
  };

  var onPhotoEditorEscape = function (evt) {
    if (window.utils.onEscapeKeydown(evt.keyCode) && !window.checkTarget(evt)) {
      onPhotoEditorClose();
    }
  };

  var addSuccessBlock = function () {
    window.utils.addBlock(successBlock, onSuccessBlockEsc, removeSuccessBlock);
    successBlockCloseButton.addEventListener('click', removeSuccessBlock);
  };

  var removeSuccessBlock = function () {
    window.utils.removeBlock(successBlock, onSuccessBlockEsc, removeSuccessBlock);
    successBlockCloseButton.removeEventListener('click', removeSuccessBlock);
  };

  var onSuccessBlockEsc = function (evt) {
    if (window.utils.onEscapeKeydown(evt.keyCode)) {
      removeSuccessBlock();
    }
  };

  var onFormSubmit = function () {
    onPhotoEditorClose();
    addSuccessBlock();
  };

  photoInput.addEventListener('change', onPhotoUpload);
  photoEditorForm.addEventListener('submit', function (evt) {
    window.backend.send(new FormData(photoEditorForm), onFormSubmit, window.backend.onPostError);
    evt.preventDefault();
  });

  window.onPhotoEditorClose = onPhotoEditorClose;
})();
