/* =========================================
   NTB CLOTHING ENTERPRISE
   ORDER NOTIFICATION SYSTEM
========================================= */

const SUPABASE_URL = "https://tzjckojpgamjwigxmdja.supabase.co";
const BRAND_ID = "f93adb33-13d4-4880-a101-1d0e2305ad90";
const WHATSAPP_NUMBER = "2349063613462";

document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.getElementById("menuButton");
    const nav = document.getElementById("nav");

    /* MOBILE MENU */

    if (menuButton && nav) {
        menuButton.addEventListener("click", () => {
            nav.classList.toggle("open");
            menuButton.classList.toggle("active");
        });

        document.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("open");
                menuButton.classList.remove("active");
            });
        });
    }

    /* ACTIVE NAVIGATION */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + section.offsetHeight
            ) {
                current = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${current}`
            );
        });
    });

    /* CREATE ORDER MODAL */

    const modal = document.createElement("div");
    modal.id = "ntbOrderModal";

    modal.innerHTML = `
        <div class="ntb-order-box">

            <button type="button" class="ntb-close">&times;</button>

            <p class="ntb-order-eyebrow">NTB CLOTHING ENTERPRISE</p>

            <h2>Request This Piece</h2>

            <div class="ntb-selected-product">
                <img id="ntbProductImage" src="" alt="Selected product">

                <div>
                    <strong id="ntbProductName"></strong>
                    <span>Price and availability will be confirmed.</span>
                </div>
            </div>

            <form id="ntbOrderForm">

                <label>Full Name</label>
                <input
                    type="text"
                    id="ntbCustomerName"
                    placeholder="Your full name"
                    required
                >

                <label>Phone Number</label>
                <input
                    type="tel"
                    id="ntbCustomerPhone"
                    placeholder="Your phone number"
                    required
                >

                <label>Delivery Address / Hostel</label>
                <input
                    type="text"
                    id="ntbCustomerAddress"
                    placeholder="Your delivery address"
                    required
                >

                <label>Preferred Size</label>
                <input
                    type="text"
                    id="ntbProductSize"
                    placeholder="e.g. Small, Medium, Large"
                >

                <label>Quantity</label>
                <input
                    type="number"
                    id="ntbQuantity"
                    min="1"
                    value="1"
                    required
                >

                <label>Additional Notes (Optional)</label>
                <textarea
                    id="ntbNotes"
                    rows="3"
                    placeholder="Any additional information?"
                ></textarea>

                <button type="submit" id="ntbSubmitOrder">
                    Send Request
                </button>

                <p id="ntbOrderMessage" role="status"></p>

            </form>
        </div>
    `;

    document.body.appendChild(modal);

    let selectedProduct = null;

    function closeModal() {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    }

    modal.querySelector(".ntb-close").addEventListener("click", closeModal);

    modal.addEventListener("click", event => {
        if (event.target === modal) closeModal();
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeModal();
    });

    /* PRODUCT BUTTONS */

    document.querySelectorAll(".product-card").forEach((card, index) => {

        const orderButton = card.querySelector(".order-whatsapp");

        if (!orderButton) return;

        orderButton.addEventListener("click", event => {
            event.preventDefault();

            const image = card.querySelector(".product-image img");

            selectedProduct = {
                name: `Product ${index + 1}`,
                image: image ? image.src : ""
            };

            document.getElementById("ntbProductName").textContent =
                selectedProduct.name;

            document.getElementById("ntbProductImage").src =
                selectedProduct.image;

            document.getElementById("ntbOrderForm").reset();

            document.getElementById("ntbQuantity").value = 1;

            document.getElementById("ntbOrderMessage").textContent = "";

            modal.classList.add("active");
            document.body.style.overflow = "hidden";
        });

    });

    /* SUBMIT REQUEST */

    document.getElementById("ntbOrderForm").addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            if (!selectedProduct) return;

            const customer = {
                name: document.getElementById("ntbCustomerName").value.trim(),
                phone: document.getElementById("ntbCustomerPhone").value.trim(),
                address: document.getElementById("ntbCustomerAddress").value.trim(),
                size: document.getElementById("ntbProductSize").value.trim(),
                notes: document.getElementById("ntbNotes").value.trim()
            };

            const quantity = Math.max(
                1,
                Number(document.getElementById("ntbQuantity").value) || 1
            );

            const submitButton = document.getElementById("ntbSubmitOrder");
            const message = document.getElementById("ntbOrderMessage");

            // Open immediately to avoid popup blocking.
            const whatsappTab = window.open("about:blank", "_blank");

            submitButton.disabled = true;
            submitButton.textContent = "Submitting...";
            message.textContent = "Please wait...";

            try {

                const response = await fetch(
                    `${SUPABASE_URL}/functions/v1/submit-brand-order`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({

                            brand_id: BRAND_ID,

                            customer_name: customer.name,
                            customer_phone: customer.phone,
                            delivery_address: customer.address,

                            request_type: "enquiry",

                            request_details:
                                `PRODUCT REQUEST\n` +
                                `Product: ${selectedProduct.name}\n` +
                                `Preferred Size: ${customer.size || "Not specified"}\n` +
                                `Quantity: ${quantity}\n` +
                                `Additional Notes: ${customer.notes || "None"}\n` +
                                `Price and availability require vendor confirmation.`,

                            items: [{
                                product_name: selectedProduct.name,
                                quantity: quantity,
                                unit_price: 0
                            }],

                            website: ""

                        })
                    }
                );

                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(
                        result.error || "Unable to submit your request."
                    );
                }

                const reference =
                    result.order_number || result.reference || "Submitted";

                const whatsappMessage =
                    `Hello NTB Clothing Enterprise!\n\n` +
                    `I submitted a product request through your website.\n\n` +
                    `Reference: ${reference}\n` +
                    `Product: ${selectedProduct.name}\n` +
                    `Quantity: ${quantity}\n` +
                    `Preferred Size: ${customer.size || "Not specified"}\n\n` +
                    `Customer Name: ${customer.name}\n` +
                    `Phone: ${customer.phone}\n` +
                    `Address: ${customer.address}\n` +
                    `Notes: ${customer.notes || "None"}\n\n` +
                    `Please confirm the price and availability. Thank you!`;

                if (whatsappTab) {
                    whatsappTab.location.href =
                        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
                }

                message.textContent =
                    `Request submitted! Reference: ${reference}. Please send your WhatsApp message.`;

                document.getElementById("ntbOrderForm").reset();

                setTimeout(closeModal, 3500);

            } catch (error) {

                if (whatsappTab) whatsappTab.close();

                message.textContent =
                    error.message || "Something went wrong.";

            } finally {

                submitButton.disabled = false;
                submitButton.textContent = "Send Request";

            }

        }
    );

});
