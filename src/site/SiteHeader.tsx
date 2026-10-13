import { useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';

const links = ['Tariff Calculator', 'Coverage', 'FAQ'];

const BROKERS_NAV_LABEL = 'Brokers & importers';

type ProductNavItem = {
  label: string;
  href?: string;
};

type RichNavItem = {
  label: string;
  description: string;
  href?: string;
};

type NavDropdownId = 'products' | 'brokers';

const products: ProductNavItem[] = [
  { label: 'KlearData', href: '#kleardata' },
  { label: 'Klearhub', href: '#klearhub' },
  { label: 'Managed Trade', href: '#managed-trade' },
];

const brokersAndImporters: RichNavItem[] = [
  {
    label: 'Customs brokers',
    description: 'Scale entry throughput and keep clients informed.',
    href: '#customs-brokers',
  },
  {
    label: 'Importers',
    description: 'See what is clearing, stuck, and what it costs.',
    href: '#importers',
  },
  {
    label: 'Freight forwarders',
    description: 'Clearance and port-to-door in one workflow.',
    href: '#freight-forwarders',
  },
  {
    label: 'Self-filers',
    description: 'Turn emails and PDFs into entry-ready data.',
    href: '#self-filers',
  },
];

const slug = (label: string) =>
  label
    .toLowerCase()
    .replaceAll('&', 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const itemHref = (item: { label: string; href?: string }) => item.href ?? `#${slug(item.label)}`;

const Chevron = ({ open }: { open: boolean }) => (
  <svg viewBox="0 0 12 12" aria-hidden="true" className={open ? 'is-open' : ''}>
    <path
      d="M2.5 4.5 6 8l3.5-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SiteHeader = () => {
  const [openDropdown, setOpenDropdown] = useState<NavDropdownId | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const productsPanelId = useId();
  const brokersPanelId = useId();
  const productsRef = useRef<HTMLDivElement>(null);
  const brokersRef = useRef<HTMLDivElement>(null);
  const productsTriggerRef = useRef<HTMLButtonElement>(null);
  const brokersTriggerRef = useRef<HTMLButtonElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const menuWasOpen = useRef(false);
  const hoverCloseTimerRef = useRef<number | null>(null);
  const hasProducts = products.length > 0;
  const hasBrokers = brokersAndImporters.length > 0;

  const canHoverOpenNav = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1280px)').matches;

  const clearHoverCloseTimer = () => {
    if (hoverCloseTimerRef.current !== null) {
      window.clearTimeout(hoverCloseTimerRef.current);
      hoverCloseTimerRef.current = null;
    }
  };

  const openDropdownOnHover = (id: NavDropdownId) => {
    if (!canHoverOpenNav()) return;
    clearHoverCloseTimer();
    setOpenDropdown(id);
  };

  const scheduleDropdownCloseOnHover = () => {
    if (!canHoverOpenNav()) return;
    clearHoverCloseTimer();
    hoverCloseTimerRef.current = window.setTimeout(() => setOpenDropdown(null), 140);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenDropdown(null);
        setMenuOpen(false);
      }
    };
    const onPointer = (event: MouseEvent) => {
      const target = event.target as Node;
      if (productsRef.current?.contains(target) || brokersRef.current?.contains(target)) return;
      setOpenDropdown(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onPointer);
      clearHoverCloseTimer();
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      menuWasOpen.current = true;
      document.getElementById(menuId)?.querySelector<HTMLElement>('a, button')?.focus({ preventScroll: true });
      return;
    }
    if (menuWasOpen.current) {
      menuWasOpen.current = false;
      menuToggleRef.current?.focus({ preventScroll: true });
    }
  }, [menuOpen, menuId]);

  const closeAll = () => {
    setOpenDropdown(null);
    setMenuOpen(false);
  };

  const toggleDropdown = (id: NavDropdownId) => {
    setOpenDropdown((current) => (current === id ? null : id));
  };

  const isPanelVisible = (panelId: string) => {
    const panel = document.getElementById(panelId);
    return Boolean(panel && panel.getClientRects().length > 0);
  };

  const focusPanelLink = (panelId: string, direction: 1 | -1) => {
    const panel = document.getElementById(panelId);
    const items = panel ? [...panel.querySelectorAll<HTMLAnchorElement>('a')] : [];
    if (!items.length) return;
    const active = document.activeElement;
    const index = items.findIndex((item) => item === active);
    const next = index === -1 ? 0 : (index + direction + items.length) % items.length;
    items[next]?.focus({ preventScroll: true });
  };

  const focusPanelLinkByIndex = (panelId: string, pickLast: boolean) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!isPanelVisible(panelId)) return;
        const panel = document.getElementById(panelId);
        const items = panel ? [...panel.querySelectorAll<HTMLAnchorElement>('a')] : [];
        const target = pickLast ? items.at(-1) : items[0];
        target?.focus({ preventScroll: true });
      });
    });
  };

  const onDropdownTriggerKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
    id: NavDropdownId,
    panelId: string,
    triggerRef: React.RefObject<HTMLButtonElement | null>,
  ) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setOpenDropdown(id);
      focusPanelLinkByIndex(panelId, false);
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setOpenDropdown(id);
      focusPanelLinkByIndex(panelId, true);
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      setOpenDropdown(null);
      triggerRef.current?.focus({ preventScroll: true });
    }
  };

  const onDropdownPanelKeyDown = (
    event: ReactKeyboardEvent<HTMLDivElement>,
    panelId: string,
    triggerRef: React.RefObject<HTMLButtonElement | null>,
  ) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusPanelLink(panelId, 1);
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      focusPanelLink(panelId, -1);
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      setOpenDropdown(null);
      triggerRef.current?.focus({ preventScroll: true });
    }
  };

  const productsOpen = openDropdown === 'products';
  const brokersOpen = openDropdown === 'brokers';

  return (
    <header className="cr-header">
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <div className="container container-header cr-header-surface">
        <div className="cr-bar">
          <a className="cr-logo" href="#content" aria-label="KlearNow home" onClick={closeAll}>
            <img className="cr-logo-lockup" src="/brand/klearnow-lockup.png" alt="" />
            <img className="cr-logo-icon" src="/brand/klearnow-icon.png" alt="" />
            <img className="cr-logo-lockup cr-logo-lockup-dark" src="/brand/klearnow-lockup-dark.png" alt="" />
            <img className="cr-logo-icon cr-logo-icon-dark" src="/brand/klearnow-icon-dark.png" alt="" />
            <span className="cr-logo-mark" aria-hidden="true" />
            <span className="cr-logo-word">Klear</span>
          </a>

          <nav className="cr-nav" aria-label="Primary navigation">
            <div
              className="cr-resources"
              ref={productsRef}
              onMouseEnter={() => openDropdownOnHover('products')}
              onMouseLeave={scheduleDropdownCloseOnHover}
            >
              {hasProducts ? (
                <button
                  ref={productsTriggerRef}
                  type="button"
                  className="cr-nav-link cr-resources-trigger"
                  aria-expanded={productsOpen}
                  aria-haspopup="true"
                  aria-controls={productsPanelId}
                  onClick={() => toggleDropdown('products')}
                  onKeyDown={(event) =>
                    onDropdownTriggerKeyDown(event, 'products', productsPanelId, productsTriggerRef)
                  }
                >
                  Products
                  <Chevron open={productsOpen} />
                </button>
              ) : (
                <a className="cr-nav-link" href="#products">
                  Products
                </a>
              )}
              {hasProducts && productsOpen ? (
                <div
                  className="cr-resources-panel"
                  id={productsPanelId}
                  onKeyDown={(event) => onDropdownPanelKeyDown(event, productsPanelId, productsTriggerRef)}
                >
                  <div className="cr-resources-card">
                    <ul className="cr-resources-list">
                      {products.map((item) => (
                        <li key={item.label}>
                          <a href={itemHref(item)} onClick={closeAll}>
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}
            </div>

            <a className="cr-nav-link" href={`#${slug('Post-Entry Audit')}`}>
              Post-Entry Audit
            </a>

            <div
              className="cr-resources"
              ref={brokersRef}
              onMouseEnter={() => openDropdownOnHover('brokers')}
              onMouseLeave={scheduleDropdownCloseOnHover}
            >
              {hasBrokers ? (
                <button
                  ref={brokersTriggerRef}
                  type="button"
                  className="cr-nav-link cr-resources-trigger"
                  aria-expanded={brokersOpen}
                  aria-haspopup="true"
                  aria-controls={brokersPanelId}
                  onClick={() => toggleDropdown('brokers')}
                  onKeyDown={(event) =>
                    onDropdownTriggerKeyDown(event, 'brokers', brokersPanelId, brokersTriggerRef)
                  }
                >
                  {BROKERS_NAV_LABEL}
                  <Chevron open={brokersOpen} />
                </button>
              ) : (
                <a className="cr-nav-link" href="#brokers-and-importers">
                  {BROKERS_NAV_LABEL}
                </a>
              )}
              {hasBrokers && brokersOpen ? (
                <div
                  className="cr-resources-panel"
                  id={brokersPanelId}
                  onKeyDown={(event) => onDropdownPanelKeyDown(event, brokersPanelId, brokersTriggerRef)}
                >
                  <div className="cr-resources-card cr-resources-card-rich">
                    <ul className="cr-resources-list">
                      {brokersAndImporters.map((item) => (
                        <li key={item.label}>
                          <a href={itemHref(item)} onClick={closeAll}>
                            <span className="cr-nav-menu-link-title">{item.label}</span>
                            <span className="cr-nav-menu-link-desc">{item.description}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}
            </div>

            {links.map((label) => (
              <a key={label} className="cr-nav-link" href={`#${slug(label)}`}>
                {label}
              </a>
            ))}
          </nav>

          <div className="cr-actions">
            <button
              ref={menuToggleRef}
              type="button"
              className="cr-menu-toggle"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls={menuId}
              onClick={() => {
                setMenuOpen((open) => !open);
                setOpenDropdown(null);
              }}
            >
              <span />
              <span />
            </button>
            <a className="cr-login" href="#login">
              Log in
            </a>
            <a className="cr-ask" href="#ask-klear">
              Ask Klear
            </a>
            <a className="cr-trial" href="#book-a-demo">
              Book a demo
            </a>
          </div>
        </div>
      </div>

      {menuOpen ? (
        <nav className="cr-mobile" id={menuId} aria-label="Mobile">
          {hasProducts ? (
            <button
              type="button"
              className="cr-mobile-products"
              aria-expanded={productsOpen}
              aria-controls={productsPanelId}
              onClick={() => toggleDropdown('products')}
            >
              Products
              <Chevron open={productsOpen} />
            </button>
          ) : (
            <a className="cr-mobile-products" href="#products" onClick={closeAll}>
              Products
            </a>
          )}
          {hasProducts && productsOpen
            ? products.map((item) => (
                <a
                  key={item.label}
                  className="cr-mobile-products-link"
                  href={itemHref(item)}
                  onClick={closeAll}
                >
                  {item.label}
                </a>
              ))
            : null}

          <a href={`#${slug('Post-Entry Audit')}`} onClick={closeAll}>
            Post-Entry Audit
          </a>

          {hasBrokers ? (
            <button
              type="button"
              className="cr-mobile-products"
              aria-expanded={brokersOpen}
              aria-controls={brokersPanelId}
              onClick={() => toggleDropdown('brokers')}
            >
              {BROKERS_NAV_LABEL}
              <Chevron open={brokersOpen} />
            </button>
          ) : (
            <a className="cr-mobile-products" href="#brokers-and-importers" onClick={closeAll}>
              {BROKERS_NAV_LABEL}
            </a>
          )}
          {hasBrokers && brokersOpen
            ? brokersAndImporters.map((item) => (
                <a
                  key={item.label}
                  className="cr-mobile-products-link cr-mobile-menu-link-rich"
                  href={itemHref(item)}
                  onClick={closeAll}
                >
                  <span className="cr-nav-menu-link-title">{item.label}</span>
                  <span className="cr-nav-menu-link-desc">{item.description}</span>
                </a>
              ))
            : null}

          {links.map((label) => (
            <a key={label} href={`#${slug(label)}`} onClick={closeAll}>
              {label}
            </a>
          ))}
          <a className="cr-login cr-mobile-login" href="#login" onClick={closeAll}>
            Log in
          </a>
          <a className="cr-ask cr-mobile-ask" href="#ask-klear" onClick={closeAll}>
            Ask Klear
          </a>
          <a className="cr-trial cr-mobile-demo" href="#book-a-demo" onClick={closeAll}>
            Book a demo
          </a>
        </nav>
      ) : null}
    </header>
  );
};

export default SiteHeader;
