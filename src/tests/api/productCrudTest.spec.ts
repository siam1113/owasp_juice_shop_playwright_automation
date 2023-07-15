import { test, request, expect } from "@playwright/test";
import { logInCredentials, productData } from "../../pageData/pageData";

test.describe("Product CRUD test", async () => {
  let apiContext;
  let token;

  let login = async (email, password) => {
    const loginResponse = await apiContext.post("/rest/user/login", {
      data: {
        email,
        password,
      },
    });
    expect(loginResponse.status()).toBe(200);
    const loginResponseBody = JSON.parse(
      (await loginResponse.body()).toString()
    );
    return loginResponseBody["authentication"]["token"];
  };

  let addProduct = async (productData) => {
    const response = await apiContext.post("/api/BasketItems/", {
      data: {
        ...productData,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = JSON.parse((await response.body()).toString());
    return responseBody["data"];
  };

  let deleteProduct = async (id) => {
    const response = await apiContext.delete(`/api/BasketItems/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  };

  let getBasketProducts = async () => {
    const response = await apiContext.get("/rest/basket/6", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status()).toBe(200);
    const basketItemsResponseBody = JSON.parse(
      (await response.body()).toString()
    );
    return basketItemsResponseBody["data"]["Products"];
  };

  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: "https://juice-shop.herokuapp.com",
    });

    // Login to the application
    token = await login(logInCredentials.userName, logInCredentials.password);
  });

  test.beforeEach(async () => {
    // Clear basket
    const basketProducts = await getBasketProducts();
    const totalProducts = basketProducts.length;
    for (let i = 0; i < totalProducts; i++) {
      const id = await basketProducts[i]["BasketItem"]["id"];
      await deleteProduct(id);
    }
  });

  test(`verify adding single product`, async () => {
    // Step 1: Add 1 item to the basket
    await addProduct(productData.product1);

    // Step 2: Verify item count in basket
    const basketProducts = await getBasketProducts();
    const productCount = basketProducts.length;
    expect(productCount).toBe(1);
  });

  test(`verify adding and deleting a product`, async () => {
    // Step 1: Add 2 item to the basket
    await addProduct(productData.product1);
    const productInfo = await addProduct(productData.product2);
    const id = productInfo["id"];

    // Step 2: Delete one item
    const deleteResponse = await deleteProduct(id);
    expect(deleteResponse.status()).toBe(200);

    // Step 3: Get items from basket and verify product count
    const basketProducts = await getBasketProducts();
    const productCount = basketProducts.length;
    expect(productCount).toBe(1);
  });
});
