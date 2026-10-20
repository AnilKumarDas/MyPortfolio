const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  siteNav.classList.toggle("is-open", !isExpanded);
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
  });
});

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const parallaxLayers = document.querySelectorAll("[data-parallax]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (parallaxLayers.length && !reduceMotion) {
  let frameRequested = false;
  window.addEventListener(
    "scroll",
    () => {
      if (frameRequested) return;
      frameRequested = true;
      window.requestAnimationFrame(() => {
        const offset = window.scrollY;
        parallaxLayers.forEach((layer) => {
          layer.style.transform = `translate3d(0, ${offset * Number(layer.dataset.parallax)}px, 0)`;
        });
        frameRequested = false;
      });
    },
    { passive: true },
  );
}

document.querySelector("#year").textContent = new Date().getFullYear();
