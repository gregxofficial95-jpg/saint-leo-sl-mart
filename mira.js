
document.addEventListener("DOMContentLoaded", () => {

  // REPLACE THIS WITH MIRA'S REAL WHATSAPP NUMBER.
  // Use country code + number without the + sign.
  const WHATSAPP_NUMBER = "2347026271132";

  
const products = {
  1: {
    name: "Miss Gail Rough Skin Leather Bag",
    price: 45000,
    category: "Bag",
    colourId: "miraColor1",
    quantityId: "miraQty1",
    needsColour: true
  },
  2: {
    name: "Miss Gail Duffle Bag with Side Pockets",
    price: 47000,
    category: "Bag",
    colourId: "miraColor2",
    quantityId: "miraQty2",
    needsColour: true
  },
  3: {
    name: "Reno Luxury Heel",
    price: 60000,
    category: "Shoes",
    sizeId: "miraSize3",
    quantityId: "miraQty3",
    needsSize: true,
    confirmSize: true
  },
  4: {
    name: "Zara Sandal Heel",
    price: 22000,
    category: "Shoes",
    sizeId: "miraSize4",
    quantityId: "miraQty4",
    needsSize: true
  },
  5: {
    name: "Monochrome Zara Heels",
    price: 22000,
    category: "Shoes",
    sizeId: "miraSize5",
    quantityId: "miraQty5",
    needsSize: true
  },
  6: {
    name: "Bag",
    price: 20000,
    category: "Bag",
    quantityId: "miraQty6"
  },
  7: {
    name: "Product 7",
    price: 23000,
    category: "Other",
    quantityId: "miraQty7"
  },
  8: {
    name: "Product 8",
    price: 23000,
    category: "Other",
    quantityId: "miraQty8"
  },
  9: {
    name: "Product 9",
    price: 25000,
    category: "Other",
    quantityId: "miraQty9"
  },
  10: {
    name: "Bag or Shoe",
    price: 23000,
    category: "Other",
    quantityId: "miraQty10",
    needsType: true
  },
 11: {
  name: "Available Now",
  price: 20000,
  category: "Shoes",
  quantityId: "miraQty11",
  includesBox: true
},
  12: {
    name: "Product 12",
    price: 20000,
    category: "Other",
    quantityId: "miraQty12"
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


// PRODUCT 10 PRICE SELECTOR

const miraType10 = document.getElementById("miraType10");
const miraPrice10 = document.getElementById("miraPrice10");

if (miraType10 && miraPrice10) {
  miraType10.addEventListener("change", () => {
    if (miraType10.value === "Bag") {
      miraPrice10.textContent = "₦23,000";
    } else if (miraType10.value === "Shoe") {
      miraPrice10.textContent = "₦25,000";
    } else {
      miraPrice10.textContent = "Choose an item";
    }
  });
}


  
  // WHATSAPP CHECKOUT + SUPABASE ORDER TRACKING

  const MIRA_BRAND_ID = "4b83ff70-def9-4af3-a3d3-9c85a64a6038";

  const MIRA_ORDER_URL =
    "https://tzjckojpgamjwigxmdja.supabase.co/functions/v1/submit-brand-order";

  const miraOrderModal = document.getElementById("miraOrderModal");
  const miraOrderForm = document.getElementById("miraOrderForm");
  const miraModalClose = document.getElementById("miraModalClose");
  const miraOrderError = document.getElementById("miraOrderError");
  const miraSubmitOrder = document.getElementById("miraSubmitOrder");

  let pendingMiraOrder = null;

  function closeMiraModal() {
    miraOrderModal.classList.remove("active");
    miraOrderError.textContent = "";
  }

  miraModalClose.addEventListener("click", closeMiraModal);

  miraOrderModal.addEventListener("click", (event) => {
    if (event.target === miraOrderModal) {
      closeMiraModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && miraOrderModal.classList.contains("active")) {
      closeMiraModal();
    }
  });

  function getMiraProductDetails(productId, button) {
    const card = button.closest(".product-card");

    if (!card) {
      throw new Error("Could not find this product.");
    }

    const product = products[productId] || {};
    const quantityElement = document.getElementById(
      product.quantityId || `miraQty${productId}`
    );

    if (!quantityElement) {
      throw new Error("Could not find the quantity selector for this product.");
    }

    const quantityValue = Number.parseInt(quantityElement.value, 10);
    const quantity = Number.isFinite(quantityValue)
      ? Math.min(99, Math.max(1, quantityValue))
      : 1;

    quantityElement.value = quantity;

    const heading = card.querySelector("h3");
    const image = card.querySelector("img");

    let productName = product.name || heading?.textContent.trim() || "";

    if (!product.name && (!productName || /^₦[\d,]+$/.test(productName))) {
      productName = image?.alt?.trim() || `Product ${productId}`;
    }

    const selections = [];
    let unitPrice = product.price || 0;

    // Product 10: Bag or Shoe
    if (productId === "10") {
      const typeElement = document.getElementById("miraType10");
      const selectedType = typeElement?.value || "";

      if (!selectedType) {
        throw new Error("Please choose either the bag or the shoe.");
      }

      productName = "Bag or Shoe";
      selections.push("Selected item: " + selectedType);

      unitPrice = selectedType === "Bag" ? 23000 : 25000;
    }

    // Read colour and size selections
    const colourElement = product.colourId
      ? document.getElementById(product.colourId)
      : null;

    const sizeElement = product.sizeId
      ? document.getElementById(product.sizeId)
      : null;

    if (product.needsColour && !colourElement?.value) {
      throw new Error("Please select your preferred colour or print.");
    }

    if (product.needsColour) {
      selections.push("Colour/Print: " + colourElement.value);
    }

    if (product.needsSize) {
      if (!sizeElement?.value) {
        throw new Error("Please select your shoe size.");
      }

      if (
        product.confirmSize &&
        sizeElement.value !== "Confirm availability"
      ) {
        throw new Error("Please select the size confirmation option.");
      }

      selections.push(
        "Shoe size: " +
        (product.confirmSize
          ? "Please confirm available sizes"
          : sizeElement.value)
      );
    }

    // Product 11: colour and shoe size
if (productId === "11") {
  const selects = Array.from(card.querySelectorAll("select"));

  if (selects.length < 2) {
    throw new Error("Product 11 options could not be found.");
  }

  const colour = selects[0].value.trim();
  const size = selects[1].value.trim();

  if (!colour || !size) {
    throw new Error("Please select both colour and shoe size.");
  }

  selections.push("Colour: " + colour);
  selections.push("Shoe size: " + size);
  selections.push("Shoe box: Included");
}

    // Other products: read their displayed price
    if (productId !== "10" && !unitPrice) {
      const priceElement = card.querySelector(".product-price");
      const priceText = priceElement?.textContent || "";
      const parsedPrice = Number(priceText.replace(/[^\d]/g, ""));

      unitPrice = Number.isFinite(parsedPrice) ? parsedPrice : 0;
    }

    if (!unitPrice) {
      throw new Error("Could not determine the price of this product.");
    }

    const total = unitPrice * quantity;

    return {
      productName,
      category: product.category || card.dataset.category || "Other",
      quantity,
      unitPrice,
      total,
      selections
    };
  }

  function orderProduct(productId, button) {
    try {
      pendingMiraOrder = getMiraProductDetails(productId, button);

      miraOrderError.textContent = "";
      miraOrderModal.classList.add("active");

      document.getElementById("miraCustomerName").focus();
    } catch (error) {
      alert(error.message);
    }
  }

  document.querySelectorAll("[data-order]").forEach((button) => {
    button.addEventListener("click", () => {
      orderProduct(button.dataset.order, button);
    });
  });

  // SUBMIT ORDER TO SUPABASE, THEN OPEN WHATSAPP

  miraOrderForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!pendingMiraOrder) {
      miraOrderError.textContent = "Please select a product first.";
      return;
    }

    const customerName = document
      .getElementById("miraCustomerName").value.trim();

    const customerPhone = document
      .getElementById("miraCustomerPhone").value.trim();

    const customerAddress = document
      .getElementById("miraCustomerAddress").value.trim();

    if (!customerName || !customerPhone || !customerAddress) {
      miraOrderError.textContent = "Please complete all your details.";
      return;
    }

    if (!/^[0-9+\s()-]{7,25}$/.test(customerPhone)) {
      miraOrderError.textContent = "Please enter a valid phone number.";
      return;
    }

    if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
      miraOrderError.textContent = "The WhatsApp number is invalid.";
      return;
    }

    const selectedOrder = { ...pendingMiraOrder };

    const whatsappTab = window.open("", "_blank");

    miraSubmitOrder.disabled = true;
    miraSubmitOrder.textContent = "SUBMITTING ORDER...";

    miraOrderError.textContent = "";

    try {
      const productDescription = [
        selectedOrder.category,
        ...selectedOrder.selections
      ].join(" | ");

      const response = await fetch(MIRA_ORDER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          brand_id: MIRA_BRAND_ID,
          customer_name: customerName,
          customer_phone: customerPhone,
          delivery_address: customerAddress,
          request_type: "order",
          request_details: productDescription,
          items: [
            {
              product_name: selectedOrder.productName +
                (selectedOrder.selections.length
                  ? " (" + selectedOrder.selections.join(", ") + ")"
                  : ""),
              quantity: selectedOrder.quantity,
              unit_price: selectedOrder.unitPrice
            }
          ],
          website: ""
        })
      });

      const result = await response.json();

      if (
        !response.ok ||
        result.success !== true ||
        !result.order_number
      ) {
        throw new Error(
          result.message || "Your order could not be submitted. Please try again."
        );
      }

      const messageLines = [
        "Hello Mira's Nova Luxe! ♡",
        "",
        "I'd like to place an order.",
        "",
        "Order Reference: " + result.order_number,
        "Customer: " + customerName,
        "Phone: " + customerPhone,
        "Hostel/Address: " + customerAddress,
        "",
        "Product: " + selectedOrder.productName,
        "Category: " + selectedOrder.category,
        ...selectedOrder.selections,
        "Quantity: " + selectedOrder.quantity,
        "Unit Price: " + formatPrice(selectedOrder.unitPrice),
        "Total: " + formatPrice(selectedOrder.total),
        "",
        "Please confirm availability and the next steps. Thank you!"
      ];

      const whatsappURL =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(messageLines.join("\n"));

      closeMiraModal();
      miraOrderForm.reset();
      pendingMiraOrder = null;

      if (whatsappTab) {
        whatsappTab.location.href = whatsappURL;
      } else {
        window.location.href = whatsappURL;
      }

      alert("Order submitted successfully! Your reference is " + result.order_number);

    } catch (error) {
      if (whatsappTab) {
        whatsappTab.close();
      }

      miraOrderError.textContent =
        error.message || "Something went wrong. Please try again.";

    } finally {
      miraSubmitOrder.disabled = false;
      miraSubmitOrder.textContent = "Continue to WhatsApp";
    }
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
