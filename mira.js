
document.addEventListener("DOMContentLoaded", () => {

  // REPLACE THIS WITH MIRA'S REAL WHATSAPP NUMBER.
  // Use country code + number without the + sign.
  const WHATSAPP_NUMBER = "234XXXXXXXXXX";

  const products = {
    1: {
      name: "Miss Gail Rough Skin Leather Bag",
      price: 45000,
      category: "Bag",
      colourId: "miraColor1",
      sizeId: "miraSize1",
      quantityId: "miraQty1",
      needsColour: true,
      needsSize: false
    },

    2: {
      name: "Miss Gail Duffle Bag with Side Pockets",
      price: 47000,
      category: "Bag",
      colourId: "miraColor2",
      sizeId: "miraSize2",
      quantityId: "miraQty2",
      needsColour: true,
      needsSize: false
    },

    3: {
      name: "Reno Luxury Heel",
      price: 60000,
      category: "Shoes",
      colourId: "miraColor3",
      sizeId: "miraSize3",
      quantityId: "miraQty3",
      needsColour: false,
      needsSize: true,
      confirmSize: true
    },

    4: {
      name: "Zara Sandal Heel",
      price: 22000,
      category: "Shoes",
      colourId: "miraColor4",
      sizeId: "miraSize4",
      quantityId: "miraQty4",
      needsColour: false,
      needsSize: true
    },

    5: {
      name: "Monochrome Zara Heels",
      price: 22000,
      category: "Shoes",
      colourId: "miraColor5",
      sizeId: "miraSize5",
      quantityId: "miraQty5",
      needsColour: false,
      needsSize: true
    }
  };

  const formatPrice = (amount) => {
    return "₦" + amount.toLocaleString("en-NG");
  };

  // MOBILE NAVIGATION

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });

  // PRODUCT FILTERS

  const filterButtons = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-card");
  const resultsCount = document.getElementById("resultsCount");

  function filterProducts(category) {
    let visibleCount = 0;

    productCards.forEach((card) => {
      const matches =
        category === "all" || card.dataset.category === category;

      card.hidden = !matches;

      if (matches) {
        visibleCount++;
      }
    });

    resultsCount.textContent =
      String(visibleCount).padStart(2, "0") + " PRODUCTS";
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((item) => {
        item.classList.remove("active");
      });

      button.classList.add("active");
      filterProducts(button.dataset.filter);
    });
  });

  // QUANTITY CONTROLS

  document.querySelectorAll(".qty-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const input = document.getElementById(button.dataset.target);
      const step = Number(button.dataset.step);

      const currentValue = Number.parseInt(input.value, 10);
      const safeCurrent = Number.isFinite(currentValue) ? currentValue : 1;

      input.value = Math.min(
        99,
        Math.max(1, safeCurrent + step)
      );
    });
  });

  document.querySelectorAll(".quantity-control input").forEach((input) => {
    input.addEventListener("change", () => {
      const value = Number.parseInt(input.value, 10);

      input.value = Number.isFinite(value)
        ? Math.min(99, Math.max(1, value))
        : 1;
    });
  });

  // WHATSAPP CHECKOUT

  function orderProduct(productId) {
    const product = products[productId];

    if (!product) {
      alert("Sorry, this product could not be found.");
      return;
    }

    const colourElement = document.getElementById(product.colourId);
    const sizeElement = document.getElementById(product.sizeId);
    const quantityElement = document.getElementById(product.quantityId);

    const colour = colourElement.value;
    const size = sizeElement.value;

    const quantityValue = Number.parseInt(quantityElement.value, 10);
    const quantity = Number.isFinite(quantityValue)
      ? Math.min(99, Math.max(1, quantityValue))
      : 1;

    quantityElement.value = quantity;

    if (product.needsColour && !colour) {
      alert("Please select your preferred colour or print.");
      colourElement.focus();
      return;
    }

    if (product.needsSize && !size) {
      alert("Please select your shoe size.");
      sizeElement.focus();
      return;
    }

    if (product.confirmSize && size !== "Confirm availability") {
      alert("Please select the size confirmation option.");
      sizeElement.focus();
      return;
    }

    const total = product.price * quantity;

    const messageLines = [
      "Hello Mira's Nova Luxe! ♡",
      "",
      "I'd like to place an order:",
      "",
      "Product: " + product.name,
      "Category: " + product.category
    ];

    if (product.needsColour) {
      messageLines.push("Preferred colour/print: " + colour);
    }

    if (product.needsSize) {
      messageLines.push(
        "Shoe size: " +
        (product.confirmSize
          ? "Please confirm available sizes"
          : size)
      );
    }

    messageLines.push(
      "Quantity: " + quantity,
      "Unit price: " + formatPrice(product.price),
      "Total: " + formatPrice(total),
      "",
      "Please confirm availability and the next steps. Thank you!"
    );

    const message = messageLines.join("\n");

    if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
      alert(
        "WhatsApp ordering is set up! Please replace the placeholder number in mira.js with Mira's real WhatsApp number to activate checkout."
      );
      return;
    }

    const whatsappURL =
      "https://wa.me/" +
      WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(message);

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  }

  document.querySelectorAll("[data-order]").forEach((button) => {
    button.addEventListener("click", () => {
      orderProduct(button.dataset.order);
    });
  });

  // GENERAL WHATSAPP CONTACT

  document.getElementById("contactWhatsApp").addEventListener("click", (event) => {
    event.preventDefault();

    if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
      alert(
        "Please add Mira's real WhatsApp number to mira.js to activate this contact link."
      );
      return;
    }

    const message = encodeURIComponent(
      "Hello Mira's Nova Luxe! ♡ I'd like to make an enquiry about your collection."
    );

    window.open(
      "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + message,
      "_blank",
      "noopener,noreferrer"
    );
  });

  // CURRENT YEAR

  document.getElementById("currentYear").textContent =
    new Date().getFullYear();

});
