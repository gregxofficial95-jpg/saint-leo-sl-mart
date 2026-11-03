
/* =========================================================
   MARYAM'S KITCHEN & EVENT PLANNING
   Website interactions + Supabase Enquiry Tracking
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     INTRO SCREEN
  ======================================================= */

  const introScreen = document.getElementById("introScreen");

  if (introScreen) {
    window.setTimeout(() => {
      introScreen.classList.add("intro-hidden");
    }, 2600);
  }


  /* =======================================================
     MOBILE NAVIGATION
  ======================================================= */

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  function closeMenu() {
    if (!menuToggle || !mainNav) return;

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    mainNav.classList.remove("nav-open");
    document.body.classList.remove("menu-open");
  }

  function openMenu() {
    if (!menuToggle || !mainNav) return;

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
    mainNav.classList.add("nav-open");
    document.body.classList.add("menu-open");
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen =
        menuToggle.getAttribute("aria-expanded") === "true";

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeMenu();
        menuToggle.focus();
      }
    });

    document.addEventListener("click", event => {
      const clickedInsideNav = mainNav.contains(event.target);
      const clickedToggle = menuToggle.contains(event.target);

      if (!clickedInsideNav && !clickedToggle) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 850) {
        closeMenu();
      }
    });
  }


  /* =======================================================
     HEADER SCROLL EFFECT
  ======================================================= */

  const siteHeader = document.getElementById("siteHeader");

  function updateHeader() {
    if (!siteHeader) return;

    siteHeader.classList.toggle(
      "scrolled",
      window.scrollY > 30
    );
  }

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });

  updateHeader();


  /* =======================================================
     BACK TO TOP
  ======================================================= */

  const backToTop = document.getElementById("backToTop");

  function updateBackToTop() {
    if (!backToTop) return;

    backToTop.classList.toggle(
      "visible",
      window.scrollY > 550
    );
  }

  window.addEventListener("scroll", updateBackToTop, {
    passive: true
  });

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }


  /* =======================================================
     FOOTER YEAR
  ======================================================= */

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* =======================================================
     ACTIVE NAVIGATION
  ======================================================= */

  const navLinks = [
    ...document.querySelectorAll(
      '.main-nav a[href^="#"]'
    )
  ];

  const trackedSections = [
    ...document.querySelectorAll(
      "main section[id]"
    )
  ];

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          navLinks.forEach(link => {
            const matches =
              link.getAttribute("href") ===
              "#" + entry.target.id;

            link.classList.toggle("active", matches);

            if (matches) {
              link.setAttribute("aria-current", "location");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: 0
      }
    );

    trackedSections.forEach(section => {
      sectionObserver.observe(section);
    });
  }


  /* =======================================================
     SERVICE-SPECIFIC ENQUIRY BUTTONS
  ======================================================= */

  const serviceSelect = document.getElementById("serviceSelect");
  const customerName = document.getElementById("customerName");

  document.querySelectorAll("[data-enquiry]").forEach(button => {
    button.addEventListener("click", () => {
      const requestedService = button.dataset.enquiry;

      if (!serviceSelect || !requestedService) return;

      const matchingOption = [
        ...serviceSelect.options
      ].find(option => {
        return option.value === requestedService ||
          option.textContent.trim() === requestedService;
      });

      if (matchingOption) {
        serviceSelect.value = matchingOption.value;
      } else {
        serviceSelect.value = "Other / Special Request";
      }
    });
  });

  document.querySelectorAll(".enquiry-trigger").forEach(button => {
    button.addEventListener("click", () => {
      const contactSection = document.getElementById("contact");

      if (contactSection) {
        window.setTimeout(() => {
          if (customerName) {
            customerName.focus({
              preventScroll: true
            });
          }
        }, 650);
      }
    });
  });


  /* =======================================================
     ENQUIRY FORM + SUPABASE + WHATSAPP
  ======================================================= */

  const enquiryForm = document.getElementById("enquiryForm");
  const formError = document.getElementById("formError");

  const WHATSAPP_NUMBER = "2349039736571";

  const MARYAM_BRAND_ID =
    "e7c83721-2a09-424c-8679-81251ebe8bab";

  const ORDER_FUNCTION_URL =
    "https://tzjckojpgamjwigxmdja.supabase.co/functions/v1/submit-brand-order";


  if (enquiryForm) {

    enquiryForm.addEventListener("submit", async event => {

      event.preventDefault();

      if (formError) {
        formError.textContent = "";
      }

      if (!enquiryForm.checkValidity()) {
        enquiryForm.reportValidity();
        return;
      }

      const formData = new FormData(enquiryForm);

      const name = String(
        formData.get("customerName") || ""
      ).trim();

      const phone = String(
        formData.get("customerPhone") || ""
      ).trim();

      const service = String(
        formData.get("serviceSelect") || ""
      ).trim();

      const eventDate = String(
        formData.get("eventDate") || ""
      ).trim();

      const budget = String(
        formData.get("budget") || ""
      ).trim();

      const details = String(
        formData.get("details") || ""
      ).trim();


      /* VALIDATION */

      if (!name || !phone || !service || !details) {
        if (formError) {
          formError.textContent =
            "Please complete all required fields.";
        }

        return;
      }

      if (!/^[0-9+\s()-]{7,25}$/.test(phone)) {
        if (formError) {
          formError.textContent =
            "Please enter a valid phone number.";
        }

        document.getElementById("customerPhone").focus();
        return;
      }


      /* FORMAT CUSTOMER DETAILS */

      const formattedDate = eventDate
        ? new Date(eventDate + "T12:00:00").toLocaleDateString(
            "en-GB",
            {
              day: "numeric",
              month: "long",
              year: "numeric"
            }
          )
        : "Not specified";

      const formattedBudget = budget || "Open to discussion";


      /* PREPARE WHATSAPP MESSAGE */

      let message = [
        "Hello Mary's Kitchen & Event Planning! ✨",
        "",
        "I'd like to make an enquiry.",
        "",
        "MY DETAILS",
        "Name: " + name,
        "Phone: " + phone,
        "",
        "SERVICE REQUEST",
        "Service: " + service,
        "Preferred date: " + formattedDate,
        "Budget: " + formattedBudget,
        "",
        "MY REQUIREMENTS",
        details,
        "",
        "Thank you!"
      ].join("\n");


      /* OPEN A TAB BEFORE ASYNC SUBMISSION */

      const whatsappWindow = window.open("", "_blank");


      /* PREPARE SUBMIT BUTTON */

      const submitButton = enquiryForm.querySelector(
        'button[type="submit"], input[type="submit"]'
      );

      const originalButtonText = submitButton
        ? (
            submitButton.tagName === "INPUT"
              ? submitButton.value
              : submitButton.innerHTML
          )
        : "";

      if (submitButton) {
        submitButton.disabled = true;

        if (submitButton.tagName === "INPUT") {
          submitButton.value = "Submitting enquiry...";
        } else {
          submitButton.textContent = "Submitting enquiry...";
        }
      }


      try {

        /* SUBMIT ENQUIRY TO SUPABASE */

        const response = await fetch(ORDER_FUNCTION_URL, {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            brand_id: MARYAM_BRAND_ID,

            customer_name: name,

            customer_phone: phone,

            request_type: "enquiry",

            request_details: [
              "Service: " + service,
              "Preferred date: " + formattedDate,
              "Budget: " + formattedBudget,
              "Customer requirements: " + details
            ].join("\n"),

            items: [],

            website: ""

          })
        });


        /* READ SERVER RESPONSE */

        const result = await response.json();


        /* CONFIRM REAL SUBMISSION */

        if (
          !response.ok ||
          result.success !== true ||
          !result.order_number
        ) {
          throw new Error(
            result.message || "Enquiry submission failed."
          );
        }


        /* ADD REFERENCE TO WHATSAPP MESSAGE */

        message = [
          "Hello Mary's Kitchen & Event Planning! ✨",
          "",
          "I'd like to make an enquiry.",
          "",
          "ENQUIRY REFERENCE",
          result.order_number,
          "",
          "MY DETAILS",
          "Name: " + name,
          "Phone: " + phone,
          "",
          "SERVICE REQUEST",
          "Service: " + service,
          "Preferred date: " + formattedDate,
          "Budget: " + formattedBudget,
          "",
          "MY REQUIREMENTS",
          details,
          "",
          "Thank you!"
        ].join("\n");


        const whatsappURL =
          "https://wa.me/" +
          WHATSAPP_NUMBER +
          "?text=" +
          encodeURIComponent(message);


        /* OPEN WHATSAPP */

        if (whatsappWindow && !whatsappWindow.closed) {
          whatsappWindow.location.href = whatsappURL;
        } else {
          window.location.href = whatsappURL;
        }


        if (formError) {
          formError.textContent = "";
        }

      } catch (error) {

        /* CLOSE UNUSED WHATSAPP TAB */

        if (whatsappWindow && !whatsappWindow.closed) {
          whatsappWindow.close();
        }

        console.error(
          "Maryam's Kitchen enquiry error:",
          error
        );

        if (formError) {
          formError.textContent =
            "We couldn't submit your enquiry. Please check your internet connection and try again.";
        }

      } finally {

        /* RESTORE SUBMIT BUTTON */

        if (submitButton) {
          submitButton.disabled = false;

          if (submitButton.tagName === "INPUT") {
            submitButton.value = originalButtonText;
          } else {
            submitButton.innerHTML = originalButtonText;
          }
        }

      }

    });

  }

});
