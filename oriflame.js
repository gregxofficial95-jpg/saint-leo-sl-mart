
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

  // If the card has several prices, ask the vendor to confirm.
  if (prices.length !== 1) return 0;

  return Number(prices[0][1].replace(/,/g, ""));
}

function askCustomerDetails() {
  const name = prompt("Please enter your full name:");
  if (name === null || !name.trim()) return null;

  const phone = prompt("Please enter your phone number:");
  if (phone === null || !phone.trim()) return null;

  return {
    name: name.trim(),
    phone: phone.trim()
  };
}

async function submitOriflameOrder(button) {
  const productName = button.dataset.product || "Oriflame product";
  const price = getProductPrice(button);
  const customer = askCustomerDetails();

  if (!customer) {
    alert("Order cancelled. Please enter your name and phone number to continue.");
    return;
  }

  const originalText = button.textContent;
  button.textContent = "PLEASE WAIT...";
  button.style.pointerEvents = "none";
  button.setAttribute("aria-disabled", "true");

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
          delivery_address: "",
          request_type: "order",
          request_details:
            "Order placed through the Oriflame page. " +
            "Please confirm availability, final price and delivery details with the customer.",
          items: [
            {
              product_name: productName,
              quantity: 1,
              unit_price: price
            }
          ],
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
      `Hello Oriflame! I'd like to order:\n` +
      `Product: ${productName}\n` +
      `Price shown: ${price > 0 ? "₦" + price.toLocaleString("en-NG") : "Please confirm price"}\n` +
      `Customer: ${customer.name}\n` +
      `Phone: ${customer.phone}\n` +
      `Order reference: ${result.order_number}\n\n` +
      `Please confirm availability and arrange delivery with me.`;

    alert(
      `Order recorded!\n\nReference: ${result.order_number}\n` +
      `Vendor email sent: ${result.vendor_email_sent ? "Yes" : "No"}\n\n` +
      `WhatsApp will now open.`
    );

    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");

  } catch (error) {
    console.error("Oriflame order error:", error);

    alert(
      "We couldn't record your order, so WhatsApp has not been opened.\n\n" +
      (error.message || "Please try again later.")
    );

  } finally {
    button.textContent = originalText;
    button.style.pointerEvents = "";
    button.removeAttribute("aria-disabled");
  }
}

document.querySelectorAll(".product-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    submitOriflameOrder(button);
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
