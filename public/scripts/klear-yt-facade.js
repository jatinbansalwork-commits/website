(() => {
  const nodes = document.querySelectorAll('[data-klear-yt]');
  if (!nodes.length) return;

  nodes.forEach((el) => {
    const id = el.getAttribute('data-klear-yt');
    if (!id) return;

    const button = el.querySelector('[data-klear-yt-play]');
    if (!button) return;

    button.addEventListener('click', () => {
      const title = el.getAttribute('data-klear-yt-title') || 'YouTube video';
      el.classList.add('klear-yt--playing');
      el.innerHTML =
        `<iframe class="klear-yt__frame" src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0" ` +
        `title="${title.replace(/"/g, '&quot;')}" ` +
        `allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ` +
        `allowfullscreen loading="eager" referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
    });
  });
})();
