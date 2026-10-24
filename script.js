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
  const updateParallax = () => {
    parallaxLayers.forEach((layer) => {
      const speed = Number(layer.dataset.parallax);
      const bounds = layer.getBoundingClientRect();
      const currentOffset = Number.parseFloat(layer.style.getPropertyValue("--parallax-y")) || 0;
      const distanceFromCenter = bounds.top + bounds.height / 2 - window.innerHeight / 2 - currentOffset;
      layer.style.setProperty("--parallax-y", `${-distanceFromCenter * speed}px`);
      layer.style.setProperty("--parallax-rotate", `${distanceFromCenter * speed * 0.04}deg`);
    });
    frameRequested = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (frameRequested) return;
      frameRequested = true;
      window.requestAnimationFrame(updateParallax);
    },
    { passive: true },
  );
  window.addEventListener("resize", updateParallax);
  updateParallax();
}

document.querySelector("#year").textContent = new Date().getFullYear();
