(function () {
  'use strict';

  var MAX_BYTES = 35 * 1024 * 1024;
  var LOADER_MS = [2200, 2800, 3400];
  var LOADER_LINES = [
    'Reading document…',
    'Detecting layout…',
    'Extracting fields…',
  ];

  var SAMPLES = {
    invoice: {
      title: 'Invoice',
      preview: '/kleardata/extraction-samples/invoice.png',
      fields: [
        ['Invoice number', 'INV-2026-0847'],
        ['Invoice date', '2026-03-12'],
        ['Seller', 'Harbor Street Imports LLC'],
        ['Buyer', 'Northline Retail Co.'],
        ['Incoterms', 'FOB Shanghai'],
        ['Total value', 'USD 128,440.00'],
        ['HS code', '8471.30.0100'],
        ['Country of origin', 'CN'],
      ],
    },
    contract: {
      title: 'Contract',
      preview: '/kleardata/extraction-samples/contract.png',
      fields: [
        ['Agreement type', 'Master services agreement'],
        ['Effective date', '2026-01-15'],
        ['Party A', 'Harbor Street Imports LLC'],
        ['Party B', 'Northline Retail Co.'],
        ['Term', '24 months'],
        ['Governing law', 'State of California'],
        ['Renewal', 'Auto-renew with 90-day notice'],
      ],
    },
    'bank-statement': {
      title: 'Bank Statement',
      preview: '/kleardata/extraction-samples/bank-statement.png',
      fields: [
        ['Account holder', 'Harbor Street Imports LLC'],
        ['Account number', '****4821'],
        ['Statement period', 'Feb 1 – Feb 28, 2026'],
        ['Opening balance', 'USD 842,110.22'],
        ['Closing balance', 'USD 901,448.09'],
        ['Total credits', 'USD 412,880.00'],
        ['Total debits', 'USD 353,542.13'],
      ],
    },
    w2: {
      title: 'W2',
      preview: '/kleardata/extraction-samples/w2.png',
      fields: [
        ['Employee name', 'Alex Morgan'],
        ['Employer', 'Northline Retail Co.'],
        ['Tax year', '2025'],
        ['Wages (Box 1)', 'USD 118,420.00'],
        ['Federal tax withheld', 'USD 19,842.00'],
        ['SSN', '***-**-4821'],
        ['Employer EIN', '**-***8842'],
      ],
    },
    expense: {
      title: 'Expense',
      preview: '/kleardata/extraction-samples/expense.png',
      fields: [
        ['Merchant', 'Global Freight Services'],
        ['Transaction date', '2026-03-08'],
        ['Category', 'Logistics & freight'],
        ['Amount', 'USD 2,840.00'],
        ['Payment method', 'Corporate card ****9012'],
        ['Submitted by', 'J. Patel'],
        ['Approval status', 'Approved'],
      ],
    },
    payslip: {
      title: 'Payslip',
      preview: '/kleardata/extraction-samples/payslip.png',
      fields: [
        ['Employee', 'Alex Morgan'],
        ['Pay period', 'Mar 1 – Mar 15, 2026'],
        ['Gross pay', 'USD 4,615.38'],
        ['Net pay', 'USD 3,482.11'],
        ['Federal tax', 'USD 612.00'],
        ['401(k) contribution', 'USD 276.92'],
        ['Employer', 'Northline Retail Co.'],
      ],
    },
    'us-driver-license': {
      title: 'US Driver License',
      preview: '/kleardata/extraction-samples/us-driver-license.png',
      fields: [
        ['Full name', 'Alex Morgan'],
        ['License number', 'D4829103'],
        ['State', 'California'],
        ['Class', 'C'],
        ['Date of birth', '1990-06-14'],
        ['Issue date', '2024-02-10'],
        ['Expiration date', '2029-02-10'],
      ],
    },
  };

  var previewObjectUrl = null;

  function assetVersion() {
    if (window.KLEAR_ASSET_VERSION) return window.KLEAR_ASSET_VERSION;
    try {
      var src = document.currentScript && document.currentScript.src;
      if (src) {
        var m = src.match(/[?&]v=([^&]+)/);
        if (m) return m[1];
      }
    } catch (e) {}
    return '1';
  }

  function pickLoaderMs() {
    return LOADER_MS[Math.floor(Math.random() * LOADER_MS.length)];
  }

  function revokePreviewUrl() {
    if (previewObjectUrl) {
      URL.revokeObjectURL(previewObjectUrl);
      previewObjectUrl = null;
    }
  }

  function mount(root) {
    if (!root || root.dataset.kdExMounted === '1') return;
    root.dataset.kdExMounted = '1';

    var v = assetVersion();
    fetch('/kleardata-extraction-widget.html?v=' + v)
      .then(function (r) {
        if (!r.ok) throw new Error('widget html');
        return r.text();
      })
      .then(function (html) {
        root.innerHTML = html;
        root.setAttribute('aria-busy', 'false');
        root.removeAttribute('aria-label');
        initWidget(root);
      })
      .catch(function () {
        root.innerHTML =
          '<p class="kd-ex-error" role="alert">Demo unavailable. Please refresh the page.</p>';
      });
  }

  function initWidget(root) {
    var widget = root.querySelector('[data-kd-ex-widget]');
    if (!widget) return;

    var panels = {
      upload: widget.querySelector('[data-kd-ex-panel="upload"]'),
      loading: widget.querySelector('[data-kd-ex-panel="loading"]'),
      results: widget.querySelector('[data-kd-ex-panel="results"]'),
    };
    var fileInput = widget.querySelector('[data-kd-ex-file]');
    var uploadTrigger = widget.querySelector('[data-kd-ex-upload-trigger]');
    var errorEl = widget.querySelector('[data-kd-ex-error]');
    var loaderText = widget.querySelector('[data-kd-ex-loader-text]');
    var fieldsEl = widget.querySelector('[data-kd-ex-fields]');
    var titleEl = widget.querySelector('[data-kd-ex-results-title]');
    var previewEl = widget.querySelector('[data-kd-ex-preview]');
    var backBtn = widget.querySelector('[data-kd-ex-back]');
    var loaderTimer = null;
    var lineTimer = null;
    var pendingPreview = null;

    function showPanel(name) {
      Object.keys(panels).forEach(function (key) {
        var panel = panels[key];
        if (!panel) return;
        var on = key === name;
        panel.classList.toggle('is-active', on);
        panel.setAttribute('aria-hidden', on ? 'false' : 'true');
      });
    }

    function clearError() {
      if (!errorEl) return;
      errorEl.hidden = true;
      errorEl.textContent = '';
    }

    function showError(msg) {
      if (!errorEl) return;
      errorEl.hidden = false;
      errorEl.textContent = msg;
    }

    function validateFile(file) {
      if (!file) return 'No file selected.';
      if (file.size > MAX_BYTES) {
        return 'File exceeds 35MB. Choose a smaller document or use a sample.';
      }
      return null;
    }

    function setPreview(src, alt) {
      if (!previewEl) return;
      revokePreviewUrl();
      previewEl.src = src || '';
      previewEl.alt = alt || 'Document preview';
    }

    function renderFields(sampleKey, fileName) {
      var sample = SAMPLES[sampleKey] || SAMPLES.invoice;
      if (titleEl) {
        titleEl.textContent = fileName || sample.title;
      }
      if (previewEl) {
        if (pendingPreview) {
          setPreview(pendingPreview, fileName || sample.title);
        } else {
          setPreview(sample.preview, sample.title);
        }
      }
      if (!fieldsEl) return;
      fieldsEl.innerHTML = sample.fields
        .map(function (row) {
          return (
            '<div class="kd-ex-field-row"><div class="kd-ex-field-key">' +
            row[0] +
            '</div><div class="kd-ex-field-val">' +
            row[1] +
            '</div></div>'
          );
        })
        .join('');
    }

    function startLoader(sampleKey, fileName) {
      clearError();
      showPanel('loading');
      var i = 0;
      if (loaderText) loaderText.textContent = LOADER_LINES[0];
      if (lineTimer) clearInterval(lineTimer);
      lineTimer = setInterval(function () {
        i = (i + 1) % LOADER_LINES.length;
        if (loaderText) loaderText.textContent = LOADER_LINES[i];
      }, 900);
      if (loaderTimer) clearTimeout(loaderTimer);
      loaderTimer = setTimeout(function () {
        if (lineTimer) clearInterval(lineTimer);
        renderFields(sampleKey, fileName);
        pendingPreview = null;
        showPanel('results');
      }, pickLoaderMs());
    }

    function onPick(sampleKey, file) {
      var err = file ? validateFile(file) : null;
      if (err) {
        showError(err);
        return;
      }
      pendingPreview = null;
      if (file && file.type && file.type.indexOf('image/') === 0) {
        previewObjectUrl = URL.createObjectURL(file);
        pendingPreview = previewObjectUrl;
      } else if (file) {
        pendingPreview = (SAMPLES[sampleKey] || SAMPLES.invoice).preview;
      }
      var name = file ? file.name : null;
      startLoader(sampleKey || 'invoice', name);
    }

    if (uploadTrigger && fileInput) {
      uploadTrigger.addEventListener('click', function () {
        fileInput.click();
      });
      uploadTrigger.addEventListener('dragover', function (e) {
        e.preventDefault();
        uploadTrigger.classList.add('is-dragover');
      });
      uploadTrigger.addEventListener('dragleave', function () {
        uploadTrigger.classList.remove('is-dragover');
      });
      uploadTrigger.addEventListener('drop', function (e) {
        e.preventDefault();
        uploadTrigger.classList.remove('is-dragover');
        var file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        onPick('invoice', file);
      });
      fileInput.addEventListener('change', function () {
        var file = fileInput.files && fileInput.files[0];
        onPick('invoice', file);
        fileInput.value = '';
      });
    }

    widget.querySelectorAll('[data-kd-ex-sample]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        onPick(btn.getAttribute('data-kd-ex-sample'), null);
      });
    });

    if (backBtn) {
      backBtn.addEventListener('click', function () {
        if (loaderTimer) clearTimeout(loaderTimer);
        if (lineTimer) clearInterval(lineTimer);
        revokePreviewUrl();
        pendingPreview = null;
        if (previewEl) previewEl.removeAttribute('src');
        showPanel('upload');
        clearError();
      });
    }
  }

  function boot() {
    document.querySelectorAll('[data-kd-extraction-mount]').forEach(mount);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
