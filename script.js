let selectedItems = [];

function toggleItem(el, name, price) {
  let index = selectedItems.findIndex(i => i.name === name);

  if (index > -1) {
    selectedItems.splice(index, 1);
    el.classList.remove("selected");
  } else {
    selectedItems.push({name, price});
    el.classList.add("selected");
  }

  document.getElementById("proceedBtn").style.display = "block";
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

function closeNotice() {
  document.getElementById("noticeBar").style.display = "none";
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

function openForm() {

  let total = 0;
  let text = "<h4>Order Summary</h4>";

  selectedItems.forEach(item => {
    total += item.price;
    text += `<p>${item.name} - ₦${item.price}</p>`;
  });

  text += `<p>Delivery+Service charge - ₦2750</p>`;
  text += `<b>Total: ₦${total + 2750}</b>`;

  document.getElementById("summary").innerHTML = text;
  document.getElementById("totalPrice").innerText = total + 2750;

  document.getElementById("formBox").style.display = "block";

  // THIS SCROLLS USER TO FORM (VERY IMPORTANT UX FIX)
  document.getElementById("formBox").scrollIntoView({
    behavior: "smooth"
  });

  document.getElementById("proceedBtn").style.display = "none";
}


window.onload = function () {
  let btn = document.querySelector(".order-btn");

  window.scrollTo(0, 0); // always start from top

  document.getElementById("formBox").style.display = "none"; // hide form on load
};



function sendOrder() {

  let name = document.getElementById("name").value;
  let hostel = document.getElementById("hostel").value;
  let dept = document.getElementById("dept").value;

  if (!name || !hostel || !dept) {
    alert("Please fill in all details");
    return;
  }

  let total = 2750;
  let message = `Hi Saint Leo's Mart 👋

Name: ${name}
Hostel: ${hostel}
Dept: ${dept}

Order:
`;

  selectedItems.forEach(item => {
    total += item.price;
    message += `- ${item.name} ₦${item.price}\n`;
  });

  message += `\nTotal: ₦${total}`;

  let url = "https://api.whatsapp.com/send?phone=2349125366748&text=" + encodeURIComponent(message);

  // 🔥 THIS is the key fix
  window.location.href = url;
}
