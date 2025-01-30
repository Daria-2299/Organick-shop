import { CartProducts, Products } from "./database";

/** add a product to cart*/
export function addProductToCart(evt) {
  evt.stopPropagation();
  const curButton = evt.target;
  curButton.style.display = "none";
  const quantityBlock = curButton.nextElementSibling;
  quantityBlock.style.display = "flex";

  const indexProduct = curButton
    .closest(".product")
    .querySelector(".product__article").textContent;
  const productInfo = Products.getProductById(indexProduct);
  productInfo.then((data) => {
    data["quantity"] = 1;
    CartProducts.addProductToCartDB(data);
    changeTotalQuantity(1);
  });
}

/** add listener for buy-button, increase and decrease  the number of products buttons */
export function addListenersForCardButtons() {
  const buyButtons = document.querySelectorAll(".product__buy-button");
  buyButtons.forEach((item) =>
    item.addEventListener("click", addProductToCart)
  );

  const minusButtons = document.querySelectorAll(
    ".product-quantity__minus-btn"
  );
  minusButtons.forEach((item) => {
    item.addEventListener("click", decreaseNumberProducts);
  });

  const plusButtons = document.querySelectorAll(".product-quantity__plus-btn");
  plusButtons.forEach((item) => {
    item.addEventListener("click", increaseNumberProducts);
  });
}

/** decrease the quantity of product by 1 */
export function decreaseNumberProducts(evt) {
  evt.stopPropagation();
  const curButton = evt.target;
  changeNumberProducts(curButton, "minus");
  changeTotalQuantity(-1);
}

/** increase the quantity of product by 1 */
export function increaseNumberProducts(evt) {
  evt.stopPropagation();
  const curButton = evt.target;
  changeNumberProducts(curButton, "plus");
  changeTotalQuantity(1);
}

/** change the quantity of each product on the page and in the database */
function changeNumberProducts(currentButton, action) {
  const productContainer = currentButton.closest(".product");
  const quantityProduct = productContainer.querySelector(
    ".product-quantity__value"
  );
  const indexProduct =
    productContainer.querySelector(".product__article").textContent;

  if (Number(quantityProduct.textContent) === 1 && action === "minus") {
    CartProducts.deleteProductFromCartProducts(indexProduct);
    changeCardView(productContainer);
    calculateTotalPrice();
    return;
  }

  const parametrAction = action === "minus" ? -1 : 1;

  const productInfo = CartProducts.getProductById(indexProduct);
  productInfo.then((data) => {
    data["quantity"] += parametrAction;
    CartProducts.changeQuantityProduct(data);
    changePriceOnCard(productContainer, data);
    changeTotalPrice(parametrAction * data["sale-price"]);
  });
  quantityProduct.textContent = +quantityProduct.textContent + parametrAction;
}

/** change the price value on the product card */
function changePriceOnCard(productContainer, data) {
  const priceProduct = productContainer.querySelector(".product__total-price");
  const salePriceProduct = productContainer.querySelector(
    ".product__total-sale-price"
  );
  const priceValue = (data["quantity"] * data["price"]).toFixed(2);
  const salePriceValue = (data["quantity"] * data["sale-price"]).toFixed(2);
  priceProduct.textContent = `$${priceValue}`;
  salePriceProduct.textContent = `$${salePriceValue}`;
}

/** change the product card when adding to/removing from the cart */
function changeCardView(productContainer) {
  //card on cart-page
  if (productContainer.querySelector(".product__description")) {
    productContainer.style.display = "none";
  }
  //card on home or shop page
  else {
    const quantityBlock = productContainer.querySelector(".product-quantity");
    const buyButton = productContainer.querySelector(".product__buy-button");
    quantityBlock.style.display = "none";
    buyButton.style.display = "flex";
  }
}

/** calculate the total quantity using data from the database */
export function calculateTotalQuantity() {
  CartProducts.getCartProducts().then((data) => {
    let totalValue = data.reduce((totalValue, n) => totalValue + n.quantity, 0);
    const totalQuantity = document.querySelectorAll(".total-quantity");
    totalQuantity.forEach((item) => (item.textContent = totalValue));
  });
}

/** calculate the total price using data from the database */
export function calculateTotalPrice() {
  const totalPrice = document.querySelector(".total-info__total-price");
  CartProducts.getCartProducts().then((data) => {
    let totalValue = data.reduce(
      (totalValue, n) => totalValue + n["sale-price"] * n.quantity,
      0
    );
    totalPrice.textContent = totalValue.toFixed(2);
  });
}

/** delete product from page and database */
export function removeProduct(evt) {
  const productContainer = evt.target.closest(".product");
  const indexProduct =
    productContainer.querySelector(".product__article").textContent;
  CartProducts.getProductById(indexProduct).then((data) => {
    changeTotalPrice(-data.quantity * data["sale-price"]);
    changeTotalQuantity(-data.quantity);
  });
  CartProducts.deleteProductFromCartProducts(indexProduct);
  productContainer.style.display = "none";
}

/** change display of total number of products */
export function changeTotalQuantity(changeValue) {
  const totalQuantity = document.querySelectorAll(".total-quantity");
  totalQuantity.forEach(
    (item) => (item.textContent = Number(item.textContent) + changeValue)
  );
}

/** change display of total price of products */
export function changeTotalPrice(changeValue) {
  const totalPrice = document.querySelector(".total-info__total-price");
  const newValue = Number(totalPrice.textContent) + changeValue;
  totalPrice.textContent = newValue.toFixed(2);
}
