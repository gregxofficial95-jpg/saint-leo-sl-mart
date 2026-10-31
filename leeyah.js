
const BRAND_ID = "ff8d1183-7041-4234-bdb0-32b2fac1c62a";
const WHATSAPP = "2348127613559";
const API_URL = "https://tzjckojpgamjwigxmdja.supabase.co/functions/v1/submit-brand-order";

let selectedProduct = null;

document.addEventListener("DOMContentLoaded", () => {

  // CREATE ORDER MODAL
  const modal = document.createElement("div");
  modal.id = "leeyahOrderModal";

  modal.innerHTML = `
    <div class="leeyah-order-box">
      <button type="button" class="leeyah-close">&times;</button>

      <p class="leeyah-modal-label">LEEYAH'S COLLECTION</p>
      <h2>Complete Your Order</h2>
      <p class="leeyah-modal-subtitle">Enter your details to place your order.</p>

      <div class="leeyah-product-preview">
        <img id="leeyahProductImage" src="" alt="Selected product">
        <div>
          <h3 id="leeyahProductName"></h3>
          <p id="leeyahProductPrice"></p>
        </div>
      </div>

      <form id="leeyahOrderForm">
        <label>Full Name</label>
        <input id="leeyahName" type="text" required placeholder="Your full name">

        <label>Phone Number</label>
        <input id="leeyahPhone" type="tel" required placeholder="Your phone number">

        <label>Delivery Address / Hostel</label>
        <input id="leeyahAddress" type="text" required placeholder="Your delivery location">

        <label>Quantity</label>
        <input id="leeyahQuantity" type="number" min="1" value="1" required>

        <label>Additional Notes (Optional)</label>
        <textarea id="leeyahNotes" rows="3" placeholder="Colour, size or other preferences"></textarea>

        <div class="leeyah-total">
          <span>Estimated Total</span>
          <strong id="leeyahTotal"></strong>
        </div>

        <button type="submit" id="leeyahSubmit">Submit Order</button>

        <p class="leeyah-note">The vendor will confirm product availability and your order.</p>
      </form>
    </div>
  `;

  document.body.appendChild(modal);

  const closeModal = () => {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  };

  modal.querySelector(".leeyah-close").addEventListener("click", closeModal);

  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });

  // UPDATE TOTAL
  const quantityInput = document.getElementById("leeyahQuantity");

  function updateTotal() {
    if (!selectedProduct) return;

    const quantity = Math.max(1, Number(quantityInput.value) || 1);
    const total = selectedProduct.price * quantity;

    document.getElementById("leeyahTotal").textContent =
      "₦" + total.toLocaleString("en-NG");
  }

  quantityInput.addEventListener("input", updateTotal);

  // PRODUCT ORDER BUTTONS
  window.orderProduct = function(productName, priceText) {
    const price = Number(String(priceText).replace(/[^\d]/g, ""));

    if (!productName || !price) {
      alert("Unable to read product details.");
      return;
    }

    const card = [...document.querySelectorAll(".product-card")]
      .find(item => item.querySelector("h3")?.textContent.trim() === productName);

    const image = card?.querySelector("img")?.getAttribute("src") || "";

    selectedProduct = {
      name: productName,
      price,
      image
    };

    document.getElementById("leeyahProductName").textContent = productName;
    document.getElementById("leeyahProductPrice").textContent = priceText;
    document.getElementById("leeyahProductImage").src = image;

    document.getElementById("leeyahOrderForm").reset();
    quantityInput.value = 1;
    updateTotal();

    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  };

  // SUBMIT ORDER
  document.getElementById("leeyahOrderForm").addEventListener("submit", async e => {
    e.preventDefault();

    if (!selectedProduct) return;

    const submitButton = document.getElementById("leeyahSubmit");

    const customerName = document.getElementById("leeyahName").value.trim();
    const customerPhone = document.getElementById("leeyahPhone").value.trim();
    const address = document.getElementById("leeyahAddress").value.trim();
    const quantity = Math.max(1, Number(quantityInput.value) || 1);
    const notes = document.getElementById("leeyahNotes").value.trim();

    const total = selectedProduct.price * quantity;

    const details = [
      "PRODUCT: " + selectedProduct.name,
      "QUANTITY: " + quantity,
      "UNIT PRICE: ₦" + selectedProduct.price.toLocaleString("en-NG"),
      "ESTIMATED TOTAL: ₦" + total.toLocaleString("en-NG"),
      "ADDITIONAL NOTES: " + (notes || "None")
    ].join("\n");

    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    // Open immediately to avoid popup blocking.
    const whatsappTab = window.open("about:blank", "_blank");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          brand_id: BRAND_ID,
          customer_name: customerName,
          customer_phone: customerPhone,
          delivery_address: address,
          request_type: "order",
          request_details: details,
          items: [{
            product_name: selectedProduct.name,
            quantity,
            unit_price: selectedProduct.price
          }],
          website: ""
        })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Order submission failed.");
      }

      const reference = result.order_number || result.reference || "Submitted";

      const message = [
        "Hello Leeyah's Collection!",
        "",
        "I have submitted an order through your website.",
        "Order Reference: " + reference,
        "",
        "Name: " + customerName,
        "Phone: " + customerPhone,
        "Address: " + address,
        "",
        details,
        "",
        "Please confirm availability and delivery details."
      ].join("\n");

      const whatsappURL =
        "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(message);

      if (whatsappTab) {
        whatsappTab.location.href = whatsappURL;
      } else {
        window.location.href = whatsappURL;
      }

      closeModal();
      alert("Order submitted successfully! Continue to WhatsApp to notify the vendor.");

    } catch (error) {
      if (whatsappTab) whatsappTab.close();

      console.error("Leeyah's order error:", error);
      alert(error.message || "Unable to submit your order. Please try again.");

    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Submit Order";
    }
  });

  // GENERAL WHATSAPP ENQUIRY
  const generalWhatsapp = document.getElementById("generalWhatsapp");

  if (generalWhatsapp) {
    generalWhatsapp.addEventListener("click", e => {
      e.preventDefault();

      const message =
        "Hello Leeyah's Collection!\n\nI would like to make an enquiry about your collection.";

      window.open(
        "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(message),
        "_blank"
      );
    });
  }

  // ACTIVE NAVIGATION
  const navLinks = document.querySelectorAll(".nav a");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.forEach(item => item.classList.remove("active"));
      link.classList.add("active");
    });
  });

});
