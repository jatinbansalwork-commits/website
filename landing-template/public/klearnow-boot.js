(function () {
  'use strict';

  /** Bump when public assets or boot behavior changes. Keep in sync with ?v= on script tags in HTML. */
  var ASSET_VERSION = '20261116';
  var html = document.documentElement;

  var KN_FONT_ASSETS = [
    {
      family: 'Manrope',
      weight: 400,
      url: 'https://cdn.prod.website-files.com/5f96c1e75e94f64c995cffee/6915d21378fc78aee5be857b_Manrope-Regular.ttf',
      format: 'truetype'
    },
    {
      family: 'Manrope',
      weight: 500,
      url: 'https://cdn.prod.website-files.com/5f96c1e75e94f64c995cffee/6915d213907e45f7b245bd2e_Manrope-Medium.ttf',
      format: 'truetype'
    },
    {
      family: 'Manrope',
      weight: 600,
      url: 'https://cdn.prod.website-files.com/5f96c1e75e94f64c995cffee/6915d2130c95e2be441349f0_Manrope-SemiBold.ttf',
      format: 'truetype'
    },
    {
      family: 'Manrope',
      weight: 700,
      url: 'https://cdn.prod.website-files.com/5f96c1e75e94f64c995cffee/6915d213811ae89ceb2b82eb_Manrope-Bold.ttf',
      format: 'truetype'
    },
    {
      family: 'Ratio',
      weight: 400,
      url: 'https://cdn.prod.website-files.com/5f96c1e75e94f64c995cffee/66993ad5e6c552d580170ef3_Ratio-Regular.otf',
      format: 'opentype'
    },
    {
      family: 'Ratio',
      weight: 500,
      url: 'https://cdn.prod.website-files.com/5f96c1e75e94f64c995cffee/66993ad50b367b8e8d8a2389_Ratio-Medium.otf',
      format: 'opentype'
    }
  ];

  /** Match first paint to final UI; sans fallbacks avoid Georgia→Manrope button flash on hard refresh. */
  (function injectTypographyCritical() {
    if (document.getElementById('kn-font-critical')) return;
    var sans =
      'Manrope,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif';
    var textSel =
      '[class*="text-size-"],.paragraph,.nav_main_label-text,.nav_main_feature-heading-text,.nav_main_feature-item,.nav_main_link,.nav_main_dropdown_label,.locale-nav-item-label,.footer_link,.footer_heading,.footer_text-container,.customer-logo_heading-container,.hero_description-container,.testimonial_text,.product-overview_text-container,.support-kn_text-container,.contact_form-field-text-2,.tab-pane_logo-container-2,.button-v2,.button-v2-2,.button-v2-2 div,.fs_modal-2_button,.fs_modal-2_button-2,.demo_submit-button,.talk-to-klear_submit,.talk-to-klear_role,.w-button,input.w-button,button.w-button,.calendly-trigger,button,input,textarea,select,a[role="button"],[role="button"]';
    var headSel =
      '.heading-style-h1,.heading-style-h2,.heading-style-h3,.heading-style-h4,.heading-style-h5,.heading-style-h6,.titre,.kd-ds-panel__intro h3,h1,h2,h3,h4,h5,h6';
    var style = document.createElement('style');
    style.id = 'kn-font-critical';
    var headingStack = 'Ratio,' + sans;
    style.textContent =
      ':root{--kn-fonts--text:' +
      sans +
      '!important;--kn-fonts--headings:' +
      headingStack +
      '!important}' +
      'html,body,.body{font-family:' +
      sans +
      '!important;color:#2d2d2d}' +
      textSel +
      '{font-family:var(--kn-fonts--text)!important}' +
      headSel +
      '{font-family:var(--kn-fonts--headings)!important}' +
      '.heading-style-h2{font-size:2.5rem;font-weight:400;line-height:1}' +
      '.heading-style-h6{font-size:.875rem;line-height:1.5}' +
      '.text-size-tiny{font-size:.75rem;line-height:1.5;letter-spacing:-.125px}' +
      'html.kn-booting .page-wrapper{visibility:hidden}' +
      'html.kn-ready .page-wrapper{visibility:visible}';
    (document.head || html).appendChild(style);

    function injectFontFaceOptional() {
      if (document.getElementById('kn-font-faces')) return;
      var faceStyle = document.createElement('style');
      faceStyle.id = 'kn-font-faces';
      faceStyle.textContent = KN_FONT_ASSETS.map(function (face) {
        return (
          '@font-face{font-family:' +
          face.family +
          ';src:url("' +
          face.url +
          '") format("' +
          face.format +
          '");font-weight:' +
          face.weight +
          ';font-style:normal;font-display:optional}'
        );
      }).join('');
      (document.head || html).appendChild(faceStyle);
      return faceStyle;
    }

    injectFontFaceOptional();

    if (!document.getElementById('kn-font-preload')) {
      if (!document.querySelector('link[rel="preconnect"][href*="website-files.com"]')) {
        var preconnect = document.createElement('link');
        preconnect.rel = 'preconnect';
        preconnect.href = 'https://cdn.prod.website-files.com';
        preconnect.crossOrigin = 'anonymous';
        document.head.appendChild(preconnect);
      }
      KN_FONT_ASSETS.map(function (face) {
        return face.url;
      }).forEach(function (href) {
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
    }

    /** Re-append after Webflow CSS so :root / swap @font-face cannot win on hard refresh. */
    function repinFontCritical() {
      var node = document.getElementById('kn-font-critical');
      if (node && node.parentNode) node.parentNode.appendChild(node);
      var faces = document.getElementById('kn-font-faces');
      if (!faces) injectFontFaceOptional();
      else if (faces.parentNode) faces.parentNode.appendChild(faces);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', repinFontCritical);
    } else {
      repinFontCritical();
    }
    window.addEventListener('load', repinFontCritical, { once: true });
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

  /** Avoid button/text flicker when swap fonts load after first paint. */
  function whenTypographyReady(done) {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      done();
      return;
    }

    var finished = false;
    function finish() {
      if (finished) return;
      finished = true;
      done();
    }

    var capMs = 1600;
    var cap = setTimeout(finish, capMs);

    if (!document.fonts || !document.fonts.load) {
      clearTimeout(cap);
      finish();
      return;
    }

    var loads = [
      document.fonts.load('400 1em Manrope'),
      document.fonts.load('500 1em Manrope'),
      document.fonts.load('600 1em Manrope'),
      document.fonts.load('700 1em Manrope'),
      document.fonts.load('400 1em Ratio'),
      document.fonts.load('500 1em Ratio')
    ];

    Promise.all(loads)
      .then(function () {
        return document.fonts.ready;
      })
      .then(function () {
        clearTimeout(cap);
        finish();
      })
      .catch(function () {
        clearTimeout(cap);
        finish();
      });
  }

  function getActiveMain() {
    var isFr = document.body.classList.contains('locale-fr');
    var pane = document.querySelector(
      isFr
        ? 'main.main-wrapper > .kn-locale-pane.is_fr-only'
        : 'main.main-wrapper > .kn-locale-pane.is_en-only'
    );
    if (pane) return pane;
    return document.querySelector('main.main-wrapper');
  }

  var TESTIMONIAL_AUTOPLAY_MS = 6000;
  var testimonialAutoplayBound = false;

  /** Finsweet CMS Slider fights our Webflow mask — use static CMS HTML + boot hydration only. */
  function stripFinsweetCmssliderAttrs(root) {
    var scope = root && root.querySelectorAll ? root : document;
    scope.querySelectorAll('[fs-cmsslider-element]').forEach(function (node) {
      node.removeAttribute('fs-cmsslider-element');
    });
  }

  function normalizeTestimonialSlider(slider) {
    if (!slider) return;

    slider.style.display = 'block';
    slider.style.width = '100%';
    slider.style.maxWidth = '100%';
    slider.style.height = '100%';

    var mask = slider.querySelector('.w-slider-mask');
    if (mask) {
      mask.style.display = 'block';
      mask.style.width = '100%';
      mask.style.maxWidth = '100%';
      mask.style.overflow = 'hidden';
    }

    slider.querySelectorAll('.testimonial_slide.w-slide, .w-slide').forEach(function (slide) {
      slide.style.width = '100%';
      slide.style.maxWidth = '100%';
      slide.style.minHeight = '0';
      slide.style.marginLeft = '0';
      slide.style.marginRight = '0';
      slide.style.verticalAlign = 'top';
    });
  }

  function redrawTestimonialSlider(slider) {
    normalizeTestimonialSlider(slider);
    if (window.Webflow && window.Webflow.require) {
      try {
        window.Webflow.require('slider').redraw();
      } catch (error) {}
    }
  }

  function initTestimonialAutoplay(slider) {
    if (!slider) return;

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      slider.setAttribute('data-autoplay', 'false');
      return;
    }

    slider.setAttribute('data-autoplay', 'true');
    slider.setAttribute('data-delay', String(TESTIMONIAL_AUTOPLAY_MS));
    slider.setAttribute('data-autoplay-limit', '0');
    slider.setAttribute('data-infinite', 'true');
    slider.setAttribute('data-animation', 'slide');
    slider.setAttribute('data-duration', '650');
    slider.setAttribute('data-easing', 'ease');

    if (testimonialAutoplayBound) return;
    testimonialAutoplayBound = true;

    var pause = function () {
      slider.setAttribute('data-autoplay', 'false');
      redrawTestimonialSlider(slider);
    };

    var resume = function () {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      slider.setAttribute('data-autoplay', 'true');
      redrawTestimonialSlider(slider);
    };

    slider.addEventListener('mouseenter', pause);
    slider.addEventListener('mouseleave', resume);
    slider.addEventListener('focusin', pause);
    slider.addEventListener('focusout', resume);
  }

  /** Restore CMS items into Webflow slides — one full card per slide (no peek / half-slide). */
  function initOneTestimonialContainer(container) {
    if (!container) return;

    stripFinsweetCmssliderAttrs(container);

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

    var items = itemsWrap.querySelectorAll(':scope > .w-dyn-item');
    if (!items.length) return;

    if (!container.getAttribute('data-kn-dyn-backup') && itemsWrap.innerHTML.trim()) {
      container.setAttribute('data-kn-dyn-backup', itemsWrap.innerHTML);
    }

    mask.querySelectorAll('.w-slide').forEach(function (slide) {
      if (!slide.querySelector('.testimonial_grid')) slide.remove();
    });

    var populatedInMask = mask.querySelectorAll('.w-slide .testimonial_grid').length;
    if (populatedInMask !== items.length) {
      mask.innerHTML = '';
      items.forEach(function (item) {
        var slide = document.createElement('div');
        slide.className = 'testimonial_slide w-slide';
        slide.setAttribute('role', 'group');
        slide.setAttribute('aria-label', 'Testimonial slide');
        slide.appendChild(item.cloneNode(true));
        mask.appendChild(slide);
      });
    }

    mask.querySelectorAll('.w-slide').forEach(function (slide) {
      if (!slide.querySelector('.testimonial_grid')) slide.remove();
    });

    if (!slider.querySelector('.w-slide .testimonial_grid')) {
      container.classList.add('is-testimonial-static');
      container.classList.remove('is-slider-ready');
      return;
    }

    container.classList.remove('is-testimonial-static');
    container.classList.add('is-slider-ready');

    normalizeTestimonialSlider(slider);
    initTestimonialAutoplay(slider);
    redrawTestimonialSlider(slider);
  }

  function initTestimonialSlider() {
    document.querySelectorAll('.testimonial_container').forEach(initOneTestimonialContainer);
  }

  function isFreightHowSwitchSlider(slider) {
    return slider && slider.closest('.is-freight-forwarders-how-switch');
  }

  /** legacy template obligation-reddition: 31rem cards in a flex track, mask overflow visible. */
  function normalizeFreightHowSwitchSlider(slider) {
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
    if (isFreightHowSwitchSlider(slider)) {
      normalizeFreightHowSwitchSlider(slider);
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

  function resetSceneAgentPill(scene) {
    var agent = scene.querySelector('.kd-sb-agent');
    var labelEl = scene.querySelector('.kd-sb-agent-label');
    if (!agent) return;
    agent.classList.remove('is-success');
    var spin = agent.querySelector('.kd-spin');
    if (spin) spin.hidden = false;
    var phases = parseAgentPhases(scene.getAttribute('data-agent-phases'));
    if (labelEl && phases.length) labelEl.textContent = phases[0].label;
  }

  function scheduleSceneStory(scene, timers) {
    var labelEl = scene.querySelector('.kd-sb-agent-label');
    var agent = scene.querySelector('.kd-sb-agent');
    var phases = parseAgentPhases(scene.getAttribute('data-agent-phases'));
    if (labelEl && phases.length) {
      phases.forEach(function (phase) {
        timers.push(setTimeout(function () {
          labelEl.textContent = phase.label;
          if (!agent) return;
          var isSuccess = /sent to supplier|checks complete|ready for|filed with/i.test(phase.label);
          agent.classList.toggle('is-success', isSuccess);
          var spin = agent.querySelector('.kd-spin');
          if (spin) spin.hidden = isSuccess;
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
    }, parseInt(scene.getAttribute('data-loop-ms') || '7400', 10) - 120));
  }

  var KN_SCENE_FRAGMENTS = {
    collect: '/kleardata-collect-scene.html',
    verify: '/klearhub-verify-scene.html',
    operate: '/managed-trade-operate-scene.html',
    global: '/klearhub-global-scene.html',
    'home-hero': '/home-hero-scene.html'
  };

  function stripFragmentComments(html) {
    return String(html || '')
      .replace(/<!--[\s\S]*?-->/g, '')
      .trim();
  }

  function ensureSceneStylesheet() {
    if (!document.querySelector('[data-kn-scene-slot]')) return;
    if (!document.getElementById('kn-scene-styles')) {
      var link = document.createElement('link');
      link.id = 'kn-scene-styles';
      link.rel = 'stylesheet';
      link.href = withVersion('/kleardata-collect-scene.css');
      document.head.appendChild(link);
    }
    if (document.querySelector('[data-kn-scene="home-hero"]') && !document.getElementById('kn-hero-motion-styles')) {
      var heroLink = document.createElement('link');
      heroLink.id = 'kn-hero-motion-styles';
      heroLink.rel = 'stylesheet';
      heroLink.href = withVersion('/home-hero-motion.css');
      document.head.appendChild(heroLink);
    }
  }

  function setHeroRailStage(rail, activeIndex, allDone) {
    if (!rail) return;
    var segs = rail.querySelectorAll('.rail-seg');
    segs.forEach(function (seg, i) {
      var state = 'idle';
      if (allDone) state = 'done';
      else if (i < activeIndex) state = 'done';
      else if (i === activeIndex) state = 'active';
      seg.setAttribute('data-state', state);
    });
    rail.setAttribute('data-stage', allDone ? '5' : String(activeIndex));
  }

  function setHeroStatusPill(pill, mode, label) {
    if (!pill) return;
    if (mode === 'ok') {
      pill.className = 'pill pill-ok live';
      pill.innerHTML = '<span class="d"></span>' + label;
      return;
    }
    pill.className = 'pill pill-brand working';
    pill.innerHTML = '<span class="spin"></span><span data-kn-hero-pill-label>' + label + '</span>';
  }

  function setHeroDoc(doc, state, pillKind, pillText, meta) {
    if (!doc) return;
    doc.setAttribute('data-state', state);
    var pill = doc.querySelector('.pill');
    if (pill) {
      pill.className = 'pill pill-' + pillKind + (pillKind === 'ok' ? ' pop' : '');
      pill.textContent = pillText;
    }
    if (meta != null) {
      var metaEl = doc.querySelector('[data-kn-hero-doc-meta]');
      if (metaEl) metaEl.textContent = meta;
    }
  }

  function setHeroCheck(check, state, kind) {
    if (!check) return;
    check.setAttribute('data-state', state);
    check.setAttribute('data-kind', kind);
    var icon = check.querySelector('.tick, .bang, .ring');
    if (!icon) return;
    if (state === 'done' && kind === 'warn') {
      icon.outerHTML = '<span class="bang pop">!</span>';
    } else if (state === 'done') {
      icon.outerHTML = '<span class="tick pop">✓</span>';
    } else if (state === 'running') {
      icon.outerHTML = '<span class="ring"></span>';
    } else {
      icon.outerHTML = '<span class="ring idle"></span>';
    }
  }

  function applyHeroVisualStage(visual, stage) {
    var rail = visual.querySelector('[data-kn-hero-rail]');
    var pill = visual.querySelector('[data-kn-hero-pill]');
    var docsLabel = visual.querySelector('[data-kn-hero-docs-label]');
    var docs = [
      visual.querySelector('[data-kn-hero-doc="0"]'),
      visual.querySelector('[data-kn-hero-doc="1"]'),
      visual.querySelector('[data-kn-hero-doc="2"]')
    ];
    var checks = [
      visual.querySelector('[data-kn-hero-check="0"]'),
      visual.querySelector('[data-kn-hero-check="1"]'),
      visual.querySelector('[data-kn-hero-check="2"]')
    ];
    var footLeft = visual.querySelector('[data-kn-hero-foot-left]');
    var footRight = visual.querySelector('[data-kn-hero-foot-right]');
    var fileWrap = visual.querySelector('.file-wrap');

    if (fileWrap) fileWrap.setAttribute('data-playing', stage < 5 ? 'true' : '');

    if (stage === 0) {
      setHeroRailStage(rail, 0, false);
      setHeroStatusPill(pill, 'brand', 'Collecting from email & portal…');
      if (docsLabel) docsLabel.textContent = 'Documents · arriving by email';
      setHeroDoc(docs[0], 'reading', 'brand', 'Reading', 'Classified · PDF');
      setHeroDoc(docs[1], 'ghost', 'idle', 'Waiting', 'Scan · MSKU4829184');
      setHeroDoc(docs[2], 'ghost', 'idle', 'Waiting', '1 pp · 214 CTNS');
      setHeroCheck(checks[0], 'idle', 'ok');
      setHeroCheck(checks[1], 'idle', 'ok');
      setHeroCheck(checks[2], 'idle', 'warn');
      if (footLeft) footLeft.innerHTML = 'Agents working · <span class="num">0m 20s</span>';
      if (footRight) footRight.textContent = '0 of 3 checks';
    } else if (stage === 1) {
      setHeroRailStage(rail, 1, false);
      setHeroStatusPill(pill, 'brand', 'Classifying document types…');
      if (docsLabel) docsLabel.textContent = 'Documents · 7 received';
      setHeroDoc(docs[0], 'reading', 'brand', 'Reading', '2 pp · PDF');
      setHeroDoc(docs[1], 'ghost', 'idle', 'Waiting', 'Scan · MSKU4829184');
      setHeroDoc(docs[2], 'ghost', 'idle', 'Waiting', '1 pp · 214 CTNS');
      setHeroCheck(checks[0], 'idle', 'ok');
      setHeroCheck(checks[1], 'idle', 'ok');
      setHeroCheck(checks[2], 'idle', 'warn');
      if (footLeft) footLeft.innerHTML = 'Agents working · <span class="num">1m 01s</span>';
      if (footRight) footRight.textContent = '0 of 3 checks';
    } else if (stage === 2) {
      setHeroRailStage(rail, 2, false);
      setHeroStatusPill(pill, 'brand', 'Extracting fields from invoice & BOL…');
      setHeroDoc(docs[0], 'done', 'ok', 'Extracted', '2 pp · PDF');
      setHeroDoc(docs[1], 'reading', 'brand', 'Reading', 'Scan · MSKU4829184');
      setHeroDoc(docs[2], 'ghost', 'idle', 'Waiting', '1 pp · 214 CTNS');
      setHeroCheck(checks[0], 'idle', 'ok');
      setHeroCheck(checks[1], 'idle', 'ok');
      setHeroCheck(checks[2], 'idle', 'warn');
      if (footLeft) footLeft.innerHTML = 'Agents working · <span class="num">1m 48s</span>';
      if (footRight) footRight.textContent = '0 of 3 checks';
    } else if (stage === 3) {
      setHeroRailStage(rail, 3, false);
      setHeroStatusPill(pill, 'brand', 'Running cross-document checks…');
      setHeroDoc(docs[0], 'done', 'ok', 'Extracted', '2 pp · PDF');
      setHeroDoc(docs[1], 'done', 'ok', 'Verified', 'Scan · MSKU4829184');
      setHeroDoc(docs[2], 'done', 'ok', 'Verified', '1 pp · 214 CTNS');
      setHeroCheck(checks[0], 'idle', 'ok');
      setHeroCheck(checks[1], 'idle', 'ok');
      setHeroCheck(checks[2], 'idle', 'warn');
      if (footLeft) footLeft.innerHTML = 'Agents working · <span class="num">2m 41s</span>';
      if (footRight) footRight.textContent = '0 of 3 checks';
    } else if (stage === 4) {
      setHeroRailStage(rail, 3, false);
      setHeroStatusPill(pill, 'brand', 'Running cross-document checks…');
      setHeroDoc(docs[0], 'done', 'ok', 'Extracted', '2 pp · PDF');
      setHeroDoc(docs[1], 'done', 'ok', 'Verified', 'Scan · MSKU4829184');
      setHeroDoc(docs[2], 'done', 'ok', 'Verified', '1 pp · 214 CTNS');
      setHeroCheck(checks[0], 'done', 'ok');
      setHeroCheck(checks[1], 'running', 'ok');
      setHeroCheck(checks[2], 'idle', 'warn');
      if (footLeft) footLeft.innerHTML = 'Agents working · <span class="num">2m 41s</span>';
      if (footRight) footRight.textContent = '1 of 3 checks';
    } else {
      setHeroRailStage(rail, 4, true);
      setHeroStatusPill(pill, 'ok', 'Ready for broker review');
      setHeroDoc(docs[0], 'done', 'ok', 'Extracted', '2 pp · PDF');
      setHeroDoc(docs[1], 'done', 'ok', 'Verified', 'Scan · MSKU4829184');
      setHeroDoc(docs[2], 'done', 'ok', 'Verified', '1 pp · 214 CTNS');
      setHeroCheck(checks[0], 'done', 'ok');
      setHeroCheck(checks[1], 'done', 'ok');
      setHeroCheck(checks[2], 'done', 'warn');
      if (footLeft) footLeft.textContent = 'Posted to ACE via webhook';
      if (footRight) footRight.textContent = '3m 42s · 1 exception routed';
    }
  }

  function scheduleHeroVisualStory(visual, timers) {
    var stages = [
      { t: 0, s: 0 },
      { t: 2200, s: 1 },
      { t: 4400, s: 2 },
      { t: 6600, s: 3 },
      { t: 8800, s: 4 },
      { t: 10800, s: 5 }
    ];
    stages.forEach(function (step) {
      timers.push(
        setTimeout(function () {
          applyHeroVisualStage(visual, step.s);
        }, step.t)
      );
    });
  }

  /** stage-scene-style homepage hero — stage loop on .hero-visual */
  function initHeroVisualScenes() {
    var visuals = document.querySelectorAll('[data-kn-hero-visual]');
    if (!visuals.length) return;

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    visuals.forEach(function (visual) {
      if (visual.dataset.knHeroVisualInit) return;
      visual.dataset.knHeroVisualInit = '1';

      var loopMs = parseInt(visual.getAttribute('data-loop-ms') || '14200', 10);
      if (!loopMs || loopMs < 4000) loopMs = 14200;

      var loopTimer = null;
      var storyTimers = [];

      function clearStory() {
        storyTimers.forEach(clearTimeout);
        storyTimers = [];
      }

      function replay() {
        clearStory();
        applyHeroVisualStage(visual, 0);
        if (!reduced) scheduleHeroVisualStory(visual, storyTimers);
      }

      function startLoop() {
        if (reduced) {
          applyHeroVisualStage(visual, 5);
          return;
        }
        replay();
        if (loopTimer) clearInterval(loopTimer);
        loopTimer = setInterval(replay, loopMs);
      }

      function stopLoop() {
        clearStory();
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
          { threshold: 0.12, rootMargin: '0px' }
        );
        observer.observe(visual);
        requestAnimationFrame(function () {
          var rect = visual.getBoundingClientRect();
          var vh = window.innerHeight || document.documentElement.clientHeight;
          if (rect.top < vh && rect.bottom > 0) startLoop();
        });
      } else {
        startLoop();
      }
    });
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
            slot.classList.remove('product-overview_image-placeholder', 'support-you_image-placeholder');
          })
      );
    });
    return Promise.all(tasks);
  }

  /** Homepage stack cards — stage-scene-style scenes (Collect, Classify, …) replay on data-inview. */
  function initProductStackScenes() {
    var scenes = document.querySelectorAll('[data-kn-product-scene], [data-kd-collect-scene]');
    if (!scenes.length) return;

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    scenes.forEach(function (scene) {
      if (scene.dataset.knProductSceneInit) return;
      scene.dataset.knProductSceneInit = '1';

      var loopMs = parseInt(scene.getAttribute('data-loop-ms') || '7400', 10);
      if (!loopMs || loopMs < 1000) loopMs = 7400;

      var loopTimer = null;
      var storyTimers = [];

      function clearStory() {
        storyTimers.forEach(clearTimeout);
        storyTimers = [];
        resetSceneAgentPill(scene);
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
        initHeroVisualScenes();
        initProductStackScenes();

        if (window.KlearNavDropdown) {
          if (window.KlearNavDropdown.closeAll) window.KlearNavDropdown.closeAll();
          if (window.KlearNavDropdown.updateLayers) window.KlearNavDropdown.updateLayers();
        }

        whenTypographyReady(function () {
          requestAnimationFrame(function () {
            requestAnimationFrame(markReady);
          });
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
    initTestimonialSlider();
    scheduleHowSwitchSliders();
  });
  window.addEventListener('resize', function () {
    syncNavHeight();
    initHowSwitchSliders();
    initTestimonialSlider();
  });

  document.addEventListener('DOMContentLoaded', function () {
    stripFinsweetCmssliderAttrs(document);
    wireBookDemoCalendlyLinks(document);
  });

  var KLEARNOW_CALENDLY_URL = 'https://calendly.com/klearnow/demo';

  function wireBookDemoCalendlyLinks(root) {
    var scope = root && root.querySelectorAll ? root : document;
    scope.querySelectorAll('.calendly-trigger, [data-group="book-demo"]').forEach(function (link) {
      link.href = KLEARNOW_CALENDLY_URL;
      link.setAttribute('data-calendly-url', KLEARNOW_CALENDLY_URL);
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });
  }

  window.KlearBoot = {
    version: ASSET_VERSION,
    reset: resetUiState,
    finish: finishBoot,
    hardReload: hardReload
  };
})();
