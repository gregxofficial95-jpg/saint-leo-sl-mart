
/* =====================================================
   ELLA'S SIGNATURE — THE WIG SPA
   Existing functionality + Supabase enquiry tracking
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ===================================================
     INTRO SCREEN
  =================================================== */

  const introScreen = document.getElementById("introScreen");

  document.body.classList.add("no-scroll");

  function hideIntro() {
    if (!introScreen) {
      document.body.classList.remove("no-scroll");
      return;
    }

    introScreen.classList.add("hide");
    document.body.classList.remove("no-scroll");
  }

  window.setTimeout(hideIntro, 2800);


  /* ===================================================
     MOBILE NAVIGATION
  =================================================== */

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-links a");

  function closeMenu() {
    if (!menuToggle || !navLinks) return;

    menuToggle.classList.remove("active");
    navLinks.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }

  if (menuToggle && navLinks) {

    closeMenu();

    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
    });

    navItems.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
      if (
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }


  /* ===================================================
     SCROLL REVEAL ANIMATIONS
  =================================================== */

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

  }


  /* ===================================================
     CURRENT YEAR
  =================================================== */

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* ===================================================
     PORTFOLIO LIGHTBOX
  =================================================== */

  const galleryItems = Array.from(
    document.querySelectorAll(".gallery-item")
  );

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");

  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");

  let currentImageIndex = 0;
  let previousFocus = null;

  function showGalleryImage(index) {

    if (!galleryItems.length || !lightboxImage) return;

    currentImageIndex =
      (index + galleryItems.length) % galleryItems.length;

    const item = galleryItems[currentImageIndex];

    const imagePath = item.dataset.image;
    const imageTitle = item.dataset.title || "Ella's Signature";

    lightboxImage.src = imagePath;
    lightboxImage.alt = imageTitle;

    if (lightboxCaption) {
      lightboxCaption.textContent =
        `${imageTitle} · ${String(currentImageIndex + 1).padStart(2, "0")} / ${galleryItems.length}`;
    }
  }

  function openLightbox(index) {

    if (!lightbox) return;

    previousFocus = document.activeElement;

    showGalleryImage(index);

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.classList.add("no-scroll");

    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {

    if (!lightbox) return;

    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");

    document.body.classList.remove("no-scroll");

    if (previousFocus && typeof previousFocus.focus === "function") {
      previousFocus.focus();
    }
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      openLightbox(index);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", () => {
      showGalleryImage(currentImageIndex - 1);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener("click", () => {
      showGalleryImage(currentImageIndex + 1);
    });
  }

  if (lightbox) {

    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (event) => {

      if (!lightbox.classList.contains("open")) return;

      if (event.key === "Escape") closeLightbox();

      if (event.key === "ArrowLeft") {
        showGalleryImage(currentImageIndex - 1);
      }

      if (event.key === "ArrowRight") {
        showGalleryImage(currentImageIndex + 1);
      }
    });
  }


  /* ===================================================
     IMAGE FALLBACKS
  =================================================== */

  document.querySelectorAll("img").forEach((image) => {

    image.addEventListener("error", () => {
      image.classList.add("image-unavailable");
    });

    image.addEventListener("load", () => {
      image.classList.remove("image-unavailable");
    });

  });


  /* ===================================================
     ELLA'S SIGNATURE — SUPABASE ENQUIRY TRACKING
  =================================================== */

  const ELLA_BRAND_ID = "36a55185-4c0c-4448-a845-8466a2fea50a";

  const ELLA_ORDER_FUNCTION_URL =
    "https://tzjckojpgamjwigxmdja.supabase.co/functions/v1/submit-brand-order";

  const ELLA_WHATSAPP_NUMBER = "2348119879899";

  const ellaEnquiryForm = document.getElementById("ellaEnquiryForm");

  if (ellaEnquiryForm) {

    ellaEnquiryForm.addEventListener("submit", async (event) => {

      event.preventDefault();

      if (!ellaEnquiryForm.checkValidity()) {
        ellaEnquiryForm.reportValidity();
        return;
      }

      const customerName =
        document.getElementById("ellaCustomerName").value.trim();

      const customerPhone =
        document.getElementById("ellaCustomerPhone").value.trim();

        const customerAddress =
  document.getElementById("ellaCustomerAddress").value.trim();

      const service =
        document.getElementById("ellaService").value;

      const enquiryMessage =
        document.getElementById("ellaEnquiryMessage").value.trim();

      const submitButton =
        ellaEnquiryForm.querySelector(".enquiry-submit");

      const enquiryNote =
        ellaEnquiryForm.querySelector(".enquiry-note");

      if (
        !customerName ||
        !customerPhone ||
        !service ||
        !enquiryMessage
      ) {
        alert("Please complete all fields before sending your enquiry.");
        return;
      }

      if (!/^[0-9+\s()-]{7,25}$/.test(customerPhone)) {
        alert("Please enter a valid phone number.");
        document.getElementById("ellaCustomerPhone").focus();
        return;
      }

      const originalButtonHTML = submitButton.innerHTML;
      const originalNote = enquiryNote.textContent;

      // Open a blank tab before the network request to avoid popup blocking.
      const whatsappTab = window.open("about:blank", "_blank");

      submitButton.disabled = true;
      submitButton.innerHTML = "<span>SUBMITTING ENQUIRY...</span>";

      if (enquiryNote) {
        enquiryNote.textContent = "Please wait while we submit your enquiry...";
      }

      try {

        const response = await fetch(ELLA_ORDER_FUNCTION_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            brand_id: ELLA_BRAND_ID,
            customer_name: customerName,
customer_phone: customerPhone,
delivery_address: customerAddress,
request_type: "enquiry",
            request_details: [
              "Service needed: " + service,
              "Enquiry details: " + enquiryMessage
            ].join("\n"),
            items: [],
            website: ""
          })
        });

        const result = await response.json();

        if (
          !response.ok ||
          result.success !== true ||
          !result.order_number
        ) {
          throw new Error(
            result.message || "Could not submit your enquiry."
          );
        }

        const whatsappMessage = [
          "HELLO ELLA'S SIGNATURE",
          "",
          "I'd like to make an enquiry about your services.",
          "",
          "Enquiry Reference: " + result.order_number,
          "",
          "Name: " + customerName,
"My WhatsApp Number: " + customerPhone,
"Hostel / Location: " + customerAddress,
"Service Needed: " + service,
          "",
          "Enquiry Details:",
          enquiryMessage,
          "",
          "Sent through the Ella's Signature website."
        ].join("\n");

        const whatsappURL =
          "https://wa.me/" +
          ELLA_WHATSAPP_NUMBER +
          "?text=" +
          encodeURIComponent(whatsappMessage);

        if (whatsappTab) {
          whatsappTab.location.href = whatsappURL;
        } else {
          window.location.href = whatsappURL;
        }

        if (enquiryNote) {
          enquiryNote.textContent =
            "Your enquiry has been submitted. Please send the WhatsApp message to complete your enquiry.";
        }

      } catch (error) {

        if (whatsappTab) {
          whatsappTab.close();
        }

        console.error("Ella's Signature enquiry error:", error);

        alert(
          error.message ||
          "Your enquiry could not be submitted. Please try again."
        );

        if (enquiryNote) {
          enquiryNote.textContent =
            "Your enquiry could not be submitted. Please try again.";
        }

      } finally {

        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonHTML;

      }

    });

  }

});
