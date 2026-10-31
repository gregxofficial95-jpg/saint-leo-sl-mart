/* ================= CONFIG ================= */

const BRAND_ID = "da57bfad-b7ff-45aa-9ab2-ae3793555c13";
const VENDOR_WHATSAPP = "2349075964045";
const ORDER_ENDPOINT =
  "https://tzjckojpgamjwigxmdja.supabase.co/functions/v1/submit-brand-order";


/* ================= INTRO SCREEN ================= */

const introScreen = document.getElementById("introScreen");

if (introScreen) {
  window.addEventListener("load", () => {
    setTimeout(() => introScreen.classList.add("hide"), 3000);
  });
}


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

document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", closeMobileMenu);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeMobileMenu();
    closeOrderModal();
  }
});


/* ================= CART ================= */

const menuItems = document.querySelectorAll(".menu-item");
const cartItemsContainer = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const placeOrderBtn = document.getElementById("placeOrderBtn");

const cart = new Map();

function formatNaira(amount) {
  return `₦${Number(amount).toLocaleString("en-NG")}`;
}

function getCartTotal() {
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
  });

  return total;
}

function updateCart() {
  if (!cartItemsContainer || !cartCount || !cartTotal) return;

  cartItemsContainer.innerHTML = "";

  let totalItems = 0;

  if (cart.size === 0) {
    cartItemsContainer.innerHTML =
      `<p class="empty-cart">Your order is empty. Tap a menu item to begin.</p>`;
  }

  cart.forEach((item, key) => {
    totalItems += item.quantity;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    const info = document.createElement("div");
    info.className = "cart-item-info";

    const name = document.createElement("span");
    name.className = "cart-item-name";
    name.textContent = item.name;

    const price = document.createElement("span");
    price.className = "cart-item-price";
    price.textContent = formatNaira(item.price * item.quantity);

    info.append(name, price);

    if (item.details) {
      const details = document.createElement("small");
      details.className = "cart-custom-details";
      details.textContent = "Customised plate details included";
      info.appendChild(details);
    }

    const controls = document.createElement("div");
    controls.className = "cart-item-controls";

    controls.innerHTML = `
      <button type="button" data-action="decrease">−</button>
      <span>${item.quantity}</span>
      <button type="button" data-action="increase">+</button>
      <button type="button" data-action="remove">×</button>
    `;

    controls.querySelectorAll("button").forEach(button => {
      button.dataset.key = key;
    });

    cartItem.append(info, controls);
    cartItemsContainer.appendChild(cartItem);
  });

  cartCount.textContent =
    `${totalItems} ${totalItems === 1 ? "item" : "items"}`;

  cartTotal.textContent = formatNaira(getCartTotal());

  menuItems.forEach(button => {
    const key = `${button.dataset.name}-${button.dataset.price}`;
    button.classList.toggle("selected", cart.has(key));
  });
}


/* ================= ADD MENU ITEMS ================= */

menuItems.forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = Number(button.dataset.price);
    const key = `${name}-${price}`;

    if (cart.has(key)) {
      cart.get(key).quantity += 1;
    } else {
      cart.set(key, { name, price, quantity: 1 });
    }

    updateCart();
  });
});


/* ================= CART CONTROLS ================= */

cartItemsContainer?.addEventListener("click", event => {
  const button = event.target.closest("button");
  if (!button) return;

  const key = button.dataset.key;
  const action = button.dataset.action;

  if (!cart.has(key)) return;

  const item = cart.get(key);

  if (action === "increase") item.quantity++;

  if (action === "decrease") {
    item.quantity--;
    if (item.quantity <= 0) cart.delete(key);
  }

  if (action === "remove") cart.delete(key);

  updateCart();
});


/* ================= ORDER MODAL ================= */

const orderModal = document.createElement("div");
orderModal.className = "igbafe-order-modal";

orderModal.innerHTML = `
  <div class="igbafe-order-panel">
    <button type="button" class="igbafe-modal-close" aria-label="Close">×</button>

    <p class="igbafe-modal-label">IGBAFE BAKES & FRAMES</p>
    <h2>Complete Your Order</h2>
    <p class="igbafe-modal-description">
      Enter your details so we can process your order.
    </p>

    <div class="igbafe-modal-summary">
      <div id="igbafeModalItems"></div>
      <div class="igbafe-modal-total">
        <span>Order total</span>
        <strong id="igbafeModalTotal">₦0</strong>
      </div>
    </div>

    <form id="igbafeOrderForm">
      <label for="igbafeCustomerName">Full name</label>
      <input
        id="igbafeCustomerName"
        name="customer_name"
        type="text"
        placeholder="Enter your full name"
        required
      >

      <label for="igbafeCustomerPhone">Phone number</label>
      <input
        id="igbafeCustomerPhone"
        name="customer_phone"
        type="tel"
        placeholder="Enter your phone number"
        required
      >

      <label for="igbafeAddress">Delivery address / Hostel</label>
      <input
        id="igbafeAddress"
        name="delivery_address"
        type="text"
        placeholder="Enter your delivery location"
        required
      >

      <label for="igbafeNotes">Additional notes (optional)</label>
      <textarea
        id="igbafeNotes"
        name="notes"
        rows="3"
        placeholder="Any extra instructions?"
      ></textarea>

      <button type="submit" id="igbafeSubmitOrder">
        Submit Order & Continue to WhatsApp ↗
      </button>

      <p class="igbafe-form-message" id="igbafeFormMessage"></p>
    </form>
  </div>
`;

document.body.appendChild(orderModal);

function closeOrderModal() {
  orderModal.classList.remove("show");
}

function openOrderModal() {
  if (cart.size === 0) {
    alert("Please select at least one item before placing your order.");
    return;
  }

  const itemsContainer = document.getElementById("igbafeModalItems");
  const totalElement = document.getElementById("igbafeModalTotal");

  itemsContainer.innerHTML = "";

  cart.forEach(item => {
    const line = document.createElement("div");
    line.className = "igbafe-summary-item";

    const name = document.createElement("span");
    name.textContent = `${item.quantity} × ${item.name}`;

    const price = document.createElement("strong");
    price.textContent = formatNaira(item.price * item.quantity);

    line.append(name, price);
    itemsContainer.appendChild(line);
  });

  totalElement.textContent = formatNaira(getCartTotal());
  document.getElementById("igbafeFormMessage").textContent = "";

  orderModal.classList.add("show");
}

orderModal.querySelector(".igbafe-modal-close")
  .addEventListener("click", closeOrderModal);

orderModal.addEventListener("click", event => {
  if (event.target === orderModal) closeOrderModal();
});

placeOrderBtn?.addEventListener("click", openOrderModal);


/* ================= SUBMIT ORDER ================= */

document.getElementById("igbafeOrderForm").addEventListener("submit", async event => {
  event.preventDefault();

  if (cart.size === 0) {
    alert("Your order is empty.");
    closeOrderModal();
    return;
  }

  const form = event.currentTarget;
  const submitButton = document.getElementById("igbafeSubmitOrder");
  const messageElement = document.getElementById("igbafeFormMessage");
  const formData = new FormData(form);

  const customerName = formData.get("customer_name").trim();
  const customerPhone = formData.get("customer_phone").trim();
  const deliveryAddress = formData.get("delivery_address").trim();
  const notes = formData.get("notes").trim();

  if (!customerName || !customerPhone || !deliveryAddress) {
    messageElement.textContent = "Please complete all required fields.";
    return;
  }

  const orderItems = [];
  const detailLines = [];

  cart.forEach(item => {
    orderItems.push({
      product_name: item.name,
      quantity: item.quantity,
      unit_price: item.price
    });

    detailLines.push(
      `${item.quantity} × ${item.name} — ${formatNaira(item.price * item.quantity)}`
    );

    if (item.details) {
      detailLines.push(item.details);
    }
  });

  const total = getCartTotal();

  const payload = {
    brand_id: BRAND_ID,
    customer_name: customerName,
    customer_phone: customerPhone,
    delivery_address: deliveryAddress,
    request_type: "order",
    request_details: [
      "Customer order:",
      ...detailLines,
      `Total: ${formatNaira(total)}`,
      notes ? `Additional notes: ${notes}` : ""
    ].filter(Boolean).join("\n"),
    items: orderItems,
    website: ""
  };

  submitButton.disabled = true;
  submitButton.textContent = "Submitting your order...";
  messageElement.textContent = "";

  // Open a tab now so the browser does not block the WhatsApp handoff.
  const whatsappWindow = window.open("about:blank", "_blank");

  try {
    const response = await fetch(ORDER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json().catch(() => ({}));

console.log("IGBAFE ORDER RESPONSE:", result);

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Your order could not be submitted.");
    }

    const reference = result.order_number || result.reference;

    if (!reference) {
      throw new Error("Order saved, but no order reference was returned.");
    }

    const whatsappMessage = [
      "Hello Igbafe Bakes and Frames!",
      "",
      `Order Reference: ${reference}`,
      `Name: ${customerName}`,
      `Phone: ${customerPhone}`,
      `Delivery address: ${deliveryAddress}`,
      "",
      "MY ORDER",
      ...detailLines,
      "",
      `TOTAL: ${formatNaira(total)}`,
      notes ? `Notes: ${notes}` : "",
      "",
      "My order has been submitted. Please confirm availability."
    ].filter(Boolean).join("\n");

    const whatsappURL =
      `https://wa.me/${VENDOR_WHATSAPP}?text=${encodeURIComponent(whatsappMessage)}`;

    if (whatsappWindow) {
      whatsappWindow.location.href = whatsappURL;
    } else {
      window.location.href = whatsappURL;
    }

    cart.clear();
    updateCart();
    form.reset();
    closeOrderModal();

  } catch (error) {
    if (whatsappWindow) whatsappWindow.close();

    messageElement.textContent =
      error.message || "Something went wrong. Please try again.";

    submitButton.disabled = false;
    submitButton.textContent = "Submit Order & Continue to WhatsApp ↗";
  }
});


/* ================= CURRENT YEAR ================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}


/* ================= DAILY PLATE BUILDER ================= */

const dailyFoodMenu = {
  Monday: [
    ["White Rice and Stew", 700],
    ["Moi Moi", 500],
    ["Vegetable Soup and Swallow", 1300],
    ["Jollof Rice", 700],
    ["Fried Rice", 700],
    ["Salad", 400],
    ["Plantain", 200],
    ["White Beans", 300]
  ],
  Tuesday: [
    ["White Rice and Stew", 700],
    ["White Beans", 300],
    ["White Spaghetti", 400],
    ["Jollof Rice", 700],
    ["Salad", 400],
    ["Plantain", 200],
    ["Egusi and Akpu/Eba", 1300]
  ],
  Wednesday: [
    ["Yam Porridge", 1000],
    ["Oil Rice", 700],
    ["Plantain", 200],
    ["White Rice and Stew", 700],
    ["Ogbono Soup with Swallow", 1300]
  ],
  Thursday: [
    ["Fried Rice", 700],
    ["Jollof Rice", 700],
    ["White Rice and Stew", 700],
    ["Moi Moi", 500],
    ["Salad", 200],
    ["Plantain", 200],
    ["Jollof Spaghetti", 700]
  ],
  Friday: [
    ["Chips with Fried Egg, Ketchup or Sauce", 2000],
    ["Jollof Rice", 700],
    ["Fried Rice", 700],
    ["Plantain", 200],
    ["Banga Soup with Swallow", 1300],
    ["Vegetable Soup with Starch/Fufu/Eba", 1300],
    ["Goat Meat Pepper Soup", 1500],
    ["Assorted Pepper Soup", 1500]
  ],
  Saturday: [
    ["Oil Beans", 1000],
    ["Plantain", 200],
    ["Potato", 500],
    ["Yam and Egg", 1500],
    ["Catfish Pepper Soup", 2000],
    ["Chicken Pepper Soup", 2000],
    ["White Rice and Stew", 700]
  ],
  Sunday: [
    ["White Rice and Stew", 700],
    ["Jollof Rice", 700],
    ["White Beans", 300],
    ["Plantain", 200]
  ]
};

const foodDay = document.getElementById("foodDay");
const plateCount = document.getElementById("plateCount");
const plateCustomisations = document.getElementById("plateCustomisations");
const platesTotal = document.getElementById("platesTotal");
const plateOrderMessage = document.getElementById("plateOrderMessage");

function updatePlateTotal() {
  let total = 0;

  document.querySelectorAll(".plate-food-checkbox:checked").forEach(box => {
    total += Number(box.dataset.price);
  });

  if (platesTotal) platesTotal.textContent = formatNaira(total);
  if (plateOrderMessage) plateOrderMessage.textContent = "";
}

function renderPlateCustomisations() {
  if (!foodDay || !plateCount || !plateCustomisations) return;

  const count = Math.max(
    1,
    Math.min(20, Number.parseInt(plateCount.value, 10) || 1)
  );

  plateCount.value = count;
  plateCustomisations.innerHTML = "";

  for (let plateNumber = 1; plateNumber <= count; plateNumber++) {
    const card = document.createElement("div");
    card.className = "plate-card";

    const heading = document.createElement("h4");
    heading.textContent = `Plate ${plateNumber}`;

    const list = document.createElement("div");
    list.className = "plate-food-list";

    dailyFoodMenu[foodDay.value].forEach(([name, price]) => {
      const label = document.createElement("label");
      label.className = "plate-food-option";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "plate-food-checkbox";
      checkbox.dataset.plate = plateNumber;
      checkbox.dataset.name = name;
      checkbox.dataset.price = price;
      checkbox.addEventListener("change", updatePlateTotal);

      const info = document.createElement("span");
      info.className = "plate-food-info";

      const title = document.createElement("strong");
      title.textContent = name;

      const foodPrice = document.createElement("small");
      foodPrice.textContent = formatNaira(price);

      info.append(title, foodPrice);
      label.append(checkbox, info);
      list.appendChild(label);
    });

    card.append(heading, list);
    plateCustomisations.appendChild(card);
  }

  updatePlateTotal();
}

if (foodDay && plateCount && plateCustomisations) {
  foodDay.addEventListener("change", renderPlateCustomisations);
  plateCount.addEventListener("input", renderPlateCustomisations);
  renderPlateCustomisations();
}


/* ================= ADD CUSTOM PLATES TO CART ================= */

document.getElementById("addPlatesToOrder")?.addEventListener("click", () => {
  const selected = [
    ...document.querySelectorAll(".plate-food-checkbox:checked")
  ];

  if (!selected.length) {
    plateOrderMessage.textContent =
      "Please select at least one food for your plates.";
    return;
  }

  const plateOrders = {};

  selected.forEach(box => {
    const plate = box.dataset.plate;

    if (!plateOrders[plate]) plateOrders[plate] = [];

    plateOrders[plate].push({
      name: box.dataset.name,
      price: Number(box.dataset.price)
    });
  });

  const orderLines = Object.entries(plateOrders).map(([plate, foods]) => {
    const foodLines = foods.map(food =>
      `- ${food.name}: ${formatNaira(food.price)}`
    );

    const plateTotal = foods.reduce((sum, food) => sum + food.price, 0);

    return [
      `PLATE ${plate}:`,
      ...foodLines,
      `Plate total: ${formatNaira(plateTotal)}`
    ].join("\n");
  });

  const total = selected.reduce(
    (sum, box) => sum + Number(box.dataset.price),
    0
  );

  const details = [
    `Daily menu: ${foodDay.value}`,
    ...orderLines
  ].join("\n");

  const key = `Custom Plates - ${foodDay.value} - ${Date.now()}`;

  cart.set(key, {
    name: `Custom Plates (${Object.keys(plateOrders).length})`,
    price: total,
    quantity: 1,
    details
  });

  updateCart();

  plateOrderMessage.textContent =
    "Your customised plates have been added to your order. Review your cart before checkout.";
});
