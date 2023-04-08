import { test, expect } from "@playwright/test";
import CheckoutPage from "../../pageObjects/CheckoutPage";
import InventoryPage from "../../pageObjects/InventoryPage";
import LoginPage from "../../pageObjects/LoginPage";
import { URLS } from "../../pageData/pageData";

test(`Verify completing order with single item`, async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const checkOutPage = new CheckoutPage(page);

  // Step 0: Navigate to login page
  await page.goto("/");

  // Step 1: Login
  await loginPage.logIntoApplication();

  // Step 2: Add product to basket
  await inventoryPage.addProductToBasket();
  await expect(inventoryPage.cartCount).toHaveText("1");

  // Step 3: Go to basket
  await inventoryPage.goToBasket();

  // Step 4: Click on Checkout and add address
  await checkOutPage.clickOnCheckOut();
  await checkOutPage.addNewAddress();

  // Step 5: Select address and continue
  await checkOutPage.selectAddressAndContinue();

  // Step 6:  Select delivery speed and continue
  await checkOutPage.chooseDeliverySpeedAndContinue();

  // Step 7:  Add new card , select payment option and continue
  await checkOutPage.addNewCard();
  await checkOutPage.selectPaymentOptionAndContinue();

  // Step 8: Place order and verify order successfully placed
  await checkOutPage.clickOnPlaceOrder();
  await expect(checkOutPage.purchaseSuccessMsg).toBeVisible();
});
