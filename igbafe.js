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


/* CUSTOM DAILY PLATE BUILDER */

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
    card.appendChild(heading);

    const list = document.createElement("div");
    list.className = "plate-food-list";

    dailyFoodMenu[foodDay.value].forEach(([name, price], index) => {
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

      const foodTitle = document.createElement("strong");
      foodTitle.textContent = name;

      const foodPrice = document.createElement("small");
      foodPrice.textContent = `₦${price.toLocaleString("en-NG")}`;

      info.append(foodTitle, foodPrice);
      label.append(checkbox, info);
      list.appendChild(label);
    });

    card.appendChild(list);
    plateCustomisations.appendChild(card);
  }

  updatePlateTotal();
}

function updatePlateTotal() {
  let total = 0;

  document.querySelectorAll(".plate-food-checkbox:checked").forEach(box => {
    total += Number(box.dataset.price);
  });

  if (platesTotal) {
    platesTotal.textContent = `₦${total.toLocaleString("en-NG")}`;
  }

  if (plateOrderMessage) {
    plateOrderMessage.textContent = "";
  }
}

if (foodDay && plateCount && plateCustomisations) {
  foodDay.addEventListener("change", renderPlateCustomisations);
  plateCount.addEventListener("input", renderPlateCustomisations);

  renderPlateCustomisations();
}

document.getElementById("addPlatesToOrder")?.addEventListener("click", () => {
  const selected = [...document.querySelectorAll(".plate-food-checkbox:checked")];

  if (!selected.length) {
    plateOrderMessage.textContent =
      "Please select at least one food for your plates.";
    return;
  }

  const plateOrders = {};

  selected.forEach(box => {
    const plate = box.dataset.plate;

    if (!plateOrders[plate]) {
      plateOrders[plate] = [];
    }

    plateOrders[plate].push({
      name: box.dataset.name,
      price: Number(box.dataset.price)
    });
  });

  const orderLines = Object.entries(plateOrders).map(([plate, foods]) => {
    const foodLines = foods.map(food =>
      `  - ${food.name}: ₦${food.price.toLocaleString("en-NG")}`
    );

    const plateTotal = foods.reduce((sum, food) => sum + food.price, 0);

    return [
      `PLATE ${plate}:`,
      ...foodLines,
      `  Plate total: ₦${plateTotal.toLocaleString("en-NG")}`
    ].join("\n");
  });

  const total = selected.reduce(
    (sum, box) => sum + Number(box.dataset.price),
    0
  );

  const message = [
    "Hello Igbafe Bakes and Frames!",
    `Daily menu: ${foodDay.value}`,
    "",
    ...orderLines,
    "",
    `TOTAL FOR CUSTOM PLATES: ₦${total.toLocaleString("en-NG")}`,
    "",
    "Please confirm my order."
  ].join("\n");

  // Add the customised plates to the existing order/cart as one item.
  if (typeof cart !== "undefined" && cart instanceof Map) {
    const key = `Custom Plates - ${foodDay.value} - ${Date.now()}`;

    cart.set(key, {
      name: `Custom Plates (${Object.keys(plateOrders).length})`,
      price: total,
      quantity: 1,
      details: message
    });

    if (typeof renderCart === "function") {
      renderCart();
    } else if (typeof updateCart === "function") {
      updateCart();
    }
  }

  plateOrderMessage.textContent =
    "Your customised plates have been prepared. Please review your order before checkout.";

  // Keep a copy of the full plate breakdown for checkout.
  window.igbafeCustomPlateOrder = message;
});
