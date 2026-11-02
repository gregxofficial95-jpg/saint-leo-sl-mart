/* =========================================================
   MARYANN'S CAKES & PASTRIES
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     INTRO SCREEN
  ======================================================= */

  const introScreen = document.getElementById("introScreen");

  setTimeout(() => {
    introScreen.classList.add("hidden");
    document.body.classList.remove("no-scroll");
  }, 2600);

ensureMaryannPhoneFields();

  /* =======================================================
     HEADER SCROLL
  ======================================================= */

  const siteHeader = document.getElementById("siteHeader");

  function handleHeaderScroll() {

    if (window.scrollY > 30) {
      siteHeader.classList.add("scrolled");
    } else {
      siteHeader.classList.remove("scrolled");
    }

  }

  window.addEventListener("scroll", handleHeaderScroll);

  handleHeaderScroll();


  /* =======================================================
     MOBILE NAV
  ======================================================= */

  const mobileMenuBtn =
    document.getElementById("mobileMenuBtn");

  const mobileNav =
    document.getElementById("mobileNav");

  // Menu starts closed
  mobileNav.classList.remove("open");
  mobileMenuBtn.setAttribute("aria-expanded", "false");

  // Open and close menu when button is clicked
  mobileMenuBtn.addEventListener("click", () => {

    const isOpen = mobileNav.classList.toggle("open");

    mobileMenuBtn.setAttribute(
      "aria-expanded",
      isOpen
    );

  });

  // Close menu when a navigation link is clicked
  mobileNav.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      mobileNav.classList.remove("open");

      mobileMenuBtn.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });



  /* =======================================================
     CATEGORY FILTER
  ======================================================= */

  const categoryTabs =
    document.querySelectorAll(".category-tab");

  const categorySections =
    document.querySelectorAll(
      "[data-category-section]"
    );


  categoryTabs.forEach(tab => {

    tab.addEventListener("click", () => {

      categoryTabs.forEach(item => {
        item.classList.remove("active");
      });

      tab.classList.add("active");

      const filter =
        tab.dataset.filter;


      categorySections.forEach(section => {

        const sectionCategory =
          section.dataset.categorySection;


        if (
          filter === "all" ||
          filter === sectionCategory
        ) {

          section.style.display = "";

        } else {

          section.style.display = "none";

        }

      });


      const menuSection =
        document.getElementById("menu");

      if (menuSection) {

        const top =
          menuSection.offsetTop - 105;

        window.scrollTo({
          top,
          behavior: "smooth"
        });

      }

    });

  });


  /* =======================================================
     REVEAL ANIMATIONS
  ======================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");


  const revealObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            revealObserver.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  /* =======================================================
     SPECIAL ORDER FORM
  ======================================================= */

  const specialOrderForm =
    document.getElementById("specialOrderForm");


  specialOrderForm.addEventListener("submit", async event => {

  event.preventDefault();

  const name =
    document.getElementById("specialName").value.trim();

  const phone =
    document.getElementById("specialPhone")?.value.trim();

  const address =
  document.getElementById("specialAddress")?.value.trim();

  const need =
    document.getElementById("specialNeed").value.trim();

  const details =
    document.getElementById("specialDetails").value.trim();


  if (!name || !phone || !address || !need || !details) {

    alert("Please complete all fields.");

    return;

  }


  const button = specialOrderForm.querySelector("button[type='submit']");

  if (button) {
    button.disabled = true;
    button.textContent = "Submitting...";
  }


  const whatsappMessage =
    `Hello Maryann's Cakes & Pastries,\n\n` +
    `I'd like to make a special order.\n\n` +
    `Name: ${name}\n` +
    `Phone: ${phone}\n` +
    `Hostel / Delivery Address: ${address}\n` +
    `What I need: ${need}\n` +
    `Details: ${details}\n\n`;


  try {

    const result = await submitMaryannRequest({

      customer_name: name,

      customer_phone: phone,

      delivery_address: address,

      request_type: "quote",

      request_details:
        `Special order request\n\nWhat is needed: ${need}\nDetails: ${details}`,

      items: []

    });


    closeSpecialOrder();

    specialOrderForm.reset();

    showMaryannSuccess(

      result.order_number,

      whatsappMessage +
      `Order Reference: ${result.order_number}\n\nThank you.`

    );

  } catch (error) {

    alert(error.message || "Unable to submit your request.");

  } finally {

    if (button) {
      button.disabled = false;
      button.textContent = "Send Request →";
    }

  }

});


});


/* =========================================================
   ORDER SYSTEM
   ========================================================= */

let order = [];


const WHATSAPP_NUMBER =
  "2347088024775";


/* =========================================================
   ADD TO ORDER
   ========================================================= */

function addToOrder(
  name,
  price,
  image
) {

  const existingItem =
    order.find(item => item.name === name);


  if (existingItem) {

    existingItem.quantity += 1;

  } else {

    order.push({
      name,
      price,
      image,
      quantity: 1
    });

  }


  updateOrderUI();

  openOrderPanel();

}


/* =========================================================
   CHANGE QUANTITY
   ========================================================= */

function changeQuantity(
  index,
  amount
) {

  if (!order[index]) {
    return;
  }


  order[index].quantity += amount;


  if (order[index].quantity <= 0) {

    order.splice(index, 1);

  }


  updateOrderUI();

}


/* =========================================================
   REMOVE ITEM
   ========================================================= */

function removeOrderItem(index) {

  if (!order[index]) {
    return;
  }


  order.splice(index, 1);

  updateOrderUI();

}


/* =========================================================
   CALCULATE TOTAL
   ========================================================= */

function calculateTotal() {

  return order.reduce(
    (total, item) => {

      return total +
        (item.price * item.quantity);

    },
    0
  );

}


/* =========================================================
   CURRENCY FORMAT
   ========================================================= */

function formatNaira(amount) {

  return "₦" +
    amount.toLocaleString("en-NG");

}


/* =========================================================
   UPDATE ORDER UI
   ========================================================= */

function updateOrderUI() {

  const orderItems =
    document.getElementById("orderItems");

  const emptyOrder =
    document.getElementById("emptyOrder");

  const orderTotal =
    document.getElementById("orderTotal");

  const orderCount =
    document.getElementById("orderCount");


  const totalItems =
    order.reduce(
      (total, item) => {
        return total + item.quantity;
      },
      0
    );


  orderCount.textContent =
    totalItems;


  orderTotal.textContent =
    formatNaira(
      calculateTotal()
    );


  if (order.length === 0) {

    orderItems.innerHTML = "";

    emptyOrder.style.display =
      "flex";

    return;

  }


  emptyOrder.style.display =
    "none";


  orderItems.innerHTML =
    order.map(
      (item, index) => {

        const itemTotal =
          item.price * item.quantity;


        return `

          <article class="order-item">

            <div class="order-item-image">

              <img
                src="${item.image}"
                alt="${item.name}"
              >

            </div>


            <div>

              <div class="order-item-name">
                ${item.name}
              </div>

              <div class="order-item-price">
                ${formatNaira(itemTotal)}
              </div>


              <div class="order-controls">

                <button
                  class="quantity-btn"
                  onclick="changeQuantity(${index}, -1)"
                  aria-label="Decrease quantity"
                >
                  −
                </button>


                <span class="quantity-value">
                  ${item.quantity}
                </span>


                <button
                  class="quantity-btn"
                  onclick="changeQuantity(${index}, 1)"
                  aria-label="Increase quantity"
                >
                  +
                </button>


                <button
                  class="remove-item"
                  onclick="removeOrderItem(${index})"
                >
                  Remove
                </button>

              </div>

            </div>

          </article>

        `;

      }
    )
    .join("");

}


/* =========================================================
   OPEN ORDER PANEL
   ========================================================= */

function openOrderPanel(
  presetProduct = ""
) {

  const panel =
    document.getElementById("orderPanel");


  panel.classList.add("open");

  document.body.classList.add("no-scroll");


  if (
    presetProduct &&
    !order.some(
      item => item.name === presetProduct
    )
  ) {

    const customCake =
      presetProduct === "Custom Cake";


    addToOrder(
      presetProduct,
      customCake ? 12000 : 3000,
      customCake
        ? "marys-custom-cake.jpeg"
        : "marys-small-chops.jpeg"
    );

    return;

  }


  updateOrderUI();

}


/* =========================================================
   CLOSE ORDER PANEL
   ========================================================= */

function closeOrderPanel() {

  const panel =
    document.getElementById("orderPanel");


  panel.classList.remove("open");

  document.body.classList.remove("no-scroll");

}


/* =========================================================
   SCROLL TO MENU
   ========================================================= */

function scrollToMenu() {

  const menu =
    document.getElementById("menu");


  if (!menu) {
    return;
  }


  const top =
    menu.offsetTop - 90;


  window.scrollTo({
    top,
    behavior: "smooth"
  });

}


/* =========================================================
   SUPABASE ORDER TRACKING
========================================================= */

const MARYANN_BRAND_ID = "df40e518-0833-4cba-b137-007eaf9d8219";

const MARYANN_ORDER_ENDPOINT =
  "https://tzjckojpgamjwigxmdja.supabase.co/functions/v1/submit-brand-order";


function ensureMaryannPhoneFields() {

  const orderFields = document.querySelector(".order-fields");

  if (
    orderFields &&
    !document.getElementById("customerPhone")
  ) {

    const phoneLabel = document.createElement("label");

    phoneLabel.innerHTML = `
      Phone Number
      <input
        type="tel"
        id="customerPhone"
        placeholder="Enter your phone number"
        required
      >
    `;

    const nameField = document.getElementById("customerName");

    if (nameField?.parentElement) {
      nameField.parentElement.after(phoneLabel);
    } else {
      orderFields.prepend(phoneLabel);
    }
  }

  const addressLabel = document.createElement("label");

addressLabel.innerHTML = `
  Hostel / Delivery Address
  <input
    type="text"
    id="customerAddress"
    placeholder="Enter your hostel or delivery address"
    required
  >
`;

document.getElementById("customerPhone")
  .parentElement.after(addressLabel);


  const specialForm = document.getElementById("specialOrderForm");

  if (
    specialForm &&
    !document.getElementById("specialPhone")
  ) {

    const phoneLabel = document.createElement("label");

    phoneLabel.innerHTML = `
      Phone Number
      <input
        type="tel"
        id="specialPhone"
        placeholder="Enter your phone number"
        required
      >
    `;

    

    const submitButton = specialForm.querySelector("button[type='submit']");

    specialForm.insertBefore(phoneLabel, submitButton);

    const addressLabel = document.createElement("label");

addressLabel.innerHTML = `
  Hostel / Delivery Address
  <input
    type="text"
    id="specialAddress"
    placeholder="Enter your hostel or delivery address"
    required
  >
`;

specialForm.insertBefore(addressLabel, submitButton);
  }

}


function showMaryannSuccess(orderNumber, whatsappMessage) {

  let modal = document.getElementById("maryannSuccessModal");

  if (!modal) {

    modal = document.createElement("div");

    modal.id = "maryannSuccessModal";

    modal.innerHTML = `
      <div class="maryann-success-backdrop"></div>

      <div class="maryann-success-card">

        <div class="maryann-success-icon">✓</div>

        <span class="maryann-success-kicker">
          MARYANN'S CAKES & PASTRIES
        </span>

        <h2>Order <span>Received.</span></h2>

        <p>
          Your request has been recorded successfully.
          Continue to WhatsApp to discuss confirmation with Maryann.
        </p>

        <div class="maryann-reference">
          <small>YOUR ORDER REFERENCE</small>
          <strong id="maryannOrderReference"></strong>
        </div>

        <button id="maryannContinueWhatsApp">
          Continue to WhatsApp →
        </button>

        <button
          class="maryann-success-close"
          id="maryannCloseSuccess"
        >
          Close
        </button>

      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector(".maryann-success-backdrop")
      .addEventListener("click", closeMaryannSuccess);

    document.getElementById("maryannCloseSuccess")
      .addEventListener("click", closeMaryannSuccess);
  }

  document.getElementById("maryannOrderReference").textContent =
    orderNumber;

  document.getElementById("maryannContinueWhatsApp").onclick = () => {

    const url =
      `https://wa.me/${WHATSAPP_NUMBER}?text=` +
      encodeURIComponent(whatsappMessage);

    window.open(url, "_blank");

    closeMaryannSuccess();
  };

  modal.classList.add("open");
  document.body.classList.add("no-scroll");

}


function closeMaryannSuccess() {

  const modal = document.getElementById("maryannSuccessModal");

  if (modal) {
    modal.classList.remove("open");
  }

  document.body.classList.remove("no-scroll");

}


async function submitMaryannRequest(payload) {

  const response = await fetch(MARYANN_ORDER_ENDPOINT, {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      ...payload,
      brand_id: MARYANN_BRAND_ID,
      website: ""
    })

  });

  const result = await response.json();

  if (
    !response.ok ||
    !result.success ||
    !result.order_number
  ) {

    throw new Error(
      result.message || "Unable to record your request. Please try again."
    );

  }

  return result;

}


/* =========================================================
   TRACKED WHATSAPP CHECKOUT
========================================================= */

async function checkoutWhatsApp() {

  if (order.length === 0) {

    alert("Please add at least one item to your order.");

    return;

  }

  const customerName =
    document.getElementById("customerName").value.trim();

  const customerPhone =
    document.getElementById("customerPhone")?.value.trim();

  const customerAddress =
  document.getElementById("customerAddress")?.value.trim();

  const customerNote =
    document.getElementById("customerNote").value.trim();


  if (!customerName) {

    alert("Please enter your name.");

    document.getElementById("customerName").focus();

    return;

  }


  if (!customerPhone) {

    alert("Please enter your phone number.");

    document.getElementById("customerPhone").focus();

    return;

  }
  
  if (!customerAddress) {

  alert("Please enter your hostel or delivery address.");

  document.getElementById("customerAddress").focus();

  return;

}

  const itemsText = order.map(item => {

    return (
      `${item.name} x${item.quantity} — ` +
      `${formatNaira(item.price * item.quantity)}`
    );

  }).join("\n");


  const total = formatNaira(calculateTotal());


  const requestDetails =
    `ORDER DETAILS\n\n${itemsText}\n\n` +
    `Total: ${total}\n` +
    `Customer note: ${customerNote || "None"}`;


  const whatsappMessage =
    `Hello Maryann's Cakes & Pastries,\n\n` +
    `I'd like to place an order.\n\n` +
    `${itemsText}\n\n` +
    `Total: ${total}\n\n` +
    `Name: ${customerName}\n` +
    `Phone: ${customerPhone}\n` +
    `Hostel / Delivery Address: ${customerAddress}\n` +
    `Note / Delivery Details: ${customerNote || "Not provided"}\n\n`;


  const button = document.querySelector(".checkout-button");

  if (button) {
    button.disabled = true;
    button.textContent = "Submitting Order...";
  }


  try {

    const result = await submitMaryannRequest({

      customer_name: customerName,

      customer_phone: customerPhone,

      delivery_address: customerAddress,

      request_type: "order",

      request_details: requestDetails,

      items: order.map(item => ({

        product_name: item.name,

        quantity: item.quantity,

        unit_price: item.price

      }))

    });


    const finalMessage =
      whatsappMessage +
      `Order Reference: ${result.order_number}\n\n` +
      `Thank you.`;


    order = [];

    updateOrderUI();

    document.getElementById("customerName").value = "";
    document.getElementById("customerPhone").value = "";
    document.getElementById("customerAddress").value = "";
    document.getElementById("customerNote").value = "";

    closeOrderPanel();

    showMaryannSuccess(
      result.order_number,
      finalMessage
    );

  } catch (error) {

    alert(error.message || "Something went wrong. Please try again.");

  } finally {

    if (button) {
      button.disabled = false;
      button.innerHTML = "Place Order →";
    }

  }

}


/* =========================================================
   OPEN WHATSAPP
   ========================================================= */

function openWhatsApp(message) {

  const url =
    `https://wa.me/${WHATSAPP_NUMBER}?text=` +
    encodeURIComponent(message);


  window.open(
    url,
    "_blank",
    "noopener"
  );

}


/* =========================================================
   SPECIAL ORDER
   ========================================================= */

function openSpecialOrder() {

  const modal =
    document.getElementById(
      "specialOrderModal"
    );


  modal.classList.add("open");

  document.body.classList.add("no-scroll");

}


function closeSpecialOrder() {

  const modal =
    document.getElementById(
      "specialOrderModal"
    );


  modal.classList.remove("open");

  document.body.classList.remove("no-scroll");

}


/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (event.key !== "Escape") {
      return;
    }


    closeOrderPanel();
    closeSpecialOrder();

  }
);


/* =========================================================
   INITIAL ORDER UI
   ========================================================= */

updateOrderUI();
