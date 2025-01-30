import { CartProducts, Order } from "./database";
import { changeTotalQuantity } from "./trade-products";

createOrder();

/** adding an order to the database*/
function createOrder() {
  const dataOrder = JSON.parse(
    window.localStorage.getItem("orderDataOrganickShop")
  );
  CartProducts.getCartProducts().then((data) => {
    dataOrder["order-description"] = Array.from(data);
    Order.addOrderDB(dataOrder);
  });
  changeTotalQuantity(-data.length);
  CartProducts.clearCartProduct();
  window.localStorage.removeItem("orderDataOrganickShop");
}
