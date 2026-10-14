
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
