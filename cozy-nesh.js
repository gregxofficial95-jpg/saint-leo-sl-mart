
"use strict";

/* =========================================
   COZY NESH CONFIGURATION
========================================= */

const COZY_NESH = {
  brandId: "bcb8cfe4-6eba-41b8-9e74-087f317deca9",
  supabaseUrl: "https://tzjckojpgamjwigxmdja.supabase.co",
  supabaseAnonKey: "sb_publishable_gC9-plPxXV0qd7aeAUZWmA_qSGWETX4",
  whatsappNumber: "2348083852696",
  brandName: "Cozy Nesh"
};

/* =========================================
   PRODUCT DATA
========================================= */

const products = [
  { id: 1, name: "Cozy Nesh 01", price: 3000, image: "cozy-nesh-1.jpeg" },
  { id: 2, name: "Cozy Nesh 02", price: 2500, image: "cozy-nesh-2.jpeg" },
  { id: 3, name: "Cozy Nesh 03", price: 3000, image: "cozy-nesh-3.jpeg" },
  { id: 4, name: "Cozy Nesh 04", price: 3000, image: "cozy-nesh-4.jpeg" },
  { id: 5, name: "Cozy Nesh 05", price: 6000, image: "cozy-nesh-5.jpeg" },
  { id: 6, name: "Cozy Nesh 06", price: 8000, image: "cozy-nesh-6.jpeg" },
  { id: 7, name: "Cozy Nesh 07", price: 15000, image: "cozy-nesh-7.jpeg" },
  { id: 8, name: "Cozy Nesh 08", price: 10000, image: "cozy-nesh-8.jpeg" },
  { id: 9, name: "Cozy Nesh 09", price: 17000, image: "cozy-nesh-9.jpeg" },
  { id: 10, name: "Cozy Nesh 10", price: 10000, image: "cozy-nesh-10.jpeg" }
];

const quantities = {};
const cart = new Map();

const money = amount =>
  "₦" + Number(amount).toLocaleString("en-NG");

const getProduct = id =>
  products.find(product => product.id === Number(id));

const getCartCount = () =>
  [...cart.values()].reduce((sum, item) => sum + item.quantity, 0);

const getCartTotal = () =>
  [...cart.values()].reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

/* =========================================
   ELEMENTS
========================================= */

const productGrid = document.getElementById("productGrid");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const floatingCartCount = document.getElementById("floatingCartCount");
const floatingCartTotal = document.getElementById("floatingCartTotal");
const cartSubtotal = document.getElementById("cartSubtotal");
const checkoutTotal = document.getElementById("checkoutTotal");
const floatingCart = document.getElementById("floatingCart");
const checkoutForm = document.getElementById("checkoutForm");
const submitButton = document.getElementById("submitOrder");
const formStatus = document.getElementById("formStatus");

/* =========================================
   RENDER PRODUCTS
========================================= */

function renderProducts() {
  if (!productGrid) {
    console.error('Cozy Nesh: Could not find "#productGrid" in the HTML.');
    return;
  }

  productGrid.innerHTML = products.map(product => `
    <article class="product-card">
      <div class="product-image-wrap">
        <img
          src="${product.image}"
          alt="Cozy Nesh product ${product.id}"
          loading="${product.id <= 4 ? "eager" : "lazy"}"
          decoding="async"
          onerror="this.style.opacity='0'; this.parentElement.classList.add('image-missing');"
        >
        <span class="product-number">
          CN — ${String(product.id).padStart(2, "0")}
        </span>
      </div>

      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">${money(product.price)}</p>

        <div class="product-controls">
          <div class="quantity-control">
            <button
              type="button"
              aria-label="Decrease quantity of product ${product.id}"
              data-quantity-change="-1"
              data-id="${product.id}">−</button>

            <span class="quantity-value" id="quantity-${product.id}">1</span>

            <button
              type="button"
              aria-label="Increase quantity of product ${product.id}"
              data-quantity-change="1"
              data-id="${product.id}">+</button>
          </div>

          <button
            class="add-to-cart"
            type="button"
            data-add="${product.id}">
            Add to Bag +
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

/* =========================================
   PRODUCT QUANTITY CONTROLS
========================================= */

function changeProductQuantity(id, change) {
  const current = quantities[id] || 1;
  quantities[id] = Math.max(1, Math.min(99, current + change));

  const display = document.getElementById(`quantity-${id}`);
  if (display) display.textContent = quantities[id];
}

if (productGrid) {
  productGrid.addEventListener("click", event => {
    const quantityButton = event.target.closest("[data-quantity-change]");
    const addButton = event.target.closest("[data-add]");

    if (quantityButton) {
      changeProductQuantity(
        Number(quantityButton.dataset.id),
        Number(quantityButton.dataset.quantityChange)
      );
    }

    if (addButton) {
      const id = Number(addButton.dataset.add);
      const quantity = quantities[id] || 1;

      addToCart(id, quantity);

      addButton.textContent = "Added ✓";

      setTimeout(() => {
        addButton.textContent = "Add to Bag +";
      }, 900);
    }
  });
}

/* =========================================
   CART
========================================= */

function addToCart(id, quantity = 1) {
  const product = getProduct(id);
  if (!product) return;

  const existing = cart.get(id);
  const nextQuantity = Math.min(
    99,
    (existing ? existing.quantity : 0) + quantity
  );

  cart.set(id, {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    quantity: nextQuantity
  });

  renderCart();
}

function updateCartQuantity(id, change) {
  const item = cart.get(id);
  if (!item) return;

  const nextQuantity = item.quantity + change;

  if (nextQuantity <= 0) {
    cart.delete(id);
  } else {
    item.quantity = Math.min(99, nextQuantity);
    cart.set(id, item);
  }

  renderCart();
}

function renderCart() {
  const items = [...cart.values()];
  const count = getCartCount();
  const total = getCartTotal();

  if (cartCount) cartCount.textContent = count;
  if (floatingCartCount) floatingCartCount.textContent = count;
  if (floatingCartTotal) floatingCartTotal.textContent = money(total);
  if (cartSubtotal) cartSubtotal.textContent = money(total);
  if (checkoutTotal) checkoutTotal.textContent = money(total);

  if (floatingCart) floatingCart.classList.toggle("visible", count > 0);
  document.body.classList.toggle("has-cart", count > 0);

  if (!cartItems) return;

  if (items.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <span class="empty-icon">◇</span>
        <p>Your bag is waiting.</p>
        <span>Add something from the collection.</span>
        <a href="#collection" class="text-link">Browse products ↗</a>
      </div>
    `;
    return;
  }

  cartItems.innerHTML = items.map(item => `
    <div class="cart-row">
      <img
        class="cart-thumb"
        src="${item.image}"
        alt="${item.name}"
        loading="lazy">

      <div>
        <div class="cart-product-name">${item.name}</div>
        <div class="cart-product-price">${money(item.price)} each</div>

        <div class="cart-row-controls">
          <button type="button" data-cart-change="-1"
            data-id="${item.id}" aria-label="Decrease ${item.name}">−</button>

          <span>${item.quantity}</span>

          <button type="button" data-cart-change="1"
            data-id="${item.id}" aria-label="Increase ${item.name}">+</button>

          <button type="button" class="remove-item"
            data-remove="${item.id}" aria-label="Remove ${item.name}">×</button>
        </div>
      </div>

      <div class="cart-line-total">
        ${money(item.price * item.quantity)}
      </div>
    </div>
  `).join("");
}

if (cartItems) {
  cartItems.addEventListener("click", event => {
    const quantityButton = event.target.closest("[data-cart-change]");
    const removeButton = event.target.closest("[data-remove]");

    if (quantityButton) {
      updateCartQuantity(
        Number(quantityButton.dataset.id),
        Number(quantityButton.dataset.cartChange)
      );
    }

    if (removeButton) {
      cart.delete(Number(removeButton.dataset.remove));
      renderCart();
    }
  });
}

const clearCartButton = document.getElementById("clearCart");

if (clearCartButton) {
  clearCartButton.addEventListener("click", () => {
    cart.clear();
    renderCart();
  });
}

function goToCart() {
  const checkout = document.getElementById("checkout");

  if (checkout) {
    checkout.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

const navCart = document.getElementById("navCart");

if (navCart) navCart.addEventListener("click", goToCart);
if (floatingCart) floatingCart.addEventListener("click", goToCart);

/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

function closeMenu() {
  if (!navigation || !menuToggle) return;

  navigation.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
}

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  navigation.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });
}

const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

/* =========================================
   SUPABASE ORDER TRACKING
========================================= */

function getFunctionUrl() {
  const url = COZY_NESH.supabaseUrl.trim().replace(/\/+$/, "");

  if (!url.startsWith("https://")) {
    throw new Error("Please check your Supabase project URL.");
  }

  return `${url}/functions/v1/submit-brand-order`;
}

function setFormStatus(message, isError = false) {
  if (!formStatus) return;

  formStatus.textContent = message;
  formStatus.classList.toggle("error", isError);
}

function buildOrderDetails(items, note) {
  const lines = items.map(item =>
    `${item.product_name} × ${item.quantity} — ${money(item.unit_price * item.quantity)}`
  );

  lines.push("");
  lines.push(`Items total: ${money(getCartTotal())}`);

  if (note) {
    lines.push("");
    lines.push(`Customer note: ${note}`);
  }

  return lines.join("\n");
}

async function submitBrandOrder(payload) {
  const response = await fetch(getFunctionUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok || result.success !== true || !result.order_number) {
    throw new Error(
      result.error || "Your order could not be recorded. Please try again."
    );
  }

  return result;
}

/* =========================================
   CHECKOUT SUBMISSION
========================================= */

if (checkoutForm) {
  checkoutForm.addEventListener("submit", async event => {
    event.preventDefault();

    if (!submitButton || submitButton.disabled) return;

    if (cart.size === 0) {
      setFormStatus("Please add at least one product to your bag.", true);

      const collection = document.getElementById("collection");
      if (collection) {
        collection.scrollIntoView({ behavior: "smooth" });
      }

      return;
    }

    const customerName =
      document.getElementById("customerName")?.value.trim() || "";

    const customerPhone =
      document.getElementById("customerPhone")?.value.trim() || "";

    const deliveryAddress =
      document.getElementById("deliveryAddress")?.value.trim() || "";

    const orderNote =
      document.getElementById("orderNote")?.value.trim() || "";

    const website =
      document.getElementById("website")?.value.trim() || "";

    if (!customerName || !customerPhone) {
      setFormStatus("Please enter your name and phone number.", true);
      return;
    }

    const items = [...cart.values()].map(item => ({
      product_name: item.name,
      quantity: item.quantity,
      unit_price: item.price
    }));

    const total = getCartTotal();

    const payload = {
      brand_id: COZY_NESH.brandId,
      customer_name: customerName,
      customer_phone: customerPhone,
      delivery_address: deliveryAddress,
      request_type: "order",
      request_details: buildOrderDetails(items, orderNote),
      items,
      website
    };

    submitButton.disabled = true;
    submitButton.textContent = "Recording your order...";
    setFormStatus("Please wait while we record your order.");

    try {
      const result = await submitBrandOrder(payload);

      const whatsappLines = [
        `Hello ${COZY_NESH.brandName}! I'd like to confirm my order.`,
        "",
        `Order reference: ${result.order_number}`,
        `Name: ${customerName}`,
        `Phone: ${customerPhone}`,
        `Delivery address: ${deliveryAddress || "To be discussed"}`,
        "",
        "MY ORDER:"
      ];

      items.forEach(item => {
        whatsappLines.push(
          `- ${item.product_name} × ${item.quantity} — ${money(item.unit_price * item.quantity)}`
        );
      });

      whatsappLines.push("");
      whatsappLines.push(`ITEMS TOTAL: ${money(total)}`);

      if (orderNote) {
        whatsappLines.push("");
        whatsappLines.push(`Additional note: ${orderNote}`);
      }

      whatsappLines.push("");
      whatsappLines.push(
        "Please confirm availability and delivery arrangements. Thank you!"
      );

      const whatsappUrl =
        `https://wa.me/${COZY_NESH.whatsappNumber}?text=` +
        encodeURIComponent(whatsappLines.join("\n"));

      setFormStatus(
        `Order ${result.order_number} recorded successfully. Opening WhatsApp...`
      );

      submitButton.textContent = "Order Recorded ✓";

      window.location.assign(whatsappUrl);

    } catch (error) {
      console.error("Cozy Nesh order submission error:", error);

      setFormStatus(
        error.message || "We couldn't record your order. Please try again.",
        true
      );

      submitButton.disabled = false;
      submitButton.innerHTML = 'Submit Order <span>↗</span>';
    }
  });
}

/* =========================================
   INITIALIZE
========================================= */

renderProducts();
renderCart();



/* =========================================
   INTRO SCREEN
========================================= */

const introScreen = document.getElementById("introScreen");

if (introScreen) {
  window.setTimeout(() => {
    introScreen.classList.add("intro-hidden");
  }, 2000);

  introScreen.addEventListener("transitionend", event => {
    if (
      event.target === introScreen &&
      introScreen.classList.contains("intro-hidden")
    ) {
      introScreen.remove();
    }
  });
}
