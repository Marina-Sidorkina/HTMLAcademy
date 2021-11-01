  var open = document.querySelector(".extra__button");
  var nav = document.querySelector(".navigation");
  var user = document.querySelector(".user-block");

  nav.classList.remove("navigation--show");
  user.classList.remove("user-block--show");
  open.classList.remove("extra__button--opened");

  open.addEventListener("click", function(evt) {
    if (open.classList.contains("extra__button--opened")) {
      evt.preventDefault();
      nav.classList.remove("navigation--show");
      user.classList.remove("user-block--show");
      open.classList.remove("extra__button--opened");
    } else {
      evt.preventDefault();
      nav.classList.add("navigation--show");
      user.classList.add("user-block--show");
      open.classList.add("extra__button--opened");
    }
  });
