const whatsappNumber = "2349135069373";


/* =========================================
   SMOOTH SCROLL
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* =========================================
   PRODUCT IMAGE LOADING
========================================= */

const productImages = document.querySelectorAll(
    ".product-image img"
);

productImages.forEach(image => {

    image.addEventListener("load", () => {

        image.classList.add("loaded");

    });

});


/* =========================================
   WHATSAPP PRODUCT ORDERING
========================================= */

const orderButtons = document.querySelectorAll(
    ".order-button"
);

orderButtons.forEach(button => {

    button.addEventListener("click", function () {

        const productCard = this.closest(".product-card");

        if (!productCard) return;

        const productName =
            productCard.querySelector("h3").textContent.trim();

        const productPrice =
            productCard.querySelector(".price").textContent.trim();

        const message =
            `Hello Preshie!%0A%0A` +
            `I'd like to order:%0A` +
            `${productName}%0A` +
            `Price: ${productPrice}%0A%0A` +
            `Please let me know the next steps.`;

        this.href =
            `https://wa.me/${whatsappNumber}?text=${message}`;

    });

});


/* =========================================
   CURRENT YEAR
========================================= */

const yearElement = document.querySelector(
    ".footer-bottom p"
);

if (yearElement) {

    const currentYear = new Date().getFullYear();

    yearElement.textContent =
        `© ${currentYear} Preshie. All rights reserved.`;

}
