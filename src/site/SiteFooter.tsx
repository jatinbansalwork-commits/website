import BorderRuleStatsSection from './coderabbit/BorderRuleStatsSection';
import FaqSection from './coderabbit/FaqSection';
import MergeAutomationSection from './coderabbit/MergeAutomationSection';

const footerColumns = [
  {
    title: 'Company',
    links: [
      { label: 'About us', href: '#about-us' },
      { label: 'Customs brokers', href: '#customs-brokers' },
      { label: 'Technology partners', href: '#technology-partners' },
      { label: 'Careers', href: '#careers' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Product',
    links: [
      { label: 'KlearData', href: '#kleardata' },
      { label: 'Klearhub', href: '#klearhub' },
      { label: 'Managed Trade', href: '#managed-trade' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Why KlearNow', href: '#why-klearnow' },
      { label: 'Blogs', href: '#blogs' },
      { label: 'News', href: '#news' },
      { label: 'Videos', href: '#videos' },
      { label: 'Webinars', href: '#webinars' },
      { label: 'Case studies', href: '#case-studies' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
];

const SiteFooter = () => {
  return (
    <footer className="cr-footer">
      <BorderRuleStatsSection />
      <MergeAutomationSection />
      <FaqSection />
      <div className="container cr-footer-inner">
        <div className="cr-footer-grid">
          <div className="cr-footer-brand">
            <a className="cr-logo cr-footer-logo" href="#content" aria-label="KlearNow home">
              <img className="cr-logo-lockup" src="/brand/klearnow-lockup.png" alt="" />
              <img className="cr-logo-icon" src="/brand/klearnow-icon.png" alt="" />
              <img className="cr-logo-lockup cr-logo-lockup-dark" src="/brand/klearnow-lockup-dark.png" alt="" />
              <img className="cr-logo-icon cr-logo-icon-dark" src="/brand/klearnow-icon-dark.png" alt="" />
              <span className="cr-logo-mark" aria-hidden="true" />
              <span className="cr-logo-word">KlearNow</span>
            </a>
            <div className="cr-footer-brand-meta">
              <p className="cr-footer-address">
                999 W Taylor Street, Suite A,
                <br />
                San Jose, CA 95126, USA
              </p>
              <a
                className="cr-footer-social"
                href="https://in.linkedin.com/company/klearnow-corp"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View our LinkedIn page"
              >
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.286 5.98h2.476v1.233c.357-.709 1.271-1.346 2.645-1.346 2.634 0 3.26 1.412 3.26 4.003v4.798H11.6v-4.208c0-1.475-.357-2.307-1.265-2.307-1.259 0-1.782.897-1.782 2.307v4.208H6.286V5.98ZM1.713 14.554h2.667V5.866H1.713v8.688ZM4.762 3.034a1.333 1.333 0 1 1-2.667 0 1.333 1.333 0 0 1 2.667 0Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </div>

          {footerColumns.map((column) => {
            const headingId = `${column.title.toLowerCase().replaceAll(' ', '-')}-footer-heading`;
            return (
              <nav key={column.title} className="cr-footer-nav" aria-labelledby={headingId}>
                <h2 className="cr-footer-heading" id={headingId}>
                  {column.title}
                </h2>
                <ul className="cr-footer-link-list">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a className="cr-footer-link" href={link.href}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            );
          })}
        </div>

        <div className="cr-footer-band">
          <div className="cr-wordmark" aria-hidden="true">
            <svg
              viewBox="0 0 1440 129"
              preserveAspectRatio="xMinYMid slice"
              focusable="false"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="klear-wordmark-pattern-fade"
                  gradientUnits="userSpaceOnUse"
                  x1="720"
                  y1="0"
                  x2="720"
                  y2="129"
                >
                  <stop offset="0%" className="cr-wordmark-fade-stop cr-wordmark-fade-stop-top" />
                  <stop offset="100%" className="cr-wordmark-fade-stop cr-wordmark-fade-stop-bottom" />
                </linearGradient>
                <pattern
                  id="klear-wordmark-pattern"
                  x="0"
                  y="0"
                  width="520"
                  height="129"
                  patternUnits="userSpaceOnUse"
                >
                  <text
                    className="cr-wordmark-pattern-text"
                    x="0"
                    y="98"
                    fill="url(#klear-wordmark-pattern-fade)"
                  >
                    KlearNow
                  </text>
                </pattern>
              </defs>
              <rect width="1440" height="129" fill="url(#klear-wordmark-pattern)" />
            </svg>
          </div>

          <div className="cr-footer-base">
            <p>© KlearNow 2026. All Rights Reserved</p>
            <a className="cr-footer-legal-link" href="#privacy-policy">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
