import { featuredCustomerQuote, socialProofLogos } from './socialProofData';

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z"
      clipRule="evenodd"
    />
  </svg>
);

const LogoCell = ({ logo }: { logo: (typeof socialProofLogos)[number] }) => (
  <div
    className={`cr-social-proof__logo${logo.caseStudyHref ? ' cr-social-proof__logo--linked' : ''}${logo.monochrome === false ? ' cr-social-proof__logo--color' : ''}`}
  >
    <img src={logo.asset} alt="" loading="lazy" decoding="async" />
    {logo.caseStudyHref ? (
      <>
        <span className="cr-social-proof__logo-link-icon" aria-hidden="true">
          <ExternalLinkIcon />
        </span>
        <a
          className="cr-social-proof__logo-link"
          href={logo.caseStudyHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Read the ${logo.label} case study in a new tab`}
        >
          <span className="sr-only">Read the {logo.label} case study in a new tab</span>
        </a>
      </>
    ) : null}
  </div>
);

const KlearNowSocialProof = () => (
  <div className="cr-social-proof" aria-label="Customer social proof">
    <div className="container cr-social-proof__spacer" aria-hidden="true" />
    <div className="container cr-social-proof__inner">
      <div className="cr-social-proof__stack">
        <div className="cr-social-proof__logo-panel">
          <div className="cr-social-proof__logo-grid" role="list">
            {socialProofLogos.map((logo) => (
              <LogoCell key={logo.id} logo={logo} />
            ))}
          </div>
        </div>

        <div className="cr-social-proof__lower">
          <div className="cr-social-proof__stats" aria-label="Platform metrics">
            <div className="cr-social-proof__stat">
              <p>
                <strong>26M+</strong>
                <span className="cr-social-proof__stat-label">Documents processed by AI</span>
              </p>
            </div>
            <div className="cr-social-proof__stat">
              <p>
                <strong>&gt;98%</strong>
                <span className="cr-social-proof__stat-label">Extraction accuracy</span>
              </p>
            </div>
            <div className="cr-social-proof__stat cr-social-proof__stat--combined">
              <p>
                <strong>$88.3B</strong>
                <span className="cr-social-proof__stat-label">
                  Total value processed through the platform
                </span>
              </p>
              <p>
                <strong>80+</strong>
                <span className="cr-social-proof__stat-label">
                  Countries supported by KlearNow products
                </span>
              </p>
            </div>
          </div>

          <figure className="cr-social-proof__quote" aria-label="Ford customer quote">
            <div className="cr-social-proof__quote-body">
              <div className="cr-social-proof__quote-mark" aria-hidden="true">
                “
              </div>
              <blockquote>
                <p>{featuredCustomerQuote.quote}</p>
              </blockquote>
              <figcaption>
                <p className="cr-social-proof__quote-attribution">{featuredCustomerQuote.name}</p>
                <div className="cr-social-proof__quote-brand">
                  <img src={featuredCustomerQuote.logo} alt="" height={22} />
                  <span>{featuredCustomerQuote.brand}</span>
                </div>
              </figcaption>
            </div>
            <a
              className="cr-social-proof__quote-link"
              href={featuredCustomerQuote.storyHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read the Ford customer story in a new tab"
            >
              <span className="sr-only">Read the Ford customer story in a new tab</span>
            </a>
            <span className="cr-social-proof__quote-external" aria-hidden="true">
              <ExternalLinkIcon />
            </span>
          </figure>
        </div>

        <div className="cr-social-proof__color-bar" aria-hidden="true">
          <span className="cr-social-proof__color-bar-segment is-deep-green" />
          <span className="cr-social-proof__color-bar-segment is-green" />
          <span className="cr-social-proof__color-bar-segment is-teal" />
          <span className="cr-social-proof__color-bar-segment is-orange" />
          <span className="cr-social-proof__color-bar-segment is-peach" />
          <span className="cr-social-proof__color-bar-segment is-cream" />
        </div>
      </div>
    </div>
  </div>
);

export default KlearNowSocialProof;
