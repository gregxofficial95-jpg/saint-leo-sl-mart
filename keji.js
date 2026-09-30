/* =========================================================
   KEJI'S LUKE
   PRODUCT SYSTEM
========================================================= */


/* =========================================================
   WHATSAPP
========================================================= */

const WHATSAPP_NUMBER = "2349031894460";


/* =========================================================
   PRODUCT DATA
========================================================= */

const products = [

    {
        id: 1,

        name: "Net Luxe Stone Slippers",

        price: 11700,

        category: "Slippers",

        images: [
            "keji-image-1a.jpeg",
            "keji-image-1b.jpeg",
            "keji-image-1c.jpeg",
            "keji-image-1d.jpeg"
        ],

        colors: [
            "Black",
            "Coffee",
            "Gold"
        ],

        sizes: [
            37,
            38,
            39,
            40,
            41,
            42
        ],

        description:
            "A refined stone-inspired slipper designed for effortless everyday luxury."
    },


    {
        id: 2,

        name: "Zara Luxe Sandals",

        price: 20500,

        category: "Sandals",

        images: [
            "keji-image-2a.jpeg",
            "keji-image-2b.jpeg",
            "keji-image-2c.jpeg",
            "keji-image-2d.jpeg"
        ],

        colors: [
            "Black",
            "Gold"
        ],

        sizes: [
            37,
            38,
            39,
            40,
            41,
            42
        ],

        description:
            "Elegant luxe sandals with a polished finish for elevated everyday looks."
    },


    {
        id: 3,

        name: "Ruffle Slippers",

        price: 9700,

        category: "Slippers",

        images: [
            "keji-image-3a.jpeg",
            "keji-image-3b.jpeg",
            "keji-image-3c.jpeg",
            "keji-image-3d.jpeg"
        ],

        colors: [
            "Black",
            "Pink",
            "Nude",
            "Brown"
        ],

        sizes: [
            37,
            38,
            39,
            40,
            41,
            42
        ],

        description:
            "A soft and stylish ruffle design made for comfortable everyday wear."
    },


    {
        id: 4,

        name: "Luxe Scissors Slide",

        price: 16500,

        category: "Slides",

        images: [
            "keji-image-4a.jpeg",
            "keji-image-4b.jpeg",
            "keji-image-4c.jpeg"
        ],

        colors: [
            "Black",
            "Burgundy"
        ],

        sizes: [
            37,
            38,
            39,
            40,
            41,
            42
        ],

        description:
            "A bold statement slide combining comfort with a distinctive luxury finish."
    },


    {
        id: 5,

        name: "Mini Coach Cherry Luxury Bag",

        price: 13500,

        category: "Bags",

        images: [
            "keji-image-5.jpeg"
        ],

        colors: [
            "Cherry"
        ],

        sizes: [],

        description:
            "A mini-sized luxury bag designed to carry your essentials while keeping your look refined."
    },


    {
        id: 6,

        name: "Versace Slippers",

        price: 9700,

        category: "Slippers",

        images: [
            "keji-image-6a.jpeg",
            "keji-image-6b.jpeg"
        ],

        colors: [
            "Black",
            "Pink",
            "Brown"
        ],

        sizes: [
            37,
            38,
            39,
            40,
            41,
            42
        ],

        description:
            "A stylish everyday slipper available in versatile colors."
    },


    {
        id: 7,

        name: "Royal Halo Slides",

        price: 9000,

        category: "Slides",

        images: [
            "keji-image-7a.jpeg",
            "keji-image-7b.jpeg",
            "keji-image-7c.jpeg"
        ],

        colors: [
            "Black",
            "Gold",
            "Silver"
        ],

        sizes: [
            37,
            38,
            39,
            40,
            41,
            42
        ],

        description:
            "A sleek halo-inspired slide with an elegant finish for everyday styling."
    },


    {
        id: 8,

        name: "Loewe Stone Slippers",

        price: 11700,

        category: "Slippers",

        images: [
            "keji-image-8a.jpeg",
            "keji-image-8b.jpeg",
            "keji-image-8c.jpeg",
            "keji-image-8d.jpeg"
        ],

        colors: [
            "Black",
            "Brown",
            "Gold"
        ],

        sizes: [
            37,
            38,
            39,
            40,
            41,
            42
        ],

        description:
            "A clean stone-inspired slipper designed for effortless luxury."
    },


    {
        id: 9,

        name: "Luxe Crochet Slide",

        price: 9500,

        category: "Slides",

        images: [
            "keji-image-9a.jpeg",
            "keji-image-9b.jpeg",
            "keji-image-9c.jpeg",
            "keji-image-9d.jpeg",
            "keji-image-9e.jpeg"
        ],

        colors: [
            "Black",
            "Grey",
            "Nude",
            "Coffee Brown"
        ],

        sizes: [
            37,
            38,
            39,
            40,
            41,
            42
        ],

        badge: "RESTOCKED",

        description:
            "A textured crochet slide combining relaxed comfort with a polished finish."
    },


    {
        id: 10,

        name: "Savannah Pearl Luxe Ballerina Flat",

        price: 15500,

        category: "Flats",

        images: [
            "keji-image-10a.jpeg",
            "keji-image-10b.jpeg",
            "keji-image-10c.jpeg"
        ],

        colors: [
            "Black",
            "Leopard"
        ],

        sizes: [
            37,
            38,
            39,
            40,
            41,
            42,
            43
        ],

        description:
            "A feminine ballerina flat with a sophisticated pearl-inspired finish."
    },


    {
        id: 11,

        name: "The Velona Luxe Bag",

        price: 14500,

        category: "Bags",

        images: [
            "keji-image-11a.jpeg",
            "keji-image-11b.jpeg",
            "keji-image-11c.jpeg",
            "keji-image-11d.jpeg",
            "keji-image-11e.jpeg",
            "keji-image-11f.jpeg",
            "keji-image-11g.jpeg"
        ],

        colors: [
            "Black",
            "Brown",
            "Green",
            "Yellow",
            "Gold",
            "Wine"
        ],

        sizes: [],

        badge: "RESTOCKED",

        description:
            "A full-boxed luxe bag designed to bring structure and elegance to your look."
    },


    {
        id: 12,

        name: "Coach Cherry Slides",

        price: 15500,

        category: "Slides",

        images: [
            "keji-image-12a.jpeg",
            "keji-image-12b.jpeg",
            "keji-image-12c.jpeg",
            "keji-image-12d.jpeg"
        ],

        colors: [
            "Black",
            "Yellow",
            "White",
            "Burgundy"
        ],

        sizes: [
            37,
            38,
            39,
            40,
            41,
            42
        ],

        description:
            "A stylish cherry-inspired slide designed for an effortless statement look."
    }

];


/* =========================================================
   RELATED PRODUCT MAP
========================================================= */

const relatedProducts = {

    1: [8, 3, 7, 6],

    2: [10, 12, 1, 8],

    3: [1, 6, 7, 8],

    4: [7, 12, 1, 9],

    5: [11, 2, 10, 12],

    6: [1, 3, 8, 7],

    7: [4, 12, 1, 9],

    8: [1, 3, 7, 6],

    9: [4, 7, 12, 1],

    10: [2, 5, 11, 12],

    11: [5, 10, 2, 12],

    12: [4, 7, 2, 1]

};


/* =========================================================
   DOM
========================================================= */

const productsGrid =
    document.getElementById("productsGrid");

const productCount =
    document.getElementById("productCount");

const productHeading =
    document.getElementById("productHeading");


const productModal =
    document.getElementById("productModal");

const modalOverlay =
    document.getElementById("modalOverlay");

const modalClose =
    document.getElementById("modalClose");


const mainProductImage =
    document.getElementById("mainProductImage");

const thumbnailRow =
    document.getElementById("thumbnailRow");

const galleryCounter =
    document.getElementById("galleryCounter");


const modalProductName =
    document.getElementById("modalProductName");

const modalPrice =
    document.getElementById("modalPrice");

const modalCategory =
    document.getElementById("modalCategory");

const modalDescription =
    document.getElementById("modalDescription");


const colorOptions =
    document.getElementById("colorOptions");

const sizeOptions =
    document.getElementById("sizeOptions");


const colorSection =
    document.getElementById("colorSection");

const sizeSection =
    document.getElementById("sizeSection");


const selectedColor =
    document.getElementById("selectedColor");

const selectedSize =
    document.getElementById("selectedSize");


const quantityDisplay =
    document.getElementById("quantity");


const decreaseQty =
    document.getElementById("decreaseQty");

const increaseQty =
    document.getElementById("increaseQty");


const whatsappOrder =
    document.getElementById("whatsappOrder");


const relatedProductsContainer =
    document.getElementById("relatedProducts");


const categoryButtons =
    document.querySelectorAll(".category-card");


const searchInput =
    document.getElementById("searchInput");


/* =========================================================
   STATE
========================================================= */

let currentProduct = null;

let currentImageIndex = 0;

let selectedProductColor = null;

let selectedProductSize = null;

let quantity = 1;

let currentCategory = "All";

let cart = JSON.parse(
    localStorage.getItem("kejiLukeCart")
) || [];

let cartWarningShown =
    localStorage.getItem("kejiLukeCartWarningShown") === "true";


/* =========================================================
   FORMAT PRICE
========================================================= */

function formatPrice(price) {

    return "₦" + price.toLocaleString("en-NG");

}


/* =========================================================
   CART SYSTEM
========================================================= */


/* =========================================================
   SAVE CART
========================================================= */

function saveCart() {

    localStorage.setItem(
        "kejiLukeCart",
        JSON.stringify(cart)
    );

}


/* =========================================================
   CART COUNT
========================================================= */

function updateCartCount() {

    const totalItems =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    savedCount.textContent =
        totalItems;


    bagButton.classList.toggle(
        "has-items",
        totalItems > 0
    );

}


/* =========================================================
   CART TOTAL
========================================================= */

function getCartTotal() {

    return cart.reduce(
        (total, item) =>
            total + (item.price * item.quantity),
        0
    );

}


/* =========================================================
   CART WARNING
========================================================= */

function showCartWarning() {

    if (cartWarningShown) {

        return Promise.resolve(true);

    }


    return new Promise(resolve => {

        cartWarning.classList.add("active");


        cartWarningConfirm.onclick = () => {

            cartWarning.classList.remove("active");

            cartWarningShown = true;

            localStorage.setItem(
                "kejiLukeCartWarningShown",
                "true"
            );

            resolve(true);

        };

    });

}


/* =========================================================
   ADD ITEM TO CART
========================================================= */

async function addCurrentProductToCart() {

    if (!currentProduct) return;


    if (
        currentProduct.sizes.length &&
        !selectedProductSize
    ) {

        alert("Please select a size.");

        return;

    }


    if (
        currentProduct.colors.length &&
        !selectedProductColor
    ) {

        alert("Please select a color.");

        return;

    }


    await showCartWarning();


    const existingItem =
        cart.find(item =>

            item.productId === currentProduct.id &&

            item.size === selectedProductSize &&

            item.color === selectedProductColor

        );


    if (existingItem) {

        existingItem.quantity += quantity;

    }

    else {

        cart.push({

            cartId:
                Date.now().toString() +
                Math.random().toString(36).slice(2),

            productId:
                currentProduct.id,

            name:
                currentProduct.name,

            price:
                currentProduct.price,

            image:
                currentProduct.images[0],

            category:
                currentProduct.category,

            color:
                selectedProductColor,

            size:
                selectedProductSize,

            quantity:
                quantity

        });

    }


    saveCart();

    updateCartCount();

    renderCart();


    addToCart.classList.add("added");

    addToCart.innerHTML = `
        <span>ADDED TO CART</span>
        <span>✓</span>
    `;


    setTimeout(() => {

        addToCart.classList.remove("added");

        addToCart.innerHTML = `
            <span>ADD TO CART</span>
            <span>+</span>
        `;

    }, 1800);

}


/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {

    cartContent.innerHTML = "";


    if (!cart.length) {

        cartContent.innerHTML = `

            <div class="cart-empty">

                <div class="cart-empty-icon">
                    ♡
                </div>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add something beautiful to your
                    cart and it will appear here.
                </p>

            </div>

        `;


        cartTotal.textContent =
            formatPrice(0);

        cartCheckout.disabled = true;

        return;

    }


    cartCheckout.disabled = false;


    cart.forEach(item => {

        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-image">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

            </div>


            <div class="cart-item-details">

                <div class="cart-item-category">
                    ${item.category.toUpperCase()}
                </div>

                <div class="cart-item-name">
                    ${item.name}
                </div>

                <div class="cart-item-price">
                    ${formatPrice(item.price)}
                </div>

                <div class="cart-item-options">

                    ${
                        item.color
                        ? `Color: ${item.color}`
                        : ""
                    }

                    ${
                        item.size
                        ? `<br>Size: ${item.size}`
                        : ""
                    }

                </div>


                <div class="cart-item-bottom">

                    <div class="cart-quantity">

                        <button
                            class="cart-decrease"
                            data-cart-id="${item.cartId}"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            class="cart-increase"
                            data-cart-id="${item.cartId}"
                        >
                            +
                        </button>

                    </div>


                    <button
                        class="cart-remove"
                        data-cart-id="${item.cartId}"
                    >
                        Remove
                    </button>

                </div>

            </div>

        `;


        cartContent.appendChild(cartItem);

    });


    cartTotal.textContent =
        formatPrice(getCartTotal());


    attachCartItemEvents();

}


/* =========================================================
   CART ITEM EVENTS
========================================================= */

function attachCartItemEvents() {

    document
        .querySelectorAll(".cart-increase")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const item =
                        cart.find(
                            item =>
                                item.cartId ===
                                button.dataset.cartId
                        );


                    if (!item) return;


                    item.quantity++;


                    saveCart();

                    updateCartCount();

                    renderCart();

                }
            );

        });


    document
        .querySelectorAll(".cart-decrease")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const item =
                        cart.find(
                            item =>
                                item.cartId ===
                                button.dataset.cartId
                        );


                    if (!item) return;


                    if (item.quantity > 1) {

                        item.quantity--;

                    }

                    else {

                        cart =
                            cart.filter(
                                cartItem =>
                                    cartItem.cartId !==
                                    item.cartId
                            );

                    }


                    saveCart();

                    updateCartCount();

                    renderCart();

                }
            );

        });


    document
        .querySelectorAll(".cart-remove")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    cart =
                        cart.filter(
                            item =>
                                item.cartId !==
                                button.dataset.cartId
                        );


                    saveCart();

                    updateCartCount();

                    renderCart();

                }
            );

        });

}


/* =========================================================
   OPEN CART
========================================================= */

function openCart() {

    renderCart();

    cartDrawer.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* =========================================================
   CLOSE CART
========================================================= */

function closeCart() {

    cartDrawer.classList.remove("active");

    document.body.style.overflow = "";

}


bagButton.addEventListener(
    "click",
    openCart
);


cartClose.addEventListener(
    "click",
    closeCart
);


cartOverlay.addEventListener(
    "click",
    closeCart
);


/* =========================================================
   ADD TO CART BUTTON
========================================================= */

addToCart.addEventListener(
    "click",
    addCurrentProductToCart
);


/* =========================================================
   WHATSAPP CART CHECKOUT
========================================================= */

cartCheckout.addEventListener(
    "click",
    () => {

        if (!cart.length) return;


        let message =
            "Hello Keji's Luke! 👋\n\n";

        message +=
            "I would like to order the following items:\n\n";


        cart.forEach((item, index) => {

            message +=
                `${index + 1}. ${item.name}\n`;

            message +=
                `Quantity: ${item.quantity}\n`;

            message +=
                `Price: ${formatPrice(item.price)}\n`;


            if (item.color) {

                message +=
                    `Color: ${item.color}\n`;

            }


            if (item.size) {

                message +=
                    `Size: ${item.size}\n`;

            }


            message += "\n";

        });


        message +=
            `TOTAL: ${formatPrice(getCartTotal())}\n\n`;


        message +=
            "Please let me know how to proceed with my order.";


        const whatsappURL =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


        window.open(
            whatsappURL,
            "_blank"
        );


        /*
         * Clear cart after sending checkout.
         */

        cart = [];

        saveCart();

        updateCartCount();

        renderCart();

        closeCart();

    }
);


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts(list = products) {

    productsGrid.innerHTML = "";

    productCount.textContent =
        `${list.length} ${list.length === 1 ? "piece" : "pieces"}`;


    list.forEach(product => {

        const card =
            document.createElement("article");

        card.className = "product-card";


        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.images[0]}"
                    alt="${product.name}"
                    loading="lazy"
                >

                ${
                    product.badge
                    ?
                    `<span class="product-badge">
                        ${product.badge}
                    </span>`
                    :
                    ""
                }

                <button
                    class="product-favorite"
                    aria-label="Save product"
                >
                    ♡
                </button>

            </div>


            <div class="product-info">

                <span class="product-category">
                    ${product.category.toUpperCase()}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <div class="product-price">
                    ${formatPrice(product.price)}
                </div>

                <div class="product-meta">
                    ${
                        product.colors.length
                        ?
                        `${product.colors.length} colors`
                        :
                        ""
                    }

                    ${
                        product.sizes.length
                        ?
                        ` • Sizes ${product.sizes[0]}-${product.sizes[product.sizes.length - 1]}`
                        :
                        ""
                    }
                </div>

            </div>

        `;


        card.addEventListener("click", () => {

            openProduct(product.id);

        });


        productsGrid.appendChild(card);

    });

}


/* =========================================================
   FILTER PRODUCTS
========================================================= */

function filterProducts(category) {

    currentCategory = category;


    if (category === "All") {

        renderProducts(products);

        productHeading.textContent = "All pieces";

    }

    else {

        const filtered =
            products.filter(
                product => product.category === category
            );


        renderProducts(filtered);

        productHeading.textContent =
            category;

    }


    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================================
   CATEGORY BUTTONS
========================================================= */

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        filterProducts(
            button.dataset.category
        );

    });

});


/* =========================================================
   OPEN PRODUCT
========================================================= */

function openProduct(productId) {

    const product =
        products.find(
            item => item.id === productId
        );


    if (!product) return;


    currentProduct = product;

    currentImageIndex = 0;

    quantity = 1;

    selectedProductColor = null;

    selectedProductSize = null;


    quantityDisplay.textContent =
        quantity;


    modalProductName.textContent =
        product.name;

    modalPrice.textContent =
        formatPrice(product.price);

    modalCategory.textContent =
        product.category.toUpperCase();

    modalDescription.textContent =
        product.description;


    renderGallery();

    renderColors();

    renderSizes();

    renderRelatedProducts(product.id);


    productModal.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* =========================================================
   GALLERY
========================================================= */

function renderGallery() {

    const images =
        currentProduct.images;


    mainProductImage.src =
        images[currentImageIndex];

    mainProductImage.alt =
        currentProduct.name;


    galleryCounter.textContent =
        `${currentImageIndex + 1} / ${images.length}`;


    thumbnailRow.innerHTML = "";


    images.forEach((image, index) => {

        const thumbnail =
            document.createElement("div");


        thumbnail.className =
            "thumbnail";


        if (index === currentImageIndex) {

            thumbnail.classList.add("active");

        }


        thumbnail.innerHTML = `

            <img
                src="${image}"
                alt="${currentProduct.name}"
            >

        `;


        thumbnail.addEventListener("click", () => {

            currentImageIndex = index;

            renderGallery();

        });


        thumbnailRow.appendChild(thumbnail);

    });

}


/* =========================================================
   NEXT IMAGE
========================================================= */

document
    .getElementById("galleryNext")
    .addEventListener("click", () => {

        if (!currentProduct) return;


        currentImageIndex++;

        if (
            currentImageIndex >=
            currentProduct.images.length
        ) {

            currentImageIndex = 0;

        }


        renderGallery();

    });


/* =========================================================
   PREVIOUS IMAGE
========================================================= */

document
    .getElementById("galleryPrev")
    .addEventListener("click", () => {

        if (!currentProduct) return;


        currentImageIndex--;

        if (currentImageIndex < 0) {

            currentImageIndex =
                currentProduct.images.length - 1;

        }


        renderGallery();

    });


/* =========================================================
   COLORS
========================================================= */

function renderColors() {

    colorOptions.innerHTML = "";

    selectedColor.textContent =
        "Select color";


    if (!currentProduct.colors.length) {

        colorSection.style.display = "none";

        return;

    }


    colorSection.style.display = "block";


    currentProduct.colors.forEach(color => {

        const button =
            document.createElement("button");


        button.className =
            "color-option";


        button.textContent =
            color;


        button.addEventListener("click", () => {

            document
                .querySelectorAll(".color-option")
                .forEach(option =>
                    option.classList.remove("active")
                );


            button.classList.add("active");

            selectedProductColor =
                color;

            selectedColor.textContent =
                color;

        });


        colorOptions.appendChild(button);

    });

}


/* =========================================================
   SIZES
========================================================= */

function renderSizes() {

    sizeOptions.innerHTML = "";

    selectedSize.textContent =
        "Select size";


    if (!currentProduct.sizes.length) {

        sizeSection.style.display = "none";

        return;

    }


    sizeSection.style.display = "block";


    currentProduct.sizes.forEach(size => {

        const button =
            document.createElement("button");


        button.className =
            "size-option";


        button.textContent =
            size;


        button.addEventListener("click", () => {

            document
                .querySelectorAll(".size-option")
                .forEach(option =>
                    option.classList.remove("active")
                );


            button.classList.add("active");

            selectedProductSize =
                size;

            selectedSize.textContent =
                `Size ${size}`;

        });


        sizeOptions.appendChild(button);

    });

}


/* =========================================================
   RELATED PRODUCTS
========================================================= */

function renderRelatedProducts(productId) {

    relatedProductsContainer.innerHTML = "";


    const ids =
        relatedProducts[productId] || [];


    ids.forEach(id => {

        const product =
            products.find(
                item => item.id === id
            );


        if (!product) return;


        const card =
            document.createElement("article");


        card.className =
            "related-card";


        card.innerHTML = `

            <div class="related-card-image">

                <img
                    src="${product.images[0]}"
                    alt="${product.name}"
                    loading="lazy"
                >

            </div>

            <h4>
                ${product.name}
            </h4>

            <p>
                ${formatPrice(product.price)}
            </p>

        `;


        card.addEventListener("click", () => {

            openProduct(product.id);

            productModal
                .querySelector(".product-modal-content")
                .scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

        });


        relatedProductsContainer.appendChild(card);

    });

}


/* =========================================================
   CLOSE PRODUCT
========================================================= */

function closeProduct() {

    productModal.classList.remove("active");

    document.body.style.overflow = "";

}


modalClose.addEventListener(
    "click",
    closeProduct
);


modalOverlay.addEventListener(
    "click",
    closeProduct
);


/* =========================================================
   QUANTITY
========================================================= */

increaseQty.addEventListener("click", () => {

    quantity++;

    quantityDisplay.textContent =
        quantity;

});


decreaseQty.addEventListener("click", () => {

    if (quantity > 1) {

        quantity--;

    }


    quantityDisplay.textContent =
        quantity;

});


/* =========================================================
   WHATSAPP ORDER
========================================================= */

whatsappOrder.addEventListener("click", () => {

    if (!currentProduct) return;


    if (
        currentProduct.sizes.length &&
        !selectedProductSize
    ) {

        alert("Please select a size.");

        return;

    }


    if (
        currentProduct.colors.length &&
        !selectedProductColor
    ) {

        alert("Please select a color.");

        return;

    }


    const total =
        currentProduct.price * quantity;


    let message =
        `Hello Keji's Luke! 👋%0A%0A`;


    message +=
        `I would like to order:%0A%0A`;


    message +=
        `Product: ${currentProduct.name}%0A`;


    message +=
        `Price: ${formatPrice(currentProduct.price)}%0A`;


    if (selectedProductColor) {

        message +=
            `Color: ${selectedProductColor}%0A`;

    }


    if (selectedProductSize) {

        message +=
            `Size: ${selectedProductSize}%0A`;

    }


    message +=
        `Quantity: ${quantity}%0A`;


    message +=
        `Total: ${formatPrice(total)}%0A%0A`;


    message +=
        `Please let me know how to proceed with my order.`;


    window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
        "_blank"
    );

});


/* =========================================================
   SEARCH
========================================================= */

const searchToggle =
    document.getElementById("searchToggle");

const searchContainer =
    document.getElementById("searchContainer");

const closeSearch =
    document.getElementById("closeSearch");


searchToggle.addEventListener("click", () => {

    searchContainer.classList.toggle("active");

    if (searchContainer.classList.contains("active")) {

        searchInput.focus();

    }

});


closeSearch.addEventListener("click", () => {

    searchContainer.classList.remove("active");

    searchInput.value = "";

    renderProducts(
        currentCategory === "All"
        ?
        products
        :
        products.filter(
            product =>
                product.category === currentCategory
        )
    );

});


searchInput.addEventListener("input", () => {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    if (!search) {

        const resetProducts =
            currentCategory === "All"
            ?
            products
            :
            products.filter(
                product =>
                    product.category === currentCategory
            );


        renderProducts(resetProducts);

        productHeading.textContent =
            currentCategory === "All"
            ?
            "All pieces"
            :
            currentCategory;

        return;

    }


    const results =
        products.filter(product =>

            product.name
                .toLowerCase()
                .includes(search)

            ||

            product.category
                .toLowerCase()
                .includes(search)

            ||

            product.colors.some(color =>
                color.toLowerCase().includes(search)
            )

        );


    renderProducts(results);

    productHeading.textContent =
        `Results for "${search}"`;

});

/* =========================================================
   DIRECT SEARCH OPEN
========================================================= */

searchInput.addEventListener("keydown", event => {

    if (event.key !== "Enter") return;


    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    if (!search) return;


    const exactMatch =
        products.find(
            product =>
                product.name
                    .toLowerCase() === search
        );


    if (exactMatch) {

        searchContainer.classList.remove("active");

        openProduct(exactMatch.id);

        return;

    }


    const matches =
        products.filter(product =>

            product.name
                .toLowerCase()
                .includes(search)

            ||

            product.category
                .toLowerCase()
                .includes(search)

            ||

            product.colors.some(color =>
                color.toLowerCase().includes(search)
            )

        );


    if (matches.length === 1) {

        searchContainer.classList.remove("active");

        openProduct(matches[0].id);

    }

});


/* =========================================================
   SIDE MENU
========================================================= */

const menuBtn =
    document.getElementById("menuBtn");

const sideMenu =
    document.getElementById("sideMenu");

const menuOverlay =
    document.getElementById("menuOverlay");

const closeMenu =
    document.getElementById("closeMenu");


function openMenu() {

    sideMenu.classList.add("active");

    menuOverlay.classList.add("active");

    document.body.style.overflow = "hidden";

}


function closeSideMenu() {

    sideMenu.classList.remove("active");

    menuOverlay.classList.remove("active");

    document.body.style.overflow = "";

}


menuBtn.addEventListener(
    "click",
    openMenu
);


closeMenu.addEventListener(
    "click",
    closeSideMenu
);


menuOverlay.addEventListener(
    "click",
    closeSideMenu
);


document
    .querySelectorAll(".menu-link")
    .forEach(link => {

        link.addEventListener("click", () => {

            const category =
                link.dataset.categoryLink;


            if (category) {

                categoryButtons.forEach(button => {

                    button.classList.toggle(
                        "active",
                        button.dataset.category === category
                    );

                });


                filterProducts(category);

            }


            closeSideMenu();

        });

    });


/* =========================================================
   INTRO
========================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        document
            .getElementById("introScreen")
            .classList.add("hide");

    }, 2500);

});


/* =========================================================
   INITIAL RENDER
========================================================= */

renderProducts(products);

updateCartCount();

renderCart();