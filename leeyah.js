

const whatsappNumber = "2348127613559";


/* =========================================
   PRODUCT ORDER
========================================= */

function orderProduct(productName, price) {

    const message =
        `Hello Leeyah's Collection 👋\n\n` +
        `I would like to order:\n\n` +
        `Product: ${productName}\n` +
        `Price: ${price}\n\n` +
        `Please let me know if it is available.`;

    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");
}


/* =========================================
   GENERAL WHATSAPP
========================================= */

const generalWhatsapp = document.getElementById("generalWhatsapp");

if (generalWhatsapp) {

    generalWhatsapp.addEventListener("click", function (event) {

        event.preventDefault();

        const message =
            `Hello Leeyah's Collection 👋\n\n` +
            `I would like to make an enquiry about your collection.`;

        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappURL, "_blank");

    });

}


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach(link => {

    link.addEventListener("click", function () {

        navLinks.forEach(item => {
            item.classList.remove("active");
        });

        this.classList.add("active");

    });

});