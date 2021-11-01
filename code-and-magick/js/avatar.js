'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DROP_AREA_EVENTS = ['dragenter', 'dragover', 'dragleave', 'drop'];
  var avatarInput = document.querySelector('input[name="avatar"]');
  var avatarPreview = document.querySelector('.setup-user-pic');
  var avatarDropZone = document.querySelector('.upload');

  var loadAvatarPreview = function (file) {
    if (checkFileType(file)) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  var onAvatarChange = function () {
    var file = avatarInput.files[0];
    if (file) {
      loadAvatarPreview(file);
    }
  };

  var onAvatarDropZoneDrop = function (evt) {
    var dataTransfer = evt.dataTransfer;
    var file = dataTransfer.files[0];
    loadAvatarPreview(file);
  };

  var checkFileType = function (file) {
    var fileName = file.name.toLowerCase();
    return FILE_TYPES.some(function (ending) {
      return fileName.endsWith(ending);
    });
  };

  var preventDefaults = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
  };

  var setEventPrevent = function (dropArea) {
    DROP_AREA_EVENTS.forEach(function (event) {
      dropArea.addEventListener(event, preventDefaults, false);
    });
  };

  setEventPrevent(avatarDropZone);
  avatarInput.addEventListener('change', onAvatarChange);
  avatarDropZone.addEventListener('drop', onAvatarDropZoneDrop);
})();
