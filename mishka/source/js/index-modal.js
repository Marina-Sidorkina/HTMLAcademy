var order = document.querySelector(".advert__order");
var popup = document.querySelector(".modal");
var overlay = document.querySelector(".page-body__overlay");

order.addEventListener("click", function(evt) {
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
