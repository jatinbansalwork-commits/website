/**
 * Stroke icons for home tier lists — keep in sync with src/lib/klear-stroke-icons.ts
 * (24×24 viewBox, 1.5 stroke, round caps, icon-chip--bare @ 22px).
 */
const WRAP =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ccg5yoga>';

export const tierListIcons = {
  'tier-body-0': [
    // Data ingestion & normalization
    `${WRAP}<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v4c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 9v4c0 1.7 3.6 3 8 3s8-1.3 8-3V9"/><path d="M12 13v8"/><path d="m9 18 3 3 3-3"/></svg>`,
    // Tariff & duty intelligence
    `${WRAP}<path d="M3 3v18h18"/><path d="m7 15 3-3 3 3 4-5"/><path d="M17 10h3v3"/></svg>`,
    // Classification & trade-program data
    `${WRAP}<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><path d="M7 7h.01"/></svg>`,
    // Supplier & product-level insight
    `${WRAP}<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96 12 12.01l8.73-5.05"/><path d="M12 22.08V12"/></svg>`,
  ],
  'tier-body-1': [
    // Autonomous clearance & filing
    `${WRAP}<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="m9 15 2 2 4-4"/></svg>`,
    // Track & trace + drayage
    `${WRAP}<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/><path d="M5 8h4"/></svg>`,
    // Exposure & landed-cost analytics
    `${WRAP}<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>`,
    // Exception-only human review
    `${WRAP}<path d="M4 22V4"/><path d="M4 4h11l-1.5 3L15 10H4"/></svg>`,
  ],
  'tier-body-2': [
    // US & global customs brokerage
    `${WRAP}<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    // Post-entry audit & duty recovery
    `${WRAP}<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><circle cx="10.5" cy="15.5" r="2.5"/><path d="m12.5 17.5 4 4"/></svg>`,
    // Managed trade compliance
    `${WRAP}<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
    // Drayage & delivery execution
    `${WRAP}<path d="M10 17h4"/><path d="M3 9h11v8H3z"/><path d="M14 9h4l3 4v4h-7V9z"/><circle cx="7.5" cy="18" r="1.5"/><circle cx="17.5" cy="18" r="1.5"/></svg>`,
  ],
};

export function applyTierListIcons(html) {
  let h = html;
  for (const [bodyId, icons] of Object.entries(tierListIcons)) {
    const start = h.indexOf(`id="${bodyId}"`);
    if (start < 0) continue;
    const ulStart = h.indexOf('<ul class="tier__list"', start);
    const ulEnd = h.indexOf('</ul>', ulStart) + 5;
    let ul = h.slice(ulStart, ulEnd);
    let i = 0;
    ul = ul.replace(/<svg viewBox="0 0 24 24"[\s\S]*?<\/svg>/g, (match) => {
      if (i >= icons.length) return match;
      return icons[i++];
    });
    h = h.slice(0, ulStart) + ul + h.slice(ulEnd);
  }
  return h;
}
