
const WHATSAPP_NUMBER = "2349035115536";


const products = [
  {
    id: "hermes",
    name: "Hermes Slippers",
    category: "Slippers",
    price: 55000,
    variants: [
      {
        name: "Olive Green | Natural Tan",
        image: "rhamsey-hermes-a.jpeg"
      },
      {
        name: "Charcoal Grey | Cobalt Blue",
        image: "rhamsey-hermes-b.jpeg"
      },
      {
        name: "Sky Blue | Maroon",
        image: "rhamsey-hermes-c.jpeg"
      },
      {
        name: "Beige + Cream Geometric Print | Solid Black",
        image: "rhamsey-hermes-d.jpeg"
      }
    ]
  },
  {
    id: "samba",
    name: "Adidas Samba",
    category: "Sneakers",
    price: 40000,
    variants: [
      {
        name: "Black and White",
        image: "rhamsey-adidas-samba-a.jpeg"
      },
      {
        name: "White and Black",
        image: "rhamsey-adidas-samba-b.jpeg"
      }
    ]
  },
  {
    id: "offroad",
    name: "High Quality Off-Road Sport Clog",
    category: "Clogs",
    price: 32000,
    variants: [
      {
        name: "Army Green",
        image: "rhamsey-offroad-green.jpeg"
      },
      {
        name: "Army Grey",
        image: "rhamsey-offroad-grey.jpeg"
      }
    ]
  },
  {
    id: "crocband",
    name: "High Quality Crocband Stripe",
    category: "Clogs",
    price: 30000,
    variants: [
      {
        name: "Black with Pattern",
        image: "rhamsey-crocband-pattern.jpeg"
      },
      {
        name: "Black without Pattern",
        image: "rhamsey-crocband-plain.jpeg"
      }
    ]
  },
  {
    id: "camo",
    name: "High Quality Camo Crocs",
    category: "Clogs",
    price: 32000,
    variants: [
      {
        name: "Camo",
        image: "rhamsey-camo-crocs.jpeg"
      }
    ]
  },
  {
    id: "echo",
    name: "High Quality Echo Clog",
    category: "Clogs",
    price: 35000,
    variants: [
      {
        name: "Standard Style",
        image: "rhamsey-echo-clog.jpeg"
      }
    ]
  },
  {
    id: "hiker",
    name: "High Quality Hiker Clog",
    category: "Clogs",
    price: 32000,
    variants: [
      {
        name: "Standard Style",
        image: "rhamsey-hiker-clog.jpeg"
      }
    ]
  },
  {
    id: "nb9060",
    name: "Premium Quality NB 9060",
    category: "Sneakers",
    price: 45000,
    variants: [
      {
        name: "As Pictured",
        image: "rhamsey-nb-9060.jpeg"
      }
    ]
  },
  {
    id: "nb530",
    name: "NB 530",
    category: "Sneakers",
    price: 40000,
    variants: [
      {
        name: "As Pictured",
        image: "rhamsey-nb-530.jpeg"
      }
    ]
  },
  {
    id: "nikecalm",
    name: "Original Nike Calm Mules",
    category: "Mules",
    price: 33000,
    variants: [
      {
        name: "As Pictured",
        image: "rhamsey-nike-calm-mules.jpeg"
      }
    ]
  }
];


let selectedProduct = null;
let selectedVariant = null;
let bag = [];

const productGrid = document.getElementById("productGrid");
const productOverlay = document.getElementById("productOverlay");
const bagOverlay = document.getElementById("bagOverlay");

const formatPrice = amount =>
  "₦" + amount.toLocaleString("en-NG");

function getFirstVariant(product) {
  return product.variants[0];
}

function renderProducts() {
  const searchTerm = document
    .getElementById("searchInput")
    .value.trim().toLowerCase();

  const category = document.getElementById("categoryFilter").value;

  const filtered = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.variants.some(variant =>
        variant.name.toLowerCase().includes(searchTerm)
      );

    const matchesCategory =
      category === "all" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  document.getElementById("productCount").textContent = filtered.length;

  productGrid.innerHTML = filtered.map(product => {
    const variant = getFirstVariant(product);

    return `
      <article class="product-card">
        <div class="product-image">
          <img
            src="${variant.image}"
            alt="${product.name} - ${variant.name}"
            loading="lazy"
            onerror="this.onerror=null;this.src='https://placehold.co/600x500/f0ece3/333333?text=Add+Product+Photo'"
          >
        </div>

        <div class="product-details">
          <p class="product-category">${product.category}</p>
          <h3>${product.name}</h3>
          <p class="product-price">${formatPrice(product.price)}</p>
          <button
            class="option-button"
            data-product-id="${product.id}"
          >CHOOSE OPTIONS</button>
        </div>
      </article>
    `;
  }).join("");

  if (!filtered.length) {
    productGrid.innerHTML =
      '<p class="empty-bag">No matching footwear found. Try another search.</p>';
  }
}

function openProduct(productId) {
  selectedProduct = products.find(product => product.id === productId);

  if (!selectedProduct) return;

  selectedVariant = 0;

  document.getElementById("modalName").textContent = selectedProduct.name;
  document.getElementById("modalCategory").textContent =
    selectedProduct.category.toUpperCase();

  document.getElementById("modalPrice").textContent =
    formatPrice(selectedProduct.price);

  const variantSelect = document.getElementById("variantSelect");

  variantSelect.innerHTML = selectedProduct.variants.map((variant, index) => `
    <option value="${index}">${variant.name}</option>
  `).join("");

  document.getElementById("sizeSelect").value = "";
  document.getElementById("quantityInput").value = 1;

  updateSelectedVariant();
  updateLineTotal();

  productOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function updateSelectedVariant() {
  if (!selectedProduct) return;

  selectedVariant = Number(
    document.getElementById("variantSelect").value || 0
  );

  const variant = selectedProduct.variants[selectedVariant];
  const image = document.getElementById("modalImage");

  image.onerror = function () {
    this.onerror = null;
    this.src =
      "https://placehold.co/600x600/f0ece3/333333?text=Add+Product+Photo";
  };

  image.src = variant.image;
  image.alt = `${selectedProduct.name} - ${variant.name}`;
}

function getQuantity() {
  const input = document.getElementById("quantityInput");
  let quantity = parseInt(input.value, 10);

  if (!Number.isFinite(quantity)) quantity = 1;

  quantity = Math.max(1, Math.min(99, quantity));
  input.value = quantity;

  return quantity;
}

function updateLineTotal() {
  if (!selectedProduct) return;

  const quantity = getQuantity();

  document.getElementById("lineTotal").textContent =
    formatPrice(selectedProduct.price * quantity);
}

function closeOverlay(overlay) {
  overlay.classList.remove("active");

  if (
    !productOverlay.classList.contains("active") &&
    !bagOverlay.classList.contains("active")
  ) {
    document.body.style.overflow = "";
  }
}

function addToBag() {
  if (!selectedProduct) return;

  const size = document.getElementById("sizeSelect").value;

  if (!size) {
    alert("Please select your shoe size.");
    return;
  }

  const variant = selectedProduct.variants[selectedVariant];
  const quantity = getQuantity();

  const existingItem = bag.find(item =>
    item.productId === selectedProduct.id &&
    item.variantName === variant.name &&
    item.size === size
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    bag.push({
      productId: selectedProduct.id,
      name: selectedProduct.name,
      category: selectedProduct.category,
      variantName: variant.name,
      size,
      price: selectedProduct.price,
      quantity
    });
  }

  updateBagCount();
  renderBag();
  closeOverlay(productOverlay);

  alert("Added to your shopping bag.");
}

function updateBagCount() {
  const count = bag.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("bagCount").textContent = count;
}

function renderBag() {
  const bagItems = document.getElementById("bagItems");

  if (bag.length === 0) {
    bagItems.innerHTML =
      '<p class="empty-bag">Your bag is empty. Explore the collection to find your pair.</p>';
  } else {
    bagItems.innerHTML = bag.map((item, index) => `
      <div class="bag-item">
        <div>
          <h3>${item.name}</h3>
          <p>
            Style: ${item.variantName}<br>
            Size: EU ${item.size}<br>
            Quantity: ${item.quantity}
          </p>
        </div>

        <div class="bag-item-price">
          ${formatPrice(item.price * item.quantity)}
          <br>
          <button class="remove-item" data-remove-index="${index}">
            Remove
          </button>
        </div>
      </div>
    `).join("");
  }

  const total = bag.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  document.getElementById("bagTotal").textContent = formatPrice(total);
  document.getElementById("checkoutButton").disabled = bag.length === 0;
}

function checkoutOnWhatsApp() {
  if (bag.length === 0) {
    alert("Your shopping bag is empty.");
    return;
  }

  const lines = bag.map((item, index) => {
    return [
      `${index + 1}. ${item.name}`,
      `   Style/Colour: ${item.variantName}`,
      `   Size: EU ${item.size}`,
      `   Quantity: ${item.quantity}`,
      `   Unit price: ${formatPrice(item.price)}`,
      `   Subtotal: ${formatPrice(item.price * item.quantity)}`
    ].join("\n");
  });

  const total = bag.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const message = [
    "Hello Rhamsey Footwear! I'd like to place an order.",
    "",
    ...lines,
    "",
    `TOTAL: ${formatPrice(total)}`,
    "",
    "Please confirm availability and delivery/pickup arrangements.",
    "Thank you!"
  ].join("\n");

  const url =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank", "noopener,noreferrer");
}

productGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-product-id]");
  if (!button) return;

  openProduct(button.dataset.productId);
});

document.getElementById("variantSelect").addEventListener(
  "change",
  updateSelectedVariant
);

document.getElementById("quantityInput").addEventListener(
  "input",
  updateLineTotal
);

document.getElementById("decreaseQty").addEventListener("click", () => {
  const input = document.getElementById("quantityInput");
  input.value = Math.max(1, getQuantity() - 1);
  updateLineTotal();
});

document.getElementById("increaseQty").addEventListener("click", () => {
  const input = document.getElementById("quantityInput");
  input.value = Math.min(99, getQuantity() + 1);
  updateLineTotal();
});

document.getElementById("addToBag").addEventListener("click", addToBag);

document.getElementById("bagButton").addEventListener("click", () => {
  renderBag();
  bagOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
});

document.getElementById("checkoutButton").addEventListener(
  "click",
  checkoutOnWhatsApp
);

document.getElementById("bagItems").addEventListener("click", event => {
  const button = event.target.closest("[data-remove-index]");
  if (!button) return;

  const index = Number(button.dataset.removeIndex);
  bag.splice(index, 1);

  updateBagCount();
  renderBag();
});

document.querySelectorAll("[data-close]").forEach(button => {
  button.addEventListener("click", () => {
    const overlay = document.getElementById(button.dataset.close);
    closeOverlay(overlay);
  });
});

[productOverlay, bagOverlay].forEach(overlay => {
  overlay.addEventListener("click", event => {
    if (event.target === overlay) closeOverlay(overlay);
  });
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeOverlay(productOverlay);
    closeOverlay(bagOverlay);
  }
});

document.getElementById("searchInput").addEventListener(
  "input",
  renderProducts
);

document.getElementById("categoryFilter").addEventListener(
  "change",
  renderProducts
);

renderProducts();
renderBag();
