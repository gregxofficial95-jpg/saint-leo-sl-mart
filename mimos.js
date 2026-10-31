
/* ================= CONFIG ================= */

const BRAND_ID = "95ea4312-4ce3-4415-a5c5-ac95f851fe29";
const WHATSAPP_NUMBER = "2349040087581";
const ORDER_ENDPOINT =
  "https://tzjckojpgamjwigxmdja.supabase.co/functions/v1/submit-brand-order";


/* ================= INTRO SCREEN ================= */

const introScreen = document.getElementById("introScreen");

if (introScreen) {
  window.addEventListener("load", () => {
    setTimeout(() => introScreen.classList.add("hide"), 3000);
  });
}


/* ================= CURRENT YEAR ================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}


/* ================= PRODUCTS ================= */

function makeImages(prefix, count) {
  return Array.from(
    { length: count },
    (_, index) =>
      `${prefix}-${String(index + 1).padStart(2, "0")}.jpeg`
  );
}

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


/* ================= FORMAT PRICE ================= */

function formatPrice(price) {
  return `₦${Number(price).toLocaleString("en-NG")}`;
}


/* ================= RENDER PRODUCTS ================= */

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
          ${product.images.length}
          ${product.images.length === 1 ? "design" : "designs"}
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


/* ================= CART DATA ================= */

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


/* ================= PRODUCT DESIGNS ================= */

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


/* ================= ADD TO CART ================= */

function addToCart(product, designIndex = 0) {
  const image = product.images[designIndex];
  const key = `${product.id}-${designIndex}`;

  if (cart.has(key)) {
    cart.get(key).quantity++;
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

collectionGrid?.addEventListener("click", event => {
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


/* ================= DESIGN BUTTON EVENTS ================= */

designGrid?.addEventListener("click", event => {
  const button = event.target.closest("[data-design]");

  if (!button || !activeProduct) return;

  addToCart(activeProduct, Number(button.dataset.design));

  button.textContent = "Added ✓";
  button.classList.add("added");

  setTimeout(() => {
    button.textContent = "Add to Cart +";
    button.classList.remove("added");
  }, 900);
});


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
          <button data-cart-action="decrease" data-key="${item.key}">−</button>
          <span>${item.quantity}</span>
          <button data-cart-action="increase" data-key="${item.key}">+</button>
          <button class="remove-item" data-cart-action="remove" data-key="${item.key}">
            Remove
          </button>
        </div>
      </div>

      <strong class="cart-line-total">
        ${formatPrice(item.price * item.quantity)}
      </strong>
    </article>
  `).join("");
}


/* ================= CART QUANTITY CONTROLS ================= */

cartItems?.addEventListener("click", event => {
  if (event.target.closest(".continue-shopping")) {
    closeCart();
    return;
  }

  const button = event.target.closest("[data-cart-action]");
  if (!button) return;

  const item = cart.get(button.dataset.key);
  if (!item) return;

  switch (button.dataset.cartAction) {
    case "increase":
      item.quantity++;
      break;

    case "decrease":
      item.quantity--;

      if (item.quantity <= 0) {
        cart.delete(button.dataset.key);
      }
      break;

    case "remove":
      cart.delete(button.dataset.key);
      break;
  }

  renderCart();
});


/* ================= OPEN / CLOSE MODALS ================= */

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

cartOverlay?.addEventListener("click", event => {
  if (event.target === cartOverlay) closeCart();
});

designOverlay?.addEventListener("click", event => {
  if (event.target === designOverlay) closeDesigns();
});


/* ================= MOBILE MENU ================= */

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileClose = document.getElementById("mobileClose");

function closeMobileMenu() {
  mobileMenu?.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuToggle?.setAttribute("aria-expanded", "false");
}

menuToggle?.addEventListener("click", () => {
  mobileMenu?.classList.add("open");
  document.body.classList.add("menu-open");
  menuToggle.setAttribute("aria-expanded", "true");
});

mobileClose?.addEventListener("click", closeMobileMenu);

document.querySelectorAll(".mobile-menu nav a").forEach(link => {
  link.addEventListener("click", closeMobileMenu);
});


/* ================= CHECKOUT DETAILS MODAL ================= */

const checkoutModal = document.createElement("div");
checkoutModal.className = "mimos-checkout-overlay";

checkoutModal.innerHTML = `
  <div class="mimos-checkout-panel">
    <button type="button" class="mimos-checkout-close">×</button>

    <span class="product-category">MIMO'S COLLECTION</span>
    <h2>Complete Your Order</h2>
    <p class="mimos-checkout-description">
      Enter your details to submit your order.
    </p>

    <div class="mimos-checkout-summary">
      <div id="mimosCheckoutItems"></div>

      <div class="mimos-checkout-total">
        <span>Order total</span>
        <strong id="mimosCheckoutTotal">₦0</strong>
      </div>
    </div>

    <form id="mimosCheckoutForm">
      <label for="mimosName">Full name</label>
      <input id="mimosName" name="customer_name" type="text"
        placeholder="Enter your full name" required>

      <label for="mimosPhone">Phone number</label>
      <input id="mimosPhone" name="customer_phone" type="tel"
        placeholder="Enter your phone number" required>

      <label for="mimosAddress">Delivery address / Hostel</label>
      <input id="mimosAddress" name="delivery_address" type="text"
        placeholder="Enter your delivery location" required>

      <label for="mimosNotes">Additional notes (optional)</label>
      <textarea id="mimosNotes" name="notes" rows="3"
        placeholder="Any extra instructions?"></textarea>

      <button type="submit" id="mimosSubmitOrder">
        Submit Order & Continue to WhatsApp ↗
      </button>

      <p id="mimosCheckoutMessage" class="mimos-checkout-message"></p>
    </form>
  </div>
`;

document.body.appendChild(checkoutModal);

function closeCheckoutModal() {
  checkoutModal.classList.remove("show");
}

function openCheckoutModal() {
  if (!cart.size) {
    alert("Your cart is empty. Please add an item before checking out.");
    return;
  }

  const itemsContainer = document.getElementById("mimosCheckoutItems");
  const totalElement = document.getElementById("mimosCheckoutTotal");

  itemsContainer.innerHTML = "";

  cart.forEach(item => {
    const line = document.createElement("div");
    line.className = "mimos-checkout-item";

    const name = document.createElement("span");
    name.textContent =
      `${item.quantity} × ${item.name} (Design ${String(item.designNumber).padStart(2, "0")})`;

    const price = document.createElement("strong");
    price.textContent = formatPrice(item.price * item.quantity);

    line.append(name, price);
    itemsContainer.appendChild(line);
  });

  totalElement.textContent = formatPrice(
    [...cart.values()].reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
  );

  document.getElementById("mimosCheckoutMessage").textContent = "";
  checkoutModal.classList.add("show");
}

document.getElementById("checkoutBtn")?.addEventListener(
  "click",
  openCheckoutModal
);

checkoutModal.querySelector(".mimos-checkout-close")
  .addEventListener("click", closeCheckoutModal);

checkoutModal.addEventListener("click", event => {
  if (event.target === checkoutModal) closeCheckoutModal();
});


/* ================= SUBMIT ORDER ================= */

document.getElementById("mimosCheckoutForm")
  .addEventListener("submit", async event => {
    event.preventDefault();

    if (!cart.size) {
      alert("Your cart is empty.");
      closeCheckoutModal();
      return;
    }

    const form = event.currentTarget;
    const submitButton = document.getElementById("mimosSubmitOrder");
    const messageElement = document.getElementById("mimosCheckoutMessage");
    const formData = new FormData(form);

    const customerName = formData.get("customer_name").trim();
    const customerPhone = formData.get("customer_phone").trim();
    const deliveryAddress = formData.get("delivery_address").trim();
    const notes = formData.get("notes").trim();

    if (!customerName || !customerPhone || !deliveryAddress) {
      messageElement.textContent = "Please complete all required fields.";
      return;
    }

    const items = [];
    const detailLines = [];

    cart.forEach(item => {
      const productName =
        `${item.name} - Design ${String(item.designNumber).padStart(2, "0")}`;

      items.push({
        product_name: productName,
        quantity: item.quantity,
        unit_price: item.price
      });

      detailLines.push(
        `${item.quantity} × ${productName} — ${formatPrice(item.price * item.quantity)}`
      );

      detailLines.push(`Image: ${item.image}`);
    });

    const total = [...cart.values()].reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const payload = {
      brand_id: BRAND_ID,
      customer_name: customerName,
      customer_phone: customerPhone,
      delivery_address: deliveryAddress,
      request_type: "order",
      request_details: [
        "Customer order:",
        ...detailLines,
        `Total: ${formatPrice(total)}`,
        notes ? `Additional notes: ${notes}` : ""
      ].filter(Boolean).join("\n"),
      items,
      website: ""
    };

    submitButton.disabled = true;
    submitButton.textContent = "Submitting your order...";
    messageElement.textContent = "";

    // Open the tab before the network request to avoid popup blocking.
    const whatsappWindow = window.open("about:blank", "_blank");

    try {
      const response = await fetch(ORDER_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || result.message || "Your order could not be submitted.");
      }

      const reference = result.order_number || result.reference;

      if (!reference) {
        console.error("MIMO ORDER RESPONSE:", result);
        throw new Error("Order saved, but no order reference was returned.");
      }

      const whatsappMessage = [
        "Hello Mimo's Collection!",
        "",
        `Order Reference: ${reference}`,
        `Name: ${customerName}`,
        `Phone: ${customerPhone}`,
        `Delivery address: ${deliveryAddress}`,
        "",
        "MY ORDER",
        ...detailLines,
        "",
        `TOTAL: ${formatPrice(total)}`,
        notes ? `Notes: ${notes}` : "",
        "",
        "My order has been submitted. Please confirm availability and delivery details."
      ].filter(Boolean).join("\n");

      const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

      if (whatsappWindow) {
        whatsappWindow.location.href = whatsappURL;
      } else {
        window.location.href = whatsappURL;
      }

      cart.clear();
      renderCart();
      form.reset();
      closeCheckoutModal();
      closeCart();

    } catch (error) {
      if (whatsappWindow) whatsappWindow.close();

      messageElement.textContent =
        error.message || "Something went wrong. Please try again.";

      submitButton.disabled = false;
      submitButton.textContent = "Submit Order & Continue to WhatsApp ↗";
    }
  });


/* ================= ESCAPE KEY ================= */

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeMobileMenu();
    closeCart();
    closeDesigns();
    closeCheckoutModal();
  }
});


/* ================= INITIAL CART ================= */

renderCart();
