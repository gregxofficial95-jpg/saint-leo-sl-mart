let selectedItems = [];

function toggleItem(el, name, price) {
  el.classList.toggle("selected");

  let index = selectedItems.findIndex(i => i.name === name);

  if (index > -1) {
    selectedItems.splice(index, 1); // remove
  } else {
    selectedItems.push({name, price}); // add
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
  window.open("https://wa.me/2349031576717?text=Hello%20I%20need%20help");
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

  // CLOSE FORM TOO
  document.getElementById("formBox").style.display = "none";
};

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({behavior:"smooth"});
}

function checkStoreStatus() {
  let now = new Date();

  // Get Nigerian time
  let nigeriaTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Africa/Lagos" })
  );

  let hour = nigeriaTime.getHours();

  if (hour >= 19 || hour < 6) {
    return "closed";
  } else {
    return "open";
  }
}

function openForm() {

  let status = checkStoreStatus();

  if (status === "closed") {
    alert("🚫 We are currently CLOSED.\n\nOrders open from 6AM to 7PM.");
    return;
  }

  if (selectedItems.length === 0) {
    alert("Please select at least one item");
    return;
  }

  // SHOW FORM
  document.getElementById("formBox").style.display = "block";

  history.pushState({ formOpen: true }, "");

  // CALCULATE TOTAL
  let total = 0;
  let text = "<h4>Order Summary</h4>";

  selectedItems.forEach(item => {
    total += item.price;
    text += `<p>${item.name} - ₦${item.price}</p>`;
  });

  text += `<p>Delivery - ₦1000</p>`;
  text += `<b>Total: ₦${total + 1000}</b>`;

  document.getElementById("summary").innerHTML = text;

  // Update total display
  document.getElementById("totalPrice").innerText = total + 1000;
}

window.onload = function () {
  let btn = document.querySelector(".order-btn");

  if (checkStoreStatus() === "closed") {
    btn.innerText = "Closed (Opens 6AM)";
    btn.style.background = "gray";

    // DO NOT remove onclick — we still want alert
    btn.style.cursor = "not-allowed";
  }
  document.getElementById("formBox").scrollIntoView({ behavior: "smooth" });
};

if (checkStoreStatus() === "closed") {
  let banner = document.createElement("div");
  banner.innerText = "🚫 We are currently closed. Opens 6AM.";
  
  banner.style.background = "red";
  banner.style.color = "white";
  banner.style.textAlign = "center";
  banner.style.padding = "10px";

  document.body.prepend(banner);
}

  document.getElementById("formBox").style.display = "block";

  let total = 0;
  let text = "<h4>Order Summary</h4>";

  selectedItems.forEach(item => {
    total += item.price;
    text += `<p>${item.name} - ₦${item.price}</p>`;
  });

  text += `<p>Delivery - ₦1000</p>`;
  text += `<b>Total: ₦${total + 1000}</b>`;

  document.getElementById("summary").innerHTML = text;


document.getElementById("totalPrice").innerText = total;

function sendOrder() {

  alert("⚠️ Please pay the exact total amount to the account above and take a screenshot of your payment.\n You will be required to send it on WhatsApp after placing your order. Orders without proof of payment will not be processed.");

  let name = document.getElementById("name").value;
  let hostel = document.getElementById("hostel").value;
  let dept = document.getElementById("dept").value;

  let total = 1000;
  let message = `Hi Saint Leo's Mart 👋%0AName: ${name}%0AHostel: ${hostel}%0ADept: ${dept}%0AOrder:%0A`;

  selectedItems.forEach(item => {
    total += item.price;
    message += `- ${item.name} ₦${item.price}%0A`;
  });

  message += `Total: ₦${total}`;

  window.open(`https://wa.me/234XXXXXXXXXX?text=${message}`);
}