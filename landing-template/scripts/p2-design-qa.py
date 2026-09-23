#!/usr/bin/env python3
"""P2 design QA: copy, FR locale, cache bust, dedupe hero CSS on operation pages."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ASSET_VERSION = "20260922"
SPACING = ROOT / "public" / "klearnow-spacing.css"

# --- EN copy (operation-type EN mains only) ---
EN_COPY_BY_FILE: dict[str, list[tuple[str, str]]] = {
    "trade-compliance.html": [
        (
            "How KlearNow<br/>Empowers Freight Forwarders",
            "How KlearNow<br/>Supports Trade Compliance Teams",
        ),
        (
            "How KlearNow Empowers Freight Forwarders",
            "How KlearNow Supports Trade Compliance Teams",
        ),
        (
            "Overcoming Traditional Customs Challenges",
            "Overcoming Traditional Customs Challenges",
        ),
        (
            "This platform is ideal for importers who:",
            "This platform is ideal for importers who:",
        ),
        (
            "Make Customs Decisions in Real-Time Without IT Assistance",
            "Make Customs Decisions in Real-Time Without IT Assistance",
        ),
        (
            "Get Licensed Expertise and Automated Workflows To Work For You",
            "Get Licensed Expertise and Automated Workflows To Work For You",
        ),
    ],
}

# --- FR hero + legacy Crealo strings (is_fr-only main) ---
FR_HERO: dict[str, dict[str, str]] = {
    "freight-forwarders.html": {
        "badge": "Transitaires",
        "h1": "Automatisez le dédouanement et le porte-à-porte sur une seule plateforme",
        "sub": (
            "Des workflows pilotés par l'IA, de la réception documentaire "
            "jusqu'au transport terrestre."
        ),
    },
    "trade-compliance.html": {
        "badge": "Conformité commerciale",
        "h1": "Voyez ce qui dédouane, ce qui bloque et ce que ça coûte — en temps réel",
        "sub": (
            "Unifiez e-mails et documents en données d'importation consultables, "
            "avec statut de dédouanement, alertes d'exception et piste d'audit."
        ),
    },
    "self-filers.html": {
        "badge": "Importateurs",
        "h1": "Déclarez en nom propre plus vite, en toute confiance",
        "sub": (
            "Des données propres et des déclarations plus rapides pour les "
            "importateurs qui gèrent leurs entrées en douane."
        ),
    },
}

FR_LOGO_BLURB = (
    "Des équipes logistique, douane et conformité s'appuient sur KlearNow "
    "pour leurs importations."
)

FR_COMMON_REPLACEMENTS = [
    (
        "Suivez vos contrats de cession de droits ",
        "__FR_H1__",
    ),
    (
        "Accédez facilement à une vue d'ensemble de tous vos contrats de cession, "
        "suivez les échéances, surveillez les paiements et générez les factures.",
        "__FR_SUB__",
    ),
    (
        "Plus de 200 éditeurs de tous les segments simplifient leur gestion des "
        "droits d'auteur avec KlearNow",
        FR_LOGO_BLURB,
    ),
    (
        "Plus de 200 éditeurs de tous les segments simplifient leur gestion des "
        "droits d\u2019auteur avec KlearNow",
        FR_LOGO_BLURB,
    ),
    (
        "Plus de 200 éditeurs gèrent leurs droits d&#x27;auteur avec KlearNow",
        FR_LOGO_BLURB,
    ),
    (
        "Un tableau de bord détaillé pour l\u2019ensemble de vos cessions",
        "Tableau de bord en temps réel de vos importations",
    ),
    (
        "Notifications automatiques des échéances de contrats et de paiements",
        "Alertes automatiques sur les exceptions et les échéances",
    ),
    ("Facturation des droits simplifiée", "Validation documentaire simplifiée"),
    (
        "Contrôle du respect des conditions contractuelles",
        "Contrôle de conformité sur chaque dossier",
    ),
    ("Réduisez les délais de paiement", "Comment ça fonctionne"),
    (
        "Jusqu'à 70% de gain de temps dédié à la reddition des compte et à la "
        "gestion des droits",
        "Des résultats mesurables, jour après jour",
    ),
    (
        "Jusqu&#x27;à 70% de gain de temps dédié à la reddition des compte et à "
        "la gestion des droits",
        "Des résultats mesurables, jour après jour",
    ),
    (
        "Day after day, our customers gain in efficiency thanks to our services, "
        "your time is our priority.",
        "Nos clients gagnent en efficacité chaque jour — votre temps est notre "
        "priorité.",
    ),
    (
        "Découvrez pourquoi les équipes trade et douane choisissent KlearNow",
        "Pourquoi les équipes trade et douane choisissent KlearNow",
    ),
]

DUP_HERO_CSS = re.compile(
    r"\.section_hero\.background-color-white\s*\{[^}]+\}\s*"
    r"\.section_hero\.background-color-white::after\s*\{[^}]+\}\s*"
    r"\.section_hero \.hero_background-image\.is-earth-dots\s*\{[^}]+\}\s*"
    r"\.section_hero \.hero_padding,\s*"
    r"\.section_hero \.hero_text,\s*"
    r"\.section_hero \.container-large\s*\{[^}]+\}\s*",
    re.S,
)

TICKER_CSS_START = ".hero_text > .button-group {"
TICKER_CSS_END = "@media (prefers-reduced-motion: reduce) {\n  .hero_live-ticker::before,"


def strip_ticker_css(text: str) -> str:
    start = text.find(TICKER_CSS_START)
    if start == -1:
        return text
    end = text.find(TICKER_CSS_END, start)
    if end == -1:
        return text
    end = text.find("\n}\n", end)
    if end == -1:
        return text
    return text[:start] + text[end + 3 :]

TALK_HERO_CSS = re.compile(
    r"\.section_hero\.background-color-white\s*\{[^}]+\}\s*"
    r"\.section_hero\.background-color-white::after\s*\{[^}]+\}\s*"
    r"\.section_hero \.hero_padding,\s*"
    r"\.section_hero \.hero_text,\s*"
    r"\.section_hero \.container-large\s*\{[^}]+\}\s*",
    re.S,
)


def split_mains(text: str) -> tuple[str, str, str, str] | None:
    m = re.search(r"<main class=\"main-wrapper is_en-only\">", text)
    m2 = re.search(r"<main class=\"main-wrapper is_fr-only\">", text)
    if not m or not m2 or m2.start() <= m.start():
        return None
    return (
        text[: m.start()],
        text[m.start() : m2.start()],
        text[m2.start() :],
        text,
    )


def apply_en_copy(en_main: str, filename: str) -> str:
    for old, new in EN_COPY_BY_FILE.get(filename, []):
        en_main = en_main.replace(old, new)
    return en_main


def apply_fr_copy(fr_main: str, filename: str) -> str:
    meta = FR_HERO.get(filename)
    if not meta:
        return fr_main
    block = fr_main
    for old, new in FR_COMMON_REPLACEMENTS:
        block = block.replace(old, new)
    block = block.replace("__FR_H1__", meta["h1"])
    block = block.replace("__FR_SUB__", meta["sub"])
    # Eyebrow pill next to hero (first occurrence in FR hero)
    block = re.sub(
        r"(<div class=\"hero_padding\">.*?<div>)(Transitaires|Conformité commerciale|Importateurs)(</div>)",
        rf"\1{meta['badge']}\3",
        block,
        count=1,
        flags=re.S,
    )
    block = re.sub(
        r"(<h1 class=\"titre text-align-left\">)(.*?)(</h1>)",
        rf"\1{meta['h1']}\3",
        block,
        count=1,
        flags=re.S,
    )
    block = re.sub(
        r"(<div class=\"text-size-regular\">)(.*?)(</div><div class=\"hero_description-container\">)",
        rf"\1{meta['sub']}\3",
        block,
        count=1,
        flags=re.S,
    )
    return block


def fix_customer_logo_crealo(text: str) -> str:
    """Logo strip still had Crealo FR/EN copy with a highlighted 200."""
    plain = FR_LOGO_BLURB
    variants = [
        (
            "Plus de <span class=\"text-weight-bold text-color-blue\">200</span> "
            "éditeurs de tous les segments simplifient leur gestion des droits "
            "d\u2019auteur avec KlearNow"
        ),
        (
            "Plus de <span class=\"text-weight-bold text-color-blue\">200</span> "
            "éditeurs de tous les segments simplifient leur gestion des droits "
            "d\u2019auteur avec KlearNow "
        ),
    ]
    for old in variants:
        text = text.replace(old, plain)
    return text


def unify_asset_versions(text: str) -> str:
    text = re.sub(r"\?v=20260920\b", f"?v={ASSET_VERSION}", text)
    text = re.sub(r"\?v=20260921[a-z]?\b", f"?v={ASSET_VERSION}", text)
    return text


def strip_dup_css(text: str, *, operation: bool, talk: bool) -> str:
    if operation:
        text = DUP_HERO_CSS.sub("", text)
        if ".hero_live-ticker-wrap" in SPACING.read_text(encoding="utf-8"):
            text = strip_ticker_css(text)
    if talk:
        text = TALK_HERO_CSS.sub("", text)
    return text


def ensure_ticker_in_spacing() -> None:
    css = SPACING.read_text(encoding="utf-8")
    if ".hero_live-ticker-wrap" in css:
        return
    snippet = """

/* Hero live ticker (shared — was duplicated inline on many pages) */
.hero_text > .button-group {
  margin-bottom: 0;
}

.hero_live-ticker-wrap {
  display: flex;
  justify-content: center;
  margin-top: -0.75rem;
}

.hero_live-ticker {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  max-width: min(100%, 36rem);
  padding: 0.4rem 0.85rem 0.4rem 0.45rem;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, #fff 94%, var(--kn-primary)),
    color-mix(in srgb, #fff 82%, var(--kn-primary-soft))
  );
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid color-mix(in srgb, var(--kn-primary) 24%, #fff);
  box-shadow:
    0 1px 2px rgba(80, 110, 232, 0.05),
    0 10px 28px rgba(80, 110, 232, 0.11),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  color: var(--kn-text);
  font-size: 0.8125rem;
  line-height: 1.35;
  overflow: hidden;
}

.hero_live-ticker::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    105deg,
    transparent 38%,
    rgba(255, 255, 255, 0.65) 50%,
    transparent 62%
  );
  transform: translateX(-130%);
  animation: knTickerShimmer 5s ease-in-out infinite;
  pointer-events: none;
}

.hero_live-ticker-live {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  flex-shrink: 0;
  padding: 0.3rem 0.55rem;
  border-radius: 999px;
  background: color-mix(in srgb, #10b981 11%, #fff);
  border: 1px solid color-mix(in srgb, #10b981 32%, transparent);
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #047857;
}

.hero_live-ticker-dot {
  width: 0.4375rem;
  height: 0.4375rem;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.55);
  animation: knTickerPulse 2.2s ease-out infinite;
}

.hero_live-ticker-body {
  position: relative;
  z-index: 1;
  display: inline;
  min-width: 0;
}

.hero_live-ticker-num-wrap {
  display: inline;
  margin-right: 0.25em;
}

.hero_live-ticker-num {
  display: inline-block;
  color: var(--kn-text);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  font-size: inherit;
  line-height: inherit;
  min-width: 2ch;
}

.hero_live-ticker-num.is-tick {
  animation: knTickerNumPop 0.32s ease;
}

.hero_live-ticker-lbl {
  color: color-mix(in srgb, var(--kn-text) 72%, var(--kn-primary));
  letter-spacing: 0.005em;
}

@keyframes knTickerShimmer {
  0%, 72%, 100% { transform: translateX(-130%); }
  86% { transform: translateX(130%); }
}

@keyframes knTickerPulse {
  0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.55); }
  70% { box-shadow: 0 0 0 7px rgba(16, 185, 129, 0); }
  100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

@keyframes knTickerNumPop {
  0% { transform: scale(1); }
  45% { transform: scale(1.14); }
  100% { transform: scale(1); }
}
"""
    SPACING.write_text(css.rstrip() + snippet + "\n", encoding="utf-8")


def main() -> None:
    ensure_ticker_in_spacing()

    for path in sorted(ROOT.glob("**/*.html")):
        rel = path.relative_to(ROOT)
        original = path.read_text(encoding="utf-8")
        updated = unify_asset_versions(original)

        is_op = rel.parts[0] == "operation-type" if rel.parts else False
        if is_op:
            updated = fix_customer_logo_crealo(updated)
        is_talk = rel.name == "talk-to-klear.html"

        if is_op or is_talk:
            updated = strip_dup_css(updated, operation=is_op, talk=is_talk)

        if is_op:
            parts = split_mains(updated)
            if parts:
                before, en, fr_tail, _ = parts
                en = apply_en_copy(en, rel.name)
                fr = apply_fr_copy(fr_tail, rel.name)
                updated = before + en + fr

        if updated != original:
            path.write_text(updated, encoding="utf-8")
            print("updated", rel)

    # spacing css link version in HTML already bumped via unify; bump comment in spacing file header if any
    print("asset version", ASSET_VERSION)


if __name__ == "__main__":
    main()
