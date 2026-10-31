
const BRAND_ID = "d4c2a972-9647-4711-a2e6-ceed2df3f7df";
const WHATSAPP = "2348065454609";
const API_URL = "https://tzjckojpgamjwigxmdja.supabase.co/functions/v1/submit-brand-order";

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".card");

  // PRODUCT FILTERS
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        card.style.display =
          filter === "all" || card.dataset.cat === filter ? "" : "none";
      });
    });
  });

  // CREATE ORDER MODAL
  const modal = document.createElement("div");
  modal.id = "liyyasOrderModal";

  modal.innerHTML = `
    <div class="liyyas-order-box">
      <button type="button" class="liyyas-close">&times;</button>

      <h2>Place Your Order</h2>
      <p class="liyyas-subtitle">Complete your details to send your order request.</p>

      <div class="liyyas-selected-product">
        <img id="liyyasProductImage" src="" alt="Selected product">
        <div>
          <h3 id="liyyasProductName"></h3>
          <p id="liyyasProductPrice"></p>
        </div>
      </div>

      <form id="liyyasOrderForm">
        <label>Full Name</label>
        <input type="text" id="liyyasName" required placeholder="Your full name">

        <label>Phone Number</label>
        <input type="tel" id="liyyasPhone" required placeholder="Your phone number">

        <label>Delivery Address / Hostel</label>
        <input type="text" id="liyyasAddress" required placeholder="Where should your order be delivered?">

        <label>Quantity</label>
        <input type="number" id="liyyasQuantity" min="1" value="1" required>

        <label>Additional Notes (Optional)</label>
        <textarea id="liyyasNotes" rows="3" placeholder="Colour preference or other details"></textarea>

        <div class="liyyas-total">
          <span>Estimated Total</span>
          <strong id="liyyasTotal"></strong>
        </div>

        <button type="submit" id="liyyasSubmit" class="liyyas-submit">
          Submit Order
        </button>

        <p class="liyyas-disclaimer">
          Your order will be sent to the vendor for confirmation.
        </p>
      </form>
    </div>
  `;

  document.body.appendChild(modal);

  const closeModal = () => {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  };

  modal.querySelector(".liyyas-close").addEventListener("click", closeModal);

  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });

  let selectedProduct = null;

  const quantityInput = document.getElementById("liyyasQuantity");

  function updateTotal() {
    if (!selectedProduct) return;

    const quantity = Math.max(1, Number(quantityInput.value) || 1);
    document.getElementById("liyyasTotal").textContent =
      "₦" + (selectedProduct.price * quantity).toLocaleString("en-NG");
  }

  quantityInput.addEventListener("input", updateTotal);

  // OPEN PRODUCT ORDER FORM
  document.querySelectorAll(".card .order-btn").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      const card = link.closest(".card");
      const name = card.querySelector("h3")?.textContent.trim();
      const priceText = card.querySelector(".price")?.textContent || "";
      const image = card.querySelector("img")?.getAttribute("src");

      const price = Number(priceText.replace(/[^\d]/g, ""));

      if (!name || !price) {
        alert("Unable to read this product's details.");
        return;
      }

      selectedProduct = { name, price, image };

      document.getElementById("liyyasProductName").textContent = name;
      document.getElementById("liyyasProductPrice").textContent = priceText;
      document.getElementById("liyyasProductImage").src = image || "";

      document.getElementById("liyyasOrderForm").reset();
      quantityInput.value = 1;
      updateTotal();

      modal.classList.add("show");
      document.body.style.overflow = "hidden";
    });
  });

  // SUBMIT ORDER
  document.getElementById("liyyasOrderForm").addEventListener("submit", async e => {
    e.preventDefault();

    if (!selectedProduct) return;

    const submitButton = document.getElementById("liyyasSubmit");
    const name = document.getElementById("liyyasName").value.trim();
    const phone = document.getElementById("liyyasPhone").value.trim();
    const address = document.getElementById("liyyasAddress").value.trim();
    const quantity = Math.max(1, Number(quantityInput.value) || 1);
    const notes = document.getElementById("liyyasNotes").value.trim();

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

    // Open synchronously to avoid popup blocking.
    const whatsappTab = window.open("about:blank", "_blank");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          brand_id: BRAND_ID,
          customer_name: name,
          customer_phone: phone,
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
        "Hello Liyya's Apparel!",
        "",
        "I have submitted an order through your website.",
        "Order Reference: " + reference,
        "",
        "Name: " + name,
        "Phone: " + phone,
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

      console.error("Liyya's order error:", error);
      alert(error.message || "Unable to submit your order. Please try again.");

    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Submit Order";
    }
  });
});
