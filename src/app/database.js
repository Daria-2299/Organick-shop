const databaseAddress = "http://localhost:3001";

export class Products {
  /** get a complete list of products*/
  static async getProducts() {
    try {
      const response = await fetch(`${databaseAddress}/products`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Запрос GET getProducts");
    }
  }

  /** get a product by id from a complete list of products*/
  static async getProductById(articleValue) {
    try {
      const response = await fetch(
        `${databaseAddress}/products/${articleValue}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Запрос GET getProductBy");
    }
  }
}

export class CartProducts {
  /** add a product to cart (in the database) */
  static async addProductToCartDB(productInfo) {
    try {
      const resp = await fetch(`${databaseAddress}/cart`, {
        method: "POST",
        body: JSON.stringify(productInfo),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return resp.json();
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Запрос POST был, продукт добавлен в корзину");
    }
  }

  /** change the quantity of a product in the cart (in the database)*/
  static async changeQuantityProduct(product) {
    try {
      const response = await fetch(`${databaseAddress}/cart/${product.id}`, {
        method: "PUT",
        body: JSON.stringify(product),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      await response.json();
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Запрос PUT");
    }
  }

  /** get a product by id from cart */
  static async getProductById(articleValue) {
    try {
      const response = await fetch(`${databaseAddress}/cart/${articleValue}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Запрос GET getProductByArticle CART");
    }
  }

  /** get data about products in the cart*/
  static async getCartProducts() {
    try {
      const response = await fetch(`${databaseAddress}/cart`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Запрос GET getCartProducts");
    }
  }

  /** delete product from the cart (in the database)*/
  static async deleteProductFromCartProducts(id) {
    try {
      const response = await fetch(`${databaseAddress}/cart/${id}`, {
        method: "DELETE",
      });
      await response.json();
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Запрос DELETE");
    }
  }

  /** clear cart (in the database)*/
  static async clearCartProduct() {
    const cartElements = await this.getCartProducts();
    cartElements.forEach((item) => this.deleteProductFromCartProducts(item.id));
  }
}

export class Order {
  /** add order information to the database */
  static async addOrderDB(orderInfo) {
    try {
      const resp = await fetch(`${databaseAddress}/orders`, {
        method: "POST",
        body: JSON.stringify(orderInfo),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return resp.json();
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Запрос POST был, заказ добавлен");
    }
  }
}

export class Subscription {
  /** add a new email for subscription (in the database)*/
  static async addNewEmail(emailValue) {
    try {
      const resp = await fetch(`${databaseAddress}/email-subscription`, {
        method: "POST",
        body: JSON.stringify({ email: emailValue }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return resp.json();
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Запрос POST был, подписка на рассылку");
    }
  }
}
