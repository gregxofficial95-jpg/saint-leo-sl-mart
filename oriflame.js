const WHATSAPP_NUMBER = "2347078037509";

function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

document.querySelectorAll(".product-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();

    const product = button.dataset.product || "a product";
    const message =
      `Hello Oriflame, I would like to order: ${product}.`;

    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
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
