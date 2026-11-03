/* =========================================================
   IVY'S GLAM
   Intro animation + Supabase booking enquiries
========================================================= */


/* =========================
   INTRO SCREEN
========================= */

const introScreen = document.getElementById("introScreen");

if (introScreen) {
  const introLogo = introScreen.querySelector(".intro-logo img");

  function openIvyIntro() {
    window.setTimeout(() => {
      introScreen.classList.add("is-opening");

      window.setTimeout(() => {
        introScreen.classList.add("is-finished");
      }, 1250);

    }, 2600);
  }

  if (introLogo && !introLogo.complete) {
    introLogo.addEventListener("load", openIvyIntro, { once: true });
    introLogo.addEventListener("error", openIvyIntro, { once: true });
  } else {
    openIvyIntro();
  }
}


/* =========================
   BOOKING ENQUIRY
========================= */

const IVY_BRAND_ID = "f0981103-9de6-4ddc-bad0-a7ea2e27377e";

const IVY_ORDER_FUNCTION_URL =
  "https://tzjckojpgamjwigxmdja.supabase.co/functions/v1/submit-brand-order";

const IVY_WHATSAPP_NUMBER = "2349157996155";

const ivyBookingForm = document.getElementById("ivyBookingForm");
const ivyFormError = document.getElementById("ivyFormError");
const ivyBookingButton = document.getElementById("ivyBookingButton");

if (ivyBookingForm) {

  ivyBookingForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    ivyFormError.textContent = "";

    if (!ivyBookingForm.checkValidity()) {
      ivyBookingForm.reportValidity();
      return;
    }

    const formData = new FormData(ivyBookingForm);

    const name = String(formData.get("customerName") || "").trim();
    const phone = String(formData.get("customerPhone") || "").trim();
    const hostel = String(formData.get("hostel") || "").trim();
    const service = String(formData.get("service") || "").trim();
    const appointmentDate = String(formData.get("appointmentDate") || "").trim();
    const details = String(formData.get("details") || "").trim();

    if (!name || !phone || !hostel || !service || !details) {
      ivyFormError.textContent =
        "Please complete all required fields.";
      return;
    }

    if (!/^[0-9+\s()-]{7,25}$/.test(phone)) {
      ivyFormError.textContent =
        "Please enter a valid phone number.";
      document.getElementById("ivyCustomerPhone").focus();
      return;
    }

    const formattedDate = appointmentDate
      ? new Date(appointmentDate + "T12:00:00").toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric"
        })
      : "Not specified";

    const originalButtonText = ivyBookingButton.innerHTML;

    // Open a blank tab immediately to avoid popup blocking.
    const whatsappTab = window.open("about:blank", "_blank");

    ivyBookingButton.disabled = true;
    ivyBookingButton.textContent = "SUBMITTING ENQUIRY...";

    try {

      const response = await fetch(IVY_ORDER_FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          brand_id: IVY_BRAND_ID,
          customer_name: name,
          customer_phone: phone,
          request_type: "enquiry",
          request_details: [
            "Hostel: " + hostel,
            "Service: " + service,
            "Preferred appointment date: " + formattedDate,
            "Additional details: " + details
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
        "Hello Ivy's Glam! ✨",
        "",
        "I'd like to make an appointment enquiry.",
        "Enquiry Reference: " + result.order_number,
        "",
        "MY DETAILS",
        "Name: " + name,
        "Phone: " + phone,
        "Hostel: " + hostel,
        "",
        "APPOINTMENT DETAILS",
        "Service: " + service,
        "Preferred date: " + formattedDate,
        "",
        "ADDITIONAL DETAILS",
        details,
        "",
        "Please let me know the availability, pricing and next steps.",
        "",
        "Thank you!"
      ].join("\n");

      const whatsappURL =
        "https://wa.me/" +
        IVY_WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(whatsappMessage);

      if (whatsappTab) {
        whatsappTab.location.href = whatsappURL;
      } else {
        window.location.href = whatsappURL;
      }

    } catch (error) {

      if (whatsappTab) {
        whatsappTab.close();
      }

      console.error("Ivy booking enquiry error:", error);

      ivyFormError.textContent =
        error.message ||
        "Your enquiry could not be submitted. Please try again.";

    } finally {

      ivyBookingButton.disabled = false;
      ivyBookingButton.innerHTML = originalButtonText;

    }

  });

}
