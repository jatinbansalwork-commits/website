const navLinks = [
  { label: 'Enterprise', href: 'https://www.coderabbit.ai/enterprise' },
  { label: 'Triage', href: 'https://www.coderabbit.ai/triage' },
  { label: 'Change Stack', href: 'https://www.coderabbit.ai/change-stack' },
  { label: 'Security', href: 'https://www.coderabbit.ai/security' },
  { label: 'Customers', href: 'https://www.coderabbit.ai/customers' },
  { label: 'Pricing', href: 'https://www.coderabbit.ai/pricing' },
  { label: 'Blog', href: 'https://www.coderabbit.ai/blog' },
];

const CodeRabbitSiteHeader = () => (
  <header className="cr-site-header">
    <div className="container cr-site-header__inner">
      <a className="cr-site-header__brand" href="https://www.coderabbit.ai/">
        <img
          src="https://www.coderabbit.ai/press-kit/coderabbit-mark-orange.svg"
          alt=""
          width={28}
          height={28}
        />
        <span>CodeRabbit</span>
      </a>
      <nav className="cr-site-header__nav" aria-label="Primary navigation">
        {navLinks.map((link) => (
          <a key={link.label} href={link.href}>
            {link.label}
          </a>
        ))}
        <button type="button" className="cr-site-header__resources">
          Resources
          <svg viewBox="0 0 12 12" aria-hidden="true">
            <path
              d="M2.5 4.5 6 8l3.5-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </nav>
      <div className="cr-site-header__actions">
        <a className="cr-site-header__login" href="https://app.coderabbit.ai/login">
          Log In
        </a>
        <a className="cr-site-header__cta" href="https://app.coderabbit.ai/login">
          Get a free trial →
        </a>
      </div>
    </div>
  </header>
);

export default CodeRabbitSiteHeader;
