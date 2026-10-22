
/* ================= INTRO SCREEN ================= */

const introScreen = document.getElementById("introScreen");

if (introScreen) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      introScreen.classList.add("hide");
    }, 3000);
  });
}

/* ================= CURRENT YEAR ================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

/* ================= WHATSAPP SETTINGS ================= */

const whatsappNumber = "2349040087581";

/* ================= ALL PRODUCTS ================= */

// Existing six products are retained.
// New products use the filenames established above.

const products = [
  {
    id: "signature-01",
    name: "Signature Look 01",
    price: 21000,
    images: ["mimo-image-01.jpeg"],
    category: "THE EDIT / 01"
  },
  {
    id: "signature-02",
    name: "Signature Look 02",
    price: 19000,
    images: ["mimo-image-02.jpeg"],
    category: "THE EDIT / 02"
  },
  {
    id: "signature-03",
    name: "Signature Look 03",
    price: 18000,
    images: ["mimo-image-03.jpeg"],
    category: "THE EDIT / 03"
  },
  {
    id: "signature-04",
    name: "Signature Look 04",
    price: 25500,
    images: ["mimo-image-04.jpeg"],
    category: "THE EDIT / 04"
  },
  {
    id: "signature-05",
    name: "Signature Look 05",
    price: 19000,
    images: ["mimo-image-05.jpeg"],
    category: "THE EDIT / 05"
  },
  {
    id: "signature-06",
    name: "Signature Look 06",
    price: 21000,
    images: ["mimo-image-06.jpeg"],
    category: "THE EDIT / 06"
  },

  {
    id: "luxury-collar",
    name: "Luxury Collar Neck",
    price: 19000,
    images: makeImages("luxury-collar", 25),
    category: "LUXURY COLLECTION"
  },
  {
    id: "up-and-down",
    name: "Up and Down",
    price: 25000,
    images: makeImages("up-and-down", 3),
    category: "CO-ORD SETS"
  },
  {
    id: "product-03",
    name: "Product 03",
    price: 20000,
    images: makeImages("product-03", 4),
    category: "THE COLLECTION"
  },
  {
    id: "baggies",
    name: "Baggies",
    price: 25500,
    images: makeImages("baggies", 9),
    category: "CASUAL COLLECTION"
  },
  {
    id: "quality-collar-top",
    name: "Quality Collar Top",
    price: 17000,
    images: makeImages("quality-collar-top", 11),
    category: "COLLAR TOPS"
  },
  {
    id: "patterned-shirts",
    name: "Patterned Shirts",
    price: 20000,
    images: makeImages("patterned-shirts", 6),
    category: "STATEMENT SHIRTS"
  },
  {
    id: "vintage-tops",
    name: "Vintage Tops",
    price: 20000,
    images: makeImages("vintage-tops", 2),
    category: "VINTAGE COLLECTION"
  },
  {
    id: "product-08",
    name: "Product 08",
    price: 35000,
    images: makeImages("product-08", 5),
    category: "THE COLLECTION"
  },
  {
    id: "product-09",
    name: "Product 09",
    price: 21000,
    images: makeImages("product-09", 11),
    category: "THE COLLECTION"
  },
  {
    id: "product-10",
    name: "Product 10",
    price: 20000,
    images: makeImages("product-10", 3),
    category: "THE COLLECTION"
  },
  {
    id: "product-11",
    name: "Product 11",
    price: 16000,
    images: makeImages("product-11", 3),
    category: "THE COLLECTION"
  }
];

/* ================= IMAGE FILENAMES ================= */

function makeImages(prefix, count) {
  return Array.from(
    { length: count },
    (_, index) =>
      `${prefix}-${String(index + 1).padStart(2, "0")}.jpeg`
  );
}

/* ================= FORMAT PRICE ================= */

function formatPrice(price) {
  return `₦${price.toLocaleString("en-NG")}`;
}

/* ================= RENDER PRODUCT CARDS ================= */

const collectionGrid = document.getElementById("collectionGrid");

if (collectionGrid) {
  collectionGrid.innerHTML = products.map((product, index) => `
    <article class="product-card ${index === 0 ? "featured-product" : ""}">

      <div class="product-image">

        <span class="product-number">
          ${String(index + 1).padStart(2, "0")} / ${String(products.length).padStart(2, "0")}
        </span>

        <img
          src="${product.images[0]}"
          alt="${product.name}"
          loading="${index < 4 ? "eager" : "lazy"}"
        >

        <span class="design-count">
          ${product.images.length} ${product.images.length === 1 ? "design" : "designs"}
        </span>

      </div>

      <div class="product-info">

        <span class="product-category">${product.category}</span>

        <h3>${product.name}</h3>

        <div class="product-bottom">

          <strong>${formatPrice(product.price)}</strong>

          <button
            class="product-order-btn"
            data-product-id="${product.id}"
          >
            ${product.images.length > 1 ? "Choose Design" : "Add to Cart"}
            <span>↗</span>
          </button>

        </div>

      </div>

    </article>
  `).join("");
}

/* ================= SHOPPING CART DATA ================= */

// Each selected design has its own cart entry.

const cart = new Map();

let activeProduct = null;

const designOverlay = document.getElementById("designOverlay");
const designGrid = document.getElementById("designGrid");
const designTitle = document.getElementById("designTitle");
const designPrice = document.getElementById("designPrice");

const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

/* ================= OPEN PRODUCT DESIGNS ================= */

function openDesigns(product) {
  activeProduct = product;

  designTitle.textContent = product.name;
  designPrice.textContent = `${formatPrice(product.price)} per item`;

  designGrid.innerHTML = product.images.map((image, index) => `
    <article class="design-option">

      <img
        src="${image}"
        alt="${product.name}, design ${index + 1}"
        loading="lazy"
      >

      <div class="design-option-info">
        <span>Design ${String(index + 1).padStart(2, "0")}</span>

        <button
          class="design-add-btn"
          data-product-id="${product.id}"
          data-design="${index}"
        >
          Add to Cart +
        </button>
      </div>

    </article>
  `).join("");

  designOverlay.classList.add("show");
  document.body.classList.add("shop-open");
}

/* ================= ADD ITEMS TO CART ================= */

function addToCart(product, designIndex = 0) {
  const image = product.images[designIndex];
  const key = `${product.id}-${designIndex}`;

  if (cart.has(key)) {
    cart.get(key).quantity += 1;
  } else {
    cart.set(key, {
      key,
      productId: product.id,
      name: product.name,
      price: product.price,
      image,
      designNumber: designIndex + 1,
      quantity: 1
    });
  }

  renderCart();
}

/* ================= PRODUCT BUTTON EVENTS ================= */

if (collectionGrid) {
  collectionGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-product-id]");

    if (!button) return;

    const product = products.find(
      item => item.id === button.dataset.productId
    );

    if (!product) return;

    if (product.images.length > 1) {
      openDesigns(product);
    } else {
      addToCart(product);
    }
  });
}

/* ================= DESIGN BUTTON EVENTS ================= */

if (designGrid) {
  designGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-design]");

    if (!button || !activeProduct) return;

    const designIndex = Number(button.dataset.design);

    addToCart(activeProduct, designIndex);

    button.textContent = "Added ✓";
    button.classList.add("added");

    setTimeout(() => {
      button.textContent = "Add to Cart +";
      button.classList.remove("added");
    }, 900);
  });
}

/* ================= RENDER CART ================= */

function renderCart() {
  const items = Array.from(cart.values());

  const totalQuantity = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  cartCount.textContent = totalQuantity;
  cartTotal.textContent = formatPrice(totalPrice);

  if (!items.length) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <p>Your cart is waiting for something stylish.</p>
        <button class="continue-shopping">Continue Shopping</button>
      </div>
    `;

    return;
  }

  cartItems.innerHTML = items.map(item => `
    <article class="cart-item">

      <img src="${item.image}" alt="${item.name}" loading="lazy">

      <div class="cart-item-details">

        <h3>${item.name}</h3>

        <p>Design ${String(item.designNumber).padStart(2, "0")}</p>

        <strong>${formatPrice(item.price)}</strong>

        <div class="quantity-controls">

          <button
            data-cart-action="decrease"
            data-key="${item.key}"
            aria-label="Decrease quantity"
          >−</button>

          <span>${item.quantity}</span>

          <button
            data-cart-action="increase"
            data-key="${item.key}"
            aria-label="Increase quantity"
          >+</button>

          <button
            class="remove-item"
            data-cart-action="remove"
            data-key="${item.key}"
          >Remove</button>

        </div>

      </div>

      <strong class="cart-line-total">
        ${formatPrice(item.price * item.quantity)}
      </strong>

    </article>
  `).join("");
}

/* ================= CART QUANTITY CONTROLS ================= */

if (cartItems) {
  cartItems.addEventListener("click", (event) => {
    const button = event.target.closest("[data-cart-action]");

    if (button) {
      const item = cart.get(button.dataset.key);

      if (!item) return;

      switch (button.dataset.cartAction) {
        case "increase":
          item.quantity += 1;
          break;

        case "decrease":
          item.quantity -= 1;

          if (item.quantity <= 0) {
            cart.delete(button.dataset.key);
          }

          break;

        case "remove":
          cart.delete(button.dataset.key);
          break;
      }

      renderCart();
      return;
    }

    if (event.target.closest(".continue-shopping")) {
      closeCart();
    }
  });
}

/* ================= OPEN AND CLOSE CART ================= */

function openCart() {
  renderCart();
  cartOverlay.classList.add("show");
  document.body.classList.add("shop-open");
}

function closeCart() {
  cartOverlay.classList.remove("show");
  document.body.classList.remove("shop-open");
}

function closeDesigns() {
  designOverlay.classList.remove("show");
  document.body.classList.remove("shop-open");
}

document.getElementById("cartToggle")?.addEventListener("click", openCart);

document.getElementById("cartClose")?.addEventListener("click", closeCart);

document.getElementById("designClose")?.addEventListener("click", closeDesigns);

document.getElementById("cartItems")?.addEventListener("click", (event) => {
  if (event.target.closest(".continue-shopping")) {
    closeCart();
  }
});

cartOverlay?.addEventListener("click", (event) => {
  if (event.target === cartOverlay) closeCart();
});

designOverlay?.addEventListener("click", (event) => {
  if (event.target === designOverlay) closeDesigns();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCart();
    closeDesigns();
  }
});

/* ================= WHATSAPP CHECKOUT ================= */

document.getElementById("checkoutBtn")?.addEventListener("click", () => {
  const items = Array.from(cart.values());

  if (!items.length) {
    alert("Your cart is empty. Please add an item before checking out.");
    return;
  }

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const orderLines = items.map((item, index) => {
    return (
      `${index + 1}. ${item.name}\n` +
      `   Design: ${String(item.designNumber).padStart(2, "0")}\n` +
      `   Image: ${item.image}\n` +
      `   Quantity: ${item.quantity}\n` +
      `   Unit price: ${formatPrice(item.price)}\n` +
      `   Subtotal: ${formatPrice(item.price * item.quantity)}`
    );
  });

  const message = [
    "Hello Mimo's Collection! 👋",
    "",
    "I'd like to place the following order:",
    "",
    ...orderLines,
    "",
    `TOTAL: ${formatPrice(totalPrice)}`,
    "",
    "Please confirm availability and delivery details.",
    "Thank you!"
  ].join("\n");

  const whatsappURL =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank");
});

/* ================= MOBILE MENU ================= */

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileClose = document.getElementById("mobileClose");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu nav a");

function openMobileMenu() {
  mobileMenu?.classList.add("open");
  document.body.classList.add("menu-open");
}

function closeMobileMenu() {
  mobileMenu?.classList.remove("open");
  document.body.classList.remove("menu-open");
}

menuToggle?.addEventListener("click", openMobileMenu);
mobileClose?.addEventListener("click", closeMobileMenu);

mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});
