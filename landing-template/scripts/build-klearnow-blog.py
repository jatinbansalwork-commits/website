#!/usr/bin/env python3
"""Regenerate blog listing cards and blog-post.html from KlearNow article data."""
from __future__ import annotations

import html
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
POST_HREF = "/blog-post.html"
VER = "20260959"
THUMB_COUNT = 18

ARTICLE_ROWS = [
    ("How AI is transforming customs document processing", "Product", "18/9/2026", "6 min"),
    ("ABI entry filing: a practical guide for first-time importers", "Customs", "12/9/2026", "8 min"),
    ("Five signs your trade compliance workflow needs automation", "Trade Compliance", "5/9/2026", "5 min"),
    ("ISF 10+2: what importers should verify before cargo sails", "Customs", "28/8/2026", "7 min"),
    ("Reducing customs clearance delays at the port of entry", "Logistics", "21/8/2026", "6 min"),
    ("HTS classification errors that commonly trigger CBP reviews", "Trade Compliance", "14/8/2026", "9 min"),
    ("KlearHub: one view of shipment and document status", "Product", "7/8/2026", "4 min"),
    ("Broker collaboration without email attachment overload", "Logistics", "31/7/2026", "5 min"),
    ("Supply chain documentation lessons from the last five years", "Logistics", "24/7/2026", "7 min"),
    ("Denied party screening basics for growing import teams", "Trade Compliance", "17/7/2026", "6 min"),
    ("Managed trade vs. in-house filing: how to decide", "Product", "10/7/2026", "8 min"),
    ("Preparing for a CBP examination: document checklist", "Customs", "3/7/2026", "5 min"),
    ("ACE modernization: what filers should plan for next", "Customs", "26/6/2026", "6 min"),
    ("How freight forwarders scale customs with digitization", "Logistics", "19/6/2026", "7 min"),
    ("Section 321 de minimis: eligibility and common pitfalls", "Trade Compliance", "12/6/2026", "5 min"),
    ("Why poor shipment data quality breaks customs clearance", "Trade Compliance", "5/6/2026", "6 min"),
    ("Self-filers: when to partner with a licensed broker", "Customs", "29/5/2026", "7 min"),
    ("Automating commercial invoice extraction from PDF packs", "Product", "22/5/2026", "4 min"),
]

CATEGORIES = ["Customs", "Trade Compliance", "Logistics", "Product"]


def thumb_path(index: int) -> str:
    n = (index % THUMB_COUNT) + 1
    return f"/blog/thumb-{n:02d}.jpg?v={VER}"


def build_articles() -> list[dict]:
    articles = []
    for i, (title, category, date, mins) in enumerate(ARTICLE_ROWS):
        articles.append(
            {
                "title": title,
                "category": category,
                "date": date,
                "mins": mins,
                "img": thumb_path(i),
            }
        )
    return articles


ARTICLES = build_articles()


def grid_item(article: dict) -> str:
    t = html.escape(article["title"])
    c = html.escape(article["category"])
    d = html.escape(article["date"])
    m = html.escape(article["mins"])
    img = html.escape(article["img"])
    alt = html.escape(article["title"])
    return f'''<div role="listitem" class="ressources-cta-collection-item w-dyn-item"><a href="{POST_HREF}" class="blog-post-wrapper w-inline-block"><img alt="{alt}" src="{img}" loading="lazy" width="1200" height="675" sizes="(max-width:767px) 100vw, 33vw" class="all-blog_post-image"/><div class="all-blog_text-container"><div class="latest-blog_category-container"><div fs-cmsfilter-field="category">{c}</div></div><h3 fs-cmsfilter-field="name" class="heading-style-h4">{t}</h3><div class="latest-blog_infos-container"><div>{d}</div><div class="latest-blog_infos-separator"></div><div class="latest-blog_infos-duration-text is-read-time">{m}</div></div></div></a></div>'''


def featured_item(article: dict, variant: str) -> str:
    t = html.escape(article["title"])
    c = html.escape(article["category"])
    d = html.escape(article["date"])
    m = html.escape(article["mins"])
    img = html.escape(article["img"])
    alt = html.escape(article["title"])
    loading = "eager" if variant in ("hero", "side") else "lazy"
    fetch = ' fetchpriority="high"' if variant == "hero" else ""
    desc_class = "latest-blog_description-container is-absolute" if variant == "hero" else "latest-blog_description-container is-100"
    wrap_class = "latest-blog_collection-list-wrapper blog-page w-dyn-list" if variant == "hero" else "latest-blog_collection-list-wrapper w-dyn-list"
    return f'''<div class="{wrap_class}"><div role="list" class="latest-blog_collection-list w-dyn-items"><div role="listitem" class="latest-blog_collection-item w-dyn-item"><a href="{POST_HREF}" class="blog-post-wrapper w-inline-block"><img src="{img}" loading="{loading}"{fetch} alt="{alt}" width="1200" height="675" sizes="(max-width:991px) 100vw, 50vw" class="latest-blog_image"/><div class="{desc_class}"><div class="latest-blog_category-container"><div>{c}</div></div><h3 class="heading-style-h4 latest-blog-post_text">{t}</h3><div class="latest-blog_infos-container"><div>{d}</div><div class="latest-blog_infos-separator"></div><div class="latest-blog_infos-duration-text is-read-time">{m}</div></div></div></a></div></div></div>'''


def filter_radios() -> str:
    parts = [
        '''<label class="fs-radio_field-2 w-radio"><div class="w-form-formradioinput w-form-formradioinput--inputType-custom fs-radio_button-2 w-radio-input w--redirected-checked"></div><input type="radio" name="Radio-1" id="Radio-All" data-name="Radio 1" style="opacity:0;position:absolute;z-index:-1" checked="" value="Radio All"/><span fs-cmsfilter-active="is-active" fs-cmsfilter-element="clear" class="fs-radio_label-2 w-form-label" for="Radio-All">All categories</span></label>'''
    ]
    for i, cat in enumerate(CATEGORIES):
        cid = f"Radio-{i}"
        parts.append(
            f'''<label class="fs-radio_field-2 w-radio"><div class="w-form-formradioinput w-form-formradioinput--inputType-custom fs-radio_button-2 w-radio-input"></div><input type="radio" name="Radio-1" id="{cid}" data-name="Radio 1" style="opacity:0;position:absolute;z-index:-1" value="{cid}"/><span fs-cmsfilter-field="category" fs-cmsfilter-active="is-active" class="fs-radio_label-2 w-form-label" for="{cid}">{html.escape(cat)}</span></label>'''
        )
    return "".join(parts)


def listing_sections() -> str:
    featured = featured_item(ARTICLES[0], "hero") + featured_item(ARTICLES[1], "side")
    grid = "".join(grid_item(a) for a in ARTICLES)
    return f'''<div class="section_latest-blog"><div class="padding-global"><div class="container-large"><div class="padding-section-medium"><div class="latest-blog_flex"><div class="latest-blog-text"><h1>Latest articles</h1><div class="text-size-medium">Insights on customs, trade compliance, and logistics from KlearNow.</div></div></div><div class="latest-blog_grid">{featured}</div></div></div></div></div><div id="section_all-post" class="section_all-blog-post"><div class="padding-global"><div class="container-large"><div class="padding-section-medium padding-bottom"><div fs-cmsfilter-element="filters" class="form-block w-form"><form id="email-form" name="email-form" data-name="Email Form" method="get"><div class="all-blog-post_flex"><div class="all-blog-post_heading-container"><h2 class="heading-style-h2">All articles</h2></div><div class="all-blog-post_grid"><div class="all-blog-post_article-container"><div class="fs-radio_column-2">{filter_radios()}</div><div class="all-blog-post_article-searchbar-container"><input class="fs-search_field-1 w-input" maxlength="256" name="field" fs-cmsfilter-field="*" data-name="Field" aria-label="Search articles" placeholder="Search" type="text" id="field"/></div><div fs-cmsfilter-element="list" class="ressources-cta-collection-list-wrapper w-dyn-list"><div role="list" class="ressources-cta-collection-list w-dyn-items">{grid}</div></div></div></div></div></form><div class="w-form-done"><div>Thank you! Your submission has been received!</div></div><div class="w-form-fail"><div>Oops! Something went wrong while submitting the form.</div></div></div></div></div></div></div>'''


def patch_blog_html() -> None:
    blog_path = ROOT / "blog.html"
    text = blog_path.read_text()
    start = text.find('<div class="section_latest-blog">')
    end = text.find('<div class="section_cta">', start)
    if start < 0 or end < 0:
        raise SystemExit("Could not find blog sections in blog.html")
    text = text[:start] + listing_sections() + text[end:]
    text = re.sub(r"klearnow-blog\.css\?v=\d+", f"klearnow-blog.css?v={VER}", text, count=1)
    blog_path.write_text(text)
    print("Updated", blog_path)


def build_post_html() -> None:
    template = (ROOT / "why-klearnow.html").read_text()
    main_tag = '<main class="main-wrapper">'
    main_start = template.find(main_tag)
    cta_start = template.find('<div class="section_cta">', main_start)
    footer_start = template.find('<div class="section_footer">', main_start)
    close_main = template.find("</main>", footer_start)

    related = "".join(grid_item(a) for a in ARTICLES[1:3])

    post_title = "Running import operations: what teams should watch closely"
    post_date = "8/11/2025"
    post_read = "7 min"
    post_img = thumb_path(8)

    post_body = f'''<div class="section_breadscrum"><div class="padding-global"><div class="container-large"><div class="padding-section-xxsmall padding-top"><div class="breadscrum_flex"><div class="breadscrum_item"><a href="/blog.html" aria-label="Blog" class="breadscrum_link w-inline-block"><div class="text-size-small">Blog</div></a><div class="icon-1x1-xsmall flex-center ariane w-embed"><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="12" height="12" viewBox="0 0 24 24"><path fill="currentColor" d="M6.23 20.23L8 22l10-10L8 2L6.23 3.77L14.46 12z"></path></svg></div><a href="{POST_HREF}" aria-current="page" class="breadscrum_link w-inline-block w--current"><div class="text-size-small">{html.escape(post_title)}</div></a></div></div></div></div></div><div class="section_blog-article"><div class="blog-post-wrapper"><section class="section_hero"><div class="padding-global"><div class="container-large"><div class="hero_container"><div class="hero_padding blog_page"><div class="hero_blog-description"><h1 class="heading-style-h1 text-align-center">{html.escape(post_title)}</h1><div class="hero_blog-infos-flex"><p class="text-size-regular">{post_date}</p><div class="latest-blog_infos-separator"></div><p class="text-size-regular text-color-blue">{post_read}</p></div><div class="hero_blog-image-container"><img src="{post_img}" loading="eager" alt="{html.escape(post_title)}" width="1200" height="675" sizes="100vw" class="hero_blog-image"/></div></div></div></div></div></section><div class="section_body-text"><div class="padding-global"><div class="container-large"><div class="padding-section-small"><div class="blog_grid"><div class="blog_sidebar"><div class="blog_sidebar-cta kn-blog-sidebar-cta"><div class="heading-style-h5">Ready to modernize your customs workflow?</div><a href="/talk-to-klear.html" class="button-v2 is-large is-icon is-navbar-desktop w-inline-block"><div>Talk to Klear</div><div class="icon-1x1-medium w-embed"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.58008 16.59L13.1701 12L8.58008 7.41L10.0001 6L16.0001 12L10.0001 18L8.58008 16.59Z" fill="currentcolor"/></svg></div></a></div></div><div class="blog_content"><div fs-toc-hideurlhash="true" fs-toc-element="contents" fs-toc-offsettop="8rem" class="blog-post-container w-richtext"><p>Global trade teams operate under tighter timelines, more document types, and higher scrutiny at the border than ever before. Whether you file in-house or with a broker partner, the same operational risks show up again and again.</p><p>In this article we outline practical checkpoints for importers and logistics leaders—covering data quality, compliance handoffs, and how AI-assisted document processing fits into a modern clearance workflow.</p><p><strong>◊ Document quality at the source</strong></p><p>Commercial invoices, packing lists, and bills of lading often arrive in inconsistent formats. Normalizing fields early—seller, consignee, Incoterms, line-level HTS hints—reduces rework before ABI or partner filing. Teams that treat document intake as a controlled process see fewer holds and faster release.</p><p><strong>◊ Compliance ownership</strong></p><p>Trade compliance is not only a legal function. Operations, procurement, and finance all influence classification, valuation, and origin documentation. Clear ownership for each shipment milestone prevents last-minute escalations when cargo is already at port.</p><p><strong>◊ Broker and forwarder collaboration</strong></p><p>Email threads with duplicate PDFs remain the default for many shippers. A shared system of record for shipment status, missing documents, and filing outcomes cuts cycle time and improves audit readiness.</p><p><strong>◊ Automation where it helps</strong></p><p>Machine learning excels at extracting structured data from unstructured trade documents—not at replacing licensed judgment on classification. The best implementations keep experts in the loop while automating repetitive capture and validation.</p><p><strong>◊ Conclusion</strong></p><p>Strong import operations combine disciplined data, clear roles, and tooling that connects documents to decisions. KlearNow helps teams process trade documents with AI, file U.S. entries, and collaborate across brokers and forwarders from a single platform.</p></div></div></div><div class="section_blog-author-grid"><div class="div-block-262"><div class="text-size-regular text-weight-medium">Published by</div></div><div class="div-block-261"><div class="author_flex"><img src="/klearnow-mark-blue.svg" loading="lazy" alt="KlearNow" class="author_image kn-author-mark"/></div><div class="author_link-flex"><a rel="nofollow" href="https://in.linkedin.com/company/klearnow-corp" target="_blank" class="author_link w-inline-block"><div class="icon-1x1-small w-embed"><svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.28567 5.9795H8.76167V7.21283C9.11834 6.5035 10.033 5.86616 11.407 5.86616C14.041 5.86616 14.6663 7.27816 14.6663 9.86883V14.6668H11.9997V10.4588C11.9997 8.9835 11.643 8.1515 10.735 8.1515C9.47567 8.1515 8.95234 9.04816 8.95234 10.4582V14.6668H6.28567V5.9795ZM1.71301 14.5535H4.37967V5.86616H1.71301V14.5535Z" fill="currentcolor"/></svg></div></a></div></div></div></div></div></div></div></div></div></div><div class="section_latest-blog"><div class="padding-global"><div class="container-large"><div class="padding-section-medium"><div class="latest-blog_flex"><div class="latest-blog-text"><h2 class="heading-style-h2">Related articles</h2></div></div><div fs-cmsfilter-element="list" class="ressources-cta-collection-list-wrapper w-dyn-list"><div role="list" class="ressources-cta-collection-list w-dyn-items kn-related-grid">{related}</div></div></div></div></div></div>'''

    head = template[:main_start]
    head = re.sub(r"<title>[^<]+</title>", "<title>Article | KlearNow Blog</title>", head, count=1)
    assets = f'''
<link href="/klearnow-blog.css?v={VER}" rel="stylesheet" type="text/css"/>
'''
    if "klearnow-blog.css" not in head:
        head = head.replace("</head>", assets + "</head>", 1)
    head = re.sub(r"klearnow-boot\.js\?v=\d+", f"klearnow-boot.js?v={VER}", head, count=1)

    cta = template[cta_start:footer_start]
    footer_block = template[footer_start:close_main]
    tail = template[close_main:]

    page = head + main_tag + post_body + cta + footer_block + tail
    page = page.replace(
        'href="#" class="footer_link w-inline-block"><div>Blogs</div>',
        'href="/blog.html" class="footer_link w-inline-block"><div>Blogs</div>',
    )
    (ROOT / "blog-post.html").write_text(page)
    print("Wrote", ROOT / "blog-post.html")


if __name__ == "__main__":
    patch_blog_html()
    build_post_html()
