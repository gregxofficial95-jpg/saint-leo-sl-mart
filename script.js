let selectedItems = [];

function toggleItem(el, name, price) {

  let selectedIndex = selectedItems.findIndex(
    item => item.element === el
  );

  if (selectedIndex > -1) {

    selectedItems.splice(selectedIndex, 1);
    el.classList.remove("selected");

  } else {

    selectedItems.push({
      element: el,
      name: name,
      price: price
    });

    el.classList.add("selected");

  }

  let proceedBtn = document.getElementById("proceedBtn");

  if (selectedItems.length > 0) {
    proceedBtn.style.display = "block";
  } else {
    proceedBtn.style.display = "none";
  }

}

function toggleCategory(btn) {
  let hidden = btn.nextElementSibling;
  hidden.style.display = hidden.style.display === "grid" ? "none" : "grid";
}

function openFAQ() {
  window.location.href = "faq.html";
}

function contactUs() {
  window.open("https://wa.me/2349125366748?text=Hello%20I%20need%20help");
}

function toggleMenu() {
  let menu = document.getElementById("sidebar");
  let overlay = document.getElementById("overlay");

  menu.classList.toggle("active");

  if (menu.classList.contains("active")) {
    overlay.style.display = "block";
  } else {
    overlay.style.display = "none";
  }
}

function closeMenu() {
  let menu = document.getElementById("sidebar");
  let overlay = document.getElementById("overlay");

  menu.classList.remove("active");
  overlay.style.display = "none";
}

window.onpopstate = function () {

  closeMenu();

  document.getElementById("formBox").style.display = "none";

  document.getElementById("orderConfirmation").style.display = "none";

};

function scrollToSection(id) {

  const section = document.getElementById(id);

  if (!section) return;

  if (id === "food") {
    section.style.display = "block";
  }

  section.scrollIntoView({
    behavior: "smooth"
  });

}

function openForm() {

  if (selectedItems.length === 0) {
    alert("Please select at least one item");
    return;
  }

  let total = 0;
  let text = "<h4>Order Summary</h4>";

  selectedItems.forEach(item => {

    total += item.price;

    text +=
      `<p>${item.name} - ₦${item.price}</p>`;

  });

  let deliveryFee = 2500;
  let serviceFee = 250;

  let finalTotal =
    total + deliveryFee + serviceFee;

  text +=
    `<p>Delivery Fee - ₦${deliveryFee}</p>`;

  text +=
    `<p>Service Fee - ₦${serviceFee}</p>`;

  text +=
    `<b>Total: ₦${finalTotal}</b>`;

  document.getElementById("summary").innerHTML = text;

  document.getElementById("totalPrice").innerText =
    finalTotal;

  document.getElementById("formBox").style.display =
    "block";

  document.getElementById("formBox").scrollIntoView({
    behavior: "smooth"
  });

  document.getElementById("proceedBtn").style.display =
    "none";

}


window.onload = function () {

  window.scrollTo(0, 0);

  document.getElementById("formBox").style.display = "none";

  document.getElementById("orderConfirmation").style.display = "none";

};


async function submitOrder(event) {

  event.preventDefault();

  let name = document.getElementById("name").value.trim();
  let hostel = document.getElementById("hostel").value.trim();
  let dept = document.getElementById("dept").value.trim();

  if (!name || !hostel || !dept) {
    alert("Please fill in all details");
    return;
  }

  if (selectedItems.length === 0) {
    alert("Please select at least one item");
    return;
  }


  let total = 0;

  let orderText = "";

  selectedItems.forEach(item => {

    total += item.price;

    orderText +=
      "- " + item.name +
      " — ₦" + item.price +
      "\n";

  });



let deliveryFee = 2500;
let serviceFee = 250;

let finalTotal = total + deliveryFee + serviceFee;


orderText +=
  "\nDelivery Fee — ₦" +
  deliveryFee;

orderText +=
  "\nService Fee — ₦" +
  serviceFee;

orderText +=
  "\n\nTOTAL — ₦" +
  finalTotal;


  document.getElementById("orderDetails").value =
    orderText;


  let form = document.getElementById("orderForm");

  let formData = new FormData(form);

  let submitButton =
    form.querySelector("button[type='submit']");

  submitButton.disabled = true;
  submitButton.innerText = "Submitting Order...";


  try {

    let response = await fetch(
      "https://api.web3forms.com/submit",
      {
        method: "POST",
        body: formData
      }
    );

    let result = await response.json();


    if (result.success) {

  form.reset();

  selectedItems = [];

  document.querySelectorAll(".item.selected")
    .forEach(item => {
      item.classList.remove("selected");
    });

  document.getElementById("formBox").style.display = "none";

  document.getElementById("orderConfirmation").style.display = "block";

  document.getElementById("orderConfirmation").scrollIntoView({
    behavior: "smooth"
  });

}
 else {

      alert(
        result.message ||
        "Something went wrong. Please try again."
      );

    }

  } catch (error) {

    console.error(error);

    alert(
      "Unable to submit your order. Please check your connection and try again."
    );

  } finally {

    submitButton.disabled = false;
    submitButton.innerText = "Place Order";

  }

}

document.getElementById("orderForm").addEventListener(
  "submit",
  submitOrder
);

const categoryMap = {
  vegetables: ["vegetables", "vegetable-fruits", "tubers"],

  groceries: [
    "cereals",
    "flour",
    "condiments",
    "pasta",
    "seasonings"
  ],

  beverages: ["beverages", "drinks"],

  snacks: ["snacks"],

  meat: ["meat"],

  fish: ["fish"],

  toiletries: ["toiletries"],

  pasta: ["pasta"],

  grains: ["grains", "legumes"],

  oils: ["oils"],

  dairy: ["dairy"],

  seasonings: ["seasonings"]
};


function openCategory(category) {

  let categoryView = document.getElementById("categoryView");
  let categoryTitle = document.getElementById("categoryViewTitle");
  let categoryDescription = document.getElementById("categoryViewDescription");
  let categoryProducts = document.getElementById("categoryViewProducts");

  let categories = categoryMap[category];

  if (!categories) {
    alert("This category is not available yet.");
    return;
  }

  let categoryCard = document.querySelector(
    `.category-card[onclick="openCategory('${category}')"]`
  );

  if (categoryCard) {
    categoryTitle.innerText =
      categoryCard.querySelector("h3").innerText;
  }

  categoryDescription.innerText =
    "Browse everything available in this category.";

  categoryProducts.innerHTML = "";

  categories.forEach(categoryName => {

    // Get the normal visible products
    let mainProducts = document.querySelector(
      `.category-products[data-category="${categoryName}"]`
    );

    if (mainProducts) {

      let items = mainProducts.querySelectorAll(".item");

     items.forEach(item => {

  let clone = item.cloneNode(true);

  clone.dataset.originalProduct =
    item.querySelector("p")?.innerText.trim();

  categoryProducts.appendChild(clone);

});
    }

    // Get the products underneath "See All"
    let heading = document.querySelector(
      `.product-category[data-category="${categoryName}"]`
    );

    if (heading) {

      let hiddenProducts = heading.nextElementSibling
        ?.nextElementSibling
        ?.nextElementSibling;

      if (hiddenProducts && hiddenProducts.classList.contains("hidden-items")) {

        let hiddenItems = hiddenProducts.querySelectorAll(".item");

     hiddenItems.forEach(item => {

  let clone = item.cloneNode(true);

  clone.dataset.originalProduct =
    item.querySelector("p")?.innerText.trim();

  categoryProducts.appendChild(clone);

});
      }

    }

  });

  document.getElementById("categories").style.display = "none";

  categoryView.style.display = "block";

  categoryView.scrollIntoView({
    behavior: "smooth"
  });

}

function openFullCatalogue() {
  const foodSection = document.getElementById("food");

  foodSection.style.display = "block";

  foodSection.scrollIntoView({
    behavior: "smooth"
  });
}

function closeCategoryView() {

  const categoryView =
    document.getElementById("categoryView");

  const categories =
    document.getElementById("categories");

  if (!categoryView || !categories) return;

  /* Hide the category products view */
  categoryView.style.display = "none";

  /* Show the Shop by Category section */
  categories.style.display = "block";

  /*
    Wait one frame before scrolling.
    This makes sure the category section
    has returned to the page layout first.
  */
  requestAnimationFrame(() => {

    categories.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

}

/* =========================================
   SAINT LEO'S MART SEARCH
   PRODUCTS + PARTNER BRANDS
========================================= */


/* =========================================
   PARTNER BRAND SEARCH INDEX
========================================= */

const partnerBrands = [
  {
    name: "Estees Nail Haven",
    keywords: [
      "estees",
      "estees nail",
      "estees nail haven"
    ],
    url: "brands.html#estees-nail-haven"
  },

  {
    name: "B Accessories and Wears",
    keywords: [
      "b accessories",
      "b accessories and wears",
      "accessories and wears"
    ],
    url: "brands.html#b-accessories-and-wears"
  },

  {
    name: "Igbafe Bakes and Frames",
    keywords: [
      "igbafe",
      "igbafe bakes",
      "igbafe bakes and frames"
    ],
    url: "brands.html#igbafe-bakes-and-frames"
  },

  {
    name: "Mimo's Collection",
    keywords: [
      "mimo",
      "mimos",
      "mimo's collection"
    ],
    url: "brands.html#mimos-collection"
  },

  {
    name: "Liyya's Apparel",
    keywords: [
      "liyya",
      "liyyas",
      "liyyas apparel",
      "liyya's apparel"
    ],
    url: "brands.html#liyyas-apparel"
  },

  {
    name: "Oriflame",
    keywords: [
      "oriflame"
    ],
    url: "brands.html#oriflame"
  },

  {
    name: "NTB Clothing Enterprise",
    keywords: [
      "ntb",
      "ntb clothing",
      "ntb clothing enterprise"
    ],
    url: "brands.html#ntb-clothing-enterprise"
  },

  {
    name: "Leeyah's Collection",
    keywords: [
      "leeyah",
      "leeyahs",
      "leeyah's collection"
    ],
    url: "brands.html#leeyahs-collection"
  },

  {
    name: "Zandex Atelier",
    keywords: [
      "zandex",
      "zandex atelier"
    ],
    url: "brands.html#zandex-atelier"
  },

  {
    name: "Keji's Luke",
    keywords: [
      "keji",
      "kejis",
      "keji's luke",
      "keji luke"
    ],
    url: "brands.html#kejis-luke"
  },

  {
    name: "Preshie Brand",
    keywords: [
      "preshie",
      "preshie brand"
    ],
    url: "brands.html#preshie-brand"
  },

  {
    name: "Ruco Treats",
    keywords: [
      "ruco",
      "ruco treats"
    ],
    url: "brands.html#ruco-treats"
  },

  {
    name: "RH Emporium",
    keywords: [
      "rh",
      "rh emporium"
    ],
    url: "brands.html#rh-emporium"
  }
];


/* =========================================
   NORMALIZE SEARCH TEXT
========================================= */

function normalizeSearchText(text) {

  return text
    .toLowerCase()
    .replace(/[’']/g, "")
    .trim();

}


/* =========================================
   FIND BRAND
========================================= */

function findPartnerBrand(searchTerm) {

  const normalizedSearch =
    normalizeSearchText(searchTerm);

  return partnerBrands.find(brand => {

    return brand.keywords.some(keyword => {

      const normalizedKeyword =
        normalizeSearchText(keyword);

      return (
        normalizedKeyword.includes(normalizedSearch) ||
        normalizedSearch.includes(normalizedKeyword)
      );

    });

  });

}


/* =========================================
   SEARCH PRODUCTS
========================================= */

function findProduct(searchTerm) {

  const normalizedSearch =
    normalizeSearchText(searchTerm);

  const allItems =
    document.querySelectorAll("#food .item");

  let targetProduct = null;

  allItems.forEach(item => {

    if (targetProduct) return;

    const productName =
      item.querySelector("p");

    if (!productName) return;

    const name =
      normalizeSearchText(productName.innerText);

    if (name.includes(normalizedSearch)) {

      targetProduct = item;

    }

  });

  return targetProduct;

}


/* =========================================
   SEARCH RESULT COUNT
========================================= */

function updateSearchResults(searchTerm) {

  const normalizedSearch =
    normalizeSearchText(searchTerm);

  const resultBoxes = [
    document.getElementById("heroSearchResultCount"),
    document.getElementById("shopSearchResultCount")
  ];

  if (!normalizedSearch) {

    resultBoxes.forEach(box => {

      if (box) {
        box.innerText = "";
      }

    });

    return;

  }


  const allItems =
    document.querySelectorAll("#food .item");

  let productCount = 0;


  allItems.forEach(item => {

    const productName =
      item.querySelector("p");

    if (!productName) return;

    const name =
      normalizeSearchText(productName.innerText);

    if (name.includes(normalizedSearch)) {

      productCount++;

    }

  });


  const brandMatches =
    partnerBrands.filter(brand => {

      return brand.keywords.some(keyword => {

        const normalizedKeyword =
          normalizeSearchText(keyword);

        return (
          normalizedKeyword.includes(normalizedSearch) ||
          normalizedSearch.includes(normalizedKeyword)
        );

      });

    });


  let message =
    productCount +
    (productCount === 1
      ? " product"
      : " products");


  message +=
    " found • " +
    brandMatches.length +
    (brandMatches.length === 1
      ? " brand"
      : " brands") +
    " found";


  resultBoxes.forEach(box => {

    if (box) {
      box.innerText = message;
    }

  });

}


/* =========================================
   LIVE SEARCH
========================================= */

function handleSearchInput(event) {

  updateSearchResults(event.target.value);

}


/* =========================================
   CONNECT BOTH SEARCH BOXES
========================================= */

const heroProductSearch =
  document.getElementById("heroProductSearch");

const shopProductSearch =
  document.getElementById("shopProductSearch");


if (heroProductSearch) {

  heroProductSearch.addEventListener(
    "input",
    handleSearchInput
  );

}


if (shopProductSearch) {

  shopProductSearch.addEventListener(
    "input",
    handleSearchInput
  );

}


/* =========================================
   ENTER SEARCH
========================================= */

function handleProductSearchEnter(event) {

  if (event.key !== "Enter") return;

  event.preventDefault();


  const searchTerm =
    event.target.value.trim();


  if (!searchTerm) return;


  /* =========================
     FIRST: CHECK BRAND
  ========================= */

  const targetBrand =
    findPartnerBrand(searchTerm);


  if (targetBrand) {

    /*
      Send the user to the
      partner brand directory.
    */

    window.location.href =
      targetBrand.url;

    return;

  }


  /* =========================
     SECOND: CHECK PRODUCT
  ========================= */

  const targetProduct =
    findProduct(searchTerm);


  if (!targetProduct) {

    alert(
      "No product or brand found. Please try another search."
    );

    return;

  }


  /* =========================
     OPEN SHOP
  ========================= */

  const foodSection =
    document.getElementById("food");

  if (foodSection) {

    foodSection.style.display = "block";

  }


  /* =========================
     CLOSE CATEGORY VIEW
  ========================= */

  const categoryView =
    document.getElementById("categoryView");

  if (categoryView) {

    categoryView.style.display = "none";

  }


  /* =========================
     OPEN HIDDEN SECTION
  ========================= */

  const hiddenSection =
    targetProduct.closest(".hidden-items");

  if (hiddenSection) {

    hiddenSection.style.display = "grid";

  }


  /* =========================
     SCROLL TO PRODUCT
  ========================= */

  setTimeout(() => {

    targetProduct.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });


    targetProduct.style.outline =
      "3px solid var(--gold)";

    targetProduct.style.outlineOffset =
      "5px";


    setTimeout(() => {

      targetProduct.style.outline = "";
      targetProduct.style.outlineOffset = "";

    }, 2500);

  }, 100);

}

function scrollToProduct(productName) {

  document.getElementById("food").style.display = "block";

  let allProducts = document.querySelectorAll("#food .item");

  let targetProduct = null;

  allProducts.forEach(item => {

    let name = item.querySelector("p");

    if (!name) return;

    if (
      name.innerText.trim().toLowerCase() ===
      productName.trim().toLowerCase()
    ) {
      targetProduct = item;
    }

  });

  if (!targetProduct) {
    alert(productName + " is not available yet.");
    return;
  }

  // If the product is inside a hidden "See All" section,
  // open that section first.
  let hiddenSection = targetProduct.closest(".hidden-items");

  if (hiddenSection) {
    hiddenSection.style.display = "grid";
  }

  // Close the category view if it is open
  document.getElementById("categoryView").style.display = "none";

  document.getElementById("categories").style.display = "block";

  // Go to the product
  targetProduct.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

  // Highlight the product briefly
  targetProduct.style.outline = "2px solid var(--gold)";

  setTimeout(() => {
    targetProduct.style.outline = "";
  }, 2000);

}

function requestMysteryBasket() {

  let message =
    "Hello Saint Leo's Mart 👋\n\n" +
    "I want to order the ₦25,000 Mystery Provision Basket.\n\n" +
    "Please let me know the next steps.";

  let url =
    "https://wa.me/2349125366748?text=" +
    encodeURIComponent(message);

  window.open(url, "_blank");

}

