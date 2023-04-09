import { Locator, Page } from "@playwright/test";
import { checkOutInformation } from "../pageData/pageData";

export default class CheckoutPage {
  page: Page;
  checkOutBtn: Locator;

  // Address
  addNewAddressBtn: Locator;
  countryInputField: Locator;
  nameInputField: Locator;
  mobileNumberInputField: Locator;
  zipCodeInputField: Locator;
  addressInputField: Locator;
  cityInputField: Locator;
  stateInputField: Locator;
  submitBtn: Locator;
  selectRadioBtn: Locator;
  continueBtn: Locator;

  // Payment
  selectField: Locator;
  inputTextField: Locator;
  addNewCardOption: Locator;
  cardNameInputField: Locator;
  cardNumberInputField: Locator;
  expiryMonthInputField: Locator;
  expiryYearInputField: Locator;

  placeOrderBtn: Locator;
  purchaseSuccessMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkOutBtn = page.locator("text=' Checkout '");

    // Address
    this.addNewAddressBtn = page.locator("text='Add New Address'");
    this.countryInputField = page.locator(
      "input[placeholder='Please provide a country.']"
    );
    this.nameInputField = page.locator(
      "input[placeholder='Please provide a name.']"
    );
    this.mobileNumberInputField = page.locator(
      "input[placeholder='Please provide a mobile number.']"
    );
    this.zipCodeInputField = page.locator(
      "input[placeholder='Please provide a ZIP code.']"
    );
    this.addressInputField = page.locator(
      "textarea[placeholder='Please provide an address.']"
    );
    this.cityInputField = page.locator(
      "input[placeholder='Please provide a city.']"
    );
    this.stateInputField = page.locator(
      "input[placeholder='Please provide a state.']"
    );
    this.submitBtn = page.locator("text=' Submit '");
    this.selectRadioBtn = page.locator("span.mat-radio-outer-circle");

    // Payment
    this.inputTextField = page.locator("input[type=text]");
    this.selectField = page.locator("select");
    this.addNewCardOption = page.locator("text=' Add new card '");
    this.cardNameInputField = this.page.locator(
      "//*[text()='Name']/parent::label/parent::span/preceding-sibling::input"
    );
    this.cardNumberInputField = this.page.locator(
      "//*[text()='Card Number']/parent::label/parent::span/preceding-sibling::input"
    );
    this.expiryMonthInputField = this.selectField.nth(0);
    this.expiryYearInputField = this.selectField.nth(1);

    this.continueBtn = page.locator("text='Continue'");
    this.placeOrderBtn = page.locator("text='Place your order and pay'");
    this.purchaseSuccessMsg = page.locator(
      "text='Thank you for your purchase!'"
    );
  }

  async clickOnCheckOut() {
    await this.checkOutBtn.click();
  }

  async addNewAddress() {
    await this.addNewAddressBtn.click();
    await this.countryInputField.fill("Country");
    await this.nameInputField.fill("Name");
    await this.mobileNumberInputField.fill("1000000000");
    await this.zipCodeInputField.fill("24234");
    await this.addressInputField.fill("adress");
    await this.cityInputField.fill("City");
    await this.stateInputField.fill("State");
    await this.submitBtn.click();
  }

  async selectAddressAndContinue() {
    await this.selectRadioBtn.nth(0).click();
    await this.continueBtn.click();
  }

  async chooseDeliverySpeedAndContinue() {
    await this.selectRadioBtn.nth(0).click();
    await this.continueBtn.click();
  }

  async addNewCard() {
    await this.addNewCardOption.click();
    await this.cardNameInputField.fill("name");
    await this.cardNumberInputField.fill("2342342342322332");
    await this.expiryMonthInputField.selectOption("2");
    await this.expiryYearInputField.selectOption("2080");
    await this.submitBtn.click();
  }

  async selectPaymentOptionAndContinue() {
    await this.selectRadioBtn.nth(0).click();
    await this.continueBtn.click();
  }

  async clickOnPlaceOrder() {
    await this.placeOrderBtn.click();
  }
}
