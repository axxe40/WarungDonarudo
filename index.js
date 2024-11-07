// LOGIN
function login(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const uang = document.getElementById("jumlahUang").value;

  if (!username || !uang) {
    alert("Tolong isi yang benar!");
  } else {
    // alert(`Hello ${username}! Selamat Berbelanja`)
    const catalogPage = document.getElementById("catalogPage");
    catalogPage.classList = [];
    const loginPage = document.getElementById("loginPage");
    loginPage.classList = ["hide"];
  }
  const namaPelanggan = document.getElementById("nama");
  namaPelanggan.innerText = `Hello, Welcome ${username}!`;

  const walletPelanggan = document.getElementById("wallet");
  console.log(typeof uang);
  walletPelanggan.innerText = `Rp. ${(+uang).toLocaleString()}`;
}

let cartItems = [];

function updateCart() {
  //initialization
  const cartItemsList = document.getElementById("cart-items");
  const totalPrice =
    cartItems.length == 0
      ? 0
      : cartItems.map((x) => x.quantity * x.price).reduce((a, b) => a + b);

  let ppn = totalPrice * 0.11;
  let service = totalPrice * 0.15;
  let grandTotal = totalPrice + ppn + service;

  const totalAmountElement = document.getElementById("totalAmount");
  totalAmountElement.innerHTML = `Rp. ${grandTotal.toLocaleString()}`;
  cartItemsList.innerHTML = "";

  //for loop cart content to be displayed
  cartItems.forEach((item, index) => {
    cartItemsList.innerHTML += `
            <div class="order-item col-sm-6">
                <div class="item-name">
                    <p>${item.name}</p>
                </div>
                <div class="quantity-controls">
                    <button class="subtract" onclick="substractQty(${
                      item.id
                    })">-</button>
                    <p class="quantity">${item.quantity}</p>
                    <button class="add" onclick="addQty(${item.id})">+</button>
                </div>
                <div class="item-price">
                    <p>Rp. ${(item.price * item.quantity).toLocaleString()}</p>
                </div>
            </div>
        `;
  });
  const uang = document.getElementById("jumlahUang").value;
  const balanceStatusElement = document.getElementById("balanceStatus");
  // console.log("uang "+uang);
  balanceStatusElement.innerHTML =
    totalPrice > uang ? "Saldo tidak mencukupi!!!" : "Lanjut ke pembayaran -->";
  balanceStatusElement.innerHTML =
    totalPrice == 0 ? "Pesen dulu cuy!" : "Lanjut ke pembayaran -->";
}
function addQty(productId) {
  var item = cartItems.find((x) => x.id == productId);
  item.quantity += 1;
  updateCart();
}
function substractQty(productId) {
  var item = cartItems.find((x) => x.id == productId);
  item.quantity -= 1;
  if (item.quantity <= 0) {
    cartItems = cartItems.filter((x) => x.id != productId);
  }
  updateCart();
}

function updateItemQuantity(index, change) {
  event.preventDefault();
  // Change the quantity
  const item = cart[index];
  // console.log("🚀 ~ updateItemQuantity ~ index:", index)

  // if qty is 1, change can proceed whether + or -
  if (item.quantity > 1 || (item.quantity === 1 && change > 0)) {
    item.quantity += change;
  } else if (item.quantity === 1 && change < 0) {
    // else, if qty is 1, and change is (-), remove the item from the cart
    cart.splice(index, 1);
  }

  // Update the cart UI
  updateCart();
}

const catalogItems = [
  {
    id: "1",
    name: "Burger",
    price: 75000,
  },
  {
    id: "2",
    name: "French Fries",
    price: 49000,
  },
  {
    id: "3",
    name: "Pizza Veggie",
    price: 135000,
  },
  {
    id: "4",
    name: "Korean BBQ Chicken",
    price: 99000,
  },
  {
    id: "5",
    name: "New York Sandwich",
    price: 60000,
  },
  {
    id: "6",
    name: "Hot Chocolate",
    price: 49000,
  },
];
function addToCart(productId) {
  if (cartItems.find((x) => x.id == productId)) {
    addQty(productId);
    return;
  }
  var item = catalogItems.find((x) => x.id == productId);
  cartItems = [...cartItems, { ...item, quantity: 1 }];
  // console.log(cartItems);
  updateCart();
}

//note: Grandtotal = totalPrice + ppn 11% + service 15%
// console.log(calculateGrandtotal(cartItems))
/* 
[{
    "total": 257000,
    "ppn": 28270,
    "service": 38550,
    "grandTotal": 323820
}]
*/
