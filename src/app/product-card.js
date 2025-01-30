import { CartProducts } from "./database";

/** display product card*/
export function createProductCard(element, container) {
  const cardProduct = `
    <div class="product">
      <p class="product__article">${element["id"]}</p>
      <p class="product__category">${element["category"]}</p>
      <div class="product__photo product__photo--${element["id"]}"></div>
      <h3 class="product__title">${element.name}</h3>
      <div class="product__info">
        <div class="product__prices">
          <p class="product__price">$${element["price"].toFixed(2)}</p>
          <p class="product__sale-price">$${element["sale-price"].toFixed(2)}</p>
        </div>
        <button class="product__buy-button">buy</button>
        <div class="product-quantity">
          <p class="product-quantity__button product-quantity__minus-btn"> -</p>
          <p class="product-quantity__value">1</p>
          <p class="product-quantity__button product-quantity__plus-btn">+</p>
        </div>
      </div>
    </div>
    `;
  container.insertAdjacentHTML("beforeend", cardProduct);
  const cardPhoto = document.querySelector(`.product__photo--${element["id"]}`);
  cardPhoto.style.backgroundImage = `url('../src/images/products/${element["photo"]}')`;
}

/** display actual number of product from the cart */
export function showActualNumberProducts() {
  const productId = document.querySelectorAll(".product__article");
  const cartInfo = CartProducts.getCartProducts();
  cartInfo.then((data) => {
    if (data) {
      const cartIds = data.map((itemProduct) => itemProduct.id);

      [...productId].forEach((itemArticle) => {
        if (cartIds.includes(itemArticle.textContent)) {
          const curProduct = itemArticle.closest(".product");
          const curQuantity = curProduct.querySelector(
            ".product-quantity__value"
          );
          curQuantity.textContent = data.find(
            (product) => product.id === itemArticle.textContent
          ).quantity;
          const hiddenBlock = curProduct.querySelector(".product__buy-button");
          hiddenBlock.style.display = "none";
          const unhiddenBlock = curProduct.querySelector(".product-quantity");
          unhiddenBlock.style.display = "flex";
        }
      });
    }
  });
}

