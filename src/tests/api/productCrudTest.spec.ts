import { test, request, expect } from "@playwright/test";
import { logInCredentials, productData } from "../../pageData/pageData";

test.describe("Product CRUD test", async () => {
  let apiContext;
  let token;

  let addProduct = async (productData) => {
    const response = await apiContext.post("/api/BasketItems/", {
      data: {
        productData,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status()).toBe(200);
    return response;
  };

  test.beforeAll(async ({}) => {
    apiContext = await request.newContext({
      baseURL: "https://juice-shop.herokuapp.com",
    });

    // Step 0: Login to the application
    const loginResponse = await apiContext.post("/rest/user/login", {
      data: {
        email: logInCredentials.userName,
        password: logInCredentials.password,
      },
    });
    expect(loginResponse.status()).toBe(200);

    const loginResponseBody = JSON.parse(
      (await loginResponse.body()).toString()
    );

    // Set token
    token = loginResponseBody["authentication"]["token"];
  });

  test(`verify adding single product`, async ({}) => {
    // Step 1: Add 1 item to the basket
    const productAddToBasketResponse = await addProduct(productData.product1);
    expect(productAddToBasketResponse.status()).toBe(200);

    const productAddToBasketResponseBody = JSON.parse(
      (await productAddToBasketResponse.body()).toString()
    );
    const id = productAddToBasketResponseBody["data"]["id"];

    // Step 2: Verify item count in basket
    const basketItemsResponse = await apiContext.get("/rest/basket/18", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const basketItemsResponseBody = JSON.parse(
      (await basketItemsResponse.body()).toString()
    );
    const productCount = basketItemsResponseBody["data"]["Products"].length;
    expect(productCount).toBe(1);

    // Step 3: Delete item
    const deleteResponse = await apiContext.delete(`/api/BasketItems/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(deleteResponse.status()).toBe(200);
  });

  test(`verify adding and deleting product`, async ({}) => {
    // Step 1: Add 1 item to the basket
    await addProduct(productData.product1);
    const id = addProduct(productData.product2);

    // Step 2: Delete one item
    const deleteResponse = await apiContext.delete(`/api/BasketItems/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(deleteResponse.status()).toBe(200);

    // Step 3: Get items from basket
    const basketItemsResponse = await apiContext.get("/rest/basket/18", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const basketItemsResponseBody = JSON.parse(
      (await basketItemsResponse.body()).toString()
    );
    const productCount = basketItemsResponseBody["data"]["Products"].length;
    expect(productCount).toBe(2);
  });
});
