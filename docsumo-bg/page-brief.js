/** Legency page-brief: roll title on scroll into view */

function initPageBriefRollTitle() {
  const title = document.querySelector(".page-brief__title[data-page-brief-roll]");
  if (!title) return;

  const raw = title.getAttribute("data-page-brief-roll") || title.textContent.trim();
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

initPageBriefRollTitle();
