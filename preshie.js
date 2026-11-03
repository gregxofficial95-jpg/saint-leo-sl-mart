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
   SUPABASE + WHATSAPP ORDER TRACKING
========================================= */
const PRESHIE_BRAND_ID =
    "c272ccee-e9f6-4363-a237-3849019eb3f8";

const ORDER_FUNCTION_URL =
    "https://tzjckojpgamjwigxmdja.supabase.co/functions/v1/submit-brand-order";


const orderModal = document.getElementById("orderModal");
const orderForm = document.getElementById("preshieOrderForm");

const modalProductName =
    document.getElementById("modalProductName");

const orderError =
    document.getElementById("preshieOrderError");

const submitButton =
    document.getElementById("preshieSubmitButton");

let selectedProduct = null;


/* OPEN ORDER MODAL */

document.querySelectorAll(".order-button").forEach(button => {

    button.addEventListener("click", function(event) {

        event.preventDefault();

        const productCard = this.closest(".product-card");

        if (!productCard) return;

        const name = productCard
            .querySelector("h3")
            .textContent.trim();

        const priceText = productCard
            .querySelector(".price")
            .textContent.trim();

        const unitPrice = Number(
            priceText.replace(/[^\d]/g, "")
        );

        if (!unitPrice) {
            alert("Unable to read this product's price.");
            return;
        }

        selectedProduct = {
            name,
            unitPrice,
            priceText
        };

        modalProductName.textContent =
            `${name} — ${priceText}`;

        orderError.textContent = "";

        orderModal.hidden = false;

    });

});


/* CLOSE ORDER MODAL */

function closeOrderModal() {

    orderModal.hidden = true;

    selectedProduct = null;

}

document.getElementById("closeOrderModal")
    .addEventListener("click", closeOrderModal);

orderModal.addEventListener("click", function(event) {

    if (event.target === orderModal) {
        closeOrderModal();
    }

});


/* SUBMIT ORDER */

orderForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    if (!selectedProduct) return;

    const customerName =
        document.getElementById("preshieCustomerName")
            .value.trim();

    const customerPhone =
        document.getElementById("preshieCustomerPhone")
            .value.trim();

    const customerAddress =
        document.getElementById("preshieCustomerAddress")
            .value.trim();

    if (!customerName || !customerPhone || !customerAddress) {
        orderError.textContent =
            "Please complete all the required fields.";
        return;
    }

    const product = { ...selectedProduct };

    submitButton.disabled = true;
    submitButton.textContent = "SUBMITTING ORDER...";
    orderError.textContent = "";

    // Open a tab immediately to avoid popup blocking.
    const whatsappTab = window.open("about:blank", "_blank");

    try {

        const response = await fetch(ORDER_FUNCTION_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                brand_id: PRESHIE_BRAND_ID,

                customer_name: customerName,

                customer_phone: customerPhone,

                delivery_address: customerAddress,

                request_type: "order",

                items: [
                    {
                        product_name: product.name,
                        quantity: 1,
                        unit_price: product.unitPrice
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
                result.message || "Order submission failed."
            );
        }


        // Build WhatsApp message after successful submission.

        const message =

            `Hello Preshie!%0A%0A` +

            `I'd like to place an order.%0A%0A` +

            `Order Reference: ${result.order_number}%0A%0A` +

            `CUSTOMER DETAILS%0A` +

            `Name: ${customerName}%0A` +

            `Phone: ${customerPhone}%0A` +

            `Delivery Address: ${customerAddress}%0A%0A` +

            `PRODUCT%0A` +

            `${product.name}%0A` +

            `Quantity: 1%0A` +

            `Price: ${product.priceText}%0A%0A` +

            `Thank you!`;


        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${message}`;

        orderForm.reset();

        closeOrderModal();

        if (whatsappTab) {

            whatsappTab.location.href = whatsappURL;

        } else {

            window.location.href = whatsappURL;

        }

    } catch (error) {

        if (whatsappTab) {
            whatsappTab.close();
        }

        console.error("Preshie order error:", error);

        orderError.textContent =
            error.message ||
            "Unable to submit your order. Please try again.";

    } finally {

        submitButton.disabled = false;

        submitButton.textContent =
            "SUBMIT ORDER & CONTINUE";

    }

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
