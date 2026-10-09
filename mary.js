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


  mobileMenuBtn.addEventListener("click", () => {

    mobileNav.classList.toggle("open");

  });


  mobileNav.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      mobileNav.classList.remove("open");

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


  specialOrderForm.addEventListener("submit", event => {

    event.preventDefault();


    const name =
      document.getElementById("specialName")
        .value.trim();


    const need =
      document.getElementById("specialNeed")
        .value.trim();


    const details =
      document.getElementById("specialDetails")
        .value.trim();


    if (!name || !need || !details) {
      return;
    }


    const message =
      `Hello Maryann's Cakes & Pastries,%0A%0A` +
      `I'd like to make a special order.%0A%0A` +
      `Name: ${name}%0A` +
      `What I need: ${need}%0A` +
      `Details: ${details}%0A%0A` +
      `Thank you.`;


    openWhatsApp(message);

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
   WHATSAPP CHECKOUT
   ========================================================= */

function checkoutWhatsApp() {

  if (order.length === 0) {

    alert(
      "Please add at least one item to your order."
    );

    return;

  }


  const customerName =
    document.getElementById("customerName")
      .value.trim();


  const customerNote =
    document.getElementById("customerNote")
      .value.trim();


  if (!customerName) {

    alert(
      "Please enter your name before placing the order."
    );

    document.getElementById("customerName").focus();

    return;

  }


  const itemsText =
    order.map(item => {

      return (
        `${item.name} x${item.quantity} — ` +
        `${formatNaira(item.price * item.quantity)}`
      );

    }).join("\n");


  const total =
    formatNaira(
      calculateTotal()
    );


  let message =
    `Hello Maryann's Cakes & Pastries,\n\n` +
    `I'd like to place an order.\n\n` +
    `${itemsText}\n\n` +
    `Total: ${total}\n\n` +
    `Name: ${customerName}`;


  if (customerNote) {

    message +=
      `\n` +
      `Note / Delivery Details: ${customerNote}`;

  }


  message +=
    `\n\nThank you.`;


  openWhatsApp(message);

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