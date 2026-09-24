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

