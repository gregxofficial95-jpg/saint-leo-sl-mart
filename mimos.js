/* ================= INTRO SCREEN ================= */

const introScreen = document.getElementById("introScreen");

if (introScreen) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      introScreen.classList.add("hide");
    }, 3000);
  });
}


/* ================= CURRENT YEAR ================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

/* ================= WHATSAPP ORDERING ================= */

const productOrderButtons = document.querySelectorAll(".product-order-btn");

const whatsappNumber = "2349040087581";

productOrderButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productName = button.dataset.product;
    const productPrice = Number(button.dataset.price);

    const formattedPrice = `₦${productPrice.toLocaleString("en-NG")}`;

    const message =
      `Hello Mimo’s Collection!%0A%0A` +
      `I would like to order:%0A` +
      `*Product:* ${productName}%0A` +
      `*Price:* ${formattedPrice}%0A%0A` +
      `Please confirm availability and delivery details.`;

    const whatsappURL =
      `https://wa.me/${whatsappNumber}?text=${message}`;

    window.open(whatsappURL, "_blank");
  });
});

/* ================= MOBILE MENU ================= */

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileClose = document.getElementById("mobileClose");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu nav a");

function openMobileMenu() {
  mobileMenu.classList.add("open");
  document.body.classList.add("menu-open");
}

function closeMobileMenu() {
  mobileMenu.classList.remove("open");
  document.body.classList.remove("menu-open");
}


/* OPEN MENU */

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", openMobileMenu);
}


/* CLOSE MENU */

if (mobileClose) {
  mobileClose.addEventListener("click", closeMobileMenu);
}


/* CLOSE WHEN A MENU LINK IS CLICKED */

mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});


/* CLOSE WHEN ESCAPE IS PRESSED */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});
