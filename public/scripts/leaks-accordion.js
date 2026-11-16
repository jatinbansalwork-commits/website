/** FAQ-style accordion for KlearData “How it works?” leaks list */
(function () {
  document.querySelectorAll('[data-leaks-accordion]').forEach((root) => {
    const buttons = root.querySelectorAll('.leaks__btn');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const wasOpen = btn.getAttribute('aria-expanded') === 'true';
        buttons.forEach((b) => b.setAttribute('aria-expanded', 'false'));
        btn.setAttribute('aria-expanded', String(!wasOpen));
        window.setTimeout(() => window.dispatchEvent(new Event('resize')), 500);
      });
    });
  });
})();
