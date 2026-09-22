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

  document.getElementById("categoryView").style.display = "none";

  document.getElementById("categories").style.display = "block";

  document.getElementById("categories").scrollIntoView({
    behavior: "smooth"
  });

}

const productSearch = document.getElementById("productSearch");
const searchResultCount = document.getElementById("searchResultCount");

productSearch.addEventListener("input", function () {

  let searchTerm = this.value.toLowerCase().trim();

  let allItems = document.querySelectorAll("#food .item");

  let resultCount = 0;

  allItems.forEach(item => {

    let productName = item.querySelector("p");

    if (!productName) return;

    let name = productName.innerText.toLowerCase();

    if (searchTerm === "" || name.includes(searchTerm)) {

      item.style.display = "";

      resultCount++;

    } else {

      item.style.display = "none";

    }

  });

  // Show hidden product sections while searching
  let hiddenSections = document.querySelectorAll(
    "#food .hidden-items"
  );

  hiddenSections.forEach(section => {

    if (searchTerm === "") {

      section.style.display = "";

    } else {

      let matchingItems = section.querySelectorAll(
        '.item:not([style*="display: none"])'
      );

      if (matchingItems.length > 0) {
        section.style.display = "grid";
      } else {
        section.style.display = "none";
      }

    }

  });

  if (searchTerm === "") {

    searchResultCount.innerText = "";

  } else {

    searchResultCount.innerText =
      resultCount +
      (resultCount === 1
        ? " product found"
        : " products found");

  }

});

function handleProductSearchEnter(event) {
  if (event.key !== "Enter") return;

  event.preventDefault();

  const searchTerm = event.target.value.trim().toLowerCase();

  if (!searchTerm) return;

  const foodSection = document.getElementById("food");

  // Reveal the full catalogue first
  foodSection.style.display = "block";

  const allItems = document.querySelectorAll("#food .item");

  let targetProduct = null;

  allItems.forEach(item => {
    if (targetProduct) return;

    const productName = item.querySelector("p");

    if (!productName) return;

    const name = productName.innerText.trim().toLowerCase();

    if (name.includes(searchTerm)) {
      targetProduct = item;
    }
  });

  if (!targetProduct) {
    alert("Product not found. Please try another search.");
    return;
  }

  // Open the hidden product section if necessary
  const hiddenSection = targetProduct.closest(".hidden-items");

  if (hiddenSection) {
    hiddenSection.style.display = "grid";
  }

  // Close category view if it is open
  const categoryView = document.getElementById("categoryView");

  if (categoryView) {
    categoryView.style.display = "none";
  }

  // Scroll directly to the product
  setTimeout(() => {
    targetProduct.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    targetProduct.style.outline = "3px solid var(--gold)";

    setTimeout(() => {
      targetProduct.style.outline = "";
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
