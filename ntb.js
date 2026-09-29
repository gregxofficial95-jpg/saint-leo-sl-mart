/* =========================================
   NTB CLOTHING ENTERPRISE
   JAVASCRIPT
========================================= */


/* =========================================
   SETTINGS
========================================= */

const IMAGE_EXTENSION = ".jpg";


/*
    IMPORTANT:

    If your images are PNG instead of JPG,
    change the line above to:

    const IMAGE_EXTENSION = ".png";
*/


/*
    PUT YOUR REAL WHATSAPP NUMBER HERE

    Example:

    08012345678

    becomes:

    2348012345678

    Do NOT include the + sign.
*/

const WHATSAPP_NUMBER = "2349063613462";



/* =========================================
   PRODUCT GALLERY
========================================= */

const productGrid = document.getElementById("productGrid");


for (let i = 1; i <= 29; i++) {

    const imageName =
        `ntb-image-${i}${IMAGE_EXTENSION}`;


    const card = document.createElement("article");

    card.className = "product-card";


    card.innerHTML = `

        <div class="product-image">

            <img
                src="${imageName}"
                alt="NTB Clothing Enterprise Collection ${i}"
                loading="lazy"
            >

        </div>


        <div class="product-order">

            <button
                class="order-whatsapp"
                onclick="orderProduct(${i})"
            >

                <span>◉</span>

                ORDER ON WHATSAPP

                <span>→</span>

            </button>

        </div>

    `;


    productGrid.appendChild(card);

}



/* =========================================
   WHATSAPP ORDER
========================================= */

function orderProduct(productNumber) {

    const message =
        `Hello NTB Clothing Enterprise 👋%0A%0AI am interested in Product ${productNumber} from your website.%0A%0APlease send me the price, available sizes and more details.`;

    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;


    window.open(
        whatsappURL,
        "_blank"
    );

}



/* =========================================
   MOBILE MENU
========================================= */

const menuButton =
    document.getElementById("menuButton");

const nav =
    document.getElementById("nav");


menuButton.addEventListener("click", () => {

    nav.classList.toggle("open");

});



/* =========================================
   CLOSE MOBILE MENU
   AFTER CLICKING LINK
========================================= */

const navLinks =
    document.querySelectorAll(".nav-link");


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("open");

    });

});



/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll("section[id]");


window.addEventListener("scroll", () => {

    let current = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 120;


        const sectionHeight =
            section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            `#${current}`
        ) {

            link.classList.add("active");

        }

    });

});