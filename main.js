import { Products } from "./src/app/database";
import {
  createProductCard,
  showActualNumberProducts,
} from "./src/app/product-card";
import { addListenersForCardButtons } from "./src/app/trade-products";

showSlides([0, 1, 2, 3]);

const cardsSlider = document.querySelector(".slider__cards");
const sliderControl = document.querySelectorAll(".slider__button");
sliderControl.forEach((item) => item.addEventListener("click", changeSlides));

/** slide display */
function showSlides(indexSlides) {
  const curProducts = document.querySelectorAll(".product");
  curProducts.forEach((item) => {
    item.remove();
  });
  Products.getProducts().then((data) => {
    indexSlides.forEach((itemIndex) => {
      createProductCard(data[itemIndex], cardsSlider);
    });
    showActualNumberProducts();
    addListenersForCardButtons();
  });
}

/** show next previous slides */
function changeSlides(evt) {
  const indexSlides = [];
  Products.getProducts().then((data) => {
    const slideQuantity = data.length;
    const curProductId =
      document.querySelector(".product__article").textContent;
    const curIndex = data.findIndex((item) => item.id === curProductId);
    let firstIndex = 0;
    if (evt.target.classList.contains("slider__button--prev")) {
      firstIndex =
        curIndex - 1 < 0 ? curIndex - 1 + slideQuantity : curIndex - 1;
    } else {
      firstIndex =
        curIndex + 1 >= slideQuantity
          ? curIndex + 1 - slideQuantity
          : curIndex + 1;
    }
    indexSlides.push(firstIndex);
    for (let i = 1; i < 4; i++) {
      if (firstIndex + i >= slideQuantity) {
        indexSlides.push(firstIndex + i - slideQuantity);
      } else {
        indexSlides.push(firstIndex + i);
      }
    }
    showSlides(indexSlides);
  });
}
