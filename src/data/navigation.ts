import {
  klearOperationNavHrefs,
  klearProductNavHrefs,
  klearSiteNavHrefs,
} from './klear-nav-urls';

/** Label for the services mega-menu book CTA (still links to /get-in-touch/). */
export const servicesNavBookCta = 'Ask Klear' as const;

/** Mobile / panel accordion heading (was Legency “Services”). */
export const servicesNavAccordionLabel = 'Service model' as const;

export const siteNav = [
  { href: klearSiteNavHrefs.home, label: 'Home' },
  { href: klearSiteNavHrefs.postEntryAudit, label: 'Post-Entry Audit', disabled: true },
  { href: klearSiteNavHrefs.tariffCalcultor, label: 'Tariff Calcultor', disabled: true },
  { href: klearSiteNavHrefs.coverage, label: 'Coverage', disabled: true },
  { href: klearSiteNavHrefs.blog, label: 'Blog', disabled: true },
  { href: klearSiteNavHrefs.resources, label: 'Resources', disabled: true },
  { href: klearSiteNavHrefs.getInTouch, label: 'Get in touch' },
] as const;

export const serviceGroups = [
  {
    label: 'Products',
    links: [
      {
        href: klearProductNavHrefs.klearData,
        title: 'KlearData',
        blurb: 'Turn every document into filing-ready data',
      },
      {
        href: klearProductNavHrefs.klearHub,
        title: 'KlearHub',
        blurb: 'The software gathering trade compliance globally',
      },
      {
        href: klearProductNavHrefs.managedTrade,
        title: 'Managed Trade',
        blurb: 'Our licensed broker runs it for you',
      },
    ],
  },
  {
    label: 'Operation TYpe',
    links: [
      {
        href: klearOperationNavHrefs.freightForwarders,
        title: 'Freight Forwarders',
        blurb: 'AI-driven clearance workflow',
      },
      {
        href: klearOperationNavHrefs.customBrokers,
        title: 'Custom Brokers',
        blurb: 'File Faster, Fewer Errors',
      },
      {
        href: klearOperationNavHrefs.tradeCompliance,
        title: 'Trade Compliance',
        blurb: 'Real-TIme import Visibilty',
      },
      {
        href: klearOperationNavHrefs.selfFilers,
        title: 'Self Filers',
        blurb: 'Clean Data, Faster Filing',
      },
    ],
  },
] as const;

export const footerColumns = [
  {
    title: 'Websites',
    links: [
      { href: '/services/webflow-enterprise/', label: 'Webflow Enterprise' },
      { href: '/services/webflow-support/', label: 'Webflow support' },
      { href: '/services/wordpress-to-webflow-migration/', label: 'WordPress to Webflow' },
      { href: '/services/astro-agency/', label: 'Astro web development' },
      { href: '/b2b-web-design/', label: 'B2B web design' },
      { href: '/b2b-website-redesign/', label: 'B2B website redesign' },
      { href: '/saas-website-design/', label: 'SaaS website design' },
    ],
  },
  {
    title: 'Search & AI',
    links: [
      { href: '/services/search-ai-visibility/', label: 'Search & AI visibility' },
      { href: '/aeo-agency/', label: 'AEO agency' },
      { href: '/answer-engine-optimization/', label: 'Answer engine optimisation' },
      { href: '/services/technical-seo/', label: 'Technical SEO' },
      { href: '/ai-visibility-index/', label: 'AI visibility index' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: klearSiteNavHrefs.blog, label: 'Blogs', disabled: true },
      { href: klearSiteNavHrefs.resources, label: 'News', disabled: true },
      { href: klearSiteNavHrefs.resources, label: 'Videos', disabled: true },
      { href: klearSiteNavHrefs.resources, label: 'Webinars', disabled: true },
      { href: klearSiteNavHrefs.coverage, label: 'Case studies', disabled: true },
    ],
  },
  {
    title: 'Our Products',
    links: [
      { href: klearProductNavHrefs.klearData, label: 'KlearData' },
      { href: klearProductNavHrefs.klearHub, label: 'KlearHub' },
      { href: klearProductNavHrefs.managedTrade, label: 'Managed Trade' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about/', label: 'About Us' },
      { href: klearSiteNavHrefs.careers, label: 'Careers' },
      { href: klearSiteNavHrefs.getInTouch, label: 'Contact' },
    ],
  },
] as const;
