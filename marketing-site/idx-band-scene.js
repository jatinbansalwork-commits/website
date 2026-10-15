/** Animated idx-stats band — KlearNow live dither (lazy-mounted). */

import { mountLiveDither } from "./live-dither.js";

const BAND_DITHER_SRC =
  "https://firebasestorage.googleapis.com/v0/b/unicorn-studio.appspot.com/o/e0ZH3KqI2cSkwnvllHiGWhoX62g1%2Fremix_dfdsfdsf_%40thumbnail.jpg?alt=media";

let started = false;

function mountIdxBandScene(sceneEl) {
  if (sceneEl.dataset.liveDitherMounted === "true") return;
  sceneEl.dataset.liveDither = BAND_DITHER_SRC;
  sceneEl.dataset.liveDitherTheme = "idx-band";
  mountLiveDither(sceneEl);
  sceneEl.dataset.liveDitherMounted = "true";
}

function bootIdxBandScene() {
  if (started) return;
  const sceneEl = document.querySelector(".idx-stats [data-idx-band-scene]");
  if (!sceneEl) return;

  started = true;
  const band = sceneEl.closest(".idx-stats") || sceneEl;

  new IntersectionObserver(
    (entries, observer) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      mountIdxBandScene(sceneEl);
    },
    { rootMargin: "120px" },
  ).observe(band);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootIdxBandScene);
} else {
  bootIdxBandScene();
}
