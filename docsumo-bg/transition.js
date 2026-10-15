/** Legency-style load / in-site navigation transition (no GSAP). */

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function getTransitionRoot() {
  return document.querySelector(".transition");
}

function buildTransitionGrid() {
  const root = getTransitionRoot();
  if (!root) return Promise.resolve(null);

  const cols = getComputedStyle(root).gridTemplateColumns.split(" ").filter(Boolean).length;
  const cellW = window.innerWidth / cols;
  const rows = Math.ceil(window.innerHeight / cellW);

  root.style.gridTemplateRows = `repeat(${rows}, ${cellW}px)`;
  root.replaceChildren();

  const frag = document.createDocumentFragment();
  const total = cols * rows;
  for (let i = 0; i < total; i++) {
    const block = document.createElement("div");
    block.className = "transition-block";
    frag.appendChild(block);
  }
  root.appendChild(frag);
  return Promise.resolve(root);
}

function shuffleIndices(count) {
  const order = Array.from({ length: count }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

function animateBlocks(blocks, { duration, amount, to, onComplete }) {
  if (!blocks.length) {
    onComplete?.();
    return;
  }

  const rank = shuffleIndices(blocks.length);
  let finished = 0;

  blocks.forEach((block, index) => {
    const delay = (rank.indexOf(index) / blocks.length) * amount;
    block.style.transition = `opacity ${duration}s linear ${delay}s`;
    block.style.opacity = String(to);

    block.addEventListener(
      "transitionend",
      (event) => {
        if (event.propertyName !== "opacity") return;
        finished += 1;
        if (finished >= blocks.length) onComplete?.();
      },
      { once: true },
    );
  });
}

function hideTransition(root) {
  if (!root) return;
  root.style.display = "none";
  root.style.pointerEvents = "none";
  document.documentElement.classList.remove("is-transitioning");
}

function afterMs(ms, fn) {
  window.setTimeout(fn, ms);
}

function playLoadTransition() {
  const root = getTransitionRoot();
  if (!root || reduced) {
    hideTransition(root);
    return;
  }

  document.documentElement.classList.add("is-transitioning");
  root.style.display = "grid";
  root.style.background = "var(--primary, #003f5b)";

  buildTransitionGrid().then((built) => {
    if (!built) {
      hideTransition(root);
      return;
    }

    const blocks = [...built.querySelectorAll(".transition-block")];
    blocks.forEach((block) => {
      block.style.transition = "none";
      block.style.opacity = "1";
    });

    window.setTimeout(() => {
      built.style.background = "transparent";
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        hideTransition(built);
      };
      animateBlocks(blocks, {
        duration: 0.1,
        amount: 0.4,
        to: 0,
        onComplete: finish,
      });
      afterMs(150 + 400 + 120, finish);
    }, 150);
  });
}

function coverThenNavigate(href) {
  const root = getTransitionRoot();
  if (!root || reduced) {
    window.location.href = href;
    return;
  }

  document.documentElement.classList.add("is-transitioning");
  root.style.display = "grid";
  root.style.background = "var(--primary, #003f5b)";
  root.style.pointerEvents = "auto";

  buildTransitionGrid().then((built) => {
    if (!built) {
      window.location.href = href;
      return;
    }

    const blocks = [...built.querySelectorAll(".transition-block")];
    blocks.forEach((block) => {
      block.style.transition = "none";
      block.style.opacity = "0";
    });

    void built.offsetHeight;

    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      window.location.href = href;
    };
    animateBlocks(blocks, {
      duration: 0.001,
      amount: 0.25,
      to: 1,
      onComplete: go,
    });
    afterMs(250 + 50, go);
  });
}

function bindInSiteLinks() {
  const root = getTransitionRoot();
  if (!root || reduced) return;

  document.querySelectorAll("a[href]").forEach((anchor) => {
    const href = anchor.getAttribute("href") || "";
    if (href.startsWith("#")) return;
    if (anchor.getAttribute("target") === "_blank") return;
    if (anchor.hasAttribute("download")) return;
    if (anchor.hasAttribute("data-transition-prevent")) return;

    let url;
    try {
      url = new URL(anchor.href, window.location.href);
    } catch {
      return;
    }

    if (url.origin !== window.location.origin) return;
    if (/^\/(?:api|assets|fonts)(?:\/|$)/.test(url.pathname)) return;

    anchor.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      coverThenNavigate(anchor.href);
    });
  });
}

function init() {
  if (reduced) {
    hideTransition(getTransitionRoot());
    return;
  }

  playLoadTransition();
  bindInSiteLinks();
  window.addEventListener("resize", () => {
    const root = getTransitionRoot();
    if (root && root.style.display !== "none") buildTransitionGrid();
  });
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) window.location.reload();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
