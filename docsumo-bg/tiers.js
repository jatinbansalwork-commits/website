/** Legency tiers: mobile accordion + title entrance */

function initTierCards() {
  const cards = document.querySelectorAll("[data-tier-card]");
  if (!cards.length) return;

  const mq = window.matchMedia("(max-width: 991px)");

  const syncCollapsible = () => {
    const mobile = mq.matches;
    cards.forEach((card) => {
      card.classList.toggle("is-collapsible", mobile);
      if (!mobile) {
        card.classList.add("is-open");
        card.querySelector("[data-tier-toggle]")?.setAttribute("aria-expanded", "true");
      } else if (!card.classList.contains("is-open")) {
        card.querySelector("[data-tier-toggle]")?.setAttribute("aria-expanded", "false");
      }
    });
    if (mobile && !document.querySelector(".tier.is-open") && cards[0]) {
      cards[0].classList.add("is-open");
      cards[0].querySelector("[data-tier-toggle]")?.setAttribute("aria-expanded", "true");
    }
  };

  cards.forEach((card, index) => {
    const toggle = card.querySelector("[data-tier-toggle]");
    const bodyId = `tier-body-${index}`;
    const body = card.querySelector(".tier__body");
    if (body && !body.id) body.id = bodyId;
    if (toggle) {
      toggle.setAttribute("aria-controls", bodyId);
      toggle.addEventListener("click", () => {
        if (!card.classList.contains("is-collapsible")) return;
        const open = card.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
      });
    }
  });

  syncCollapsible();
  mq.addEventListener("change", syncCollapsible);
}

function initTierTitle() {
  const title = document.querySelector(".tiers__title[data-tier-roll]");
  if (!title) return;

  const raw = title.getAttribute("data-tier-roll") || title.textContent.trim();
  const lines = raw.split("|").map((line) => line.trim());

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    title.textContent = lines.join(" ");
    return;
  }

  title.textContent = "";
  title.setAttribute("aria-label", lines.join(" "));

  const buildLine = (lineText) => {
    const line = document.createElement("div");
    line.className = "roll-line";
    [...lineText].forEach((char) => {
      const letter = document.createElement("span");
      letter.className = "roll-letter";
      letter.setAttribute("aria-hidden", "true");
      const base = document.createElement("span");
      base.className = "roll-char";
      base.textContent = char === " " ? "\u00a0" : char;
      const twin = document.createElement("span");
      twin.className = "roll-char roll-char--twin";
      twin.setAttribute("data-roll-twin", "");
      twin.setAttribute("aria-hidden", "true");
      twin.textContent = char === " " ? "\u00a0" : char;
      letter.append(base, twin);
      line.append(letter);
    });
    return line;
  };

  lines.forEach((lineText) => title.append(buildLine(lineText)));

  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) title.classList.add("is-rolled");
    },
    { threshold: 0.35 },
  );
  io.observe(title);
}

initTierCards();
initTierTitle();
