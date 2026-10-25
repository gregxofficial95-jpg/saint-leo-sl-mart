
const SUPABASE_URL = "https://tzjckojpgamjwigxmdja.supabase.co";
const ORIFLAME_BRAND_ID = "007563f9-2669-44ee-90cd-2575652355a3";
const WHATSAPP_NUMBER = "2347078037509";

function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function getProductPrice(button) {
  const card = button.closest(".product-card");
  const priceText =
    card?.querySelector(".price, .product-variant")?.textContent || "";

  const prices = [...priceText.matchAll(/₦\s*([\d,]+)/g)];

  // If the card has multiple prices, ask the vendor to confirm.
  if (prices.length !== 1) return 0;

  return Number(prices[0][1].replace(/,/g, ""));
}

function showOrderForm(button) {
  // Prevent opening duplicate forms.
  if (document.getElementById("oriflame-order-overlay")) return;

  const productName = button.dataset.product || "Oriflame product";
  const price = getProductPrice(button);

  const overlay = document.createElement("div");
  overlay.id = "oriflame-order-overlay";

  Object.assign(overlay.style, {
    position: "fixed",
    inset: "0",
    zIndex: "99999",
    background: "rgba(0,0,0,0.75)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
    overflowY: "auto"
  });

  overlay.innerHTML = `
    <form id="oriflame-order-form" style="
      background:#fff;
      color:#222;
      width:100%;
      max-width:440px;
      padding:24px;
      border-radius:14px;
      box-sizing:border-box;
      font-family:Arial,sans-serif;
      max-height:90vh;
      overflow-y:auto;
    ">
      <button type="button" id="oriflame-close-form" aria-label="Close form"
        style="float:right;border:0;background:none;font-size:25px;cursor:pointer">
        &times;
      </button>

      <h2 style="margin-top:0">Complete Your Order</h2>
      <p style="color:#666;font-size:14px">
        Product: <strong>${escapeOrderHtml(productName)}</strong>
      </p>
      <p style="color:#666;font-size:14px">
        Price: <strong>${
          price > 0
            ? "₦" + price.toLocaleString("en-NG")
            : "Please confirm with the vendor"
        }</strong>
      </p>

      <label for="oriflame-customer-name">Full name *</label>
      <input id="oriflame-customer-name" name="name"
        autocomplete="name" required maxlength="150"
        style="${inputStyle}" placeholder="Enter your full name">

      <label for="oriflame-customer-phone">Phone number *</label>
      <input id="oriflame-customer-phone" name="phone"
        type="tel" autocomplete="tel" required maxlength="40"
        style="${inputStyle}" placeholder="Enter your phone number">

      <label for="oriflame-customer-address">Delivery address / hostel *</label>
      <textarea id="oriflame-customer-address" name="address"
        autocomplete="street-address" required maxlength="500" rows="2"
        style="${inputStyle};resize:vertical"
        placeholder="Enter your delivery address or hostel"></textarea>

      <p style="font-size:12px;color:#666">
        Your order will be recorded and sent to the vendor by email.
        WhatsApp will open afterward so you can message the vendor.
      </p>

      <button id="oriflame-submit-order" type="submit" style="
        width:100%;padding:14px;background:#176b43;color:white;
        border:0;border-radius:7px;font-weight:bold;cursor:pointer;
      ">SUBMIT ORDER</button>

      <p id="oriflame-form-error" role="alert"
        style="color:#b00020;font-size:13px"></p>
    </form>
  `;

  document.body.appendChild(overlay);

  const form = overlay.querySelector("#oriflame-order-form");
  const closeButton = overlay.querySelector("#oriflame-close-form");

  closeButton.addEventListener("click", () => overlay.remove());

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) overlay.remove();
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector("#oriflame-submit-order");
    const errorBox = form.querySelector("#oriflame-form-error");

    const customer = {
      name: form.elements.name.value.trim(),
      phone: form.elements.phone.value.trim(),
      address: form.elements.address.value.trim()
    };

    if (!customer.name || !customer.phone || !customer.address) {
      errorBox.textContent = "Please complete all required fields.";
      return;
    }

    /*
      Open a blank tab directly from the submit click.
      This avoids browsers blocking WhatsApp after the network request.
    */
    let whatsappTab = null;

    try {
      whatsappTab = window.open("about:blank", "_blank");

      if (whatsappTab) {
        whatsappTab.opener = null;
      }
    } catch (error) {
      console.warn("Could not open the WhatsApp tab yet:", error);
    }

    submitButton.disabled = true;
    submitButton.textContent = "SAVING ORDER...";
    errorBox.textContent = "";

    try {
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/submit-brand-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            brand_id: ORIFLAME_BRAND_ID,
            customer_name: customer.name,
            customer_phone: customer.phone,
            delivery_address: customer.address,
            request_type: "order",
            request_details:
              "Order submitted through the Oriflame website. " +
              "Please confirm product availability, final price and delivery details.",
            items: [{
              product_name: productName,
              quantity: 1,
              unit_price: price
            }],
            website: ""
          })
        }
      );

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success || !result.order_number) {
        throw new Error(
          result.error || "The order could not be recorded. Please try again."
        );
      }

      const message =
        `Hello Oriflame! I'd like to place an order.\n\n` +
        `Product: ${productName}\n` +
        `Price shown: ${
          price > 0
            ? "₦" + price.toLocaleString("en-NG")
            : "Please confirm price"
        }\n` +
        `Quantity: 1\n` +
        `Customer: ${customer.name}\n` +
        `Phone: ${customer.phone}\n` +
        `Delivery address/hostel: ${customer.address}\n` +
        `Order reference: ${result.order_number}\n\n` +
        `Please confirm availability and arrange delivery with me.`;

      const waUrl = whatsappUrl(message);

      if (whatsappTab && !whatsappTab.closed) {
        whatsappTab.location.href = waUrl;
      } else {
        // Fallback if the browser blocked the initial tab.
        const openLink = document.createElement("a");
        openLink.href = waUrl;
        openLink.target = "_blank";
        openLink.rel = "noopener noreferrer";
        openLink.click();
      }

      overlay.remove();

      alert(
        `Order recorded successfully!\n\n` +
        `Reference: ${result.order_number}\n` +
        `Vendor email sent: ${result.vendor_email_sent ? "Yes" : "No"}\n\n` +
        `WhatsApp should now open. Please tap Send to message the vendor.`
      );
    } catch (error) {
      console.error("Oriflame order error:", error);

      if (whatsappTab && !whatsappTab.closed) {
        whatsappTab.close();
      }

      errorBox.textContent =
        error.message || "Something went wrong. Please try again.";

      submitButton.disabled = false;
      submitButton.textContent = "TRY AGAIN";
    }
  });

  overlay.querySelector("#oriflame-customer-name").focus();
}

const inputStyle = `
  display:block;width:100%;box-sizing:border-box;
  padding:12px;margin:7px 0 16px;border:1px solid #ccc;
  border-radius:6px;font:inherit;background:#fff;color:#222;
`;

function escapeOrderHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

document.querySelectorAll(".product-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    showOrderForm(button);
  });
});

document.querySelectorAll(".heart").forEach((button) => {
  button.addEventListener("click", () => {
    button.textContent = button.textContent === "♡" ? "♥" : "♡";
  });
});

/*
  Keep the header menu horizontal on every screen size.
  No mobile dropdown is intentionally used.
*/
