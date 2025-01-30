import { calculateTotalQuantity } from "./trade-products";

calculateTotalQuantity();

const burgerMenuBtn = document.querySelector(".burger-menu");
burgerMenuBtn.addEventListener("click", toggleBurgerMenu);

/** change the burger menu icon*/
function toggleBurgerMenu() {
  const menu = document.querySelector(".navigation");
  const lines = document.querySelectorAll(".burger-menu__line");

  if (window.getComputedStyle(menu).display === "none") {
    menu.style.display = "flex";
    lines.forEach((line, index) => {
      if (index === 0)
        line.style.transform = "rotate(45deg) translate(10px, 10px)";
      else if (index === 1) line.style.display = "none";
      else line.style.transform = "rotate(-45deg) translate(5px, -5px)";
    });
  } else {
    menu.style.display = "none";

    lines.forEach((line) => {
      line.style.display = "block";
      line.style.transform = "none";
    });
  }
}
