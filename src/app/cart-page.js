import {
  calculateTotalPrice,
  calculateTotalQuantity,
  removeProduct,
  addListenersForCardButtons,
} from "./trade-products";
import { CartProducts } from "./database";

/** button for ordering */
const cartBuyButton = document.querySelector(".shopping-cart__button");
/** container for product cards */
const productsContainer = document.querySelector(".shopping-cart__container");

cartBuyButton.addEventListener("click", function () {
  CartProducts.getCartProducts().then((data) => {
    if (data.length > 0) {
      document.location = "./order-page.html";
    } else {
      cartBuyButton.classList.add("disabled");
      cartBuyButton.setAttribute("disabled", "true");
    }
  });
});

CartProducts.getCartProducts().then((data) => {
  if (data.length > 0) {
    cartBuyButton.classList.remove("disabled");
    cartBuyButton.removeAttribute("disabled");
  }

  data.forEach((item) => addProductToContainer(item));

  const deleteButtons = document.querySelectorAll(".product__delete-btn");
  calculateTotalQuantity();
  calculateTotalPrice();
  addListenersForCardButtons();
  deleteButtons.forEach((item) => {
    item.addEventListener("click", removeProduct);
  });
});

/** display product card in the cart*/
function addProductToContainer(product) {
  const oldTotalPrice = (product.price * product.quantity).toFixed(2);
  const newTotalPrice = (product["sale-price"] * product.quantity).toFixed(2);
  const productElement = `
    <div class="product">
      <p class="product__article">${product.id}</p>
      <div class="product__image-container">
        <img
          class="product__image"
          src="../src/images/products/${product.photo}"
          alt="picture of product"
        />
    </div>
      <div class="product__description">
        <h2 class="product__title">${product.name}</h2>
        <p class="product__category">${product.category}</p>
        <div class="product-quantity">
          <p class="product-quantity__button product-quantity__minus-btn">-</p>
          <p class="product-quantity__value">${product.quantity}</p>
          <p class="product-quantity__button product-quantity__plus-btn">+</p>
        </div>
        <div class="product__prices">
          <p class="product__total-price">$${oldTotalPrice}</p>
          <p class="product__total-sale-price">$${newTotalPrice}</p>
        </div>
        <button class="product__delete-btn">Delete</button>
      </div>
    </div>
  `;
  productsContainer.insertAdjacentHTML("afterbegin", productElement);
}
