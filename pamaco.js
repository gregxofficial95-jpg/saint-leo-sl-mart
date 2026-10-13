
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const WHATSAPP_NUMBER = "2349063527990";
  const BOX_PRICE = 1000;

  const products = [
    {
      id: 1,
      name: "Cartier Wristwatch",
      price: 35000,
      category: "accessories",
      categoryLabel: "Watches",
      tag: "6 Types",
      description: "Explore the available Cartier wristwatch styles and select your preferred design.",
      variants: [
        { name: "Type A", image: "pamaco-1a.jpeg" },
        { name: "Type B", image: "pamaco-1b.jpeg" },
        { name: "Type C", image: "pamaco-1c.jpeg" },
        { name: "Type D", image: "pamaco-1d.jpeg" },
        { name: "Type E", image: "pamaco-1e.jpeg" },
        { name: "Type F", image: "pamaco-1f.jpeg" }
      ]
    },
    {
      id: 2,
      name: "Nike Air Force Swoosh",
      price: 35000,
      category: "footwear",
      categoryLabel: "Sneakers",
      tag: "Unisex",
      description: "Nike Air Force Swoosh sneakers. Original-quality listing. Available for men and women.",
      sizes: [41, 42, 43, 44, 45, 46, 47],
      boxOptional: true,
      boxIncluded: false,
      variants: [
        { name: "Available Design", image: "pamaco-2.jpeg" }
      ]
    },
    {
      id: 3,
      name: "Original Jordan IV",
      price: 40000,
      category: "footwear",
      categoryLabel: "Sneakers",
      tag: "Unisex",
      description: "Jordan IV sneakers in the listed best-quality option. Select your EU shoe size.",
      sizes: [41, 42, 43, 44, 45, 46],
      boxOptional: true,
      boxIncluded: false,
      variants: [
        { name: "Available Design", image: "pamaco-3.jpeg" }
      ]
    },
    {
      id: 4,
      name: "Statement Shirt",
      price: 25000,
      category: "apparel",
      categoryLabel: "Apparel",
      tag: "2 Types",
      description: "Explore the two available shirt designs and choose your preferred type.",
      variants: [
        { name: "Type A", image: "pamaco-4a.jpeg" },
        { name: "Type B", image: "pamaco-4b.jpeg" }
      ]
    },
    {
      id: 5,
      name: "Essential Shirt",
      price: 26000,
      category: "apparel",
      categoryLabel: "Apparel",
      tag: "Featured",
      description: "A distinctive shirt selection from Pamaco.",
      variants: [
        { name: "Available Design", image: "pamaco-5.jpeg" }
      ]
    },
    {
      id: 6,
      name: "New Inn Sneakers",
      price: 55000,
      category: "footwear",
      categoryLabel: "Sneakers",
      tag: "Box Optional",
      description: "New Inn sneakers. Available as seen, in the listed size range.",
      sizes: [43, 44, 45, 46],
      boxOptional: true,
      boxIncluded: false,
      variants: [
        { name: "Available Design", image: "pamaco-6.jpeg" }
      ]
    },
    {
      id: 7,
      name: "Adidas Samba",
      price: 30000,
      category: "footwear",
      categoryLabel: "Sneakers",
      tag: "Unisex",
      description: "Adidas Samba sneakers. Explore this listed design and select your preferred EU size.",
      sizes: [39, 40, 41, 42, 43, 44, 45],
      boxOptional: true,
      boxIncluded: false,
      variants: [
        { name: "Available Design", image: "pamaco-7.jpeg" }
      ]
    },
    {
      id: 8,
      name: "Original Corporate Shoes",
      price: 50000,
      category: "footwear",
      categoryLabel: "Corporate Shoes",
      tag: "9 Types",
      description: "Corporate footwear in the listed best-quality selection. A shoe box is included.",
      sizes: [40, 41, 42, 43, 44, 45, 46],
      boxOptional: false,
      boxIncluded: true,
      variants: [
        { name: "Type A", image: "pamaco-8a.jpeg" },
        { name: "Type B", image: "pamaco-8b.jpeg" },
        { name: "Type C", image: "pamaco-8c.jpeg" },
        { name: "Type D", image: "pamaco-8d.jpeg" },
        { name: "Type E", image: "pamaco-8e.jpeg" },
        { name: "Type F", image: "pamaco-8f.jpeg" },
        { name: "Type G", image: "pamaco-8g.jpeg" },
        { name: "Type H", image: "pamaco-8h.jpeg" },
        { name: "Type I", image: "pamaco-8i.jpeg" }
      ]
    },
    {
      id: 9, name: "Fashion Belts", price: 18000,
      category: "accessories", categoryLabel: "Belts", tag: "2 Types",
      description: "Fashion belts in two available designs.",
      variants: [
        { name: "Type A", image: "pamaco-9a.jpeg" },
        { name: "Type B", image: "pamaco-9b.jpeg" }
      ]
    },
    {
      id: 10, name: "Henley's", price: 25000,
      category: "apparel", categoryLabel: "Apparel", tag: "3 Colours",
      description: "Henley's available in black, grey and white. Choose your preferred colour.",
      colors: ["Black", "Grey", "White"],
      variants: [{ name: "Available Colours", image: "pamaco-10.jpeg" }]
    },
    {
      id: 11, name: "Roundnecks", price: 15000,
      category: "apparel", categoryLabel: "Apparel", tag: "2 Types",
      description: "Roundneck shirts in two available designs.",
      variants: [
        { name: "Type A", image: "pamaco-11a.jpeg" },
        { name: "Type B", image: "pamaco-11b.jpeg" }
      ]
    },
    {
      id: 12, name: "Supreme Shirts", price: 20000,
      category: "apparel", categoryLabel: "Apparel", tag: "2 Types",
      description: "Supreme shirts in two available designs.",
      variants: [
        { name: "Type A", image: "pamaco-12a.jpeg" },
        { name: "Type B", image: "pamaco-12b.jpeg" }
      ]
    },
    {
      id: 13, name: "Baggy Flare Jean", price: 25000,
      category: "apparel", categoryLabel: "Denim", tag: "Featured",
      description: "Baggy flare jeans from the Pamaco collection.",
      variants: [{ name: "Available Design", image: "pamaco-13.jpeg" }]
    },
    {
      id: 14, name: "Poedagar Watch", price: 32000,
      category: "accessories", categoryLabel: "Watches", tag: "4 Types",
      description: "Poedagar wristwatch. Supplied fully boxed with a bag.",
      boxIncluded: true,
      bagIncluded: true,
      variants: [
        { name: "Type A", image: "pamaco-14a.jpeg" },
        { name: "Type B", image: "pamaco-14b.jpeg" },
        { name: "Type C", image: "pamaco-14c.jpeg" },
        { name: "Type D", image: "pamaco-14d.jpeg" }
      ]
    },
    {
      id: 15, name: "Sweatshirts", price: 18000,
      category: "apparel", categoryLabel: "Apparel", tag: "4 Types",
      description: "Choose from four available sweatshirt designs.",
      variants: [
        { name: "Type A", image: "pamaco-15a.jpeg" },
        { name: "Type B", image: "pamaco-15b.jpeg" },
        { name: "Type C", image: "pamaco-15c.jpeg" },
        { name: "Type D", image: "pamaco-15d.jpeg" }
      ]
    },

    // 16 — 20: FOOTWEAR AND WATCHES
    {
      id: 16, name: "Balenciaga Corporate Shoes", price: 45000,
      category: "footwear", categoryLabel: "Corporate Shoes", tag: "Unisex",
      description: "Balenciaga corporate shoes. Shoe box included.",
      sizes: [40, 41, 42, 43, 44, 45, 46],
      boxIncluded: true,
      variants: [{ name: "Design 1", image: "pamaco-16.jpeg" }]
    },
    {
      id: 17, name: "Herms Slippers", price: 45000,
      category: "footwear", categoryLabel: "Slippers", tag: "4 Types",
      description: "Herms slippers in four available designs.",
      sizes: [40, 41, 42, 43, 44, 45],
      variants: [
        { name: "Type A", image: "pamaco-17a.jpeg" },
        { name: "Type B", image: "pamaco-17b.jpeg" },
        { name: "Type C", image: "pamaco-17c.jpeg" },
        { name: "Type D", image: "pamaco-17d.jpeg" }
      ]
    },
    {
      id: 18, name: "New Balance 9030", price: 32000,
      category: "footwear", categoryLabel: "Sneakers", tag: "Unisex",
      description: "New Balance 9030 sneakers in four available designs.",
      sizes: [40, 41, 42, 43, 44, 45],
      variants: [
        { name: "Type A", image: "pamaco-18a.jpeg" },
        { name: "Type B", image: "pamaco-18b.jpeg" },
        { name: "Type C", image: "pamaco-18c.jpeg" },
        { name: "Type D", image: "pamaco-18d.jpeg" }
      ]
    },
    {
      id: 19, name: "Air Jordan Luxury", price: 60000,
      category: "footwear", categoryLabel: "Sneakers", tag: "Fully Boxed",
      description: "Air Jordan Luxury sneakers. Fully boxed, with four available designs.",
      sizes: [40, 41, 42, 43, 44, 45],
      boxIncluded: true,
      variants: [
        { name: "Type A", image: "pamaco-19a.jpeg" },
        { name: "Type B", image: "pamaco-19b.jpeg" },
        { name: "Type C", image: "pamaco-19c.jpeg" },
        { name: "Type D", image: "pamaco-19d.jpeg" }
      ]
    },
    {
      id: 20, name: "Hublot Watch", price: 22000,
      category: "accessories", categoryLabel: "Watches", tag: "4 Types",
      description: "Hublot watch in four available designs.",
      variants: [
        { name: "Type A", image: "pamaco-20a.jpeg" },
        { name: "Type B", image: "pamaco-20b.jpeg" },
        { name: "Type C", image: "pamaco-20c.jpeg" },
        { name: "Type D", image: "pamaco-20d.jpeg" }
      ]
    },

    // 21 — 28: APPAREL AND ACCESSORIES
    {
      id: 21, name: "Jersey", price: 15000,
      category: "apparel", categoryLabel: "Jerseys", tag: "4 Types",
      description: "Jerseys in four available designs.",
      variants: [
        { name: "Type A", image: "pamaco-21a.jpeg" },
        { name: "Type B", image: "pamaco-21b.jpeg" },
        { name: "Type C", image: "pamaco-21c.jpeg" },
        { name: "Type D", image: "pamaco-21d.jpeg" }
      ]
    },
    {
      id: 22, name: "Quality Jacket", price: 35000,
      category: "apparel", categoryLabel: "Jackets", tag: "4 Types",
      description: "Quality jackets in four available designs.",
      variants: [
        { name: "Type A", image: "pamaco-22a.jpeg" },
        { name: "Type B", image: "pamaco-22b.jpeg" },
        { name: "Type C", image: "pamaco-22c.jpeg" },
        { name: "Type D", image: "pamaco-22d.jpeg" }
      ]
    },
    {
      id: 23, name: "Original Plain Polo", price: 15000,
      category: "apparel", categoryLabel: "Polo Shirts", tag: "4 Types",
      description: "Original plain polo shirts in four available designs.",
      variants: [
        { name: "Type A", image: "pamaco-23a.jpeg" },
        { name: "Type B", image: "pamaco-23b.jpeg" },
        { name: "Type C", image: "pamaco-23c.jpeg" },
        { name: "Type D", image: "pamaco-23d.jpeg" }
      ]
    },
    {
      id: 24, name: "Balenciaga Corporate Shoes — Design 2", price: 45000,
      category: "footwear", categoryLabel: "Corporate Shoes", tag: "Unisex",
      description: "A separate Balenciaga corporate shoe design. Shoe box included.",
      sizes: [40, 41, 42, 43, 44, 45, 46],
      boxIncluded: true,
      variants: [{ name: "Design 2", image: "pamaco-24.jpeg" }]
    },
    {
      id: 25, name: "Tees", price: 25000,
      category: "apparel", categoryLabel: "T-Shirts", tag: "3 Colours",
      description: "Tees available in black, brown and white. Select your preferred colour.",
      colors: ["Black", "Brown", "White"],
      variants: [{ name: "Available Colours", image: "pamaco-25.jpeg" }]
    },
    {
      id: 26, name: "Nike Watch", price: 30000,
      category: "accessories", categoryLabel: "Watches", tag: "Featured",
      description: "Nike watch from the Pamaco collection.",
      variants: [{ name: "Available Design", image: "pamaco-26.jpeg" }]
    },
    {
      id: 27, name: "Chrome Hearts Belt", price: 18000,
      category: "accessories", categoryLabel: "Belts", tag: "Featured",
      description: "Chrome Hearts belt from the Pamaco collection.",
      variants: [{ name: "Available Design", image: "pamaco-27.jpeg" }]
    },
    {
      id: 28, name: "Ringer Tees", price: 17000,
      category: "apparel", categoryLabel: "T-Shirts", tag: "Featured",
      description: "Ringer tees from the Pamaco collection.",
      variants: [{ name: "Available Design", image: "pamaco-28.jpeg" }]
    }
  ];

  const $ = (selector) => document.querySelector(selector);

  const productGrid = $("#productGrid");
  const productSearch = $("#productSearch");
  const productCount = $("#productCount");
  const emptyState = $("#emptyState");

  const modal = $("#productModal");
  const modalImage = $("#modalImage");
  const modalTitle = $("#modalTitle");
  const modalCategory = $("#modalCategory");
  const modalPrice = $("#modalPrice");
  const modalDescription = $("#modalDescription");
  const variantInfo = $("#variantInfo");

  const variantGroup = $("#variantGroup");
  const variantSelect = $("#variantSelect");
  const sizeGroup = $("#sizeGroup");
  const sizeSelect = $("#sizeSelect");
  const boxGroup = $("#boxGroup");
  const boxCheckbox = $("#boxCheckbox");
  const quantityInput = $("#quantityInput");
  const orderTotal = $("#orderTotal");

  const galleryPrev = $("#galleryPrev");
  const galleryNext = $("#galleryNext");
  const galleryDots = $("#galleryDots");
  const galleryLabel = $("#galleryLabel");
  const galleryHint = $("#galleryHint");

  let activeFilter = "all";
  let activeProduct = null;
  let activeVariantIndex = 0;
  let previousFocus = null;
  let toastTimer = null;

  const formatPrice = (amount) =>
    "₦" + amount.toLocaleString("en-NG");

  // PRODUCT CARDS

  function renderProducts() {
    const searchTerm = productSearch.value.trim().toLowerCase();

    const filteredProducts = products.filter((product) => {
      const matchesCategory =
        activeFilter === "all" || product.category === activeFilter;

      const searchableText = [
        product.name,
        product.categoryLabel,
        product.description,
        product.tag
      ].join(" ").toLowerCase();

      return matchesCategory && searchableText.includes(searchTerm);
    });

    productGrid.innerHTML = "";

    filteredProducts.forEach((product, index) => {
      const card = document.createElement("article");
      card.className = "product-card";
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute(
        "aria-label",
        `View ${product.name}, ${formatPrice(product.price)}`
      );
      card.style.animationDelay = `${Math.min(index * 60, 300)}ms`;

      const firstImage = product.variants[0].image;

      card.innerHTML = `
        <div class="product-image">
          <span class="product-number">
            PM / ${String(product.id).padStart(2, "0")}
          </span>
          <span class="product-tag">${product.tag}</span>
          <img
            src="${firstImage}"
            alt="${product.name}"
            loading="lazy"
          >
        </div>
        <div class="product-card-body">
          <span class="product-category">${product.categoryLabel}</span>
          <h3>${product.name}</h3>
          <div class="product-card-footer">
            <span class="product-price">${formatPrice(product.price)}</span>
            <span class="view-product" aria-hidden="true">↗</span>
          </div>
        </div>
      `;

      card.addEventListener("click", () => openProduct(product));

      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openProduct(product);
        }
      });

      productGrid.appendChild(card);
    });

    productCount.textContent =
      `${String(filteredProducts.length).padStart(2, "0")} PIECES`;

    emptyState.hidden = filteredProducts.length !== 0;
  }

  productSearch.addEventListener("input", renderProducts);

  document.querySelectorAll(".filter-btn").forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;

      document.querySelectorAll(".filter-btn").forEach((filterButton) => {
        const isActive = filterButton === button;

        filterButton.classList.toggle("active", isActive);
        filterButton.setAttribute("aria-pressed", String(isActive));
      });

      renderProducts();
    });

    button.setAttribute(
      "aria-pressed",
      String(button.classList.contains("active"))
    );
  });

  // PRODUCT MODAL

  function openProduct(product) {
    activeProduct = product;
    activeVariantIndex = 0;
    previousFocus = document.activeElement;

    modalTitle.textContent = product.name;
    modalCategory.textContent =
      `${product.categoryLabel} / PAMACO ${String(product.id).padStart(2, "0")}`;

    modalDescription.textContent = product.description;
    modalPrice.textContent = formatPrice(product.price);

    quantityInput.value = 1;
    boxCheckbox.checked = false;

    // Product varieties

    variantGroup.hidden = product.variants.length <= 1;
    variantSelect.innerHTML = "";

    product.variants.forEach((variant, index) => {
      const option = document.createElement("option");
      option.value = String(index);
      option.textContent = variant.name;
      variantSelect.appendChild(option);
    });

    variantInfo.textContent = product.variants.length > 1
      ? `${product.variants.length} types available. Swipe the image or select a type below.`
      : "Single design available.";

    // Shoe sizes

    sizeGroup.hidden = !product.sizes;
    sizeSelect.innerHTML = "";

    if (product.sizes) {
      const placeholder = document.createElement("option");
      placeholder.value = "";
      placeholder.textContent = "Select your size";
      sizeSelect.appendChild(placeholder);

      product.sizes.forEach((size) => {
        const option = document.createElement("option");
        option.value = String(size);
        option.textContent = `EU ${size}`;
        sizeSelect.appendChild(option);
      });
    }

    // Optional shoe box

    boxGroup.hidden = !product.boxOptional;

    if (product.boxOptional) {
      boxCheckbox.checked = false;
    }

    updateGallery();
    updateTotal();

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    $("#modalClose").focus();
  }

  function closeModal() {
    if (!modal.classList.contains("is-open")) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    activeProduct = null;

    if (previousFocus && typeof previousFocus.focus === "function") {
      previousFocus.focus();
    }
  }

  $("#modalClose").addEventListener("click", closeModal);

  document.querySelectorAll("[data-close-modal]").forEach((element) => {
    element.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
      return;
    }

    if (!activeProduct) return;

    if (event.key === "ArrowRight") changeVariant(1);
    if (event.key === "ArrowLeft") changeVariant(-1);
  });

  // IMAGE GALLERY

  function updateGallery() {
    if (!activeProduct) return;

    const variant = activeProduct.variants[activeVariantIndex];

    modalImage.style.opacity = "0";

    modalImage.onload = () => {
      modalImage.style.opacity = "1";
    };

    modalImage.onerror = () => {
      modalImage.style.opacity = "1";
      showToast(`Image not found: ${variant.image}`);
    };

    modalImage.src = variant.image;
    modalImage.alt = `${activeProduct.name} — ${variant.name}`;

    galleryLabel.textContent =
      `PAMACO / ${String(activeProduct.id).padStart(2, "0")} — ` +
      `${String(activeVariantIndex + 1).padStart(2, "0")}`;

    galleryHint.textContent = activeProduct.variants.length > 1
      ? `SWIPE TO EXPLORE · ${activeVariantIndex + 1}/${activeProduct.variants.length}`
      : "PAMACO / STAY ORIGINAL";

    galleryPrev.hidden = activeProduct.variants.length <= 1;
    galleryNext.hidden = activeProduct.variants.length <= 1;

    galleryDots.innerHTML = "";

    if (activeProduct.variants.length > 1) {
      activeProduct.variants.forEach((item, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "gallery-dot";
        dot.classList.toggle("active", index === activeVariantIndex);
        dot.setAttribute("aria-label", `View ${item.name}`);

        dot.addEventListener("click", () => {
          activeVariantIndex = index;
          variantSelect.value = String(index);
          updateGallery();
        });

        galleryDots.appendChild(dot);
      });
    }

    if (!variantGroup.hidden) {
      variantSelect.value = String(activeVariantIndex);
    }
  }

  function changeVariant(direction) {
    if (!activeProduct || activeProduct.variants.length <= 1) return;

    const totalVariants = activeProduct.variants.length;

    activeVariantIndex =
      (activeVariantIndex + direction + totalVariants) % totalVariants;

    variantSelect.value = String(activeVariantIndex);
    updateGallery();
  }

  galleryPrev.addEventListener("click", () => changeVariant(-1));
  galleryNext.addEventListener("click", () => changeVariant(1));

  variantSelect.addEventListener("change", () => {
    activeVariantIndex = Number(variantSelect.value);
    updateGallery();
  });

  // MOBILE SWIPE GESTURES

  let touchStartX = 0;
  let touchStartY = 0;

  const gallery = $(".modal-gallery");

  gallery.addEventListener("touchstart", (event) => {
    if (!event.changedTouches.length) return;

    touchStartX = event.changedTouches[0].clientX;
    touchStartY = event.changedTouches[0].clientY;
  }, { passive: true });

  gallery.addEventListener("touchend", (event) => {
    if (!event.changedTouches.length) return;

    const deltaX = event.changedTouches[0].clientX - touchStartX;
    const deltaY = event.changedTouches[0].clientY - touchStartY;

    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
      changeVariant(deltaX < 0 ? 1 : -1);
    }
  }, { passive: true });

  // PRICE AND QUANTITY

  function getQuantity() {
    const quantity = Number.parseInt(quantityInput.value, 10);

    if (!Number.isFinite(quantity)) return 1;

    return Math.max(1, Math.min(99, quantity));
  }

  function updateTotal() {
    if (!activeProduct) return;

    const quantity = getQuantity();
    const boxCost =
      activeProduct.boxOptional && boxCheckbox.checked ? BOX_PRICE : 0;

    const total = (activeProduct.price + boxCost) * quantity;

    orderTotal.textContent = formatPrice(total);
  }

  $("#quantityMinus").addEventListener("click", () => {
    quantityInput.value = Math.max(1, getQuantity() - 1);
    updateTotal();
  });

  $("#quantityPlus").addEventListener("click", () => {
    quantityInput.value = Math.min(99, getQuantity() + 1);
    updateTotal();
  });

  quantityInput.addEventListener("input", updateTotal);

  quantityInput.addEventListener("change", () => {
    quantityInput.value = getQuantity();
    updateTotal();
  });

  boxCheckbox.addEventListener("change", updateTotal);

  // WHATSAPP ORDERING

  $("#orderButton").addEventListener("click", () => {
    if (!activeProduct) return;

    const product = activeProduct;
    const selectedVariant = product.variants[activeVariantIndex];
    const quantity = getQuantity();

    const selectedSize = product.sizes ? sizeSelect.value : "";
    const wantsBox = product.boxOptional && boxCheckbox.checked;

    if (product.sizes && !selectedSize) {
      showToast("Please select your shoe size first.");

      sizeSelect.focus();
      return;
    }

    const unitPrice =
      product.price + (wantsBox ? BOX_PRICE : 0);

    const total = unitPrice * quantity;

    const orderLines = [
      "Hello Pamaco! I'd like to place an order.",
      "",
      "PRODUCT DETAILS",
      `Product: ${product.name}`,
      `Type: ${selectedVariant.name}`,
      ...(selectedSize ? [`Shoe size: EU ${selectedSize}`] : []),
      `Shoe box: ${
        product.boxIncluded
          ? "Included"
          : wantsBox
            ? "Yes (+₦1,000 each)"
            : product.boxOptional
              ? "No"
              : "Not applicable"
      }`,
      `Quantity: ${quantity}`,
      `Unit price: ${formatPrice(unitPrice)}`,
      `TOTAL: ${formatPrice(total)}`,
      "",
      "Please confirm availability and provide ordering/delivery details. Thank you!"
    ];

    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(orderLines.join("\n"))}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  });

  // MOBILE NAVIGATION

  const menuToggle = $("#menuToggle");
  const mainNav = $("#mainNav");

  function closeMenu() {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    document.body.classList.remove("menu-open");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );

    document.body.classList.toggle("menu-open", isOpen);
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) closeMenu();
  });

  // SMALL FEEDBACK MESSAGE

  function showToast(message) {
    const toast = $("#toast");

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
  }

  // FOOTER YEAR

  $("#currentYear").textContent = new Date().getFullYear();

  // INITIALISE

  renderProducts();
});
