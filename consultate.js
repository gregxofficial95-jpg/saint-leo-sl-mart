
/* =====================================================
   DESIGNS BY CONSULTATE
   Website functionality
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ===================================================
     1. CONFIGURATION
     =================================================== */

  // IMPORTANT:
  // Replace this with the tailor's WhatsApp number.
  // Use country code and digits only, without + or spaces.
  // Example format for a Nigerian number: 2348012345678

  const WHATSAPP_NUMBER = "2348068859375";

  const whatsappConfigured =
    /^234\d{10}$/.test(WHATSAPP_NUMBER);

  function openWhatsApp(message) {
    if (!whatsappConfigured) {
      alert(
        "WhatsApp is not configured yet. Please add the tailor's " +
        "WhatsApp number in consultate.js."
      );
      return;
    }

    const url =
      "https://wa.me/" +
      WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(message);

    // Open directly following a user interaction.
    window.open(url, "_blank", "noopener,noreferrer");
  }



/* ===================================================
   2. SPLIT INTRO SCREEN
   =================================================== */

const introScreen = document.getElementById("introScreen");

if (introScreen) {
  const introLogo = introScreen.querySelector(".intro-logo img");

  function openIntro() {
    window.setTimeout(() => {
      introScreen.classList.add("is-opening");

      window.setTimeout(() => {
        introScreen.classList.add("is-finished");
      }, 1250);
    }, 2600);
  }

  if (introLogo && !introLogo.complete) {
    introLogo.addEventListener("load", openIntro, { once: true });

    introLogo.addEventListener("error", openIntro, { once: true });
  } else {
    openIntro();
  }
}



  /* ===================================================
     3. MOBILE NAVIGATION
     =================================================== */

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  function closeMenu() {
    if (!menuToggle || !mainNav) return;

    menuToggle.classList.remove("active");
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");

    document.body.classList.remove("menu-open");
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.contains("open");

      if (isOpen) {
        closeMenu();
      } else {
        mainNav.classList.add("open");
        menuToggle.classList.add("active");
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation");

        document.body.classList.add("menu-open");
      }
    });

    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    // Reset navigation if the viewport changes to desktop.
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    });
  }


  /* ===================================================
     4. STYLE GALLERY: GET INSPO
     =================================================== */

  const styleButtons = document.querySelectorAll("[data-style]");

  styleButtons.forEach(button => {
    button.addEventListener("click", () => {
      const styleName = button.dataset.style;

      const message =
`Hello Designs by Consultate!

I'm interested in this style from your website:

Style: ${styleName}

Please tell me more about the design, fabric options, pricing, and how to place an order.

I'd like to discuss the details with you.

Thank you.`;

      openWhatsApp(message);
    });
  });


  /* ===================================================
     5. APPOINTMENT DATE RESTRICTION
     =================================================== */

  const appointmentDate =
    document.getElementById("appointmentDate");

  const orderDeadline =
    document.getElementById("orderDeadline");

  // Build a local calendar date without UTC timezone shifting.
  function getLocalDateString() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const today = getLocalDateString();

  if (appointmentDate) {
    appointmentDate.min = today;
  }

  if (orderDeadline) {
    orderDeadline.min = today;
  }


  /* ===================================================
     6. APPOINTMENT REQUEST FORM
     =================================================== */

  const appointmentForm =
    document.getElementById("appointmentForm");

  if (appointmentForm) {
    appointmentForm.addEventListener("submit", event => {
      event.preventDefault();

      if (!appointmentForm.reportValidity()) {
        return;
      }

      const data = new FormData(appointmentForm);

      const name = data.get("name").trim();
      const phone = data.get("phone").trim();
      const service = data.get("service");
      const date = data.get("date");
      const time = data.get("time");
      const location = data.get("location").trim();
      const notes = data.get("notes").trim();

      const message =
`HELLO DESIGNS BY CONSULTATE
MEASUREMENT APPOINTMENT REQUEST

CUSTOMER DETAILS
Name: ${name}
Phone: ${phone}

APPOINTMENT PREFERENCES
Service: ${service}
Preferred date: ${date}
Preferred time: ${time}
Preferred location: ${location}

ADDITIONAL NOTES
${notes || "None provided"}

Please let me know if the requested appointment is available and confirm the next steps.

Thank you.`;

      openWhatsApp(message);
    });
  }


  /* ===================================================
     7. CUSTOM ORDER IMAGE UPLOAD & PREVIEW
     =================================================== */

  const inspirationInput =
    document.getElementById("inspirationImages");

  const imagePreview =
    document.getElementById("imagePreview");

  const MAX_IMAGES = 5;
  const MAX_FILE_SIZE = 8 * 1024 * 1024;

  // Store only the image files selected by the customer.
  let selectedImages = [];

  // Track preview URLs so they can be released when removed.
  const previewUrls = new Map();

  function releasePreview(file) {
    const url = previewUrls.get(file);

    if (url) {
      URL.revokeObjectURL(url);
      previewUrls.delete(file);
    }
  }

  function renderImagePreview() {
    if (!imagePreview) return;

    imagePreview.innerHTML = "";

    selectedImages.forEach((file, index) => {
      const item = document.createElement("div");
      item.className = "preview-item";

      const img = document.createElement("img");
      const fileUrl = URL.createObjectURL(file);

      previewUrls.set(file, fileUrl);

      img.src = fileUrl;
      img.alt = `Inspiration image ${index + 1}`;

      const filename = document.createElement("p");
      filename.textContent = file.name;
      filename.title = file.name;

      const removeButton = document.createElement("button");

      removeButton.type = "button";
      removeButton.className = "remove-image";
      removeButton.textContent = "×";
      removeButton.setAttribute(
        "aria-label",
        `Remove ${file.name}`
      );

      removeButton.addEventListener("click", () => {
        releasePreview(file);

        selectedImages = selectedImages.filter(
          selectedFile => selectedFile !== file
        );

        syncFileInput();
        renderImagePreview();
      });

      item.append(img, removeButton, filename);
      imagePreview.appendChild(item);
    });
  }

  function syncFileInput() {
    if (!inspirationInput || typeof DataTransfer === "undefined") {
      return;
    }

    const transfer = new DataTransfer();

    selectedImages.forEach(file => {
      transfer.items.add(file);
    });

    inspirationInput.files = transfer.files;
  }

  if (inspirationInput) {
    inspirationInput.addEventListener("change", () => {
      const incomingFiles = Array.from(inspirationInput.files || []);

      if (!incomingFiles.length) {
        return;
      }

      let rejectedCount = 0;

      incomingFiles.forEach(file => {
        if (!file.type.startsWith("image/")) {
          rejectedCount++;
          return;
        }

        if (file.size > MAX_FILE_SIZE) {
          alert(
            `${file.name} is larger than 8 MB. ` +
            "Please choose a smaller image."
          );
          rejectedCount++;
          return;
        }

        const alreadySelected = selectedImages.some(existing =>
          existing.name === file.name &&
          existing.size === file.size &&
          existing.lastModified === file.lastModified
        );

        if (alreadySelected) {
          return;
        }

        if (selectedImages.length >= MAX_IMAGES) {
          alert(
            `You can select up to ${MAX_IMAGES} inspiration images.`
          );
          rejectedCount++;
          return;
        }

        selectedImages.push(file);
      });

      syncFileInput();
      renderImagePreview();

      if (rejectedCount > 0 && selectedImages.length === 0) {
        inspirationInput.value = "";
      }
    });
  }


  /* ===================================================
     8. CUSTOM ORDER: WHATSAPP MESSAGE
     =================================================== */

  const customForm = document.getElementById("customForm");

  if (customForm) {
    customForm.addEventListener("submit", event => {
      event.preventDefault();

      if (!customForm.reportValidity()) {
        return;
      }

      const data = new FormData(customForm);

      function getValue(fieldName) {
        const value = data.get(fieldName);

        if (value === null || value === undefined) {
          return "";
        }

        return String(value).trim();
      }

      function displayValue(fieldName) {
        return getValue(fieldName) || "Not provided";
      }

      const unit = getValue("unit") || "inches";

      const measurementFields = [
        ["Chest", "chest"],
        ["Shoulder", "shoulder"],
        ["Neck", "neck"],
        ["Sleeve length", "sleeve"],
        ["Armhole", "armhole"],
        ["Bicep", "bicep"],
        ["Waist", "waist"],
        ["Hip", "hip"],
        ["Top length", "topLength"],
        ["Trouser length", "trouserLength"],
        ["Thigh", "thigh"],
        ["Inseam", "inseam"]
      ];

      const measurementsProvided = measurementFields.some(
        ([label, fieldName]) => getValue(fieldName) !== ""
      );

      const measurementLines = measurementsProvided
        ? measurementFields
            .filter(([label, fieldName]) => getValue(fieldName) !== "")
            .map(([label, fieldName]) =>
              `${label}: ${getValue(fieldName)} ${unit}`
            )
            .join("\n")
        : "No measurements supplied. I may need a measurement appointment.";

      const imagesList = selectedImages.length
        ? selectedImages.map((file, index) =>
            `${index + 1}. ${file.name}`
          ).join("\n")
        : "No reference images selected.";

      const message =
`HELLO DESIGNS BY CONSULTATE
NEW CUSTOM TAILORING ENQUIRY

01. CUSTOMER DETAILS
Name: ${displayValue("name")}
Phone: ${displayValue("phone")}
Location / delivery address: ${displayValue("location")}

02. OUTFIT DETAILS
Outfit category: ${displayValue("outfit")}
Number of outfits: ${displayValue("quantity")}
Required by: ${displayValue("deadline")}
Budget: ${displayValue("budget")}

03. STYLE PREFERENCES
Preferred inspiration: ${displayValue("style")}
Fabric preference: ${displayValue("fabric")}

Design description:
${displayValue("description")}

04. MEASUREMENTS
Unit: ${unit}

${measurementLines}

Other measurement notes:
${displayValue("otherMeasurements")}

05. INSPIRATION IMAGES
${imagesList}

IMPORTANT: I understand that I must attach the selected reference images manually in this WhatsApp conversation.

06. ADDITIONAL NOTES
${displayValue("extraNotes")}

Please review my request and let me know the price, fabric options, production timeline, and next steps.

Thank you.`;

      openWhatsApp(message);

      // Images remain selected on the page if the customer returns.
      // They are not automatically attached to the WhatsApp message.
    });
  }


  /* ===================================================
     9. FOOTER YEAR
     =================================================== */

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* ===================================================
     10. BACK TO TOP BUTTON
     =================================================== */

  const backToTop = document.getElementById("backToTop");

  if (backToTop) {
    function updateBackToTop() {
      backToTop.classList.toggle(
        "visible",
        window.scrollY > 450
      );
    }

    window.addEventListener("scroll", updateBackToTop, {
      passive: true
    });

    updateBackToTop();

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

});
