/* ================= INTRO SCREEN ================= */

const introScreen = document.getElementById("introScreen");

if (introScreen) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      introScreen.classList.add("hide");
    }, 3000);
  });
}


/* ================= MOBILE MENU ================= */

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileClose = document.getElementById("mobileClose");
const mobileLinks = document.querySelectorAll(".mobile-menu a");

function openMobileMenu() {
  if (!mobileMenu || !menuToggle) return;

  mobileMenu.classList.add("open");
  document.body.classList.add("menu-open");
  menuToggle.setAttribute("aria-expanded", "true");
}

function closeMobileMenu() {
  if (!mobileMenu || !menuToggle) return;

  mobileMenu.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

if (menuToggle) {
  menuToggle.addEventListener("click", openMobileMenu);
}

if (mobileClose) {
  mobileClose.addEventListener("click", closeMobileMenu);
}

mobileLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});


/* ================= DIGITAL MENU CART ================= */

const menuItems = document.querySelectorAll(".menu-item");
const cartItemsContainer = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const placeOrderBtn = document.getElementById("placeOrderBtn");

const cart = new Map();


function formatNaira(amount) {
  return `₦${amount.toLocaleString("en-NG")}`;
}


function updateCart() {
  if (!cartItemsContainer || !cartCount || !cartTotal) return;

  cartItemsContainer.innerHTML = "";

  let totalItems = 0;
  let totalPrice = 0;

  if (cart.size === 0) {
    cartItemsContainer.innerHTML = `
      <p class="empty-cart">
        Your order is empty. Tap a menu item to begin.
      </p>
    `;
  }

  cart.forEach((item, key) => {
    totalItems += item.quantity;
    totalPrice += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
      <div class="cart-item-info">
        <span class="cart-item-name">${item.name}</span>
        <span class="cart-item-price">
          ${formatNaira(item.price * item.quantity)}
        </span>
      </div>

      <div class="cart-item-controls">
        <button type="button" data-action="decrease" data-key="${key}">
          −
        </button>

        <span>${item.quantity}</span>

        <button type="button" data-action="increase" data-key="${key}">
          +
        </button>

        <button type="button" data-action="remove" data-key="${key}">
          ×
        </button>
      </div>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  cartCount.textContent = `${totalItems} ${
    totalItems === 1 ? "item" : "items"
  }`;

  cartTotal.textContent = formatNaira(totalPrice);

  document.querySelectorAll(".menu-item").forEach((button) => {
    const key = `${button.dataset.name}-${button.dataset.price}`;

    button.classList.toggle("selected", cart.has(key));
  });
}


/* ================= ADD ITEMS TO CART ================= */

menuItems.forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = Number(button.dataset.price);
    const key = `${name}-${price}`;

    if (cart.has(key)) {
      cart.get(key).quantity += 1;
    } else {
      cart.set(key, {
        name,
        price,
        quantity: 1
      });
    }

    updateCart();
  });
});


/* ================= CART CONTROLS ================= */

if (cartItemsContainer) {
  cartItemsContainer.addEventListener("click", (event) => {
    const button = event.target.closest("button");

    if (!button) return;

    const action = button.dataset.action;
    const key = button.dataset.key;

    if (!cart.has(key)) return;

    const item = cart.get(key);

    if (action === "increase") {
      item.quantity += 1;
    }

    if (action === "decrease") {
      item.quantity -= 1;

      if (item.quantity <= 0) {
        cart.delete(key);
      }
    }

    if (action === "remove") {
      cart.delete(key);
    }

    updateCart();
  });
}


/* ================= WHATSAPP ORDER ================= */

if (placeOrderBtn) {
  placeOrderBtn.addEventListener("click", () => {

    if (cart.size === 0) {
      alert("Please select at least one item before placing your order.");
      return;
    }

    let message = "Hello Igbafe Bakes and Frames!%0A%0A";
    message += "*My Order:*%0A";

    let totalPrice = 0;

    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      totalPrice += itemTotal;

      message += `${item.quantity}x ${item.name} — ${formatNaira(itemTotal)}%0A`;
    });

    message += `%0A*Total: ${formatNaira(totalPrice)}*%0A%0A`;
    message += "I would like to place this order. Please confirm availability.";

    const whatsappURL =
      `https://wa.me/2349075964045?text=${message}`;

    window.open(whatsappURL, "_blank");
  });
}


/* ================= CURRENT YEAR ================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}