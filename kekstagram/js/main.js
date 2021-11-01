'use strict';

(function () {
  var COMMENTS_AMOUNT = 5;
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var commentTemplate = document.querySelector('.social__comment');
  var photoBlock = document.querySelector('.pictures');
  var bigPhoto = document.querySelector('.big-picture');
  var bigPhotoCloseButton = bigPhoto.querySelector('.big-picture__cancel');
  var commentsCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');

  var renderPhotosSet = function (array) {
    var fragment = document.createDocumentFragment();
    array.forEach(function (item) {
      var photo = photoTemplate.cloneNode(true);
      photo.querySelector('.picture__img').src = item.url;
      photo.querySelector('.picture__likes').textContent = '' + item.likes + '';
      photo.querySelector('.picture__comments').textContent = '' + item.comments.length + '';
      photo.addEventListener('click', function () {
        showBigPhoto(item);
      });
      fragment.appendChild(photo);
    });
    photoBlock.appendChild(fragment);
  };

  var renderCommentsSet = function (object) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < object.comments.length && i < COMMENTS_AMOUNT; i++) {
      var comment = commentTemplate.cloneNode(true);
      comment.querySelector('.social__picture').src = object.comments[i].avatar;
      comment.querySelector('.social__text').textContent = object.comments[i].message;
      fragment.appendChild(comment);
    }
    return fragment;
  };

  var showBigPhoto = function (object) {
    var comments = bigPhoto.querySelector('.social__comments');
    bigPhoto.querySelector('.image-block__item').src = object.url;
    bigPhoto.querySelector('.likes-count').textContent = '' + object.likes + '';
    bigPhoto.querySelector('.comments-count').textContent = '' + object.comments.length + '';
    comments.innerHTML = '';
    comments.appendChild(renderCommentsSet(object));
    bigPhoto.querySelector('.social__caption').textContent = object.description;
    bigPhoto.classList.remove('hidden');
    document.addEventListener('keydown', onBigPhotoEscape);
    bigPhotoCloseButton.addEventListener('click', onBigPhotoClose);
  };

  var onBigPhotoClose = function () {
    bigPhoto.classList.add('hidden');
    document.removeEventListener('keydown', onBigPhotoEscape);
    bigPhotoCloseButton.removeEventListener('click', onBigPhotoClose);
  };

  var onBigPhotoEscape = function (evt) {
    if (window.utils.onEscapeKeydown(evt.keyCode)) {
      onBigPhotoClose();
    }
  };

  window.backend.load(renderPhotosSet, window.backend.onGetError);
  commentsCount.classList.add('visually-hidden');
  commentsLoader.classList.add('visually-hidden');
})();
