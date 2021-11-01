'use strict';

(function () {
  var ESC = 27;
  var mainBlock = document.querySelector('main');

  var onEscapeKeydown = function (keyCode) {
    return (keyCode === ESC);
  };

  var addBlock = function (element, onEsc, removeElement) {
    mainBlock.appendChild(element);
    window.addEventListener('keydown', onEsc);
    window.addEventListener('click', removeElement);
  };

  var removeBlock = function (element, onEsc, removeElement) {
    mainBlock.removeChild(element);
    window.removeEventListener('keydown', onEsc);
    window.removeEventListener('click', removeElement);
  };

  window.utils = {
    onEscapeKeydown: onEscapeKeydown,
    addBlock: addBlock,
    removeBlock: removeBlock
  };
})();
