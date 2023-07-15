import { test, expect } from "@playwright/test";
import InventoryPage from "../../pageObjects/InventoryPage";
import LoginPage from "../../pageObjects/LoginPage";
import { URLS } from "../../pageData/pageData";

test(`Verify completing order with single item`, async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  // Step 0: Navigate to login page
  await page.goto(URLS.inventoryPage);

  // Step 1: Login
  await loginPage.logIntoApplication();

  // Step 2: Search for "Apple" and verify 2 product showing up
  await inventoryPage.searchProduct("apple");
  await page.waitForTimeout(3000);
  await expect(await inventoryPage.addToBasketBtn.count()).toBe(2);
});
