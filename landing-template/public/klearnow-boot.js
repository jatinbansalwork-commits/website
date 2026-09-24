(function () {
  'use strict';

  /** Bump when public assets or boot behavior changes. Keep in sync with ?v= on script tags in HTML. */
  var ASSET_VERSION = '20261063';
  var html = document.documentElement;

  /** Match first paint to final UI; sans fallbacks avoid Georgia→Manrope button flash on hard refresh. */
  (function injectTypographyCritical() {
    if (document.getElementById('kn-font-critical')) return;
    var sans =
      'Manrope,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif';
    var textSel =
      '[class*="text-size-"],.paragraph,.nav_main_label-text,.nav_main_feature-heading-text,.nav_main_feature-item,.nav_main_link,.nav_main_dropdown_label,.locale-nav-item-label,.footer_link,.footer_heading,.footer_text-container,.customer-logo_heading-container,.hero_description-container,.testimonial_text,.product-overview_text-container,.support-crealo_text-container,.contact_form-field-text-2,.tab-pane_logo-container-2,.button-v2,.button-v2-2,.fs_modal-2_button,.fs_modal-2_button-2,.demo_submit-button,.talk-to-klear_submit,.talk-to-klear_role,.w-button,input.w-button,button.w-button,.calendly-trigger,input,textarea,select';
    var headSel =
      '.heading-style-h1,.heading-style-h2,.heading-style-h3,.heading-style-h4,.heading-style-h5,.heading-style-h6,.titre,.kd-ds-panel__intro h3,h1,h2,h3,h4,h5,h6';
    var style = document.createElement('style');
    style.id = 'kn-font-critical';
    style.textContent =
      ':root{--crealo-fonts--text:' +
      sans +
      ';--crealo-fonts--headings:Ratio,' +
      sans +
      '}' +
      'html,body{font-family:' +
      sans +
      '!important;color:#2d2d2d}' +
      textSel +
      '{font-family:' +
      sans +
      '}' +
      headSel +
      '{font-family:Ratio,' +
      sans +
      '}' +
      '.heading-style-h2{font-size:2.5rem;font-weight:400;line-height:1}' +
      '.heading-style-h6{font-size:.875rem;line-height:1.5}' +
      '.text-size-tiny{font-size:.75rem;line-height:1.5;letter-spacing:-.125px}';
    (document.head || html).appendChild(style);

    if (document.getElementById('kn-font-preload')) return;
    [
      'https://cdn.prod.website-files.com/5f96c1e75e94f64c995cffee/6915d21378fc78aee5be857b_Manrope-Regular.ttf',
      'https://cdn.prod.website-files.com/5f96c1e75e94f64c995cffee/6915d213907e45f7b245bd2e_Manrope-Medium.ttf',
      'https://cdn.prod.website-files.com/5f96c1e75e94f64c995cffee/6915d2130c95e2be441349f0_Manrope-SemiBold.ttf',
      'https://cdn.prod.website-files.com/5f96c1e75e94f64c995cffee/66993ad5e6c552d580170ef3_Ratio-Regular.otf',
      'https://cdn.prod.website-files.com/5f96c1e75e94f64c995cffee/66993ad50b367b8e8d8a2389_Ratio-Medium.otf'
    ].forEach(function (href) {
      var link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.href = href;
      link.crossOrigin = 'anonymous';
      link.setAttribute('data-kn-font-preload', '');
      document.head.appendChild(link);
    });
    var marker = document.createElement('meta');
    marker.id = 'kn-font-preload';
    marker.name = 'kn-font-preload';
    document.head.appendChild(marker);
  })();

  /** Apply before Webflow measures sliders (site.min.css uses 31rem mask width). */
  (function injectHowSwitchCriticalCss() {
    if (document.getElementById('kn-how-switch-fix')) return;
    var el = document.createElement('style');
    el.id = 'kn-how-switch-fix';
    el.textContent =
      '.section_how-switch:not(.is-freight-forwarders-how-switch) .how-switch_slider.w-slider{display:block!important;width:100%!important;max-width:100%!important}' +
      '.section_how-switch:not(.is-freight-forwarders-how-switch) .how-switch_slider-mask,.section_how-switch:not(.is-freight-forwarders-how-switch) .how-switch_slider .w-slider-mask{display:block!important;width:100%!important;max-width:100%!important;overflow:hidden!important}' +
      '.section_how-switch:not(.is-freight-forwarders-how-switch) .how-switch_slide.w-slide{width:100%!important;max-width:100%!important;margin-left:0!important;margin-right:0!important}' +
      '.section_how-switch.is-freight-forwarders-how-switch .how-switch_slider.w-slider{display:flex!important;align-items:flex-end;margin-bottom:4.75rem}' +
      '.section_how-switch.is-freight-forwarders-how-switch .how-switch_slider-mask,.section_how-switch.is-freight-forwarders-how-switch .how-switch_slider .w-slider-mask{width:31rem!important;max-width:31rem!important;overflow:visible!important}' +
      '.section_how-switch.is-freight-forwarders-how-switch .how-switch_slide.w-slide{width:31rem!important;max-width:31rem!important;min-width:31rem!important;margin-left:.75rem!important;margin-right:.75rem!important}';
    (document.head || document.documentElement).appendChild(el);
  })();

  function isLocalAsset(url) {
    return url && url.charAt(0) === '/' && url.indexOf('//') !== 0;
  }

  function withVersion(url) {
    if (!isLocalAsset(url)) return url;
    return url.split('?')[0] + '?v=' + ASSET_VERSION;
  }

  function bustSrcset(value) {
    if (!value) return value;
    return value
      .split(',')
      .map(function (part) {
        var bits = part.trim().split(/\s+/);
        if (!bits.length) return part;
        bits[0] = withVersion(bits[0]);
        return bits.join(' ');
      })
      .join(', ');
  }

  function bustLocalAssets() {
    document.querySelectorAll('script[src^="/"], img[src^="/"], link[href^="/"]').forEach(function (el) {
      var attr = el.tagName === 'LINK' ? 'href' : 'src';
      var url = el.getAttribute(attr);
      if (!url) return;
      if (el.tagName === 'LINK') {
        var rel = (el.getAttribute('rel') || '').toLowerCase();
        /* Stylesheets: never re-bust at runtime — changing href reloads CSS and flashes typography. */
        if (rel.indexOf('stylesheet') !== -1) return;
        if (rel.indexOf('icon') === -1 && rel !== 'apple-touch-icon') return;
      }
      var next = withVersion(url);
      if (next === url) return;
      el.setAttribute(attr, next);
    });

    document.querySelectorAll('img[srcset], source[srcset]').forEach(function (el) {
      var srcset = el.getAttribute('srcset');
      var next = bustSrcset(srcset);
      if (next && next !== srcset) el.setAttribute('srcset', next);
    });
  }

  function bustHeroPictureNode(root) {
    if (!root || root.nodeType !== 1) return;
    if (root.matches && root.matches('picture.optype-hero-picture')) {
      root.querySelectorAll('source[srcset]').forEach(function (el) {
        var next = bustSrcset(el.getAttribute('srcset'));
        if (next) el.setAttribute('srcset', next);
      });
      root.querySelectorAll('img.optype-hero-photo[src]').forEach(function (el) {
        el.setAttribute('src', withVersion(el.getAttribute('src')));
        var ss = el.getAttribute('srcset');
        if (ss) el.setAttribute('srcset', bustSrcset(ss));
      });
      return;
    }
    if (root.querySelectorAll) {
      root.querySelectorAll('picture.optype-hero-picture').forEach(function (pic) {
        bustHeroPictureNode(pic);
      });
    }
  }

  /* Version hero URLs as nodes parse — before WebP/JPEG fetch (Chrome caches unversioned paths). */
  if (typeof MutationObserver !== 'undefined') {
    var heroObs = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        m.addedNodes.forEach(function (node) {
          bustHeroPictureNode(node);
        });
      });
    });
    heroObs.observe(document.documentElement, { childList: true, subtree: true });
  }

  function resetUiState() {
    document.body.classList.remove('kn-nav-open');

    var scrim = document.getElementById('kn-nav-scrim');
    if (scrim) scrim.classList.remove('is-visible');

    document.querySelectorAll('.w-dropdown.w--open, .nav_main_dropdown_list.w--open').forEach(function (el) {
      el.classList.remove('w--open');
    });

    document.querySelectorAll('.w-dropdown-toggle[aria-expanded="true"]').forEach(function (el) {
      el.setAttribute('aria-expanded', 'false');
    });

    document.querySelectorAll('.fs_modal-2_popup-2.w--open').forEach(function (el) {
      el.classList.remove('w--open');
    });

    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';

    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }

  function markReady() {
    html.classList.remove('kn-booting');
    html.classList.add('kn-ready');
  }

  function getActiveMain() {
    var isFr = document.body.classList.contains('locale-fr');
    return document.querySelector(
      isFr
        ? 'main.main-wrapper > .kn-locale-pane.is_fr-only'
        : 'main.main-wrapper > .kn-locale-pane.is_en-only'
    );
  }

  /** Finsweet CMS Slider can empty .w-dyn-items before our inline init runs — restore + hydrate Webflow slides. */
  function initTestimonialSlider() {
    var main = getActiveMain();
    if (!main) return;
    var container = main.querySelector('.testimonial_container');
    if (!container) return;

    var slider = container.querySelector('.testimonial_slider');
    var list = container.querySelector('.w-dyn-list');
    var itemsWrap = list && list.querySelector('.w-dyn-items');
    if (!slider || !itemsWrap) return;

    var backup = container.getAttribute('data-kn-dyn-backup');
    if (backup && !itemsWrap.querySelector('.w-dyn-item')) {
      itemsWrap.innerHTML = backup;
    }

    var mask = slider.querySelector('.w-slider-mask');
    if (!mask) return;

    if (!slider.querySelector('.testimonial_slide .testimonial_grid')) {
      var items = itemsWrap.querySelectorAll(':scope > .w-dyn-item');
      if (!items.length) return;
      mask.innerHTML = '';
      items.forEach(function (item) {
        var slide = document.createElement('div');
        slide.className = 'testimonial_slide w-slide';
        slide.appendChild(item.cloneNode(true));
        mask.appendChild(slide);
      });
    }

    if (!slider.querySelector('.testimonial_slide .testimonial_grid')) {
      container.classList.add('is-testimonial-static');
      return;
    }

    container.classList.remove('is-testimonial-static');
    container.classList.add('is-slider-ready');

    if (window.Webflow && window.Webflow.require) {
      try {
        window.Webflow.require('slider').redraw();
      } catch (error) {}
    }
  }

  function isFreightCrealoHowSwitchSlider(slider) {
    return slider && slider.closest('.is-freight-forwarders-how-switch');
  }

  /** Crealo obligation-reddition: 31rem cards in a flex track, mask overflow visible. */
  function normalizeCrealoHowSwitchSlider(slider) {
    if (!slider) return;
    slider.style.display = 'flex';
    slider.style.width = '100%';
    slider.style.maxWidth = '100%';
    slider.style.marginBottom = '4.75rem';

    var mask = slider.querySelector('.how-switch_slider-mask, .w-slider-mask');
    if (mask) {
      mask.style.display = 'block';
      mask.style.width = '31rem';
      mask.style.maxWidth = '31rem';
      mask.style.overflow = 'visible';
    }

    slider.querySelectorAll('.how-switch_slide.w-slide').forEach(function (slide) {
      slide.style.width = '31rem';
      slide.style.maxWidth = '31rem';
      slide.style.minWidth = '31rem';
      slide.style.marginLeft = '0.75rem';
      slide.style.marginRight = '0.75rem';
    });
  }

  /** Webflow ships `.how-switch_slider-mask { width: 31rem }` in a flex row — override before redraw. */
  function normalizeHowSwitchSlider(slider) {
    if (!slider) return;
    if (isFreightCrealoHowSwitchSlider(slider)) {
      normalizeCrealoHowSwitchSlider(slider);
      return;
    }

    slider.style.display = 'block';
    slider.style.width = '100%';
    slider.style.maxWidth = '100%';

    var mask = slider.querySelector('.how-switch_slider-mask, .w-slider-mask');
    if (mask) {
      mask.style.display = 'block';
      mask.style.width = '100%';
      mask.style.maxWidth = '100%';
      mask.style.overflow = 'hidden';
    }

    slider.querySelectorAll('.how-switch_slide.w-slide, .w-slide').forEach(function (slide) {
      slide.style.width = '100%';
      slide.style.maxWidth = '100%';
      slide.style.marginLeft = '0';
      slide.style.marginRight = '0';
    });
  }

  /** Re-measure operation-type "When to use" sliders after layout + nav overrides. */
  function initHowSwitchSliders() {
    var isFr = document.body.classList.contains('locale-fr');
    var main = getActiveMain();
    var sliders = main ? main.querySelectorAll('.section_how-switch .how-switch_slider') : [];
    if (!sliders.length) {
      sliders = document.querySelectorAll(
        isFr
          ? 'main.main-wrapper .kn-locale-pane.is_fr-only .section_how-switch .how-switch_slider'
          : 'main.main-wrapper .kn-locale-pane.is_en-only .section_how-switch .how-switch_slider, body > .section_how-switch .how-switch_slider'
      );
    }
    if (!sliders.length) return;

    sliders.forEach(normalizeHowSwitchSlider);

    if (window.Webflow && window.Webflow.require) {
      try {
        var sliderApi = window.Webflow.require('slider');
        sliders.forEach(function () {
          sliderApi.redraw();
        });
      } catch (error) {}
    }
  }

  function initFaqLoadMore() {
    var section = document.querySelector('.section_faq');
    if (!section) return;

    var btn = section.querySelector('.faq_pagination .load-more-button');
    var extras = section.querySelectorAll('.faq_collection-item.kn-faq-extra');
    if (!btn || !extras.length) return;

    btn.addEventListener('click', function (event) {
      event.preventDefault();
      extras.forEach(function (item) {
        item.classList.remove('kn-faq-extra');
      });
      var pagination = section.querySelector('.faq_pagination');
      if (pagination) pagination.style.display = 'none';
    });
  }

  function parseAgentPhases(raw) {
    if (!raw) return [];
    return raw.split('|').map(function (chunk) {
      var i = chunk.indexOf(':');
      if (i < 0) return null;
      var t = parseInt(chunk.slice(0, i), 10);
      var label = chunk.slice(i + 1).trim();
      if (!label || isNaN(t)) return null;
      return { t: t, label: label };
    }).filter(Boolean);
  }

  function scheduleSceneStory(scene, timers) {
    var labelEl = scene.querySelector('.kd-sb-agent-label');
    var phases = parseAgentPhases(scene.getAttribute('data-agent-phases'));
    if (labelEl && phases.length) {
      phases.forEach(function (phase) {
        timers.push(setTimeout(function () {
          labelEl.textContent = phase.label;
        }, phase.t));
      });
    }

    var focusRows = scene.querySelectorAll('[data-kn-focus-row]');
    focusRows.forEach(function (row) {
      var delay = parseInt(row.style.getPropertyValue('--d') || '0', 10);
      if (isNaN(delay)) delay = 0;
      timers.push(setTimeout(function () {
        focusRows.forEach(function (r) {
          r.classList.toggle('is-dim', r !== row);
          r.classList.toggle('is-active', r === row);
        });
      }, Math.max(0, delay - 40)));
    });

    timers.push(setTimeout(function () {
      focusRows.forEach(function (r) {
        r.classList.remove('is-dim', 'is-active');
      });
    }, parseInt(scene.getAttribute('data-loop-ms') || '6200', 10) - 120));
  }

  var KN_SCENE_FRAGMENTS = {
    collect: '/kleardata-collect-scene.html',
    verify: '/klearhub-verify-scene.html',
    operate: '/managed-trade-operate-scene.html'
  };

  function stripFragmentComments(html) {
    return String(html || '')
      .replace(/<!--[\s\S]*?-->/g, '')
      .trim();
  }

  function ensureSceneStylesheet() {
    if (document.getElementById('kn-scene-styles')) return;
    if (!document.querySelector('[data-kn-scene-slot]')) return;
    var link = document.createElement('link');
    link.id = 'kn-scene-styles';
    link.rel = 'stylesheet';
    link.href = withVersion('/kleardata-collect-scene.css');
    document.head.appendChild(link);
  }

  function loadSceneFragment(sceneKey) {
    var path = KN_SCENE_FRAGMENTS[sceneKey];
    if (!path) return Promise.reject(new Error('Unknown scene: ' + sceneKey));
    return fetch(withVersion(path), { credentials: 'same-origin' }).then(function (res) {
      if (!res.ok) throw new Error('Scene fetch failed: ' + path);
      return res.text();
    });
  }

  /** Inject shared HTML fragments into [data-kn-scene-slot] placeholders (homepage + product pages). */
  function mountSceneSlots() {
    var slots = document.querySelectorAll('[data-kn-scene-slot][data-kn-scene]');
    if (!slots.length) return Promise.resolve();
    ensureSceneStylesheet();
    var tasks = [];
    slots.forEach(function (slot) {
      if (slot.dataset.knSceneMounted === '1') return;
      var key = slot.getAttribute('data-kn-scene');
      if (!key) return;
      tasks.push(
        loadSceneFragment(key)
          .then(stripFragmentComments)
          .then(function (html) {
            slot.innerHTML = html;
            slot.dataset.knSceneMounted = '1';
            slot.classList.remove('product-overview_image-placeholder');
          })
      );
    });
    return Promise.all(tasks);
  }

  /** Homepage stack cards — Docsumo-style scenes (Collect, Classify, …) replay on data-inview. */
  function initProductStackScenes() {
    var scenes = document.querySelectorAll('[data-kn-product-scene], [data-kd-collect-scene]');
    if (!scenes.length) return;

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    scenes.forEach(function (scene) {
      if (scene.dataset.knProductSceneInit) return;
      scene.dataset.knProductSceneInit = '1';

      var loopMs = parseInt(scene.getAttribute('data-loop-ms') || '6200', 10);
      if (!loopMs || loopMs < 1000) loopMs = 6200;

      var loopTimer = null;
      var storyTimers = [];

      function clearStory() {
        storyTimers.forEach(clearTimeout);
        storyTimers = [];
        scene.querySelectorAll('[data-kn-focus-row]').forEach(function (row) {
          row.classList.remove('is-dim', 'is-active');
        });
      }

      function replay() {
        clearStory();
        scene.removeAttribute('data-inview');
        void scene.offsetWidth;
        scene.setAttribute('data-inview', '');
        if (!reduced) scheduleSceneStory(scene, storyTimers);
      }

      function startLoop() {
        if (reduced) {
          scene.setAttribute('data-inview', '');
          return;
        }
        replay();
        if (loopTimer) clearInterval(loopTimer);
        loopTimer = setInterval(replay, loopMs);
      }

      function stopLoop() {
        clearStory();
        scene.removeAttribute('data-inview');
        if (loopTimer) {
          clearInterval(loopTimer);
          loopTimer = null;
        }
      }

      if (typeof IntersectionObserver === 'function') {
        var observer = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) startLoop();
              else stopLoop();
            });
          },
          { threshold: 0.15, rootMargin: '0px' }
        );
        observer.observe(scene);
        requestAnimationFrame(function () {
          var rect = scene.getBoundingClientRect();
          var vh = window.innerHeight || document.documentElement.clientHeight;
          if (rect.top < vh && rect.bottom > 0) startLoop();
        });
      } else {
        startLoop();
      }
    });
  }

  /** Bar height only — never measure full .w-nav (dropdown panels inflate padding-top). */
  function syncNavHeight() {
    var bar = document.querySelector('.nav_main_component.w-nav .nav_main_padding');
    var height = bar ? Math.round(bar.getBoundingClientRect().height) : 80;
    if (!height || height > 120) height = 80;
    document.documentElement.style.setProperty('--kn-nav-height', height + 'px');
    return height;
  }

  function finishBoot() {
    resetUiState();
    syncNavHeight();
    bustLocalAssets();
    initTestimonialSlider();
    initHowSwitchSliders();
    initFaqLoadMore();

    mountSceneSlots()
      .catch(function () {})
      .then(function () {
        initProductStackScenes();

        if (window.KlearNavDropdown) {
          if (window.KlearNavDropdown.closeAll) window.KlearNavDropdown.closeAll();
          if (window.KlearNavDropdown.updateLayers) window.KlearNavDropdown.updateLayers();
        }

        requestAnimationFrame(function () {
          requestAnimationFrame(markReady);
        });
      });
  }

  function hardReload() {
    var url = new URL(window.location.href);
    url.searchParams.set('_kn', String(Date.now()));
    window.location.replace(url.toString());
  }

  function onPageShow(event) {
    if (!event.persisted) return;
    html.classList.add('kn-booting');
    html.classList.remove('kn-ready');
    hardReload();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', finishBoot);
  } else {
    finishBoot();
  }

  window.addEventListener('pageshow', onPageShow);
  function scheduleHowSwitchSliders() {
    initHowSwitchSliders();
    setTimeout(initHowSwitchSliders, 0);
    if (window.Webflow && window.Webflow.require) {
      setTimeout(initHowSwitchSliders, 300);
    }
  }

  window.addEventListener('load', function () {
    initTestimonialSlider();
    scheduleHowSwitchSliders();
  });

  window.Webflow = window.Webflow || [];
  window.Webflow.push(function () {
    scheduleHowSwitchSliders();
  });
  window.addEventListener('resize', function () {
    syncNavHeight();
    initHowSwitchSliders();
  });

  window.KlearBoot = {
    version: ASSET_VERSION,
    reset: resetUiState,
    finish: finishBoot,
    hardReload: hardReload
  };
})();
