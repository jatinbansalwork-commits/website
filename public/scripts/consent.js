(function () {
  const KEY = 'lm-consent-template';
  const banner = document.getElementById('consent-banner');
  if (!banner) return;

  const hide = () => {
    banner.hidden = true;
  };

  const show = () => {
    banner.hidden = false;
  };

  try {
    if (!localStorage.getItem(KEY)) show();
  } catch {
    show();
  }

  banner.querySelector('[data-consent-accept]')?.addEventListener('click', () => {
    try { localStorage.setItem(KEY, 'granted'); } catch {}
    hide();
  });
  banner.querySelector('[data-consent-reject]')?.addEventListener('click', () => {
    try { localStorage.setItem(KEY, 'denied'); } catch {}
    hide();
  });
  document.querySelector('[data-consent-reopen]')?.addEventListener('click', show);
})();
