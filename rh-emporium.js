

const WHATSAPP_NUMBER = "2349133229268";
const STORAGE_KEY = "rhEmporiumCart";


/* =====================================================
   PRODUCT DATA
===================================================== */

const PRODUCT_DATA = [

  {
    id: "shoes",
    name: "Shoes",
    price: 36000,
    image: "rh-product-1.jpeg",
    description: "Comes with a box.",
    variations: [
      {
        key: "size",
        label: "Size",
        required: true,
        options: [
          "40",
          "41",
          "42",
          "43",
          "44",
          "45",
          "46",
          "47",
          "48"
        ]
      }
    ]
  },


{
  id: "luxury-top",
  name: "Luxury Top",
  price: 12000,
  image: "rh-product-2.jpeg",
  variations: [
    {
      key: "price",
      label: "Select Price",
      required: true,
      options: [
        "₦12,000",
        "₦11,000"
      ]
    }
  ]
},


  {
    id: "chic-earrings",
    name: "Chic Earrings",
    price: 1000,
    image: "rh-product-3.jpeg",
    variations: []
  },


  {
    id: "body-spray",
    name: "Body Spray",
    price: 5000,
    image: "rh-product-4.jpeg",

    variations: [
      {
        key: "type",
        label: "Type",
        required: true,

        // Replace these with the actual body spray types.
        options: [
          "YELLOW",
          "GREEN",
          "GREY"
        ]
      }
    ]
  },


  /*
    =====================================================
    JEWELRY / WATCH / ACCESSORIES COLLECTION

    IMPORTANT:
    These five items are represented by ONE image:
    rh-product-5.jpeg

    Customer chooses ONE item from the dropdown.

    Prices:
    Jewelry Set        ₦10,000
    Watch              ₦12,000
    Bracelet           ₦4,500
    Knuckle Ring       ₦2,000
    Rose Necklace Set  ₦10,000
    =====================================================
  */

  {
    id: "jewelry-collection",
    name: "Jewelry Collection",
    image: "rh-product-5.jpeg",

    choices: [
      {
        name: "Jewelry Set",
        price: 10000
      },

      {
        name: "Watch",
        price: 12000
      },

      {
        name: "Bracelet",
        price: 4500
      },

      {
        name: "Knuckle Ring",
        price: 2000
      },

      {
        name: "Rose Necklace Set",
        price: 10000
      }
    ],

    variations: [
      {
        key: "item",
        label: "Choose Item",
        required: true,

        options: [
          "Jewelry Set",
          "Watch",
          "Bracelet",
          "Knuckle Ring",
          "Rose Necklace Set"
        ]
      }
    ]
  },


  {
    id: "plain-vanilla-cake",
    name: "Plain Vanilla Cake",
    price: 8000,
    image: "rh-product-10.jpeg",

    fixedOption: {
      label: "Size",
      value: "2 inches"
    },

    variations: []
  },


  {
    id: "sexy-chic-palazzo-jeans",
    name: "Sexy Chic Palazzo Jeans",
    price: 27000,
    image: "rh-product-11.jpeg",
    variations: []
  },


  {
    id: "baggy-denim-jolt",
    name: "Baggy Denim Jolt",
    price: 35000,
    image: "rh-product-12.jpeg",
    variations: []
  }

];


/* =====================================================
   STATE
===================================================== */

let cart = loadCart();

let selectedCardQuantities = {};


/* =====================================================
   DOM ELEMENTS
===================================================== */

const productGrid =
  document.getElementById("productGrid");

const headerCartCount =
  document.getElementById("headerCartCount");

const mobileCartCount =
  document.getElementById("mobileCartCount");

const cartDrawer =
  document.getElementById("cartDrawer");

const cartOverlay =
  document.getElementById("cartOverlay");

const cartItemsEl =
  document.getElementById("cartItems");

const cartEmpty =
  document.getElementById("cartEmpty");

const cartFooter =
  document.getElementById("cartFooter");

const cartSubtotal =
  document.getElementById("cartSubtotal");

const cartTotalQuantity =
  document.getElementById("cartTotalQuantity");

const cartTitleCount =
  document.getElementById("cartTitleCount");

const toast =
  document.getElementById("toast");

const searchBar =
  document.getElementById("searchBar");

const searchInput =
  document.getElementById("productSearch");

const searchResultMessage =
  document.getElementById("searchResultMessage");


/* =====================================================
   CURRENCY
===================================================== */

function formatNaira(amount) {

  return `₦${Number(amount).toLocaleString("en-NG")}`;

}


/* =====================================================
   PRODUCT PRICE LOGIC
===================================================== */

function getUnitPrice(
  product,
  quantity,
  variations = {}
) {

  /*
    Jewelry Collection:
    Price depends on selected item.
  */

  if (product.id === "jewelry-collection") {

    const selectedItem =
      variations.item;

    const selectedChoice =
      product.choices?.find(
        choice =>
          choice.name === selectedItem
      );

    return selectedChoice
      ? selectedChoice.price
      : 0;
  }


if (product.id === "luxury-top") {

  return variations.price === "₦11,000"
    ? 11000
    : 12000;
}


  return product.price;

}


/* =====================================================
   GET JEWELRY CHOICE
===================================================== */

function getJewelryChoice(
  product,
  selectedItem
) {

  if (
    product.id !== "jewelry-collection"
  ) {
    return null;
  }

  return product.choices?.find(
    choice =>
      choice.name === selectedItem
  ) || null;

}


/* =====================================================
   HTML ESCAPING
===================================================== */

function escapeHtml(value) {

  return String(value)

    .replaceAll("&", "&amp;")

    .replaceAll("<", "&lt;")

    .replaceAll(">", "&gt;")

    .replaceAll('"', "&quot;")

    .replaceAll("'", "&#039;");

}


/* =====================================================
   LOCAL STORAGE
===================================================== */

function loadCart() {

  try {

    const saved =
      JSON.parse(
        localStorage.getItem(
          STORAGE_KEY
        )
      );

    if (!Array.isArray(saved)) {
      return [];
    }

    /*
      Remove old/invalid products from a previous
      version of the website.
    */

    return saved.filter(item =>
      PRODUCT_DATA.some(
        product =>
          product.id === item.productId
      )
    );

  } catch {

    return [];

  }

}


function saveCart() {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(cart)
  );

}


/* =====================================================
   PRODUCT RENDERING
===================================================== */

function renderProducts(query = "") {

  const normalized =
    query.trim().toLowerCase();


  const filtered =
    PRODUCT_DATA.filter(
      product =>
        product.name
          .toLowerCase()
          .includes(normalized)
    );


  const resultCount =
    document.getElementById(
      "resultCount"
    );


  if (resultCount) {

    resultCount.textContent =
      `${filtered.length} product${
        filtered.length === 1
          ? ""
          : "s"
      }`;

  }


  if (normalized) {

    searchResultMessage.hidden =
      false;

    searchResultMessage.textContent =
      filtered.length

        ? `Showing ${filtered.length} result${
            filtered.length === 1
              ? ""
              : "s"
          } for “${query.trim()}”.`

        : `No products found for “${query.trim()}”.`;

  } else {

    searchResultMessage.hidden =
      true;

  }


  productGrid.innerHTML =
    filtered
      .map(
        (product, index) =>
          productCard(
            product,
            index + 1
          )
      )
      .join("");


  bindProductControls();

}


/* =====================================================
   PRODUCT CARD
===================================================== */

function productCard(
  product,
  number
) {

  const cardQty =
    selectedCardQuantities[
      product.id
    ] || 1;


  const variationMarkup =
    product.variations
      .map(
        variation => `

          <div class="variation-group">

            <label
              for="${product.id}-${variation.key}"
            >
              ${escapeHtml(
                variation.label
              )}
              ${
                variation.required
                  ? " *"
                  : ""
              }
            </label>


            <select
              id="${product.id}-${variation.key}"
              data-product-id="${product.id}"
              data-variation-key="${variation.key}"
              aria-required="${variation.required}"
            >

              <option value="">
                Select ${escapeHtml(
                  variation.label
                )}
              </option>


              ${variation.options
                .map(
                  option => `

                    <option
                      value="${escapeHtml(
                        option
                      )}"
                    >
                      ${escapeHtml(
                        option
                      )}
                    </option>

                  `
                )
                .join("")}

            </select>

          </div>

        `
      )
      .join("");


  const fixedMarkup =
    product.fixedOption

      ? `

        <div class="variation-group">

          <label>
            ${escapeHtml(
              product.fixedOption.label
            )}
          </label>


          <div class="fixed-option">
            ${escapeHtml(
              product.fixedOption.value
            )}
          </div>

        </div>

      `

      : "";


  /*
    Price display
  */

  let priceText = "";


if (
  product.id === "luxury-top"
) {

  priceText = `
    <span class="select-price">
      Select a price
    </span>
  `;

}

  else if (
    product.id ===
    "jewelry-collection"
  ) {

    priceText = `
      <span class="select-price">
        Select an item
      </span>
    `;

  }

  else {

    priceText =
      formatNaira(
        product.price
      );

  }


  return `

    <article
      class="product-card"
      data-product-id="${product.id}"
    >

      <div class="product-image-wrap">

        <img
          src="${escapeHtml(
            product.image
          )}"
          alt="${escapeHtml(
            product.name
          )}"
          loading="lazy"
        >


        <span class="product-number">
          ${String(number).padStart(
            2,
            "0"
          )}
        </span>

      </div>


      <div class="product-info">

        <h3 class="product-name">
          ${escapeHtml(
            product.name
          )}
        </h3>


        <div
          class="product-price"
          data-price-for="${product.id}"
        >
          ${priceText}
        </div>


        ${
          product.description
            ? `
              <p class="product-description">
                ${escapeHtml(
                  product.description
                )}
              </p>
            `
            : ""
        }


        ${variationMarkup}

        ${fixedMarkup}


        <div
          class="validation"
          data-validation-for="${product.id}"
        ></div>


        <div class="card-bottom">

          <div class="qty-control">

            <button
              type="button"
              data-card-action="minus"
              data-product-id="${product.id}"
              aria-label="Decrease ${escapeHtml(
                product.name
              )} quantity"
            >
              −
            </button>


            <span
              data-card-qty="${product.id}"
            >
              ${cardQty}
            </span>


            <button
              type="button"
              data-card-action="plus"
              data-product-id="${product.id}"
              aria-label="Increase ${escapeHtml(
                product.name
              )} quantity"
            >
              +
            </button>

          </div>


          <button
            class="add-button"
            type="button"
            data-add-product="${product.id}"
          >
            Add to Cart
          </button>

        </div>

      </div>

    </article>

  `;

}


/* =====================================================
   PRODUCT CARD CONTROLS
===================================================== */

function bindProductControls() {

  /*
    Quantity buttons
  */

  document
    .querySelectorAll(
      "[data-card-action]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const id =
            button.dataset.productId;


          const current =
            selectedCardQuantities[
              id
            ] || 1;


          const next =
            button.dataset.cardAction ===
            "plus"

              ? current + 1

              : Math.max(
                  1,
                  current - 1
                );


          selectedCardQuantities[
            id
          ] = next;


          const card =
            button.closest(
              ".product-card"
            );


          const quantityElement =
            card.querySelector(
              `[data-card-qty="${id}"]`
            );


          quantityElement.textContent =
            next;


          const product =
            PRODUCT_DATA.find(
              item =>
                item.id === id
            );




if (
  product &&
  product.id === "luxury-top"
) {

  const priceElement =
    card.querySelector(
      `[data-price-for="${id}"]`
    );

  const priceSelect =
    card.querySelector(
      `[data-variation-key="price"]`
    );

  const selectedPrice =
    priceSelect?.value || "";

  if (selectedPrice) {

    priceElement.innerHTML = `
      ${formatNaira(
        selectedPrice === "₦11,000"
          ? 11000
          : 12000
      )}
      <small>each</small>
    `;

  } else {

    priceElement.innerHTML = `
      <span class="select-price">
        Select a price
      </span>
    `;

  }

}

        }
      );

    });


  /*
    Add to cart buttons
  */

  document
    .querySelectorAll(
      "[data-add-product]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          addFromCard(
            button.dataset.addProduct
          );

        }
      );

    });


  /*
    Jewelry collection price changes
    when a different item is selected.
  */

  document
    .querySelectorAll(
      '[data-product-id="jewelry-collection"][data-variation-key="item"]'
    )
    .forEach(select => {

      select.addEventListener(
        "change",
        () => {

          const product =
            PRODUCT_DATA.find(
              item =>
                item.id ===
                "jewelry-collection"
            );


          const selectedItem =
            select.value;


          const choice =
            getJewelryChoice(
              product,
              selectedItem
            );


          const card =
            select.closest(
              ".product-card"
            );


          const priceElement =
            card.querySelector(
              '[data-price-for="jewelry-collection"]'
            );


          if (choice) {

            priceElement.innerHTML =
              formatNaira(
                choice.price
              );

          } else {

            priceElement.innerHTML = `
              <span class="select-price">
                Select an item
              </span>
            `;

          }

        }
      );

    });

    /*
  Luxury Top price changes
  when a different price is selected.
*/

document
  .querySelectorAll(
    '[data-product-id="luxury-top"][data-variation-key="price"]'
  )
  .forEach(select => {

    select.addEventListener(
      "change",
      () => {

        const card =
          select.closest(
            ".product-card"
          );

        const priceElement =
          card.querySelector(
            '[data-price-for="luxury-top"]'
          );

        if (select.value === "₦11,000") {

          priceElement.innerHTML = `
            ${formatNaira(11000)}
            <small>each</small>
          `;

        } else if (
          select.value === "₦12,000"
        ) {

          priceElement.innerHTML = `
            ${formatNaira(12000)}
            <small>each</small>
          `;

        } else {

          priceElement.innerHTML = `
            <span class="select-price">
              Select a price
            </span>
          `;

        }

      }
    );

  });

}




/* =====================================================
   GET SELECTED VARIATIONS
===================================================== */

function getSelectedVariations(
  product,
  card
) {

  const variations = {};


  for (
    const variation of
    product.variations
  ) {

    const select =
      card.querySelector(
        `[data-variation-key="${variation.key}"]`
      );


    variations[
      variation.key
    ] =
      select?.value || "";

  }


  return variations;

}


/* =====================================================
   VARIATION SIGNATURE
===================================================== */

function variationSignature(
  variations
) {

  return Object.entries(
    variations
  )

    .sort(
      ([a], [b]) =>
        a.localeCompare(b)
    )

    .map(
      ([key, value]) =>
        `${key}:${value}`
    )

    .join("|");

}


/* =====================================================
   ADD PRODUCT TO CART
===================================================== */

function addFromCard(
  productId
) {

  const product =
    PRODUCT_DATA.find(
      item =>
        item.id === productId
    );


  if (!product) {
    return;
  }


  const card =
    document.querySelector(
      `.product-card[data-product-id="${productId}"]`
    );


  const validation =
    card.querySelector(
      `[data-validation-for="${productId}"]`
    );


  const quantity =
    selectedCardQuantities[
      productId
    ] || 1;


  const variations =
    getSelectedVariations(
      product,
      card
    );


  /*
    Check required variations.
  */

  const missing =
    product.variations.find(
      variation =>
        variation.required &&
        !variations[
          variation.key
        ]
    );


  if (missing) {

    validation.textContent =
      `Please select a ${missing.label.toLowerCase()}.`;


    const select =
      card.querySelector(
        `[data-variation-key="${missing.key}"]`
      );


    select?.focus();

    return;

  }


  /*
    Jewelry collection must have
    a valid selected item.
  */

  let selectedChoice =
    null;


  if (
    product.id ===
    "jewelry-collection"
  ) {

    selectedChoice =
      getJewelryChoice(
        product,
        variations.item
      );


    if (!selectedChoice) {

      validation.textContent =
        "Please select an item.";

      return;

    }

  }


  validation.textContent =
    "";


  const signature =
    variationSignature(
      variations
    );


  /*
    If same product + same variation
    already exists, increase quantity.
  */

  const existing =
    cart.find(
      item =>
        item.productId ===
          product.id &&
        variationSignature(
          item.variations
        ) === signature
    );


  if (existing) {

    existing.quantity +=
      quantity;

  }

  else {

    cart.push({

      cartId:
        `${product.id}-${signature || "default"}-${Date.now()}`,

      productId:
        product.id,

      /*
        For the combined collection,
        save the actual selected item
        as the cart item's name.
      */

      name:
        selectedChoice
          ? selectedChoice.name
          : product.name,

      image:
        product.image || "",

      variations,

      fixedOption:
        product.fixedOption ||
        null,

      quantity

    });

  }


  saveCart();

  renderCart();

  openCart();

  showToast(
    `${
      selectedChoice
        ? selectedChoice.name
        : product.name
    } added to your cart.`
  );

}


/* =====================================================
   CART RENDERING
===================================================== */

function renderCart() {

  let totalQuantity = 0;

  let subtotal = 0;


  cartItemsEl.innerHTML =
    cart
      .map(item => {

        const product =
          PRODUCT_DATA.find(
            productItem =>
              productItem.id ===
              item.productId
          );


        /*
          Skip invalid old cart items.
        */

        if (!product) {
          return "";
        }


        const unitPrice =
          getUnitPrice(
            product,
            item.quantity,
            item.variations
          );


        const lineTotal =
          unitPrice *
          item.quantity;


        totalQuantity +=
          item.quantity;


        subtotal +=
          lineTotal;


        let variationLines =
          Object.entries(
            item.variations || {}
          )

            .filter(
              ([, value]) =>
                value
            )

            .map(
              ([key, value]) => `

                <span>
                  ${escapeHtml(
                    capitalize(key)
                  )}:
                  ${escapeHtml(value)}
                </span>

              `
            )

            .join("");


        if (item.fixedOption) {

          variationLines += `

            <span>
              ${escapeHtml(
                item.fixedOption.label
              )}:
              ${escapeHtml(
                item.fixedOption.value
              )}
            </span>

          `;

        }


        return cartItemMarkup(
          item,
          unitPrice,
          lineTotal,
          variationLines
        );

      })
      .join("");


  /*
    Header cart count
  */

  headerCartCount.textContent =
    totalQuantity;


  mobileCartCount.textContent =
    totalQuantity;


  cartTitleCount.textContent =
    `(${totalQuantity})`;


  cartTotalQuantity.textContent =
    totalQuantity;


  cartSubtotal.textContent =
    formatNaira(
      subtotal
    );


  /*
    Empty cart state
  */

  const hasItems =
    cart.length > 0;


  cartEmpty.classList.toggle(
    "show",
    !hasItems
  );


  cartFooter.classList.toggle(
    "hidden",
    !hasItems
  );


  /*
    Bind cart quantity controls
  */

  document
    .querySelectorAll(
      "[data-cart-minus]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          changeCartQuantity(
            button.dataset.cartMinus,
            -1
          );

        }
      );

    });


  document
    .querySelectorAll(
      "[data-cart-plus]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          changeCartQuantity(
            button.dataset.cartPlus,
            1
          );

        }
      );

    });


  /*
    Remove buttons
  */

  document
    .querySelectorAll(
      "[data-remove-cart]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          removeCartItem(
            button.dataset.removeCart
          );

        }
      );

    });

}


/* =====================================================
   CART ITEM HTML
===================================================== */

function cartItemMarkup(
  item,
  unitPrice,
  lineTotal,
  variationLines
) {

  return `

    <div class="cart-item">

      <img
        class="cart-item-image"
        src="${escapeHtml(
          item.image
        )}"
        alt="${escapeHtml(
          item.name
        )}"
      >


      <div class="cart-item-info">

        <div class="cart-item-top">

          <h3 class="cart-item-name">
            ${escapeHtml(
              item.name
            )}
          </h3>


          <button
            class="remove-item"
            type="button"
            data-remove-cart="${escapeHtml(
              item.cartId
            )}"
            aria-label="Remove ${escapeHtml(
              item.name
            )}"
          >
            ×
          </button>

        </div>


        <div class="cart-item-meta">

          ${variationLines}


          <span class="cart-item-price">
            ${formatNaira(
              unitPrice
            )}
            each
          </span>

        </div>


        <div class="cart-item-bottom">

          <div class="qty-control cart-qty">

            <button
              type="button"
              data-cart-minus="${escapeHtml(
                item.cartId
              )}"
              aria-label="Decrease quantity"
            >
              −
            </button>


            <span>
              ${item.quantity}
            </span>


            <button
              type="button"
              data-cart-plus="${escapeHtml(
                item.cartId
              )}"
              aria-label="Increase quantity"
            >
              +
            </button>

          </div>


          <strong class="cart-line-total">
            ${formatNaira(
              lineTotal
            )}
          </strong>

        </div>

      </div>

    </div>

  `;

}


/* =====================================================
   CHANGE CART QUANTITY
===================================================== */

function changeCartQuantity(
  cartId,
  delta
) {

  const item =
    cart.find(
      entry =>
        entry.cartId === cartId
    );


  if (!item) {
    return;
  }


  item.quantity =
    Math.max(
      1,
      item.quantity + delta
    );


  saveCart();

  renderCart();

}


/* =====================================================
   REMOVE CART ITEM
===================================================== */

function removeCartItem(
  cartId
) {

  cart =
    cart.filter(
      item =>
        item.cartId !== cartId
    );


  saveCart();

  renderCart();

  showToast(
    "Item removed from your cart."
  );

}


/* =====================================================
   CAPITALIZE
===================================================== */

function capitalize(
  value
) {

  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  );

}


/* =====================================================
   CART SUBTOTAL
===================================================== */

function getCartSubtotal() {

  return cart.reduce(
    (sum, item) => {

      const product =
        PRODUCT_DATA.find(
          productItem =>
            productItem.id ===
            item.productId
        );


      if (!product) {
        return sum;
      }


      const unitPrice =
        getUnitPrice(
          product,
          item.quantity,
          item.variations
        );


      return (
        sum +
        unitPrice *
          item.quantity
      );

    },
    0
  );

}


/* =====================================================
   WHATSAPP MESSAGE
===================================================== */

function buildWhatsAppMessage() {

  const lines = [

    "RH EMPORIUM ORDER",

    "",

    ...cart.flatMap(
      (item, index) => {

        const product =
          PRODUCT_DATA.find(
            productItem =>
              productItem.id ===
              item.productId
          );


        if (!product) {
          return [];
        }


        const unitPrice =
          getUnitPrice(
            product,
            item.quantity,
            item.variations
          );


        const itemLines = [

          `${index + 1}. ${item.name}`,

          ...Object.entries(
            item.variations || {}
          )

            .filter(
              ([, value]) =>
                value
            )

            .map(
              ([key, value]) =>
                `${capitalize(
                  key
                )}: ${value}`
            ),


          ...(item.fixedOption
            ? [
                `${item.fixedOption.label}: ${item.fixedOption.value}`
              ]
            : []),


          `Quantity: ${item.quantity}`,

          `Price: ${formatNaira(
            unitPrice
          )} each`,

          `Subtotal: ${formatNaira(
            unitPrice *
              item.quantity
          )}`,

          ""

        ];


        return itemLines;

      }
    ),


    `TOTAL: ${formatNaira(
      getCartSubtotal()
    )}`,

    "",

    "Please confirm availability and delivery details."

  ];


  return lines.join("\n");

}


/* =====================================================
   ORDER ON WHATSAPP
===================================================== */

function orderOnWhatsApp() {

  if (!cart.length) {

    showToast(
      "Your cart is empty."
    );

    return;

  }


  if (
    WHATSAPP_NUMBER ===
    "WHATSAPP_NUMBER_HERE"
  ) {

    showToast(
      "Replace WHATSAPP_NUMBER_HERE with the RH Emporium number first."
    );

    return;

  }


  const cleanedNumber =
    WHATSAPP_NUMBER.replace(
      /[^\d]/g,
      ""
    );


  const url =
    `https://wa.me/${cleanedNumber}?text=${
      encodeURIComponent(
        buildWhatsAppMessage()
      )
    }`;


  window.open(
    url,
    "_blank",
    "noopener"
  );

}


/* =====================================================
   OPEN CART
===================================================== */

function openCart() {

  cartDrawer.classList.add(
    "open"
  );

  cartOverlay.classList.add(
    "open"
  );

  cartDrawer.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "cart-open"
  );

}


/* =====================================================
   CLOSE CART
===================================================== */

function closeCart() {

  cartDrawer.classList.remove(
    "open"
  );

  cartOverlay.classList.remove(
    "open"
  );

  cartDrawer.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "cart-open"
  );

}


/* =====================================================
   TOAST
===================================================== */

let toastTimer;


function showToast(
  message
) {

  clearTimeout(
    toastTimer
  );


  toast.textContent =
    message;


  toast.classList.add(
    "show"
  );


  toastTimer =
    setTimeout(
      () => {

        toast.classList.remove(
          "show"
        );

      },
      2600
    );

}


/* =====================================================
   CART EVENTS
===================================================== */

document
  .getElementById(
    "cartOpen"
  )
  ?.addEventListener(
    "click",
    openCart
  );


document
  .getElementById(
    "mobileCartOpen"
  )
  ?.addEventListener(
    "click",
    () => {

      document
        .getElementById(
          "mobileNav"
        )
        ?.classList.remove(
          "open"
        );


      document
        .getElementById(
          "mobileMenuToggle"
        )
        ?.setAttribute(
          "aria-expanded",
          "false"
        );


      openCart();

    }
  );


document
  .getElementById(
    "cartClose"
  )
  ?.addEventListener(
    "click",
    closeCart
  );


cartOverlay
  ?.addEventListener(
    "click",
    closeCart
  );


document
  .getElementById(
    "emptyShopButton"
  )
  ?.addEventListener(
    "click",
    () => {

      closeCart();


      document
        .getElementById(
          "shop"
        )
        ?.scrollIntoView({
          behavior: "smooth"
        });

    }
  );


document
  .getElementById(
    "whatsappOrder"
  )
  ?.addEventListener(
    "click",
    orderOnWhatsApp
  );


/* =====================================================
   MOBILE MENU
===================================================== */

const mobileMenuToggle =
  document.getElementById(
    "mobileMenuToggle"
  );

const mobileNav =
  document.getElementById(
    "mobileNav"
  );


function closeMobileMenu() {

  mobileNav?.classList.remove(
    "open"
  );

  mobileMenuToggle?.setAttribute(
    "aria-expanded",
    "false"
  );

  mobileMenuToggle?.setAttribute(
    "aria-label",
    "Open menu"
  );

}


function toggleMobileMenu() {

  if (
    !mobileNav ||
    !mobileMenuToggle
  ) {
    return;
  }


  const isOpen =
    mobileNav.classList.toggle(
      "open"
    );


  mobileMenuToggle.setAttribute(
    "aria-expanded",
    String(isOpen)
  );


  mobileMenuToggle.setAttribute(
    "aria-label",
    isOpen
      ? "Close menu"
      : "Open menu"
  );

}


/* Open / close menu */

mobileMenuToggle?.addEventListener(
  "click",
  toggleMobileMenu
);


/* Close menu after clicking a link */

document
  .querySelectorAll(
    ".mobile-nav a"
  )
  .forEach(link => {

    link.addEventListener(
      "click",
      closeMobileMenu
    );

  });


/* Close menu when opening cart */

document
  .getElementById(
    "mobileCartOpen"
  )
  ?.addEventListener(
    "click",
    closeMobileMenu
  );


/* Close mobile menu when returning to desktop */

window.addEventListener(
  "resize",
  () => {

    if (
      window.innerWidth > 780
    ) {

      closeMobileMenu();

    }

  }
);


/* =====================================================
   SEARCH
===================================================== */

document
  .getElementById(
    "searchToggle"
  )
  ?.addEventListener(
    "click",
    () => {

      searchBar.classList.toggle(
        "open"
      );


      if (
        searchBar.classList.contains(
          "open"
        )
      ) {

        searchInput.focus();

      }

    }
  );


searchInput?.addEventListener(
  "input",
  event => {

    renderProducts(
      event.target.value
    );

  }
);


document
  .getElementById(
    "searchClear"
  )
  ?.addEventListener(
    "click",
    () => {

      searchInput.value = "";

      renderProducts("");

      searchInput.focus();

    }
  );


/* =====================================================
   CONTACT WHATSAPP
===================================================== */

document
  .getElementById(
    "contactWhatsApp"
  )
  ?.addEventListener(
    "click",
    event => {

      if (
        WHATSAPP_NUMBER ===
        "WHATSAPP_NUMBER_HERE"
      ) {

        event.preventDefault();

        showToast(
          "Replace WHATSAPP_NUMBER_HERE with the RH Emporium number first."
        );

        return;

      }


      const number =
        WHATSAPP_NUMBER.replace(
          /[^\d]/g,
          ""
        );


      event.currentTarget.href =
        `https://wa.me/${number}?text=${
          encodeURIComponent(
            "Hello RH Emporium, I have a question about an item."
          )
        }`;

    }
  );


/* =====================================================
   NAVIGATION ACTIVE STATE
===================================================== */

document
  .querySelectorAll(
    ".nav-link"
  )
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll(
            ".nav-link"
          )
          .forEach(item =>
            item.classList.remove(
              "active"
            )
          );


        link.classList.add(
          "active"
        );

      }
    );

  });


/* =====================================================
   YEAR
===================================================== */

const yearElement =
  document.getElementById(
    "year"
  );


if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}


/* =====================================================
   INITIALIZE
===================================================== */

renderProducts();

renderCart();


/* =====================================================
   LUXURY INTRO
===================================================== */

window.addEventListener(
  "load",
  () => {

    setTimeout(
      () => {

        const intro =
          document.getElementById(
            "intro"
          );


        if (intro) {

          intro.classList.add(
            "is-hidden"
          );

        }

      },
      850
    );

  }
);
