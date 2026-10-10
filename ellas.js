
/* =====================================================
   ELLA'S SIGNATURE — THE WIG SPA
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

  // Keep the welcome screen brief and elegant.
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

        // Always keep the mobile menu closed when the page loads
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
      if (event.key === "Escape") {
        closeMenu();
      }
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

    if (lightboxClose) {
      lightboxClose.focus();
    }

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
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", (event) => {

      if (!lightbox.classList.contains("open")) return;

      if (event.key === "Escape") {
        closeLightbox();
      }

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
     Keep missing images from breaking the layout.
  =================================================== */

  document.querySelectorAll("img").forEach((image) => {

    image.addEventListener("error", () => {
      image.classList.add("image-unavailable");
    });

    image.addEventListener("load", () => {
      image.classList.remove("image-unavailable");
    });

  });

  
/* =========================================
   ELLA'S SIGNATURE WHATSAPP ENQUIRY
========================================= */

const ellaEnquiryForm = document.getElementById("ellaEnquiryForm");

if (ellaEnquiryForm) {
  ellaEnquiryForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const customerName =
      document.getElementById("ellaCustomerName").value.trim();

    const customerPhone =
      document.getElementById("ellaCustomerPhone").value.trim();

    const service =
      document.getElementById("ellaService").value;

    const message =
      document.getElementById("ellaEnquiryMessage").value.trim();

    if (!customerName || !customerPhone || !service || !message) {
      alert("Please complete all fields before sending your enquiry.");
      return;
    }

    const ellaWhatsAppNumber = "2348119879899";

    const whatsappMessage = [
      "HELLO ELLA'S SIGNATURE",
      "",
      "I'd like to make an enquiry about your services.",
      "",
      "Name: " + customerName,
      "My WhatsApp Number: " + customerPhone,
      "Service Needed: " + service,
      "",
      "Enquiry Details:",
      message,
      "",
      "Sent through the Ella's Signature website."
    ].join("\n");

    const whatsappURL =
      "https://wa.me/" +
      ellaWhatsAppNumber +
      "?text=" +
      encodeURIComponent(whatsappMessage);

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  });
}


});
