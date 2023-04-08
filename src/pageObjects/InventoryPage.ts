import { expect, Locator, Page } from "@playwright/test";

export default class InventoryPage {
  page: Page;

  // Basket
  addToBasketBtn: Locator;
  cartCount: Locator;
  yourBasketOption: Locator;
  inputField: Locator;
  searchInputField: Locator;
  searchBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    // Basket
    this.addToBasketBtn = page.locator("text='Add to Basket'");
    this.cartCount = page.locator(":text(' Your Basket') + span");
    this.yourBasketOption = page.locator("text=' Your Basket'");
    this.searchBtn = page.locator("text=' search '");
    this.inputField = page.locator("input");
    this.searchInputField = this.inputField.nth(0);
  }

  async addProductToBasket() {
    await this.addToBasketBtn.nth(0).click();
  }

  async goToBasket() {
    await this.yourBasketOption.click();
  }

  async searchProduct(searchValue: string) {
    await this.searchBtn.click();
    await this.searchInputField.fill(searchValue);
    await this.page.waitForTimeout(3000);
    await this.page.keyboard.press("Enter");
  }
}
