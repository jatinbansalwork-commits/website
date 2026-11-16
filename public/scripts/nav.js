(function () {
  const nav = document.querySelector('[data-twostep-nav]');
  if (!nav) return;

  const setStatus = (active) => {
    nav.dataset.navStatus = active ? 'active' : 'not-active';
    const toggle = nav.querySelector('[data-nav-toggle="toggle"]');
    if (toggle) {
      toggle.setAttribute('aria-expanded', active ? 'true' : 'false');
      toggle.setAttribute('aria-label', active ? 'Close menu' : 'Open menu');
    }
    document.documentElement.style.overflow = active ? 'hidden' : '';
  };

  nav.addEventListener('click', (e) => {
    const t = e.target.closest('[data-nav-toggle]');
    if (!t) return;
    if (t.dataset.navToggle === 'toggle') setStatus(nav.dataset.navStatus !== 'active');
    if (t.dataset.navToggle === 'close') setStatus(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.dataset.navStatus === 'active') setStatus(false);
  });

  const accHead = nav.querySelector('[data-acc-head]');
  const accWrap = nav.querySelector('[data-acc-wrap]');
  accHead?.addEventListener('click', () => {
    const open = accWrap?.hasAttribute('data-acc-open');
    if (open) accWrap.removeAttribute('data-acc-open');
    else {
      accWrap?.setAttribute('data-acc-open', '');
      accHead.setAttribute('aria-expanded', 'true');
    }
    if (open) accHead.setAttribute('aria-expanded', 'false');
  });
})();
