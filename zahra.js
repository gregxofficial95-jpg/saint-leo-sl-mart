
/* =========================================
   SCENTS BY ZAHRA
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================
     WHATSAPP SETTINGS
  ======================================= */

  // Replace this with Zahra's WhatsApp number.
  // Use country code 234, without + or spaces.
  const WHATSAPP_NUMBER = "2349164335454";


  /* =======================================
     PRODUCT CATALOGUE
  ======================================= */

  const products = [
    {
      id: 1,
      name: "Crush Collection",
      price: 3500,
      image: "zahra-1.jpeg",
      type: "Fragrance Collection",
      variants: [
        "Candy Crush",
        "Juicy Crush",
        "Gelato Crush",
        "Vanilla Crush"
      ]
    },

    {
      id: 2,
      name: "Matelot Collection",
      price: 5000,
      image: "zahra-2.jpeg",
      type: "Matelot Fragrances",
      variants: [
        "Matelot Floral",
        "Matelot Cartie",
        "Matelot Romance",
        "Matelot Passion"
      ]
    },

    {
      id: 3,
      name: "Fragrance Collection",
      price: 6000,
      image: "zahra-3.jpeg",
      type: "Selected Fragrances",
      variants: [
        "ASAD",
        "Ramze",
        "Kamrah"
      ]
    },

    {
      id: 4,
      name: "Saheb Eau de Parfum",
      price: 40000,
      image: "zahra-4.jpeg",
      type: "Eau de Parfum",
      variants: []
    },

    {
      id: 5,
      name: "Designers Club Night",
      price: 10000,
      image: "zahra-5.jpeg",
      type: "Fragrance",
      variants: []
    },

    {
      id: 6,
      name: "Yum Yum",
      price: 5000,
      image: "zahra-6.jpeg",
      type: "Fragrance",
      variants: []
    },

    {
      id: 7,
      name: "Confetti",
      price: 5000,
      image: "zahra-7.jpeg",
      type: "Fragrance",
      variants: []
    }
  ];


  /* =======================================
     ELEMENTS
  ======================================= */

  const productGrid = document.getElementById("productGrid");
  const productSearch = document.getElementById("productSearch");
  const sortProducts = document.getElementById("sortProducts");
  const noResults = document.getElementById("noResults");

  const openCartButton = document.getElementById("openCart");
  const closeCartButton = document.getElementById("closeCart");
  const bannerCartButton = document.getElementById("bannerCart");
  const continueShoppingButton = document.getElementById("continueShopping");

  const cartDrawer = document.getElementById("cartDrawer");
  const cartOverlay = document.getElementById("cartOverlay");
  const cartItemsContainer = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");
  const emptyCart = document.getElementById("emptyCart");

  const checkoutButton = document.getElementById("checkoutButton");
  const clearCartButton = document.getElementById("clearCart");
  const toast = document.getElementById("toast");


  /* =======================================
     STATE
  ======================================= */

  let cart = [];

  try {
    const savedCart = JSON.parse(
      localStorage.getItem("scentsByZahraCart")
    );

    if (Array.isArray(savedCart)) {
      cart = savedCart.filter(item =>
        products.some(product => product.id === item.id) &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0
      );
    }
  } catch (error) {
    cart = [];
  }

  let toastTimeout;


  /* =======================================
     FORMAT PRICE
  ======================================= */

  function formatPrice(amount) {
    return "₦" + Number(amount).toLocaleString("en-NG");
  }


  /* =======================================
     SAVE CART
  ======================================= */

  function saveCart() {
    try {
      localStorage.setItem(
        "scentsByZahraCart",
        JSON.stringify(cart)
      );
    } catch (error) {
      console.warn("Cart could not be saved in this browser.");
    }
  }


  /* =======================================
     TOAST MESSAGE
  ======================================= */

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 2600);
  }


  /* =======================================
     RENDER PRODUCTS
  ======================================= */

  function renderProducts() {
    const searchTerm = productSearch.value
      .trim()
      .toLowerCase();

    let visibleProducts = products.filter(product => {
      const searchableText = [
        product.name,
        product.type,
        ...product.variants
      ].join(" ").toLowerCase();

      return searchableText.includes(searchTerm);
    });

    const sortValue = sortProducts.value;

    if (sortValue === "low") {
      visibleProducts.sort((a, b) => a.price - b.price);
    }

    if (sortValue === "high") {
      visibleProducts.sort((a, b) => b.price - a.price);
    }

    if (sortValue === "name") {
      visibleProducts.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    productGrid.innerHTML = visibleProducts.map(product => {

      const variantOptions = product.variants.length
        ? `
          <label class="variant-label" for="variant-${product.id}">
            Choose your scent
          </label>

          <select
            class="variant-select"
            id="variant-${product.id}"
            data-variant="${product.id}"
          >
            ${product.variants.map(variant => `
              <option value="${variant}">${variant}</option>
            `).join("")}
          </select>
        `
        : "";

      return `
        <article class="product-card" data-product="${product.id}">

          <div class="product-image">
            <span class="product-number">
              ZAHRA / ${String(product.id).padStart(2, "0")}
            </span>

            <img
              src="${product.image}"
              alt="${product.name}"
              loading="lazy"
              onerror="this.onerror=null;this.style.opacity='0.15';this.alt='Image unavailable: ${product.name}';"
            >
          </div>

          <div class="product-info">

            <span class="product-type">
              ${product.type}
            </span>

            <h3>${product.name}</h3>

            <p class="product-price">
              ${formatPrice(product.price)}
            </p>

            ${variantOptions}

            <div class="product-actions">

              <span class="quantity-label">
                Quantity
              </span>

              <div class="quantity-control">

                <button
                  type="button"
                  data-quantity-action="decrease"
                  data-id="${product.id}"
                  aria-label="Decrease quantity of ${product.name}"
                >−</button>

                <output
                  data-quantity-output="${product.id}"
                  aria-label="Selected quantity"
                >1</output>

                <button
                  type="button"
                  data-quantity-action="increase"
                  data-id="${product.id}"
                  aria-label="Increase quantity of ${product.name}"
                >+</button>

              </div>

              <button
                type="button"
                class="add-button"
                data-add="${product.id}"
              >
                ADD TO BAG +
              </button>

            </div>
          </div>
        </article>
      `;
    }).join("");

    noResults.hidden = visibleProducts.length !== 0;
  }


  /* =======================================
     PRODUCT QUANTITY CONTROLS
  ======================================= */

  productGrid.addEventListener("click", event => {

    const quantityButton = event.target.closest(
      "[data-quantity-action]"
    );

    if (quantityButton) {
      const productId = Number(quantityButton.dataset.id);

      const output = productGrid.querySelector(
        `[data-quantity-output="${productId}"]`
      );

      let quantity = Number(output.textContent);

      if (quantityButton.dataset.quantityAction === "increase") {
        quantity++;
      } else {
        quantity = Math.max(1, quantity - 1);
      }

      output.textContent = quantity;
      return;
    }

    const addButton = event.target.closest("[data-add]");

    if (addButton) {
      const productId = Number(addButton.dataset.add);

      const product = products.find(
        item => item.id === productId
      );

      if (!product) return;

      const quantityOutput = productGrid.querySelector(
        `[data-quantity-output="${productId}"]`
      );

      const quantity = Number(quantityOutput.textContent);

      const variantSelect = productGrid.querySelector(
        `[data-variant="${productId}"]`
      );

      const selectedVariant = variantSelect
        ? variantSelect.value
        : "";

      addToCart(product, selectedVariant, quantity);

      quantityOutput.textContent = "1";
    }
  });


  /* =======================================
     ADD TO CART
  ======================================= */

  function addToCart(product, variant, quantity) {

    const existingItem = cart.find(item =>
      item.id === product.id &&
      item.variant === variant
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        variant: variant,
        quantity: quantity
      });
    }

    saveCart();
    renderCart();

    showToast(
      `${variant || product.name} added to your bag.`
    );
  }


  /* =======================================
     CART TOTALS
  ======================================= */

  function getCartQuantity() {
    return cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  function getCartTotal() {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }


  /* =======================================
     RENDER CART
  ======================================= */

  function renderCart() {

    cartCount.textContent = getCartQuantity();
    cartTotal.textContent = formatPrice(getCartTotal());

    const isEmpty = cart.length === 0;

    emptyCart.hidden = !isEmpty;
    cartItemsContainer.hidden = isEmpty;
    checkoutButton.disabled = isEmpty;
    clearCartButton.disabled = isEmpty;

    checkoutButton.style.opacity = isEmpty ? "0.5" : "1";
    clearCartButton.style.opacity = isEmpty ? "0.5" : "1";

    cartItemsContainer.innerHTML = cart.map((item, index) => {

      const itemName = item.variant || item.name;

      return `
        <article class="cart-item">

          <div>
            <h3>${itemName}</h3>

            ${item.variant ? `
              <p class="cart-item-variant">${item.name}</p>
            ` : ""}

            <p class="cart-item-price">
              ${formatPrice(item.price)} each
            </p>

            <div class="cart-item-controls">

              <button
                type="button"
                data-cart-action="decrease"
                data-index="${index}"
                aria-label="Decrease quantity"
              >−</button>

              <span>${item.quantity}</span>

              <button
                type="button"
                data-cart-action="increase"
                data-index="${index}"
                aria-label="Increase quantity"
              >+</button>

              <button
                type="button"
                class="remove-item"
                data-cart-action="remove"
                data-index="${index}"
              >Remove</button>

            </div>
          </div>

          <strong class="cart-item-price">
            ${formatPrice(item.price * item.quantity)}
          </strong>

        </article>
      `;
    }).join("");
  }


  /* =======================================
     CART ITEM CONTROLS
  ======================================= */

  cartItemsContainer.addEventListener("click", event => {

    const button = event.target.closest("[data-cart-action]");

    if (!button) return;

    const index = Number(button.dataset.index);
    const item = cart[index];

    if (!item) return;

    const action = button.dataset.cartAction;

    if (action === "increase") {
      item.quantity++;
    }

    if (action === "decrease") {
      item.quantity--;

      if (item.quantity < 1) {
        cart.splice(index, 1);
      }
    }

    if (action === "remove") {
      cart.splice(index, 1);
    }

    saveCart();
    renderCart();
  });


  /* =======================================
     OPEN AND CLOSE CART
  ======================================= */

  function openCart() {
    cartDrawer.classList.add("open");
    cartOverlay.classList.add("visible");
    document.body.classList.add("cart-open");

    cartDrawer.setAttribute("aria-hidden", "false");
    closeCartButton.focus();
  }

  function closeCart() {
    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("visible");
    document.body.classList.remove("cart-open");

    cartDrawer.setAttribute("aria-hidden", "true");
    openCartButton.focus();
  }

  openCartButton.addEventListener("click", openCart);
  bannerCartButton.addEventListener("click", openCart);
  closeCartButton.addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);

  continueShoppingButton.addEventListener("click", () => {
    closeCart();

    document.getElementById("collection").scrollIntoView({
      behavior: "smooth"
    });
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" &&
        cartDrawer.classList.contains("open")) {
      closeCart();
    }
  });


  /* =======================================
     CLEAR CART
  ======================================= */

  clearCartButton.addEventListener("click", () => {

    if (cart.length === 0) return;

    cart = [];

    saveCart();
    renderCart();

    showToast("Your bag has been cleared.");
  });


  /* =======================================
     WHATSAPP CHECKOUT
  ======================================= */

  checkoutButton.addEventListener("click", () => {

    if (cart.length === 0) {
      showToast("Please add at least one fragrance.");
      return;
    }

    if (!/^234\d{10}$/.test(WHATSAPP_NUMBER)) {
      showToast("Please add Zahra's WhatsApp number in zahra.js.");
      return;
    }

    const orderLines = cart.map((item, index) => {

      const itemName = item.variant
        ? `${item.name} — ${item.variant}`
        : item.name;

      return (
        `${index + 1}. ${itemName}\n` +
        `   Quantity: ${item.quantity}\n` +
        `   Unit price: ${formatPrice(item.price)}\n` +
        `   Subtotal: ${formatPrice(item.price * item.quantity)}`
      );
    });

    const message = [
      "Hello Scents by Zahra! I'd like to place an order.",
      "",
      "MY FRAGRANCE ORDER",
      "------------------------------",
      ...orderLines,
      "",
      "------------------------------",
      `TOTAL: ${formatPrice(getCartTotal())}`,
      "",
      "Please confirm availability and delivery details.",
      "Thank you!"
    ].join("\n");

    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  });


  /* =======================================
     SEARCH AND SORT
  ======================================= */

  productSearch.addEventListener("input", renderProducts);
  sortProducts.addEventListener("change", renderProducts);


  /* =======================================
     FOOTER YEAR
  ======================================= */

  document.getElementById("currentYear").textContent =
    new Date().getFullYear();


  /* =======================================
     INITIALISE
  ======================================= */

  renderProducts();
  renderCart();

});
