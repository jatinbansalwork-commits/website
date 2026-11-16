(() => {
  const root = document.querySelector('.klear-leadership');
  if (!root) return;

  const tabs = [...root.querySelectorAll('[data-leadership-tab]')];
  const panels = [...root.querySelectorAll('[data-leadership-panel]')];
  if (!tabs.length || !panels.length) return;

  const activate = (id) => {
    tabs.forEach((tab) => {
      const on = tab.getAttribute('data-leadership-tab') === id;
      tab.classList.toggle('is-active', on);
      tab.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    panels.forEach((panel) => {
      const on = panel.getAttribute('data-leadership-panel') === id;
      panel.hidden = !on;
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const id = tab.getAttribute('data-leadership-tab');
      if (id) activate(id);
    });
  });
})();
