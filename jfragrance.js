
/* =========================================================
   J FRAGRANCE — WEBSITE + SUPABASE ORDER TRACKING
========================================================= */

const BRAND_ID = "1b522451-b4a1-4c0c-b4f9-1d0f207f657b";
const ORDER_ENDPOINT = "https://tzjckojpgamjwigxmdja.supabase.co/functions/v1/submit-brand-order";
const VENDOR_WHATSAPP = "2349130567794";

/* =========================================================
   PRODUCT DATA
========================================================= */

const products = [
  {
    id: 1,
    name: "Club de Nuit Intense Man",
    image: "jfragrance-01.jpeg",
    category: "Eau de Parfum",
    variants: [{ name: "Standard", price: 13500 }]
  },
  {
    id: 2,
    name: "Rifaaqat",
    image: "jfragrance-02.jpeg",
    category: "Fragrance",
    variants: [{ name: "Standard", price: 9000 }]
  },
  {
    id: 3,
    name: "Berries Weekend Eau de Parfum",
    image: "jfragrance-03.jpeg",
    category: "Eau de Parfum",
    variants: [{ name: "Standard", price: 9000 }]
  },
  {
    id: 4,
    name: "Supremacy",
    image: "jfragrance-04.jpeg",
    category: "Eau de Parfum",
    variants: [
      { name: "50ml", price: 10000 },
      { name: "100ml", price: 13500 }
    ]
  },
  {
    id: 5,
    name: "Orchid of Love",
    image: "jfragrance-05.jpeg",
    category: "Fragrance",
    variants: [{ name: "Standard", price: 8000 }]
  },
  {
    id: 6,
    name: "Incidence",
    image: "jfragrance-06.jpeg",
    category: "Fragrance",
    variants: [{ name: "Standard", price: 10000 }]
  },
  {
    id: 7,
    name: "Eau de Parfum Set",
    image: "jfragrance-07.jpeg",
    category: "Gift Set",
    variants: [{ name: "Set", price: 17000 }]
  },
  {
    id: 8,
    name: "Barcrat Set",
    image: "jfragrance-08.jpeg",
    category: "Gift Set",
    variants: [{ name: "Set", price: 17000 }]
  },
  {
    id: 9,
    name: "9PM",
    image: "jfragrance-09.jpeg",
    category: "Eau de Parfum",
    variants: [
      { name: "30ml", price: 5000 },
      { name: "50ml", price: 8500 }
    ]
  },
  {
    id: 10,
    name: "Matelot",
    image: "jfragrance-10.jpeg",
    category: "Eau de Parfum",
    variants: [{ name: "100ml", price: 18000 }]
  },
  {
    id: 11,
    name: "Ophylia",
    image: "jfragrance-11.jpeg",
    category: "Fragrance",
    variants: [{ name: "50ml", price: 8500 }]
  },
  {
    id: 12,
    name: "Aventos Eau de Parfum",
    image: "jfragrance-12.jpeg",
    category: "Eau de Parfum",
    variants: [
      { name: "50ml", price: 8500 },
      { name: "100ml", price: 18500 }
    ]
  },
  {
    id: 13,
    name: "Vintage Radio",
    image: "jfragrance-13.jpeg",
    category: "Fragrance",
    variants: [
      { name: "35ml", price: 8500 },
      { name: "50ml", price: 15000 }
    ]
  },
  {
    id: 14,
    name: "Imperio Prive",
    image: "jfragrance-14.jpeg",
    category: "Fragrance",
    variants: [{ name: "25ml", price: 5000 }]
  },
  {
    id: 15,
    name: "Eclaire",
    image: "jfragrance-15.jpeg",
    category: "Fragrance",
    variants: [{ name: "50ml", price: 8500 }]
  },
  {
    id: 16,
    name: "Whisper + Bond Elixir",
    image: "jfragrance-16.jpeg",
    category: "Elixir",
    variants: [{ name: "Standard", price: 20000 }]
  },
  {
    id: 17,
    name: "Fragrance Collection",
    image: "jfragrance-17.jpeg",
    category: "Fragrance Collection",
    variants: [
      { name: "Lattafa Asad", price: 10000 },
      { name: "Sugar Baby", price: 10000 },
      { name: "Yara", price: 10000 },
      { name: "Lattafa Khamrah", price: 10000 },
      { name: "Berries Weekend", price: 10000 }
    ]
  }
];

/* =========================================================
   STATE
========================================================= */

let cart = [];

/* =========================================================
   ELEMENTS
========================================================= */

const introScreen = document.getElementById("introScreen");
const site = document.getElementById("site");
const productGrid = document.getElementById("productGrid");

const cartButton = document.getElementById("cartButton");
const cartDrawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");

const checkoutModal = document.getElementById("checkoutModal");
const closeCheckout = document.getElementById("closeCheckout");
const orderForm = document.getElementById("orderForm");

const menuButton = document.getElementById("menuButton");
const mobileNav = document.getElementById("mobileNav");
const mobileBagButton = document.getElementById("mobileBagButton");

/* =========================================================
   INTRO
========================================================= */

window.addEventListener("load", () => {
  document.body.classList.add("no-scroll");

  setTimeout(() => {
    introScreen.classList.add("hide");
    site.classList.add("visible");
    document.body.classList.remove("no-scroll");
  }, 4700);
});

/* =========================================================
   HELPERS
========================================================= */

function formatMoney(amount) {
  return "₦" + Number(amount).toLocaleString("en-NG");
}

function calculateCartTotal() {
  return cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

function setOrderStatus(message, type = "info") {
  let status = document.getElementById("orderStatus");

  if (!status) {
    status = document.createElement("p");
    status.id = "orderStatus";
    status.className = "order-status";

    orderForm.querySelector(".place-order-button")
      .before(status);
  }

  status.textContent = message;
  status.dataset.type = type;
}

/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts() {
  productGrid.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.dataset.productId = product.id;

    const firstVariant = product.variants[0];
    const hasMultipleVariants = product.variants.length > 1;

    const variantHTML = hasMultipleVariants
      ? `
        <select
          class="variant-select"
          data-product-id="${product.id}"
          aria-label="Select size or fragrance for ${product.name}"
        >
          ${product.variants.map((variant, index) => `
            <option value="${index}">
              ${variant.name}
            </option>
          `).join("")}
        </select>
      `
      : "";

    card.innerHTML = `
      <div class="product-image-wrap">
        <span class="product-number">
          ${String(product.id).padStart(2, "0")}
        </span>

        <img
          src="${product.image}"
          alt="${product.name}"
          class="product-image"
          loading="lazy"
        >

        <button
          class="quick-add"
          data-product-id="${product.id}"
          aria-label="Add ${product.name} to bag"
        >+</button>
      </div>

      <div class="product-info">
        <span class="product-category">
          ${product.category}
        </span>

        <h3 class="product-name">
          ${product.name}
        </h3>

        <div class="product-bottom">
          ${variantHTML}

          <span
            class="product-price"
            data-price-for="${product.id}"
          >
            ${formatMoney(firstVariant.price)}
          </span>

          <div class="quantity-control">
            <button
              class="quantity-minus"
              data-product-id="${product.id}"
              aria-label="Decrease quantity"
            >−</button>

            <span data-quantity-for="${product.id}">1</span>

            <button
              class="quantity-plus"
              data-product-id="${product.id}"
              aria-label="Increase quantity"
            >+</button>
          </div>
        </div>
      </div>
    `;

    productGrid.appendChild(card);
  });

  attachProductEvents();
}

/* =========================================================
   PRODUCT EVENTS
========================================================= */

function attachProductEvents() {
  document.querySelectorAll(".variant-select").forEach(select => {
    select.addEventListener("change", () => {
      const productId = Number(select.dataset.productId);
      const product = products.find(item => item.id === productId);
      const variant = product.variants[Number(select.value)];

      document.querySelector(
        `[data-price-for="${productId}"]`
      ).textContent = formatMoney(variant.price);
    });
  });

  document.querySelectorAll(".quick-add").forEach(button => {
    button.addEventListener("click", () => {
      const productId = Number(button.dataset.productId);
      const card = button.closest(".product-card");
      const product = products.find(item => item.id === productId);

      const select = card.querySelector(".variant-select");
      const variantIndex = select ? Number(select.value) : 0;

      const quantity = Number(
        card.querySelector(
          `[data-quantity-for="${productId}"]`
        ).textContent
      );

      addToCart(product, variantIndex, quantity);
    });
  });

  document.querySelectorAll(".quantity-plus").forEach(button => {
    button.addEventListener("click", () => {
      const productId = Number(button.dataset.productId);
      const card = button.closest(".product-card");
      const quantity = card.querySelector(
        `[data-quantity-for="${productId}"]`
      );

      quantity.textContent = Number(quantity.textContent) + 1;
    });
  });

  document.querySelectorAll(".quantity-minus").forEach(button => {
    button.addEventListener("click", () => {
      const productId = Number(button.dataset.productId);
      const card = button.closest(".product-card");
      const quantity = card.querySelector(
        `[data-quantity-for="${productId}"]`
      );

      const current = Number(quantity.textContent);

      if (current > 1) {
        quantity.textContent = current - 1;
      }
    });
  });
}

/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(product, variantIndex = 0, quantity = 1) {
  const variant = product.variants[variantIndex];

  const existing = cart.find(item =>
    item.productId === product.id &&
    item.variantIndex === variantIndex
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      productId: product.id,
      variantIndex,
      name: product.name,
      image: product.image,
      variant: variant.name,
      price: variant.price,
      quantity
    });
  }

  updateCart();
  openCart();
}

/* =========================================================
   CART
========================================================= */

function updateCart() {
  renderCart();

  const count = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  cartCount.textContent = count;
}

function renderCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <span>♢</span>
        <h3>Your bag is empty</h3>
        <p>Add a fragrance to begin your order.</p>
        <button id="startShopping">Explore Fragrances</button>
      </div>
    `;

    const startShopping = document.getElementById("startShopping");

    startShopping.addEventListener("click", () => {
      closeCartDrawer();

      document.getElementById("collection").scrollIntoView({
        behavior: "smooth"
      });
    });

    cartTotal.textContent = "₦0";
    checkoutButton.disabled = true;
    checkoutButton.style.opacity = "0.45";
    return;
  }

  checkoutButton.disabled = false;
  checkoutButton.style.opacity = "1";

  cartItems.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <img
        src="${item.image}"
        alt="${item.name}"
        class="cart-item-image"
      >

      <div class="cart-item-info">
        <h4>${item.name}</h4>

        <div class="cart-item-variant">
          ${item.variant}
        </div>

        <div class="cart-item-price">
          ${formatMoney(item.price)}
        </div>

        <div class="cart-item-controls">
          <button class="cart-minus" data-index="${index}">−</button>
          <span>${item.quantity}</span>
          <button class="cart-plus" data-index="${index}">+</button>
        </div>
      </div>

      <button
        class="remove-item"
        data-index="${index}"
        aria-label="Remove ${item.name}"
      >×</button>
    </div>
  `).join("");

  cartTotal.textContent = formatMoney(calculateCartTotal());

  attachCartEvents();
}

function attachCartEvents() {
  document.querySelectorAll(".cart-plus").forEach(button => {
    button.addEventListener("click", () => {
      cart[Number(button.dataset.index)].quantity++;
      updateCart();
    });
  });

  document.querySelectorAll(".cart-minus").forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);

      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      } else {
        cart.splice(index, 1);
      }

      updateCart();
    });
  });

  document.querySelectorAll(".remove-item").forEach(button => {
    button.addEventListener("click", () => {
      cart.splice(Number(button.dataset.index), 1);
      updateCart();
    });
  });
}

/* =========================================================
   CART DRAWER
========================================================= */

function openCart() {
  cartDrawer.classList.add("active");
  overlay.classList.add("active");
  document.body.classList.add("no-scroll");
}

function closeCartDrawer() {
  cartDrawer.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("no-scroll");
}

cartButton.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartDrawer);
overlay.addEventListener("click", closeCartDrawer);

/* =========================================================
   CHECKOUT MODAL
========================================================= */

checkoutButton.addEventListener("click", () => {
  if (!cart.length) return;

  setOrderStatus("");
  checkoutModal.classList.add("active");
});

closeCheckout.addEventListener("click", () => {
  checkoutModal.classList.remove("active");
});

checkoutModal.addEventListener("click", event => {
  if (event.target === checkoutModal) {
    checkoutModal.classList.remove("active");
  }
});

/* =========================================================
   SUPABASE ORDER SUBMISSION
========================================================= */

orderForm.addEventListener("submit", async event => {
  event.preventDefault();

  if (!cart.length) {
    alert("Please add at least one fragrance to your bag.");
    return;
  }

  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const address = document.getElementById("customerAddress").value.trim();

  if (!name || !phone || !address) {
    setOrderStatus("Please complete all your details.", "error");
    return;
  }

  const submitButton = orderForm.querySelector(".place-order-button");

  if (submitButton.disabled) return;

  const total = calculateCartTotal();

  const orderItems = cart.map(item => ({
    product_name: `${item.name} — ${item.variant}`,
    quantity: item.quantity,
    unit_price: item.price
  }));

  const requestDetails = [
    "Order placed through the J Fragrance website.",
    "",
    ...cart.map((item, index) =>
      `${index + 1}. ${item.name} | ${item.variant} | Qty: ${item.quantity} | ${formatMoney(item.price)} each | Image: ${item.image}`
    ),
    "",
    `Order total: ${formatMoney(total)}`,
    "Delivery fee: To be communicated by the vendor."
  ].join("\n");

  const payload = {
    brand_id: BRAND_ID,
    customer_name: name,
    customer_phone: phone,
    delivery_address: address,
    request_type: "order",
    request_details: requestDetails,
    items: orderItems,
    website: ""
  };

  // Open a blank tab immediately to avoid popup blocking.
  const whatsappTab = window.open("about:blank", "_blank");

  submitButton.disabled = true;
  submitButton.textContent = "Submitting Order...";
  setOrderStatus("Recording your order. Please wait...", "info");

  try {
    const response = await fetch(ORDER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok || !result.success) {
      throw new Error(
        result.error || result.message || "Your order could not be submitted."
      );
    }

    // A genuine saved order must include an order reference.
    if (!result.order_number) {
      throw new Error(
        "The server did not return an order reference. Please contact J Fragrance before trying again. Do not submit repeatedly."
      );
    }

    let message = `J FRAGRANCE — NEW ORDER\n`;
    message += `Order Reference: ${result.order_number}\n\n`;

    message += `CUSTOMER DETAILS\n`;
    message += `Name: ${name}\n`;
    message += `Phone: ${phone}\n`;
    message += `Delivery Address / Hostel: ${address}\n\n`;

    message += `ORDER DETAILS\n`;
    message += `────────────────────\n`;

    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `Size / Variant: ${item.variant}\n`;
      message += `Quantity: ${item.quantity}\n`;
      message += `Price: ${formatMoney(item.price)} each\n`;
      message += `Subtotal: ${formatMoney(item.price * item.quantity)}\n\n`;
    });

    message += `────────────────────\n`;
    message += `TOTAL: ${formatMoney(total)}\n\n`;
    message += `Please confirm my order and let me know the delivery fee.`;

    const whatsappURL =
      `https://wa.me/${VENDOR_WHATSAPP}?text=${encodeURIComponent(message)}`;

    setOrderStatus(
      `Order recorded successfully. Reference: ${result.order_number}`,
      "success"
    );

    // Only clear the cart after a genuine order reference is returned.
    cart = [];
    updateCart();

    orderForm.reset();

    checkoutModal.classList.remove("active");
    closeCartDrawer();

    if (whatsappTab) {
      whatsappTab.location.href = whatsappURL;
    } else {
      window.location.href = whatsappURL;
    }

  } catch (error) {
    if (whatsappTab) whatsappTab.close();

    console.error("J Fragrance order error:", error);

    setOrderStatus(
      error.message || "Something went wrong. Please try again.",
      "error"
    );

  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = `Place Order on WhatsApp <span>→</span>`;
  }
});

/* =========================================================
   MOBILE MENU
========================================================= */

menuButton.addEventListener("click", () => {
  mobileNav.classList.toggle("active");
});

document.querySelectorAll(".mobile-nav a").forEach(link => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("active");
  });
});

mobileBagButton.addEventListener("click", () => {
  mobileNav.classList.remove("active");
  openCart();
});

/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener("keydown", event => {
  if (event.key !== "Escape") return;

  closeCartDrawer();
  checkoutModal.classList.remove("active");
  mobileNav.classList.remove("active");
});

/* =========================================================
   INITIALIZE
========================================================= */

renderProducts();
updateCart();
