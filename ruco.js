/* =========================================
   RUCO TREATS
   PRODUCT MENU + CART + WHATSAPP CHECKOUT
========================================= */

const WHATSAPP_NUMBER = "2347068586599";
const CART_STORAGE_KEY = "rucoTreatsCart";

/* =========================================
   INTRO
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const introScreen = document.getElementById("introScreen");

  if (!introScreen) return;

  setTimeout(() => {
    introScreen.classList.add("hide");
  }, 2800);
});

/* =========================================
   BANANA BREAD PRODUCTS
========================================= */

const bananaBreadItems = [
  {
    name: "Classic Banana Bread",
    prices: { Mini: 1200, Regular: 3500, Large: 7000 }
  },
  {
    name: "Oreo Banana Bread",
    prices: { Mini: 1500, Regular: 4500, Large: 9000 }
  },
  {
    name: "Nutella Banana Bread",
    prices: { Mini: 1500, Regular: 4500, Large: 9000 }
  },
  {
    name: "Lotus Banana Bread",
    prices: { Mini: 1500, Regular: 4500, Large: 9000 }
  },
  {
    name: "Dates Banana Bread",
    prices: { Mini: 1500, Regular: 4500, Large: 9000 }
  },
  {
    name: "Double Banana Bread",
    prices: { Mini: 1500, Regular: 5000, Large: 10000 }
  },
  {
    name: "Oreos And Chocolate",
    prices: { Mini: 1500, Regular: 5000, Large: 10000 }
  },
  {
    name: "Coconut Banana Bread",
    prices: { Mini: 1500, Regular: 4500, Large: 9000 }
  },
  {
    name: "Chocolate Banana Bread",
    prices: { Mini: 1500, Regular: 4500, Large: 9000 }
  },
  {
    name: "Sugarless Banana Bread",
    prices: { Mini: 1500, Regular: 4000, Large: 8000 }
  }
];

/* =========================================
   DESSERTS
   ORIGINAL IMAGE FILENAMES PRESERVED
========================================= */

const desserts = [
  {
    name: "Fudcy Chocolate Cake",
    description:
      "A rich ultra-moist chocolate cake soaked in a silky glossy chocolate ganache. Every spoon is intensely chocolatey, soft, fudgy and melts in your mouth.",
    price: 4500,
    image: "./ruco-chocolate.jpeg",
    bestSeller: true
  },
  {
    name: "Velvety Lava Cake",
    description:
      "Soft, rich red velvet cake layered with smooth, silky white chocolate ganache finished with red lava which you get to pour yourself.",
    price: 5000,
    image: "./ruco-velvet.jpeg"
  },
  {
    name: "Coconuty Delight",
    description:
      "Cloud vanilla cake soaked in milk mixture, layered with smooth milk pudding and topped with freshly grated coconut.",
    price: 5000,
    image: "./ruco-coconut.jpeg"
  },
  {
    name: "Red Velvet Dream",
    description:
      "Moist red velvet cake with a creamy cheese frosting with a tangy finish.",
    price: 5000,
    image: "./ruco-dream.jpeg"
  }
];

/* =========================================
   ELEMENTS
========================================= */

const cartButton = document.getElementById("cartButton");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const closeCartButton = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");
const dessertList = document.getElementById("dessertList");
const toast = document.getElementById("toast");

/* =========================================
   CART STORAGE
========================================= */

function loadCart() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(CART_STORAGE_KEY) || "[]"
    );

    if (!Array.isArray(saved)) return [];

    return saved.filter(item =>
      item &&
      typeof item.name === "string" &&
      typeof item.variant === "string" &&
      Number.isFinite(Number(item.unitPrice)) &&
      Number(item.unitPrice) >= 0 &&
      Number.isFinite(Number(item.quantity)) &&
      Number(item.quantity) > 0
    ).map(item => ({
      name: item.name,
      variant: item.variant,
      unitPrice: Number(item.unitPrice),
      quantity: Math.floor(Number(item.quantity))
    }));
  } catch (error) {
    console.warn("Could not load the saved cart.", error);
    return [];
  }
}

let cart = loadCart();

/* =========================================
   HELPERS
========================================= */

function naira(value) {
  return "₦" + Number(value).toLocaleString("en-NG");
}

function getCartTotal() {
  return cart.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
}

function getCartQuantity() {
  return cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
}

let toastTimeout;

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

function saveCart() {
  try {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(cart)
    );
  } catch (error) {
    console.warn("Could not save the cart.", error);
    showToast("Your browser could not save the cart.");
  }

  renderCart();
}

/* =========================================
   ADD PRODUCT TO CART
========================================= */

function addToCart(name, variant, quantity, unitPrice) {
  quantity = Math.floor(Number(quantity));

  if (!Number.isFinite(quantity) || quantity < 1) {
    showToast("Please choose a valid quantity.");
    return;
  }

  const existing = cart.find(item =>
    item.name === name &&
    item.variant === variant &&
    item.unitPrice === unitPrice
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      name,
      variant,
      quantity,
      unitPrice
    });
  }

  saveCart();

  showToast(`${name} added to your order.`);
}

/* =========================================
   BANANA BREAD CARD CONTROLS
========================================= */

function setupBananaBreadCards() {
  const cards = document.querySelectorAll(".product-card");

  cards.forEach(card => {
    const index = Number(card.dataset.product);
    const product = bananaBreadItems[index];

    if (!product) return;

    const sizeSelect = card.querySelector(".product-size");
    const quantityDisplay = card.querySelector(".product-quantity");
    const addButton = card.querySelector(".add-button");
    const minusButton = card.querySelector('[data-qty="minus"]');
    const plusButton = card.querySelector('[data-qty="plus"]');

    let quantity = 1;

    function updateQuantity() {
      quantityDisplay.textContent = quantity;
    }

    minusButton.addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        updateQuantity();
      }
    });

    plusButton.addEventListener("click", () => {
      quantity++;
      updateQuantity();
    });

    addButton.addEventListener("click", () => {
      const size = sizeSelect.value;
      const unitPrice = product.prices[size];

      if (!unitPrice) {
        showToast("Please select a valid size.");
        return;
      }

      addToCart(product.name, size, quantity, unitPrice);

      quantity = 1;
      updateQuantity();
    });
  });
}

/* =========================================
   DESSERT MENU
   IMAGES ARE UNCHANGED
========================================= */

function renderDesserts() {
  dessertList.innerHTML = desserts.map((item, index) => `
    <article class="dessert-item">
      <div class="dessert-copy">
        <h3>${item.name}</h3>
        <p>${item.description}</p>

        <button
          class="dessert-order"
          type="button"
          data-dessert-index="${index}"
        >
          ADD TO ORDER +
        </button>
      </div>

      <div class="dessert-image">
        <img
          src="${item.image}"
          alt="${item.name}"
          loading="lazy"
        >
      </div>

      <div class="dessert-price">
        ${naira(item.price)}
      </div>

      ${item.bestSeller ? `
        <div class="best-seller">
          BEST<br>SELLER
        </div>
      ` : ""}
    </article>
  `).join("");

  dessertList.querySelectorAll(".dessert-order").forEach(button => {
    button.addEventListener("click", () => {
      const item = desserts[Number(button.dataset.dessertIndex)];

      if (!item) return;

      addToCart(item.name, "Regular", 1, item.price);
    });
  });
}

/* =========================================
   RENDER CART
========================================= */

function renderCart() {
  if (!cartItems || !cartCount || !cartTotal) return;

  cartCount.textContent = getCartQuantity();
  cartTotal.textContent = naira(getCartTotal());

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        Your cart is currently empty.
      </div>
    `;

    return;
  }

  cartItems.innerHTML = cart.map((item, index) => `
    <article class="cart-item">
      <div class="cart-item-top">
        <div>
          <div class="cart-item-name">${item.name}</div>

          <div class="cart-item-meta">
            ${item.variant} · ${naira(item.unitPrice)} each
          </div>
        </div>

        <div class="cart-item-price">
          ${naira(item.unitPrice * item.quantity)}
        </div>
      </div>

      <div class="cart-item-controls">
        <button
          type="button"
          data-cart-action="minus"
          data-cart-index="${index}"
          aria-label="Decrease ${item.name} quantity"
        >−</button>

        <span>${item.quantity}</span>

        <button
          type="button"
          data-cart-action="plus"
          data-cart-index="${index}"
          aria-label="Increase ${item.name} quantity"
        >+</button>

        <button
          type="button"
          class="remove-item"
          data-cart-action="remove"
          data-cart-index="${index}"
        >REMOVE</button>
      </div>
    </article>
  `).join("");
}

/* =========================================
   CART ITEM BUTTONS
========================================= */

cartItems.addEventListener("click", event => {
  const button = event.target.closest("[data-cart-action]");

  if (!button) return;

  const index = Number(button.dataset.cartIndex);
  const action = button.dataset.cartAction;
  const item = cart[index];

  if (!item) return;

  if (action === "plus") {
    item.quantity++;
  }

  if (action === "minus") {
    item.quantity--;

    if (item.quantity <= 0) {
      cart.splice(index, 1);
    }
  }

  if (action === "remove") {
    cart.splice(index, 1);
  }

  saveCart();
});

/* =========================================
   OPEN AND CLOSE CART
========================================= */

function openCart() {
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("cart-open");
  closeCartButton.focus();
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("cart-open");
  cartButton.focus();
}

cartButton.addEventListener("click", openCart);
closeCartButton.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

/* =========================================
   WHATSAPP CHECKOUT
========================================= */

function checkoutOnWhatsApp() {
  if (cart.length === 0) {
    showToast("Your cart is empty. Add a treat first.");
    return;
  }

  const lines = cart.map((item, index) =>
    `${index + 1}. ${item.name} — ${item.variant} × ${item.quantity} = ${naira(item.unitPrice * item.quantity)}`
  );

  const message = `Hello Ruco Treats 👋

I'd like to place an order:

${lines.join("\n")}

TOTAL: ${naira(getCartTotal())}

Please confirm my order and let me know the next step.`;

  const whatsappURL =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  const whatsappWindow = window.open(whatsappURL, "_blank");

  if (whatsappWindow) {
    whatsappWindow.opener = null;
  } else {
    // Fallback if the browser blocks a new tab.
    window.location.href = whatsappURL;
  }
}

checkoutButton.addEventListener("click", checkoutOnWhatsApp);

/* =========================================
   KEYBOARD
========================================= */

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && cartDrawer.classList.contains("open")) {
    closeCart();
  }
});

/* =========================================
   INITIALIZE
========================================= */

setupBananaBreadCards();
renderDesserts();
renderCart();
