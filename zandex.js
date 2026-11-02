
/* =========================================
   ZANDEX ATELIER
   SUPABASE ORDER NOTIFICATION INTEGRATION
========================================= */

const whatsappNumber = "2349154993962";

const brandId = "13b0f0f6-3425-4329-aa0c-cd37a8651554";

const orderEndpoint =
    "https://tzjckojpgamjwigxmdja.supabase.co/functions/v1/submit-brand-order";


/* =========================================
   WHATSAPP CONTACT LINKS
========================================= */

function openWhatsApp(event, message) {

    if (event) {
        event.preventDefault();
    }

    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");

}


/* =========================================
   ORDER FORM STYLES
========================================= */

const orderStyles = document.createElement("style");

orderStyles.textContent = `
.zandex-order-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0,0,0,.82);
    display: none;
    align-items: center;
    justify-content: center;
    padding: 18px;
    overflow-y: auto;
}

.zandex-order-overlay.active {
    display: flex;
}

.zandex-order-modal {
    width: 100%;
    max-width: 430px;
    background: #090909;
    border: 1px solid rgba(210,210,210,.4);
    padding: 30px 24px;
    color: #e8e4da;
    position: relative;
    max-height: 90vh;
    overflow-y: auto;
}

.zandex-order-modal h2 {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: 34px;
    font-weight: 400;
    margin-bottom: 7px;
}

.zandex-order-modal .order-subtitle {
    color: #999;
    font-size: 10px;
    line-height: 1.7;
    margin-bottom: 22px;
}

.zandex-order-close {
    position: absolute;
    top: 14px;
    right: 17px;
    background: none;
    border: none;
    color: #ccc;
    font-size: 24px;
    cursor: pointer;
}

.zandex-order-product {
    padding: 13px;
    border: 1px solid rgba(210,210,210,.25);
    margin-bottom: 20px;
}

.zandex-order-product strong {
    display: block;
    font-size: 11px;
    font-weight: 500;
    margin-bottom: 6px;
}

.zandex-order-product span {
    font-size: 10px;
    color: #c9c9c9;
}

.zandex-order-modal label {
    display: block;
    font-size: 9px;
    letter-spacing: 1px;
    margin-bottom: 7px;
    color: #c9c9c9;
}

.zandex-order-modal input,
.zandex-order-modal textarea {
    width: 100%;
    padding: 13px;
    margin-bottom: 17px;
    background: #111;
    color: #eee;
    border: 1px solid #444;
    outline: none;
    font-family: Montserrat, Arial, sans-serif;
    font-size: 11px;
    border-radius: 0;
}

.zandex-order-modal input:focus,
.zandex-order-modal textarea:focus {
    border-color: #c9c9c9;
}

.zandex-order-modal textarea {
    min-height: 75px;
    resize: vertical;
}

.zandex-order-submit {
    width: 100%;
    padding: 15px;
    border: none;
    background: #c9c9c9;
    color: #080808;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 2px;
    cursor: pointer;
}

.zandex-order-submit:disabled {
    opacity: .55;
    cursor: not-allowed;
}

.zandex-order-error {
    color: #ff7777;
    font-size: 10px;
    line-height: 1.6;
    margin-bottom: 13px;
    display: none;
}

@media(max-width: 400px) {
    .zandex-order-modal {
        padding: 25px 18px;
    }
}
`;

document.head.appendChild(orderStyles);


/* =========================================
   CREATE ORDER FORM
========================================= */

let selectedZandexProduct = null;

const orderOverlay = document.createElement("div");

orderOverlay.className = "zandex-order-overlay";

orderOverlay.innerHTML = `
    <div class="zandex-order-modal">

        <button
            type="button"
            class="zandex-order-close"
            aria-label="Close order form"
        >&times;</button>

        <p style="
            font-size:8px;
            letter-spacing:3px;
            color:#c9c9c9;
            margin-bottom:12px;
        ">ZANDEX ATELIER</p>

        <h2>Place Your Order</h2>

        <p class="order-subtitle">
            Complete your details below to submit your order.
        </p>

        <div class="zandex-order-product">
            <strong id="zandexSelectedName"></strong>
            <span id="zandexSelectedPrice"></span>
        </div>

        <form id="zandexOrderForm">

            <label for="zandexCustomerName">FULL NAME</label>
            <input
                type="text"
                id="zandexCustomerName"
                name="customer_name"
                placeholder="Enter your full name"
                autocomplete="name"
                required
            >

            <label for="zandexCustomerPhone">PHONE NUMBER</label>
            <input
                type="tel"
                id="zandexCustomerPhone"
                name="customer_phone"
                placeholder="Enter your phone number"
                autocomplete="tel"
                required
            >

            <label for="zandexCustomerAddress">
                DELIVERY ADDRESS / HOSTEL
            </label>

            <textarea
                id="zandexCustomerAddress"
                name="delivery_address"
                placeholder="Enter your hostel or delivery address"
                required
            ></textarea>

            <p class="zandex-order-error" id="zandexOrderError"></p>

            <button
                type="submit"
                class="zandex-order-submit"
                id="zandexOrderSubmit"
            >
                SUBMIT ORDER
            </button>

        </form>

    </div>
`;

document.body.appendChild(orderOverlay);


/* =========================================
   OPEN AND CLOSE ORDER FORM
========================================= */

const closeOrderButton =
    orderOverlay.querySelector(".zandex-order-close");

function closeZandexOrderForm() {

    orderOverlay.classList.remove("active");

    selectedZandexProduct = null;

}

closeOrderButton.addEventListener("click", closeZandexOrderForm);

orderOverlay.addEventListener("click", (event) => {

    if (event.target === orderOverlay) {
        closeZandexOrderForm();
    }

});

document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        orderOverlay.classList.contains("active")
    ) {
        closeZandexOrderForm();
    }

});


/* =========================================
   PRODUCT ORDER
========================================= */

function orderProduct(productName, price, image) {

    const numericPrice = Number(price);

    if (
        !productName ||
        !Number.isFinite(numericPrice) ||
        numericPrice <= 0
    ) {
        alert("This product currently has invalid order information.");
        return;
    }

    selectedZandexProduct = {
        name: productName,
        price: numericPrice,
        image: image || ""
    };

    document.getElementById("zandexSelectedName").textContent =
        productName;

    document.getElementById("zandexSelectedPrice").textContent =
        `₦${numericPrice.toLocaleString("en-NG")}`;

    document.getElementById("zandexOrderError").style.display = "none";

    document.getElementById("zandexOrderForm").reset();

    orderOverlay.classList.add("active");

}


/* =========================================
   SUBMIT ORDER TO SUPABASE
========================================= */

document
    .getElementById("zandexOrderForm")
    .addEventListener("submit", async (event) => {

        event.preventDefault();

        if (!selectedZandexProduct) {
            return;
        }

        const form = event.currentTarget;

        const submitButton =
            document.getElementById("zandexOrderSubmit");

        const errorMessage =
            document.getElementById("zandexOrderError");

        const customerName =
            document.getElementById("zandexCustomerName").value.trim();

        const customerPhone =
            document.getElementById("zandexCustomerPhone").value.trim();

        const deliveryAddress =
            document.getElementById("zandexCustomerAddress").value.trim();

        if (!customerName || !customerPhone || !deliveryAddress) {

            errorMessage.textContent =
                "Please complete all the required fields.";

            errorMessage.style.display = "block";

            return;
        }

        // Open the WhatsApp tab before awaiting the network request.
        // This helps prevent browser popup blocking.

        const whatsappTab = window.open("about:blank", "_blank");

        if (!whatsappTab) {

            alert(
                "Please allow pop-ups for this website before submitting your order."
            );

            return;
        }

        submitButton.disabled = true;

        submitButton.textContent = "SUBMITTING ORDER...";

        errorMessage.style.display = "none";

        const product = selectedZandexProduct;

        const requestDetails = [
            `Product: ${product.name}`,
            `Image: ${product.image}`,
            `Quantity: 1`,
            `Unit price: ₦${product.price.toLocaleString("en-NG")}`,
            `Total: ₦${product.price.toLocaleString("en-NG")}`
        ].join("\n");

        const payload = {

            brand_id: brandId,

            customer_name: customerName,

            customer_phone: customerPhone,

            delivery_address: deliveryAddress,

            request_type: "order",

            request_details: requestDetails,

            items: [
                {
                    product_name: product.name,
                    quantity: 1,
                    unit_price: product.price
                }
            ],

            website: ""

        };

        try {

            const response = await fetch(orderEndpoint, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(payload)

            });

            const responseText = await response.text();

            let result;

            try {
                result = JSON.parse(responseText);
            } catch {
                throw new Error(
                    "The order server returned an invalid response. Please try again."
                );
            }

            // Never treat an order as successful without a reference.

            if (
                !response.ok ||
                !result.success ||
                !result.order_number
            ) {

                throw new Error(
                    result.error ||
                    result.message ||
                    "Your order could not be submitted. Please try again."
                );

            }

            const orderNumber = result.order_number;

            const whatsappMessage = `
Hello Zandex Atelier,

I have submitted an order through Saint Leo's Mart.

Order Reference: ${orderNumber}

Product: ${product.name}
Price: ₦${product.price.toLocaleString("en-NG")}
Quantity: 1

Customer Name: ${customerName}
Phone: ${customerPhone}
Delivery Address: ${deliveryAddress}

Please confirm availability and the next steps.

Thank you.
            `.trim();

            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

            // Navigate the already-opened WhatsApp tab.

            whatsappTab.location.href = whatsappURL;

            closeZandexOrderForm();

            form.reset();

            if (result.vendor_email_sent) {

                alert(
                    `Your order has been submitted successfully!\n\nOrder Reference: ${orderNumber}`
                );

            } else {

                alert(
                    `Your order has been recorded successfully!\n\nOrder Reference: ${orderNumber}\n\nPlease continue to WhatsApp. The vendor email notification was not confirmed.`
                );

            }

        } catch (error) {

            if (whatsappTab && !whatsappTab.closed) {
                whatsappTab.close();
            }

            errorMessage.textContent =
                error.message ||
                "Something went wrong. Please try again.";

            errorMessage.style.display = "block";

        } finally {

            submitButton.disabled = false;

            submitButton.textContent = "SUBMIT ORDER";

        }

    });


/* =========================================
   NEWSLETTER
========================================= */

function subscribe(event) {

    event.preventDefault();

    const email =
        event.target.querySelector("input").value.trim();

    if (!email) {
        return;
    }

    alert(
        "Thank you for joining the Zandex Atelier list."
    );

    event.target.reset();

}


/* =========================================
   DRAG TO SCROLL
========================================= */

const slider =
    document.querySelector(".products-scroll");

let isDown = false;
let startX;
let scrollLeft;

if (slider) {

    slider.addEventListener("mousedown", (event) => {

        isDown = true;

        slider.style.cursor = "grabbing";

        startX = event.pageX - slider.offsetLeft;

        scrollLeft = slider.scrollLeft;

    });

    slider.addEventListener("mouseleave", () => {

        isDown = false;

        slider.style.cursor = "grab";

    });

    slider.addEventListener("mouseup", () => {

        isDown = false;

        slider.style.cursor = "grab";

    });

    slider.addEventListener("mousemove", (event) => {

        if (!isDown) {
            return;
        }

        event.preventDefault();

        const x = event.pageX - slider.offsetLeft;

        const walk = (x - startX) * 1.5;

        slider.scrollLeft = scrollLeft - walk;

    });

}
