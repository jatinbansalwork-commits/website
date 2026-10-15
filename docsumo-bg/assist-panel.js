/** Marketing ctaband — Klear Agent entry + ChatInput (sample app parity) */

function greetingCopy() {
  return "Ask anything about your trade data";
}

let marketingGhost = null;
let marketingComposer = null;
function formatFileSize(bytes) {
  const kb = Number(bytes || 0) / 1024;
  if (kb < 1024) {
    return `${kb.toFixed(kb < 10 ? 2 : 1)} KB`;
  }
  return `${(kb / 1024).toFixed(2)} MB`;
}

function marketingChatInputRoot() {
  return document.querySelector(".assist-kn-shell [data-kn-component='chat-input']");
}

function showComposerError(message) {
  const banner = document.getElementById("marketing-agent-composer-error");
  const text = document.getElementById("marketing-agent-composer-error-text");
  if (!banner || !text) return;
  text.textContent = message;
  banner.hidden = false;
  banner.classList.add("is-visible");
}

function hideComposerError() {
  const banner = document.getElementById("marketing-agent-composer-error");
  if (!banner) return;
  banner.hidden = true;
  banner.classList.remove("is-visible");
}

const MARKETING_ICONS = {
  tariff:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V5"/><path d="M4 19h16"/><path d="M8 15l3-4 3 2 4-6"/></svg>',
  duty:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><path d="M12 8v8M9 11h6"/></svg>',
  clearance:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z"/><path d="M9.5 12l1.8 1.8L14.5 10"/></svg>',
  audit:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h9l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/><path d="M14 3v5h5M8 12h6M8 16h6"/></svg>',
  track:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 16V6a1 1 0 0 1 1-1h9v11"/><path d="M13 9h4l3 3v4h-2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>',
  drayage:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17h13"/><path d="M16 17h2l3-3V9h-5"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M5 17V8h8v9"/></svg>',
  inbox:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16v12H4z"/><path d="M4 10l4 3h8l4-3"/></svg>',
  roi:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 18V6"/><path d="M4 18h16"/><path d="M8 14l3-5 3 3 5-8"/></svg>',
};

const MARKETING_PROMPTS = [
  {
    label: "Tariff exposure",
    query: "What is our tariff exposure by HTS this quarter?",
    icon: "tariff",
    rank: 100,
  },
  {
    label: "Duty recovery",
    query: "Where can we recover duty on recent entries?",
    icon: "duty",
    rank: 96,
  },
  {
    label: "Customs clearance",
    query: "What is blocking customs clearance on open shipments?",
    icon: "clearance",
    rank: 92,
  },
  {
    label: "Post-entry audit",
    query: "Summarize post-entry audit findings we should action.",
    icon: "audit",
    rank: 88,
  },
  {
    label: "Track & trace",
    query: "Track and trace my in-transit containers.",
    icon: "track",
    rank: 84,
  },
  {
    label: "Drayage",
    query: "Status of drayage moves waiting on delivery appointments.",
    icon: "drayage",
    rank: 80,
  },
  {
    label: "Manage my inbox",
    query: "Triage my trade inbox — what needs a human today?",
    icon: "inbox",
    rank: 76,
  },
  {
    label: "Estimate my ROI",
    query: "Estimate ROI if we automate clearance on our top lanes.",
    icon: "roi",
    rank: 72,
  },
];

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function marketingPromptQueries() {
  return MARKETING_PROMPTS.map((item) => item.query);
}

function renderMarketingChip(action) {
  const iconHtml = MARKETING_ICONS[action.icon]
    ? `<span class="kn-next-actions__icon" aria-hidden="true">${MARKETING_ICONS[action.icon]}</span>`
    : "";
  return `<button type="button" class="kn-next-actions__chip kn-next-actions__chip--marketing type-ui-sm" data-kn-next-action="prompt" data-kn-next-query="${escapeHtml(action.query)}">${iconHtml}<span class="kn-next-actions__label">${escapeHtml(action.label)}</span></button>`;
}

function renderMarketingCards() {
  const grid = document.getElementById("marketing-agent-cards");
  if (!grid) return;
  const sorted = [...MARKETING_PROMPTS].sort((a, b) => b.rank - a.rank);
  grid.innerHTML = `<div class="kn-next-actions kn-next-actions--center kn-next-actions--marketing" role="group" aria-label="Suggested questions">${sorted.map(renderMarketingChip).join("")}</div>`;
}

function ghostPromptPhrases() {
  return marketingPromptQueries();
}

function initMarketingGhost() {
  const input = document.getElementById("marketing-agent-input");
  const ghostEl = document.getElementById("marketing-agent-ghost");
  if (!input || !ghostEl || !window.KNAgentGhost?.bind) return;

  marketingGhost = window.KNAgentGhost.bind(input, {
    ghostEl,
    getPromptPhrases: ghostPromptPhrases,
    getSeededQuestions: ghostPromptPhrases,
    includePast: true,
    isPaused: () => answerLoading,
    restorePlaceholder: (field) => {
      if (!field.value.trim()) {
        field.placeholder =
          field.getAttribute("data-placeholder-empty") || field.placeholder || "";
      }
    },
  });
}

let answerLoading = false;

const THINKING_STEPS = ["Reading the request…", "Checking HTS and ACE records…", "Compiling the response…"];

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function delay(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function aiMarkHtml({ size = 14 } = {}) {
  return `<svg class="klear-assistant-mark" viewBox="0 0 24 24" width="${size}" height="${size}" focusable="false" aria-hidden="true"><use href="#klear-assist-ray" /></svg>`;
}

function marketingThreadEls() {
  return {
    empty: document.getElementById("marketing-agent-entry"),
    messages: document.getElementById("marketing-agent-messages"),
    input: document.getElementById("marketing-agent-input"),
  };
}

function hasThreadMessages() {
  return Boolean(marketingThreadEls().messages?.querySelector(".agentic-thread-msg"));
}

function syncMarketingComposerPlaceholder() {
  const input = marketingThreadEls().input;
  if (!input) return;
  const inConversation = hasThreadMessages();
  const placeholder = inConversation
    ? input.getAttribute("data-placeholder-followup") || "Ask a follow-up…"
    : input.getAttribute("data-placeholder-empty") || input.placeholder || "";
  if (!input.value.trim()) {
    input.placeholder = placeholder;
  }
}

function enterConversationMode() {
  const { empty, messages } = marketingThreadEls();
  if (empty) {
    empty.hidden = true;
    empty.setAttribute("aria-hidden", "true");
  }
  if (messages) {
    messages.hidden = false;
    messages.removeAttribute("aria-hidden");
  }
  document.querySelector(".assist-kn-shell")?.classList.add("assist-kn-shell--in-thread");
  marketingGhost?.stopIdleCycle?.();
  marketingGhost?.sync?.();
  syncMarketingComposerPlaceholder();
}

function textToBodyHtml(text) {
  return String(text || "")
    .trim()
    .split(/\n\n+/)
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph.trim())}</p>`)
    .join("");
}

function thinkingDotsHtml() {
  return `<span class="ai-thinking-dots" role="status" aria-label="Thinking"><span></span><span></span><span></span></span>`;
}

function rollingLoadingTextHtml(steps = THINKING_STEPS) {
  const items = steps
    .map((step) => `<span class="ai-rolling-loading__item">${escapeHtml(step)}</span>`)
    .join("");
  return `<span class="ai-rolling-loading" role="status" aria-label="Thinking">
      <span class="ai-rolling-loading__viewport"><span class="ai-rolling-loading__track">${items}</span></span>
    </span>`;
}

function userMessageHtml(text, files = []) {
  const copy = text ? `<p>${escapeHtml(text)}</p>` : "";
  const attachments = (files || [])
    .map(
      (file) =>
        `<li>${escapeHtml(file.name)} <span class="type-caption-sm">(${escapeHtml(formatFileSize(file.size))})</span></li>`,
    )
    .join("");
  const fileList = attachments ? `<ul class="agentic-msg-files type-caption-sm">${attachments}</ul>` : "";
  return `<div class="agentic-thread-msg agentic-thread-msg--user">
      <article class="ai-msg ai-msg--user kn-chat-msg kn-chat-msg--self" data-kn-component="chat-message"><div class="ai-msg__body type-body-md kn-chat-msg__bubble">${copy}${fileList}</div></article>
    </div>`;
}

function assistantMessageHtml(innerHtml, id, { loading = false } = {}) {
  const idAttr = id ? ` id="${escapeHtml(id)}" data-message-id="${escapeHtml(id)}"` : "";
  const loadingClass = loading ? " ai-msg--loading is-loading" : "";
  const leadingClass = loading ? " is-rotating" : "";
  return `<div class="agentic-thread-msg agentic-thread-msg--assistant">
      <article class="ai-msg ai-msg--assistant kn-chat-msg kn-chat-msg--other${loadingClass}" data-kn-component="chat-message"${idAttr}>
        <div class="kn-chat-msg__row ai-msg__row">
          <span class="kn-chat-msg__leading ai-msg__leading agentic-thread-msg__avatar${leadingClass}" aria-hidden="true">${aiMarkHtml({ size: 14 })}</span>
          <div class="ai-msg__stack"><div class="ai-msg__body type-body-md kn-chat-msg__bubble">${innerHtml}</div><div class="ai-msg__footer kn-chat-msg__actions"></div></div>
        </div>
      </article>
    </div>`;
}

function followUpChipsHtml(question) {
  const skip = String(question || "").toLowerCase();
  const prompts = MARKETING_PROMPTS.filter((item) => item.query.toLowerCase() !== skip)
    .slice(0, 3)
    .map((item) => ({ label: item.label, prompt: item.query }));
  if (!prompts.length) return "";
  return `<div class="ai-msg__related" role="group" aria-label="Related questions">
      <p class="ai-msg__related-label type-caption-sm">Related</p>
      <div class="ai-msg__related-chips">
        ${prompts
          .map(
            (item) =>
              `<button type="button" class="ai-msg__related-chip" data-marketing-followup="${escapeHtml(item.prompt)}">${escapeHtml(item.label)}</button>`,
          )
          .join("")}
      </div>
    </div>`;
}

function scrollThreadMessages({ force = true } = {}) {
  const { messages } = marketingThreadEls();
  if (!messages) return;
  messages.scrollTo({
    top: messages.scrollHeight,
    behavior: force && !prefersReducedMotion() ? "smooth" : "auto",
  });
}

function bindThreadMessageEnter(row) {
  if (!row || prefersReducedMotion()) return;
  row.classList.add("is-entering");
  row.addEventListener(
    "animationend",
    (event) => {
      if (event.target === row) row.classList.remove("is-entering");
    },
    { once: true },
  );
}

function appendThreadMessages(html) {
  const { messages } = marketingThreadEls();
  if (!messages) return;
  enterConversationMode();
  const beforeCount = messages.querySelectorAll(".agentic-thread-msg").length;
  messages.insertAdjacentHTML("beforeend", html);
  const rows = messages.querySelectorAll(".agentic-thread-msg");
  for (let i = beforeCount; i < rows.length; i += 1) {
    bindThreadMessageEnter(rows[i]);
  }
  scrollThreadMessages();
}

function fillAssistantMessage(node, { body = "", related = "" } = {}) {
  if (!node) return;
  node.classList.remove("ai-msg--loading", "is-loading");
  const stack = node.querySelector(".ai-msg__stack");
  const bodyEl = node.querySelector(".ai-msg__body");
  if (bodyEl && body != null) {
    bodyEl.innerHTML = body;
    if (!prefersReducedMotion()) {
      bodyEl.classList.add("is-content-entering");
      bodyEl.addEventListener("animationend", () => bodyEl.classList.remove("is-content-entering"), { once: true });
    }
  }
  if (stack && related) {
    stack.querySelector(":scope > .ai-msg__related")?.remove();
    const footer = stack.querySelector(":scope > .ai-msg__footer, :scope > .kn-chat-msg__actions");
    if (footer) {
      footer.insertAdjacentHTML("beforebegin", related);
    } else {
      stack.insertAdjacentHTML("beforeend", related);
    }
  }
  scrollThreadMessages();
}

const DEMO_ANSWERS_BY_QUERY = Object.fromEntries(
  MARKETING_PROMPTS.map((item) => {
    const answers = {
      tariff:
        "Across 847 active SKUs this quarter, estimated tariff exposure is $2.14M (general rate + Section 301). Top three HTS buckets: 8471.30 ($610K), 8504.40 ($420K), and 3926.90 ($318K). Two lines show classification drift vs. last filing—worth a quick review before the next entry.",
      duty:
        "I found 11 entries in the last 90 days with recovery potential (~$48K). Strongest candidates: duplicate MPF on three consolidated entries, unused FTZ admission credits on two lines, and a post-summary correction window still open on entry 412-9081123-4 ($12.4K).",
      clearance:
        "Six open shipments are blocked: 2 missing ISF matches, 2 PGA holds (FDA prior notice), 1 customs bond sufficiency flag, and 1 AES filing mismatch. Fastest win is the bond flag—CBP cleared similar entries once the rider was updated yesterday.",
      audit:
        "Post-entry audit highlights: 4 valuation discrepancies (related-party add-ons), 2 HTS reclass opportunities, and 1 country-of-origin documentation gap. Priority: reconcile transfer-pricing add-ons on entries filed in March—they drive 70% of the exposure.",
      track:
        "You have 9 containers in transit. 5 on rail to Chicago (ETA 2–4 days), 3 at LA/LB terminal (appointments pending), 1 discharged awaiting exam. Container MSKU7842091 is at risk of demurrage in 36 hours if no appointment is booked.",
      drayage:
        "Four drayage moves are waiting on delivery appointments: two at NJ/NY (earliest slot tomorrow 14:00), one at Savannah (slot requested), one at Long Beach (terminal queue ~18 hours). Two drivers are staged within 15 miles of the port.",
      inbox:
        "Trade inbox triage (demo): 7 items need a human today—3 broker emails on PGA holds, 2 CBP requests for docs, 1 ACE reject to fix, 1 duty bill dispute. KlearAssist can draft responses for the doc requests if you want to review before send.",
      roi:
        "Rough ROI model on your top five lanes: automating clearance + doc capture saves ~42 broker hours/month and cuts average dwell by 0.8 days. At your volume, that’s about $126K annual benefit vs. ~$38K platform cost—payback in under 4 months (illustrative demo math).",
    };
    return [item.query, answers[item.icon] || ""];
  }),
);

const KEYWORD_ANSWERS = [
  { pattern: /\b(hts|tariff|301|duty rate)\b/i, key: "tariff" },
  { pattern: /\b(recover|recovery|drawback|mpf|refund)\b/i, key: "duty" },
  { pattern: /\b(clearance|hold|pga|isf|customs)\b/i, key: "clearance" },
  { pattern: /\b(audit|post[- ]?entry|valuation)\b/i, key: "audit" },
  { pattern: /\b(track|trace|container|in[- ]transit)\b/i, key: "track" },
  { pattern: /\b(drayage|appointment|demurrage|terminal)\b/i, key: "drayage" },
  { pattern: /\b(inbox|email|triage)\b/i, key: "inbox" },
  { pattern: /\b(roi|automate|savings|payback)\b/i, key: "roi" },
];

function demoAnswerForIcon(iconKey) {
  const prompt = MARKETING_PROMPTS.find((item) => item.icon === iconKey);
  return prompt ? DEMO_ANSWERS_BY_QUERY[prompt.query] : "";
}

function localDemoAnswer(question) {
  const normalized = question.trim();
  if (DEMO_ANSWERS_BY_QUERY[normalized]) {
    return DEMO_ANSWERS_BY_QUERY[normalized];
  }
  const lower = normalized.toLowerCase();
  for (const item of MARKETING_PROMPTS) {
    if (lower.includes(item.label.toLowerCase()) || lower.includes(item.query.toLowerCase().slice(0, 24))) {
      return DEMO_ANSWERS_BY_QUERY[item.query];
    }
  }
  for (const rule of KEYWORD_ANSWERS) {
    if (rule.pattern.test(normalized)) {
      const text = demoAnswerForIcon(rule.key);
      if (text) return text;
    }
  }
  return (
    "Based on your question, I’d start by pulling entry and shipment data for the last 30 days, then flag exceptions (holds, valuation gaps, and classification drift). " +
    "This demo uses sample trade operations data—connect your systems for live answers."
  );
}

async function fetchWikipediaContext(question) {
  const term = question.replace(/\?+$/, "").trim().slice(0, 80);
  if (!term) return null;
  const searchParams = new URLSearchParams({
    action: "query",
    list: "search",
    srsearch: term,
    format: "json",
    origin: "*",
    utf8: "1",
  });
  const searchRes = await fetch(`https://en.wikipedia.org/w/api.php?${searchParams}`);
  if (!searchRes.ok) return null;
  const searchData = await searchRes.json();
  const title = searchData?.query?.search?.[0]?.title;
  if (!title) return null;
  const summaryRes = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replace(/ /g, "_"))}`,
  );
  if (!summaryRes.ok) return null;
  const summary = await summaryRes.json();
  const extract = typeof summary?.extract === "string" ? summary.extract.trim() : "";
  if (!extract) return null;
  return `${extract} (Source: Wikipedia — “${title}”, for general context only.)`;
}

async function resolveMarketingAnswer(question, files = []) {
  let demo = localDemoAnswer(question);
  if (files.length && !question.trim()) {
    demo = `I received ${files.length} file${files.length > 1 ? "s" : ""} (${files.map((f) => f.name).join(", ")}). In the full product I would extract entry data, invoices, and packing lists and map them to your workflow — this demo confirms the upload path only.`;
  } else if (files.length) {
    demo = `${demo}\n\nAttached: ${files.map((f) => f.name).join(", ")}.`;
  }
  const delay = new Promise((resolve) => setTimeout(resolve, 480));
  const wikiPromise = fetchWikipediaContext(question).catch(() => null);
  const [, wiki] = await Promise.all([delay, wikiPromise]);
  if (wiki && !KEYWORD_ANSWERS.some((rule) => rule.pattern.test(question))) {
    return `${demo}\n\n${wiki}`;
  }
  return demo;
}

function syncSubmitState() {
  const input = document.getElementById("marketing-agent-input");
  const send = document.querySelector("#marketing-agent-form .kn-chat-input__submit");
  if (!input || !send) return;
  const blocked = marketingComposer
    ? marketingComposer.isSubmitBlocked(input.value, { generating: answerLoading })
    : !input.value.trim() || answerLoading;
  send.disabled = blocked;
  send.classList.toggle("is-muted", blocked);
}

function setAnswerLoading(loading) {
  answerLoading = loading;
  const send = document.querySelector("#marketing-agent-form .kn-chat-input__submit");
  const form = document.getElementById("marketing-agent-form");
  if (send) {
    send.dataset.generating = loading ? "true" : "";
    send.setAttribute("aria-busy", loading ? "true" : "false");
  }
  form?.setAttribute("aria-busy", loading ? "true" : "false");
  syncSubmitState();
  marketingGhost?.sync?.();
}

async function askMarketingInline(question, attachedFiles = []) {
  const q = String(question || "").trim();
  const files = Array.isArray(attachedFiles) ? attachedFiles.slice() : [];
  if ((!q && !files.length) || answerLoading) return;

  const { input } = marketingThreadEls();
  if (q) {
    marketingGhost?.recordSubmitted?.(q);
  }

  enterConversationMode();

  setAnswerLoading(true);

  if (input) {
    input.value = "";
    input.dispatchEvent(new Event("input", { bubbles: true }));
  }
  marketingGhost?.stopIdleCycle?.();
  marketingGhost?.sync?.();
  syncMarketingComposerPlaceholder();

  const userLine =
    q ||
    `Review the attached file${files.length > 1 ? "s" : ""}: ${files.map((file) => file.name).join(", ")}`;
  appendThreadMessages(userMessageHtml(userLine, files));

  const thinkingId = `marketing-thinking-${Date.now()}`;
  const reduceMotion = prefersReducedMotion();
  appendThreadMessages(
    assistantMessageHtml(reduceMotion ? thinkingDotsHtml() : rollingLoadingTextHtml(), thinkingId, {
      loading: true,
    }),
  );

  try {
    await delay(reduceMotion ? 100 : 1500);
    const prompt = q || userLine;
    const answer = await resolveMarketingAnswer(prompt, files);
    const thinkingNode = document.getElementById(thinkingId);
    fillAssistantMessage(thinkingNode, {
      body: textToBodyHtml(answer),
      related: followUpChipsHtml(prompt),
    });
    document.querySelector(".assist-kn-shell")?.dispatchEvent(
      new CustomEvent("klearassist:ask", { bubbles: true, detail: { question: prompt, answer, files } }),
    );
  } catch (_error) {
    fillAssistantMessage(document.getElementById(thinkingId), {
      body: "<p>I could not process that request right now. Please try again.</p>",
    });
  } finally {
    setAnswerLoading(false);
    marketingGhost?.sync?.();
    input?.focus({ preventScroll: true });
  }
}

function dispatchQuestion(text) {
  const files = marketingComposer?.getReadyFiles?.() || [];
  askMarketingInline(text, files);
  marketingComposer?.clear?.();
  hideComposerError();
}

function initMarketingAgent() {
  const shell = document.querySelector(".assist-kn-shell");
  if (!shell) return;

  const greetingEl = document.getElementById("marketing-agent-greeting");
  if (greetingEl) greetingEl.textContent = greetingCopy();

  renderMarketingCards();
  initMarketingGhost();

  marketingComposer = window.MarketingComposerFiles?.init(marketingChatInputRoot(), {
    onSync: () => syncSubmitState(),
    showError: showComposerError,
    hideError: hideComposerError,
  });

  marketingChatInputRoot()?.querySelector("[data-agentic-error-dismiss]")?.addEventListener("click", hideComposerError);

  const input = document.getElementById("marketing-agent-input");
  const form = document.getElementById("marketing-agent-form");
  const cards = document.getElementById("marketing-agent-cards");

  input?.addEventListener("input", () => {
    syncSubmitState();
    marketingGhost?.sync?.();
  });

  input?.addEventListener("keydown", (event) => {
    if (window.KNAgentGhost?.handleKeydown?.(event)) return;
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      const send = form?.querySelector(".kn-chat-input__submit");
      if (send?.disabled) return;
      form?.requestSubmit();
    }
  });

  cards?.addEventListener("click", (event) => {
    window.KNNextActions?.handleClick?.(event, {
      onPrompt: (query) => askMarketingInline(query),
    });
  });

  document.getElementById("marketing-agent-messages")?.addEventListener("click", (event) => {
    const chip = event.target.closest("[data-marketing-followup]");
    if (!chip) return;
    event.preventDefault();
    askMarketingInline(chip.getAttribute("data-marketing-followup") || "");
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    dispatchQuestion(input?.value || "");
  });

  syncSubmitState();
  marketingGhost?.startIdleCycle?.();
}

initMarketingAgent();
