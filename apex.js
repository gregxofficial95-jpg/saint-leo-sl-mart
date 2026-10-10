
/* =====================================================
   APEX SCENTS
   PRODUCT CATALOGUE + SHOPPING CART + WHATSAPP ORDERING
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ===================================================
     SETTINGS
  =================================================== */

  const WHATSAPP_NUMBER = "2347026677755";

  const STORAGE_KEY = "apexScentsCart";

  const formatPrice = (amount) => {
    return "₦" + Number(amount).toLocaleString("en-NG");
  };


  /* ===================================================
     PRODUCT CATALOGUE

     Image files:
     apex-01.jpeg through apex-27.jpeg

     Keep the image numbering consistent with your files.
  =================================================== */

  const products = [

    {
      id: 1,
      name: "Maahir Legacy",
      description: "Eau de Parfum",
      price: 13000,
      image: "apex-01.jpeg"
    },

    {
      id: 2,
      name: "Matelot",
      description: "Eau de Parfum",
      price: 10000,
      image: "apex-02.jpeg"
    },

    {
      id: 3,
      name: "ASAD Bourbon",
      description: "Eau de Parfum",
      price: 12000,
      image: "apex-03.jpeg"
    },

    {
      id: 4,
      name: "Berries Weekend",
      description: "100ml",
      price: 30000,
      image: "apex-04.jpeg"
    },

    {
      id: 5,
      name: "Berries Weekend",
      description: "30ml",
      price: 8000,
      image: "apex-05.jpeg"
    },

    {
      id: 6,
      name: "Red Velvet",
      description: "Eau de Parfum",
      price: 40000,
      image: "apex-06.jpeg"
    },

    {
      id: 7,
      name: "Rifaaqat",
      description: "Distinctive fragrance",
      price: 8000,
      image: "apex-07.jpeg"
    },

    {
      id: 8,
      name: "Sahib Valhalla",
      description: "Distinctive fragrance",
      price: 8000,
      image: "apex-08.jpeg"
    },

    {
      id: 9,
      name: "Paradise",
      description: "Choose your preferred variety",
      price: 8000,
      image: "apex-09.jpeg",
      options: ["Orient", "Rossa"]
    },

    {
      id: 10,
      name: "Hawas",
      description: "Choose your preferred variety",
      price: 8000,
      image: "apex-10.jpeg",
      options: ["Nude", "Ice"]
    },

    {
      id: 11,
      name: "Fragrance Selection",
      description: "Choose your preferred fragrance",
      price: 6000,
      image: "apex-11.jpeg",
      options: ["Oud Torch", "White Touch Genie"]
    },

    {
      id: 12,
      name: "Avanti",
      description: "Choose your preferred fragrance",
      price: 7000,
      image: "apex-12.jpeg",
      options: ["Avanti Blue", "Avanti Red"]
    },

    {
      id: 13,
      name: "Hanna's Secret",
      description: "Eau de Parfum",
      price: 10000,
      image: "apex-13.jpeg"
    },

    {
      id: 14,
      name: "Fragrance Selection",
      description: "Choose your preferred fragrance",
      price: 6000,
      image: "apex-14.jpeg",
      options: ["My Her", "My Man"]
    },

    {
      id: 15,
      name: "Fragrance Selection",
      description: "Eau de Parfum",
      price: 6000,
      image: "apex-15.jpeg",
      options: ["Qissa Pink", "Genie Ford"]
    },

    {
      id: 16,
      name: "BE_TRES",
      description: "Signature fragrance",
      price: 6000,
      image: "apex-16.jpeg"
    },

    {
      id: 17,
      name: "Lattafa",
      description: "Eau de Parfum",
      price: 30000,
      image: "apex-17.jpeg"
    },

    {
      id: 18,
      name: "Yum Yum",
      description: "Signature fragrance",
      price: 12000,
      image: "apex-18.jpeg"
    },

    {
      id: 19,
      name: "MO - NOGO - TAS - MO - RA",
      description: "Signature fragrance",
      price: 6000,
      image: "apex-19.jpeg"
    },

    {
      id: 20,
      name: "9PM",
      description: "50ml",
      price: 10000,
      image: "apex-20.jpeg"
    },

    {
      id: 21,
      name: "Matelot",
      description: "Eau de Parfum — second listing",
      price: 10000,
      image: "apex-21.jpeg"
    },

    {
      id: 22,
      name: "Arabiyat Prestige",
      description: "Premium fragrance",
      price: 35000,
      image: "apex-22.jpeg"
    },

    {
      id: 23,
      name: "Supremacy Collectors Edition",
      description: "AFNAN",
      price: 100000,
      image: "apex-23.jpeg"
    },

    {
      id: 24,
      name: "Spectre",
      description: "Premium fragrance",
      price: 65000,
      image: "apex-24.jpeg"
    },

    {
      id: 25,
      name: "ASAD Bourbon",
      description: "Second listing",
      price: 40000,
      image: "apex-25.jpeg"
    },

    {
      id: 26,
      name: "Haramain Detour Exclusif",
      description: "Eau de Parfum · 100ml",
      price: 50000,
      image: "apex-26.jpeg"
    },

    {
      id: 27,
      name: "ISHQ AL SHUYUKH Gold",
      description: "Premium fragrance",
      price: 50000,
      image: "apex-27.jpeg"
    }

  ];


  /* ===================================================
     ELEMENTS
  =================================================== */

  const productGrid = document.getElementById("productGrid");
  const productSearch = document.getElementById("productSearch");
  const sortProducts = document.getElementById("sortProducts");
  const productCount = document.getElementById("productCount");
  const noResults = document.getElementById("noResults");

  const cartButton = document.getElementById("cartButton");
  const cartDrawer = document.getElementById("cartDrawer");
  const cartOverlay = document.getElementById("cartOverlay");
  const closeCart = document.getElementById("closeCart");

  const cartItems = document.getElementById("cartItems");
  const cartEmpty = document.getElementById("cartEmpty");
  const cartFooter = document.getElementById("cartFooter");

  const cartCount = document.getElementById("cartCount");
  const drawerCount = document.getElementById("drawerCount");
  const cartTotal = document.getElementById("cartTotal");

  const checkoutButton = document.getElementById("checkoutButton");
  const clearCartButton = document.getElementById("clearCartButton");
  const continueShopping = document.getElementById("continueShopping");

  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");

  const shopNowButton = document.getElementById("shopNowButton");
  const currentYear = document.getElementById("currentYear");
  const toast = document.getElementById("toast");


  /* ===================================================
     CART STATE
  =================================================== */

  let cart = [];

  try {
    const savedCart = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

    if (Array.isArray(savedCart)) {
      cart = savedCart.filter((item) => {
        return (
          Number.isInteger(item.id) &&
          products.some((product) => product.id === item.id) &&
          Number.isInteger(item.quantity) &&
          item.quantity > 0 &&
          item.quantity <= 999 &&
          Number.isSafeInteger(item.price) &&
          item.price >= 0 &&
          typeof item.name === "string" &&
          typeof item.variant === "string"
        );
      });
    }

  } catch (error) {
    cart = [];
  }

  let toastTimeout;


  /* ===================================================
     INTRO SCREEN
  =================================================== */

  const introScreen = document.getElementById("introScreen");

  if (introScreen) {
    window.setTimeout(() => {
      introScreen.classList.add("hide-intro");
    }, 2200);
  }


  /* ===================================================
     FOOTER YEAR
  =================================================== */

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* ===================================================
     SAVE CART
  =================================================== */

  function saveCart() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(cart)
      );
    } catch (error) {
      // The cart still works for the current page session.
    }
  }


  /* ===================================================
     SHOW NOTIFICATION
  =================================================== */

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    window.clearTimeout(toastTimeout);

    toastTimeout = window.setTimeout(() => {
      toast.classList.remove("show");
    }, 2400);
  }


  /* ===================================================
     ESCAPE TEXT FOR HTML
  =================================================== */

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (character) => {
      const replacements = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };

      return replacements[character];
    });
  }


  /* ===================================================
     RENDER PRODUCT CARDS
  =================================================== */

  function renderProducts() {
    const searchTerm = productSearch.value
      .trim()
      .toLowerCase();

    let visibleProducts = products.filter((product) => {
      const searchableText = [
        product.name,
        product.description,
        ...(product.options || [])
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

    if (sortValue === "az") {
      visibleProducts.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    productCount.textContent = visibleProducts.length;

    noResults.hidden = visibleProducts.length !== 0;

    productGrid.innerHTML = visibleProducts.map((product) => {

      const optionMarkup = product.options
        ? `
          <label class="product-options-label"
            for="option-${product.id}">
            Choose variety
          </label>

          <select
            class="product-option"
            id="option-${product.id}"
            aria-label="Choose ${escapeHTML(product.name)} variety"
          >
            ${product.options.map((option, index) => `
              <option value="${escapeHTML(option)}"
                ${index === 0 ? "selected" : ""}>
                ${escapeHTML(option)}
              </option>
            `).join("")}
          </select>
        `
        : "";

      const displayName = product.options
        ? product.name
        : product.name;

      return `
        <article class="product-card" data-product-id="${product.id}">

          <div class="product-image-wrap">
            <span class="product-number">
              NO. ${String(product.id).padStart(2, "0")}
            </span>

            <img
              class="product-image"
              src="${escapeHTML(product.image)}"
              alt="${escapeHTML(displayName)}"
              loading="lazy"
              onerror="this.onerror=null;this.style.opacity='0.12';this.alt='Image unavailable: ${escapeHTML(product.image)}';"
            >
          </div>

          <div class="product-details">

            <h3 class="product-name">
              ${escapeHTML(displayName)}
            </h3>

            <p class="product-description">
              ${escapeHTML(product.description)}
            </p>

            <p class="product-price">
              <span class="price-prefix">FROM</span>
              ${formatPrice(product.price)}
            </p>

            ${optionMarkup}

            <div class="quantity-row">
              <span class="quantity-label">Quantity</span>

              <div class="quantity-control">
                <button
                  type="button"
                  data-action="decrease"
                  data-id="${product.id}"
                  aria-label="Decrease quantity"
                >−</button>

                <span id="quantity-${product.id}">1</span>

                <button
                  type="button"
                  data-action="increase"
                  data-id="${product.id}"
                  aria-label="Increase quantity"
                >+</button>
              </div>
            </div>

            <button
              class="add-to-cart"
              type="button"
              data-action="add"
              data-id="${product.id}"
            >
              <span>+</span> ADD TO BAG
            </button>

          </div>
        </article>
      `;

    }).join("");
  }


  /* ===================================================
     QUANTITY SELECTORS
  =================================================== */

  productGrid.addEventListener("click", (event) => {

    const button = event.target.closest("[data-action]");

    if (!button) return;

    const id = Number(button.dataset.id);
    const action = button.dataset.action;

    const quantityDisplay = document.getElementById(
      `quantity-${id}`
    );

    if (!quantityDisplay) return;

    let quantity = Number(quantityDisplay.textContent);

    if (action === "increase") {
      quantity = Math.min(999, quantity + 1);
    }

    if (action === "decrease") {
      quantity = Math.max(1, quantity - 1);
    }

    if (action === "increase" || action === "decrease") {
      quantityDisplay.textContent = quantity;
    }

    if (action === "add") {
      addToCart(id, quantity);
    }

  });


  /* ===================================================
     ADD PRODUCT TO CART
  =================================================== */

  function addToCart(id, quantity) {

    const product = products.find((item) => item.id === id);

    if (!product) return;

    const card = productGrid.querySelector(
      `[data-product-id="${id}"]`
    );

    if (!card) return;

    const optionSelect = card.querySelector(".product-option");

    const variant = optionSelect
      ? optionSelect.value
      : "";

    const cartItemName = product.options
      ? variant
      : product.name;

    const existingItem = cart.find((item) => {
      return item.id === id && item.variant === variant;
    });

    if (existingItem) {

      existingItem.quantity = Math.min(
        999,
        existingItem.quantity + quantity
      );

    } else {

      cart.push({
        id: product.id,
        name: cartItemName,
        variant: variant,
        price: product.price,
        quantity: quantity
      });

    }

    saveCart();
    renderCart();

    showToast(`${cartItemName} added to your bag.`);

  }


  /* ===================================================
     CART TOTALS
  =================================================== */

  function getCartQuantity() {
    return cart.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  }


  function getCartTotal() {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }


  /* ===================================================
     RENDER CART
  =================================================== */

  function renderCart() {

    const totalQuantity = getCartQuantity();
    const totalPrice = getCartTotal();

    cartCount.textContent = totalQuantity;
    drawerCount.textContent = `(${totalQuantity})`;
    cartTotal.textContent = formatPrice(totalPrice);

    const isEmpty = cart.length === 0;

    cartEmpty.hidden = !isEmpty;
    cartFooter.hidden = isEmpty;
    cartItems.hidden = isEmpty;

    if (isEmpty) {
      cartItems.innerHTML = "";
      return;
    }

    cartItems.innerHTML = cart.map((item, index) => {

      const fullName = item.name;

      return `
        <div class="cart-item">

          <div class="cart-item-info">
            <h3>${escapeHTML(fullName)}</h3>

            ${item.variant ? `
              <p>Selected variety: ${escapeHTML(item.variant)}</p>
            ` : ""}

            <p>
              ${formatPrice(item.price)} each
            </p>

            <strong class="cart-item-price">
              ${formatPrice(item.price * item.quantity)}
            </strong>

            <div class="cart-item-actions">

              <button
                type="button"
                data-cart-action="decrease"
                data-index="${index}"
                aria-label="Decrease item quantity"
              >−</button>

              <span>${item.quantity}</span>

              <button
                type="button"
                data-cart-action="increase"
                data-index="${index}"
                aria-label="Increase item quantity"
              >+</button>

              <button
                class="remove-item"
                type="button"
                data-cart-action="remove"
                data-index="${index}"
                aria-label="Remove item"
              >×</button>

            </div>
          </div>

        </div>
      `;

    }).join("");

  }


  /* ===================================================
     CART QUANTITY AND REMOVE ACTIONS
  =================================================== */

  cartItems.addEventListener("click", (event) => {

    const button = event.target.closest("[data-cart-action]");

    if (!button) return;

    const index = Number(button.dataset.index);
    const action = button.dataset.cartAction;

    const item = cart[index];

    if (!item) return;

    if (action === "increase") {
      item.quantity = Math.min(999, item.quantity + 1);
    }

    if (action === "decrease") {
      item.quantity -= 1;

      if (item.quantity <= 0) {
        cart.splice(index, 1);
      }
    }

    if (action === "remove") {
      cart.splice(index, 1);
    }

    saveCart();
    renderCart();

  });


  /* ===================================================
     OPEN CART
  =================================================== */

  function openCart() {

    closeMobileMenu();

    cartDrawer.classList.add("open");
    cartOverlay.classList.add("active");

    cartDrawer.setAttribute("aria-hidden", "false");

    document.body.classList.add("cart-open");

    closeCart.focus();

  }


  /* ===================================================
     CLOSE CART
  =================================================== */

  function hideCart() {

    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("active");

    cartDrawer.setAttribute("aria-hidden", "true");

    document.body.classList.remove("cart-open");

    cartButton.focus();

  }


  cartButton.addEventListener("click", openCart);
  closeCart.addEventListener("click", hideCart);
  cartOverlay.addEventListener("click", hideCart);


  /* ===================================================
     CLEAR CART
  =================================================== */

  clearCartButton.addEventListener("click", () => {

    if (cart.length === 0) return;

    const confirmed = window.confirm(
      "Are you sure you want to clear your entire bag?"
    );

    if (!confirmed) return;

    cart = [];

    saveCart();
    renderCart();

    showToast("Your bag has been cleared.");

  });


  /* ===================================================
     CONTINUE SHOPPING
  =================================================== */

  continueShopping.addEventListener("click", () => {

    hideCart();

    document.getElementById("collection").scrollIntoView({
      behavior: "smooth"
    });

  });


  /* ===================================================
     WHATSAPP CHECKOUT
  =================================================== */

  checkoutButton.addEventListener("click", () => {

    if (cart.length === 0) {
      showToast("Please add at least one fragrance.");
      return;
    }

    const total = getCartTotal();

    let message = "Hello Apex Scents! I would like to place an order.\n\n";

    message += "MY FRAGRANCE ORDER\n";
    message += "------------------------------\n";

    cart.forEach((item, index) => {

      message += `${index + 1}. ${item.name}\n`;

      if (item.variant) {
        message += `   Variety: ${item.variant}\n`;
      }

      message += `   Quantity: ${item.quantity}\n`;
      message += `   Unit price: ${formatPrice(item.price)}\n`;
      message += `   Subtotal: ${formatPrice(item.price * item.quantity)}\n\n`;

    });

    message += "------------------------------\n";
    message += `TOTAL: ${formatPrice(total)}\n\n`;
    message += "Please confirm availability and delivery arrangements. Thank you!";

    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");

  });


  /* ===================================================
     SEARCH AND SORT
  =================================================== */

  productSearch.addEventListener("input", renderProducts);

  sortProducts.addEventListener("change", renderProducts);


  /* ===================================================
     MOBILE NAVIGATION
  =================================================== */

  function openMobileMenu() {

    mobileNav.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation");

    document.body.classList.add("menu-open");

  }


  function closeMobileMenu() {

    mobileNav.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");

    document.body.classList.remove("menu-open");

  }


  menuToggle.addEventListener("click", () => {

    const isOpen = mobileNav.classList.contains("active");

    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }

  });


  mobileNav.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", closeMobileMenu);

  });


  /* ===================================================
     SHOP NOW BUTTON
  =================================================== */

  shopNowButton.addEventListener("click", () => {

    document.getElementById("collection").scrollIntoView({
      behavior: "smooth"
    });

  });


  /* ===================================================
     ESCAPE KEY
  =================================================== */

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

      if (cartDrawer.classList.contains("open")) {
        hideCart();
      }

      if (mobileNav.classList.contains("active")) {
        closeMobileMenu();
      }

    }

  });


  /* ===================================================
     INITIALIZE WEBSITE
  =================================================== */

  renderProducts();
  renderCart();

});
