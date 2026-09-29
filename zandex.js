
const whatsappNumber = "2349154993962";


function openWhatsApp(event, message) {

    if (event) {
        event.preventDefault();
    }

    const encodedMessage = encodeURIComponent(message);

    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");

}


/* =========================================
   PRODUCT ORDER
========================================= */

function orderProduct(productName, price, image) {

    const formattedPrice =
        Number(price).toLocaleString("en-NG");


    const message =
`Hello Zandex Atelier,

I would like to place an order.

Product: ${productName}
Price: ₦${formattedPrice}

Please let me know how to proceed with my order.

Thank you.`;


    const encodedMessage =
        encodeURIComponent(message);


    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;


    window.open(whatsappURL, "_blank");

}


/* =========================================
   NEWSLETTER
========================================= */

function subscribe(event) {

    event.preventDefault();

    const email =
        event.target.querySelector("input").value.trim();


    if (!email) {
        return;
    }


    alert(
        "Thank you for joining the Zandex Atelier list."
    );


    event.target.reset();

}


/* =========================================
   DRAG TO SCROLL
========================================= */

const slider =
    document.querySelector(".products-scroll");


let isDown = false;
let startX;
let scrollLeft;


if (slider) {

    slider.addEventListener("mousedown", (event) => {

        isDown = true;

        slider.style.cursor = "grabbing";

        startX =
            event.pageX - slider.offsetLeft;

        scrollLeft =
            slider.scrollLeft;

    });


    slider.addEventListener("mouseleave", () => {

        isDown = false;

        slider.style.cursor = "grab";

    });


    slider.addEventListener("mouseup", () => {

        isDown = false;

        slider.style.cursor = "grab";

    });


    slider.addEventListener("mousemove", (event) => {

        if (!isDown) {
            return;
        }

        event.preventDefault();


        const x =
            event.pageX - slider.offsetLeft;


        const walk =
            (x - startX) * 1.5;


        slider.scrollLeft =
            scrollLeft - walk;

    });

}