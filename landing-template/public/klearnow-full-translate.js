(function () {
  'use strict';

  /**
   * Full-page translation for static marketing HTML (one click with locale dropdown).
   * Uses curated data-i18n strings first (klearnow-locale.js), then machine translation
   * for remaining visible copy. Operation-type pages use native FR HTML panes when lang=fr.
   */
  var CACHE_PREFIX = 'klearnow-mt:v1:';
  var BUNDLE_VERSION = '20260963';
  var ORIGINAL_TEXT = new WeakMap();
  var bundleCache = Object.create(null);
  var BRAND_RE =
    /^(KlearNow|KlearData|KlearHub|Managed Trade|Maersk|DHL|FedEx|UPS|Expeditors|ISO 27001|GDPR)$/i;
  var SKIP_ANCESTOR =
    'script,style,noscript,svg,iframe,[data-i18n],[data-kn-no-translate],[contenteditable="true"],.w-embed,code,pre';

  function pageBundleId() {
    var path = (location.pathname || '/').replace(/^\//, '').replace(/\.html$/, '');
    if (!path || path === '') return 'index';
    return path.replace(/\//g, '-');
  }

  function loadPageBundle(lang) {
    var cacheKey = lang + ':' + pageBundleId();
    if (bundleCache[cacheKey]) return Promise.resolve(bundleCache[cacheKey]);
    var url =
      '/locale/bundles/' +
      pageBundleId() +
      '.' +
      lang +
      '.json?v=' +
      BUNDLE_VERSION;
    return fetch(url)
      .then(function (res) {
        if (!res.ok) return {};
        return res.json();
      })
      .then(function (json) {
        bundleCache[cacheKey] = json || {};
        return bundleCache[cacheKey];
      })
      .catch(function () {
        bundleCache[cacheKey] = {};
        return bundleCache[cacheKey];
      });
  }

  function getTranslatableRoot() {
    var isFr = document.body.classList.contains('locale-fr');
    var pane = document.querySelector(
      isFr ? '.kn-locale-pane.is_fr-only' : '.kn-locale-pane.is_en-only'
    );
    if (pane) return pane;
    return document.querySelector('main.main-wrapper') || document.querySelector('.page-wrapper');
  }

  function isHidden(el) {
    while (el && el !== document.documentElement) {
      if (el.hasAttribute && el.hasAttribute('hidden')) return true;
      var style = el.style && el.style.display;
      if (style === 'none') return true;
      el = el.parentElement;
    }
    return false;
  }

  function shouldSkipText(text) {
    var t = text.replace(/\s+/g, ' ').trim();
    if (!t || t.length < 2) return true;
    if (BRAND_RE.test(t)) return true;
    if (/^[\d\s.,+$%\-–—/|:;()]+$/.test(t)) return true;
    return false;
  }

  function collectTextNodes(root) {
    var nodes = [];
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (isHidden(parent)) return NodeFilter.FILTER_REJECT;
        if (parent.closest(SKIP_ANCESTOR)) return NodeFilter.FILTER_REJECT;
        if (shouldSkipText(node.textContent)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    var n;
    while ((n = walker.nextNode())) nodes.push(n);
    return nodes;
  }

  function cacheKey(lang, text) {
    return CACHE_PREFIX + lang + ':' + text;
  }

  function readCache(lang, text) {
    try {
      return localStorage.getItem(cacheKey(lang, text));
    } catch (e) {
      return null;
    }
  }

  function writeCache(lang, text, translated) {
    try {
      localStorage.setItem(cacheKey(lang, text), translated);
    } catch (e) {}
  }

  function captureOriginal(node) {
    if (!ORIGINAL_TEXT.has(node)) {
      ORIGINAL_TEXT.set(node, node.textContent);
    }
    return ORIGINAL_TEXT.get(node);
  }

  function restoreOriginals(root) {
    collectTextNodes(root).forEach(function (node) {
      if (ORIGINAL_TEXT.has(node)) node.textContent = ORIGINAL_TEXT.get(node);
    });
    // Also restore nodes we translated but filter might skip now
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var n;
    while ((n = walker.nextNode())) {
      if (ORIGINAL_TEXT.has(n)) n.textContent = ORIGINAL_TEXT.get(n);
    }
  }

  function fetchTranslation(text, lang, retries) {
    retries = retries == null ? 2 : retries;
    var cached = readCache(lang, text);
    if (cached) return Promise.resolve(cached);

    var pair = 'en|' + lang;
    var url =
      'https://api.mymemory.translated.net/get?q=' +
      encodeURIComponent(text.slice(0, 480)) +
      '&langpair=' +
      pair;

    return fetch(url)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        var out =
          data &&
          data.responseData &&
          data.responseData.translatedText &&
          String(data.responseData.translatedText);
        if (!out || /MYMEMORY WARNING/i.test(out)) {
          throw new Error('quota');
        }
        if (out.toUpperCase() === text.toUpperCase()) return text;
        writeCache(lang, text, out);
        return out;
      })
      .catch(function () {
        if (retries > 0) {
          return new Promise(function (resolve) {
            setTimeout(resolve, 600);
          }).then(function () {
            return fetchTranslation(text, lang, retries - 1);
          });
        }
        return text;
      });
  }

  function translateUniqueStrings(strings, lang, concurrency) {
    var queue = strings.slice();
    var results = {};
    var active = 0;
    var index = 0;

    return new Promise(function (resolve) {
      function pump() {
        while (active < concurrency && index < queue.length) {
          (function (text) {
            active += 1;
            fetchTranslation(text, lang)
              .then(function (translated) {
                results[text] = translated;
              })
              .finally(function () {
                active -= 1;
                if (index >= queue.length && active === 0) resolve(results);
                else pump();
              });
          })(queue[index++]);
        }
        if (queue.length === 0) resolve(results);
      }
      pump();
    });
  }

  function applyMapToNodes(nodes, map) {
    nodes.forEach(function (node) {
      var source = captureOriginal(node).replace(/\s+/g, ' ').trim();
      if (map[source]) node.textContent = map[source];
    });
  }

  function translateRoot(root, lang) {
    var nodes = collectTextNodes(root);
    var unique = [];
    var seen = Object.create(null);

    nodes.forEach(function (node) {
      var source = captureOriginal(node);
      var key = source.replace(/\s+/g, ' ').trim();
      if (!seen[key]) {
        seen[key] = true;
        unique.push(key);
      }
    });

    return loadPageBundle(lang).then(function (bundle) {
      var map = Object.assign({}, bundle);
      var missing = unique.filter(function (text) {
        return !map[text];
      });
      applyMapToNodes(nodes, map);
      if (!missing.length) return;
      return translateUniqueStrings(missing, lang, 3).then(function (mtMap) {
        Object.assign(map, mtMap);
        applyMapToNodes(nodes, map);
      });
    });
  }

  function apply(lang) {
    var root = getTranslatableRoot();
    if (!root) return Promise.resolve();

    if (lang === 'en') {
      restoreOriginals(root);
      return Promise.resolve();
    }

    if (lang === 'fr' && document.querySelector('.kn-locale-pane.is_fr-only')) {
      return Promise.resolve();
    }

    document.body.classList.add('kn-full-translate-busy');
    return translateRoot(root, lang).finally(function () {
      document.body.classList.remove('kn-full-translate-busy');
    });
  }

  window.KlearFullTranslate = {
    apply: apply,
    getTranslatableRoot: getTranslatableRoot,
  };
})();
