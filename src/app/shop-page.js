import { createProductCard, showActualNumberProducts } from "./product-card";
import { Products } from "./database";
import {
  addListenersForCardButtons,
  calculateTotalQuantity,
} from "./trade-products";

const productsCardContainer = document.querySelector(".products");

Products.getProducts().then((data) => {
  data.forEach((element) => createProductCard(element, productsCardContainer));
  showActualNumberProducts();
  calculateTotalQuantity();
  addListenersForCardButtons();
});
