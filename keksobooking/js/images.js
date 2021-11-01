'use strict';

(function () {
  var imagesBlock = document.querySelector('.ad-form__photo-container');
  var imagesInput = document.querySelector('#images');
  var imagesPreview = document.querySelector('.ad-form__photo');
  var urls = [];

  var removePreviousImages = function () {
    var previousImage = imagesBlock.querySelector('.ad-form__photo');
    if (previousImage) {
      imagesBlock.removeChild(previousImage);
      removePreviousImages();
    }
  };

  var renderOneImage = function (source) {
    var fragment = imagesPreview.cloneNode(true);
    var image = document.createElement('img');
    image.src = source;
    image.style.maxWidth = '80%';
    image.style.maxHeight = '80%';
    fragment.appendChild(image);
    imagesBlock.appendChild(fragment);
  };

  var renderImages = function (readerResult) {
    if (urls.length > 1) {
      removePreviousImages();
      urls.forEach(function (url) {
        renderOneImage(url);
      });
    } else if (urls.length === 1) {
      removePreviousImages();
      renderOneImage(readerResult);
    }
    urls = [];
  };

  var checkUrl = function (readerResult, file) {
    if (window.utils.checkFileType(file)) {
      urls.push(readerResult);
    }
  };

  var checkFilesNumber = function (index, files, readerResult) {
    if (index < files.length) {
      loadImagesPreview(files, index);
    } else {
      renderImages(readerResult);
    }
  };

  var loadImagesPreview = function (files, index) {
    if (files.length) {
      var file = files[index++];
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        checkUrl(reader.result, file);
        checkFilesNumber(index, files, reader.result);
      });
      reader.readAsDataURL(file);
    }
  };

  var onImagesInputChange = function (index) {
    loadImagesPreview(imagesInput.files, index);
  };

  var resetImages = function () {
    removePreviousImages();
    var fragment = imagesPreview.cloneNode(true);
    imagesBlock.appendChild(fragment);
  };

  imagesInput.addEventListener('change', function () {
    onImagesInputChange(0);
  });

  window.resetImages = resetImages;
})();
