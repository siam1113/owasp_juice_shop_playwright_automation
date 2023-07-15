export const URLS = {
  homePage: "/",
  inventoryPage: "/inventory.html",
  productPage: "/inventory-item.html",
  cartPage: "/cart.html",
  checkOutPageStepOne: "/checkout-step-one.html",
  checkOutPageStepTwo: "/checkout-step-two.html",
  checkOutPageComplete: "/checkout-complete.html",
  api: "https://juice-shop.herokuapp.com/rest/user/login",
};

export const logInCredentials = {
  userName: process.env.EMAIL,
  password: process.env.PASSWORD,
};

export const productData = {
  product1: { ProductId: 1, BasketId: "6", quantity: 1 },
  product2: { ProductId: 2, BasketId: "6", quantity: 1 },
};
