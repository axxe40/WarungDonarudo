// LOGIN
function login(event) {
  event.preventDefault();
  let username = document.getElementById("username").value;
  let uang = document.getElementById("jumlahUang").value;

  if (!username || !uang) {
    alert("Tolong isi yang benar!");
  } else {
    // alert(`Hello ${username}! Selamat Berbelanja`)
    let catalogPage = document.getElementById("catalogPage");
    catalogPage.classList = [];

    let loginPage = document.getElementById("loginPage");
    loginPage.classList = ["hide"];
  }
  let namaPelanggan = document.getElementById("nama");
  namaPelanggan.innerText = `Hello, Welcome ${username}!`;

  let walletPelanggan = document.getElementById("wallet");
  walletPelanggan.innerText = `Rp. ${(+uang).toLocaleString()}`;
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

let cartItems = [];

function updateCart() {
  //initialization
  let cartItemsList = document.getElementById("cart-items");
  //console.log(cartItems)
  let totalPrice = 0;
  if (cartItems.length != 0) {
    for (let item of cartItems) {
      totalPrice += item.quantity * item.price;
    }
  }

  let ppn = totalPrice * 0.11;
  let service = totalPrice * 0.15;
  let grandTotal = totalPrice + ppn + service;

  let totalAmountElement = document.getElementById("totalAmount");
  totalAmountElement.innerHTML = `Rp. ${grandTotal.toLocaleString()}`;

  let tempHTML = "";

  //for loop cart content to be displayed
  for (let index in cartItems) {
    let item = cartItems[index];
    tempHTML += `
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
  }

  cartItemsList.innerHTML = tempHTML;

  let uangStr = document.getElementById("jumlahUang").value;
  let uang = parseFloat(uangStr.replace(/,/g, ""));
  let balanceStatusElement = document.getElementById("balanceStatus");
  // console.log("uang "+uang+ typeof uang);
  // console.log("grandTotal "+grandTotal+ typeof grandTotal);
  if (grandTotal > uang) {
    balanceStatusElement.innerHTML = "Saldo tidak mencukupi!!!";
  } else if (grandTotal == 0) {
    balanceStatusElement.innerHTML = "Pesen dulu cuy!";
  } else {
    balanceStatusElement.innerHTML = "Lanjut ke pembayaran -->";
  }
}

function addQty(productId) {
  for (let item of cartItems) {
    if (item.id == productId) {
      item.quantity += 1;
    }
  }
  updateCart();
}

function substractQty(productId) {
  for (let item of cartItems) {
    if (item.id == productId) {
      item.quantity -= 1;
    }
  }
  let cartTemp = [];
  for (let item of cartItems) {
    if (item.quantity <= 0) {
      continue;
    } else {
      cartTemp.push(item);
    }
  }
  cartItems = cartTemp;
  updateCart();
}

function addToCart(productId) {
  for (let item of cartItems) {
    if (item.id == productId) {
      addQty(productId);
      return;
    }
  }

  for (let item of catalogItems) {
    if (item.id == productId) {
      let { id, name, price } = item;
      cartItems.push({ id, name, price, quantity: 1 });
    }
  }
  // console.log(cartItems);
  updateCart();
}
