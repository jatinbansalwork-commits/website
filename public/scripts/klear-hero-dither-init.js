import { mountLiveDither } from "/scripts/klear-live-dither.js?v=klear-earth-2";

function mountKlearHeroEarth() {
  const planets = document.querySelectorAll(
    ".mirrored-root .hero__planet[data-klear-earth-dither], .mirrored-root .svc-hero__planet[data-klear-earth-dither]",
  );
  for (const el of planets) {
    const src = el.getAttribute("data-klear-earth-dither");
    if (!src) continue;

    el.querySelectorAll(".live-dither__canvas").forEach((node) => node.remove());
    el.classList.remove("is-live");

    el.setAttribute("data-live-dither", src);
    if (!el.getAttribute("data-live-dither-theme")) {
      el.setAttribute("data-live-dither-theme", "light");
    }

    mountLiveDither(el);
  }
}

mountKlearHeroEarth();
window.addEventListener("load", mountKlearHeroEarth);
