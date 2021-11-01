
var popup = document.querySelector(".modal");
var cart = document.querySelector(".product-item__cart");
var cartTwo = document.querySelector(".product-item__cart--bowl");
var cartThree = document.querySelector(".product-item__cart--toys");
var overlay = document.querySelector(".page-body__overlay");

  cart.addEventListener("click", function(evt) {
    evt.preventDefault();
    popup.classList.add("modal--show");
    overlay.classList.add("page-body__overlay--show");
  });

  cartTwo.addEventListener("click", function(evt) {
    evt.preventDefault();
    popup.classList.add("modal--show");
    overlay.classList.add("page-body__overlay--show");
  });

  cartThree.addEventListener("click", function(evt) {
    evt.preventDefault();
    popup.classList.add("modal--show");
    overlay.classList.add("page-body__overlay--show");
  });

  window.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 27) {
      if (popup.classList.contains("modal--show")) {
        popup.classList.remove("modal--show");
        overlay.classList.remove("page-body__overlay--show");
      }
    }
  });
