import { Locator, Page } from "@playwright/test";
import { logInCredentials } from "../pageData/pageData";

export default class LoginPage {
  page: Page;
  dismissBtn: Locator;
  accountOption: Locator;
  logInOption: Locator;
  emailInputField: Locator;
  passwordInputField: Locator;
  loginBtn: Locator;
  addToBasketBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dismissBtn = page.locator("text='Dismiss'");
    this.accountOption = page.locator("text=' Account '");
    this.logInOption = page.locator("#navbarLoginButton");
    this.loginBtn = page.locator("#loginButton");
    this.emailInputField = page.locator("input[name=email]");
    this.passwordInputField = page.locator("input[name=password]");
  }

  async logIntoApplication() {
    await this.dismissBtn.click();
    await this.accountOption.nth(1).click();
    await this.logInOption.click();
    await this.emailInputField.fill(logInCredentials.userName);
    await this.passwordInputField.fill(logInCredentials.password);
    await this.loginBtn.click();
  }
}
