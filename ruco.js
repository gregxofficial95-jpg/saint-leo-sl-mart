
const WHATSAPP_NUMBER = "2347062602417"; // Change if Ruco's official order number differs.

const bananaBreadItems = [
  { name: "Classic Banana Bread", prices: { Mini: 1200, Regular: 3500, Large: 7000 } },
  { name: "Oreo Banana Bread", prices: { Mini: 1500, Regular: 4500, Large: 9000 } },
  { name: "Nutella Banana Bread", prices: { Mini: 1500, Regular: 4500, Large: 9000 } },
  { name: "Lotus Banana Bread", prices: { Mini: 1500, Regular: 4500, Large: 9000 } },
  { name: "Dates Banana Bread", prices: { Mini: 1500, Regular: 4500, Large: 9000 } },
  { name: "Double Banana Bread", prices: { Mini: 1500, Regular: 5000, Large: 10000 } },
  { name: "Oreos And Chocolate", prices: { Mini: 1500, Regular: 5000, Large: 10000 } },
  { name: "Coconut Banana Bread", prices: { Mini: 1500, Regular: 4500, Large: 9000 } },
  { name: "Chocolate Banana Bread", prices: { Mini: 1500, Regular: 4500, Large: 9000 } },
  { name: "Sugarless Banana Bread", prices: { Mini: 1500, Regular: 4000, Large: 8000 } }
];

const desserts = [
  {
    name: "Fudcy Chocolate Cake",
    description: "A rich ultra-moist chocolate cake soaked in a silky glossy chocolate ganache. Every spoon is intensely chocolatey, soft, fudgy and melts in your mouth.",
    price: 4500,
    bestSeller: true
  },
  {
    name: "Velvety Lava Cake",
    description: "Soft, rich red velvet cake layered with smooth, silky white chocolate ganache finished with red lava which you get to pour yourself.",
    price: 5000
  },
  {
    name: "Coconuty Delight",
    description: "Cloud vanilla cake soaked in milk mixture, layered with smooth milk pudding and topped with freshly grated coconut.",
    price: 5000
  },
  {
    name: "Red Velvet Dream",
    description: "Moist red velvet cake with a creamy cheese frosting with a tangy finish.",
    price: 5000
  }
];

let cart = JSON.parse(localStorage.getItem("rucoTreatsCart") || "[]");
let currentProduct = null;
let currentVariant = "Mini";
let currentQuantity = 1;

const bananaBreadList = document.getElementById("bananaBreadList");
const dessertList = document.getElementById("dessertList");
const cartButton = document.getElementById("cartButton");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");

const productModal = document.getElementById("productModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalCategory = document.getElementById("modalCategory");
const variantPicker = document.getElementById("variantPicker");
const qtyMinus = document.getElementById("qtyMinus");
const qtyPlus = document.getElementById("qtyPlus");
const qtyValue = document.getElementById("qtyValue");
const modalPrice = document.getElementById("modalPrice");
const addToCartButton = document.getElementById("addToCartButton");

function naira(value) {
  return "₦" + value.toLocaleString("en-NG");
}

function saveCart() {
  localStorage.setItem("rucoTreatsCart", JSON.stringify(cart));
  renderCart();
}

function renderBananaBread() {
  bananaBreadList.innerHTML = bananaBreadItems.map((item, index) => `
    <div class="price-row">
      <button class="order-text-button item-name" data-type="bread" data-index="${index}">
        ${item.name}
      </button>
      <span class="price">${naira(item.prices.Mini)}</span>
      <span class="price">${naira(item.prices.Regular)}</span>
      <span class="price">${naira(item.prices.Large)}</span>
    </div>
  `).join("");

  bananaBreadList.querySelectorAll(".order-text-button").forEach(button => {
    button.addEventListener("click", () => {
      const item = bananaBreadItems[Number(button.dataset.index)];
      openProduct({
        name: item.name,
        description: "Choose your preferred size and quantity.",
        category: "BANANA BREAD",
        variants: item.prices
      });
    });
  });
}

function renderDesserts() {
  dessertList.innerHTML = desserts.map((item, index) => `
    <article class="dessert-item">
      <div>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
      </div>

      <div class="dessert-image" aria-hidden="true"></div>

      <div class="dessert-price">${naira(item.price)}</div>

      ${item.bestSeller ? `<div class="best-seller">BEST<br>SELLER</div>` : ""}

      <button class="dessert-order" data-index="${index}">
        ORDER +
      </button>
    </article>
  `).join("");

  dessertList.querySelectorAll(".dessert-order").forEach(button => {
    button.addEventListener("click", () => {
      const item = desserts[Number(button.dataset.index)];
      openProduct({
        name: item.name,
        description: item.description,
        category: "DESSERT",
        variants: { "Regular": item.price }
      });
    });
  });
}

function openProduct(product) {
  currentProduct = product;
  currentVariant = Object.keys(product.variants)[0];
  currentQuantity = 1;

  modalTitle.textContent = product.name;
  modalDescription.textContent = product.description;
  modalCategory.textContent = product.category;

  variantPicker.innerHTML = Object.entries(product.variants).map(([variant, price]) => `
    <button class="variant-option ${variant === currentVariant ? "selected" : ""}" data-variant="${variant}">
      ${variant}<br>${naira(price)}
    </button>
  `).join("");

  variantPicker.querySelectorAll(".variant-option").forEach(button => {
    button.addEventListener("click", () => {
      currentVariant = button.dataset.variant;
      variantPicker.querySelectorAll(".variant-option").forEach(b => b.classList.remove("selected"));
      button.classList.add("selected");
      updateModalPrice();
    });
  });

  updateModalPrice();
  productModal.classList.add("open");
  productModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function updateModalPrice() {
  const unitPrice = currentProduct.variants[currentVariant];
  qtyValue.textContent = currentQuantity;
  modalPrice.textContent = naira(unitPrice * currentQuantity);
}

function closeProduct() {
  productModal.classList.remove("open");
  productModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function addCurrentToCart() {
  const unitPrice = currentProduct.variants[currentVariant];

  const existing = cart.find(item =>
    item.name === currentProduct.name &&
    item.variant === currentVariant &&
    item.unitPrice === unitPrice
  );

  if (existing) {
    existing.quantity += currentQuantity;
  } else {
    cart.push({
      name: currentProduct.name,
      variant: currentVariant,
      quantity: currentQuantity,
      unitPrice
    });
  }

  saveCart();
  closeProduct();
  openCart();
}

function renderCart() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  cartCount.textContent = totalQuantity;
  cartTotal.textContent = naira(total);

  if (!cart.length) {
    cartItems.innerHTML = `<div class="empty-cart">Your cart is currently empty.</div>`;
    return;
  }

  cartItems.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <div class="cart-item-top">
        <div>
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-meta">${item.variant} · ${naira(item.unitPrice)} each</div>
        </div>
        <div class="cart-item-price">${naira(item.unitPrice * item.quantity)}</div>
      </div>

      <div class="cart-item-controls">
        <button data-action="minus" data-index="${index}">−</button>
        <span>${item.quantity}</span>
        <button data-action="plus" data-index="${index}">+</button>
        <button class="remove-item" data-action="remove" data-index="${index}">REMOVE</button>
      </div>
    </div>
  `).join("");

  cartItems.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);
      const action = button.dataset.action;

      if (action === "plus") cart[index].quantity += 1;

      if (action === "minus") {
        cart[index].quantity -= 1;
        if (cart[index].quantity <= 0) cart.splice(index, 1);
      }

      if (action === "remove") cart.splice(index, 1);

      saveCart();
    });
  });
}

function openCart() {
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeCartDrawer() {
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function checkoutOnWhatsApp() {
  if (!cart.length) {
    alert("Your cart is empty. Add a treat before checking out.");
    return;
  }

  const lines = cart.map((item, index) =>
    `${index + 1}. ${item.name} — ${item.variant} × ${item.quantity} = ${naira(item.unitPrice * item.quantity)}`
  );

  const total = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const message =
`Hello Ruco Treats 👋

I'd like to place an order:

${lines.join("\n")}

TOTAL: ${naira(total)}

Please confirm my order and let me know the next step.`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
}

cartButton.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartDrawer);
cartOverlay.addEventListener("click", closeCartDrawer);

modalClose.addEventListener("click", closeProduct);
modalBackdrop.addEventListener("click", closeProduct);

qtyMinus.addEventListener("click", () => {
  if (currentQuantity > 1) {
    currentQuantity -= 1;
    updateModalPrice();
  }
});

qtyPlus.addEventListener("click", () => {
  currentQuantity += 1;
  updateModalPrice();
});

addToCartButton.addEventListener("click", addCurrentToCart);
checkoutButton.addEventListener("click", checkoutOnWhatsApp);

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeProduct();
    closeCartDrawer();
  }
});

renderBananaBread();
renderDesserts();
renderCart();
