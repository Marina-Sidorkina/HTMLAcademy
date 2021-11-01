var link = document.querySelector(".address-btn");
var popup = document.querySelector(".modal-content");
var close = document.querySelector(".modal-content-close");
var your_name = popup.querySelector(".modal-content-name-input");

link.addEventListener("click", function(event) {
  event.preventDefault();
  popup.classList.add("modal-content-show");
  your_name.focus();
});

close.addEventListener("click", function(event) {
  event.preventDefault();
  popup.classList.remove("modal-content-show");
});