/**
 * Klear360 iconography for trade-stack scenes (from Klearnow_ai/kn-icons.js).
 * Stroked 24×24 glyphs; color via currentColor on host.
 */
(function () {
  "use strict";

  var SIZE_CLASS = {
    xsmall: "kn-icon--xsmall",
    small: "kn-icon--small",
    medium: "kn-icon--medium",
    large: "kn-icon--large",
    xlarge: "kn-icon--xlarge",
    "2xlarge": "kn-icon--2xlarge"
  };

  var PATHS = {
    eye:
      '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    doc:
      '<path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/><path d="M14 3v5h5"/>',
    intake:
      '<path d="M9 14 4 9l5-5"/><path d="M4 9h10a4 4 0 0 1 4 4v7"/>',
    upload:
      '<path d="M12 3v12"/><path d="M7 8l5-5 5 5"/><path d="M5 21h14"/>',
    file:
      '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',
    warn:
      '<path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>',
    check: '<path d="M4 12.5 9 17l11-11"/>',
    mail: '<path d="M4 6h16v12H4z"/><path d="m4 7 8 6 8-6"/>',
    send: '<path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="M22 2 11 13"/>',
    api:
      '<path d="M8 3H6a2 2 0 0 0-2 2v4"/><path d="M16 3h2a2 2 0 0 1 2 2v4"/><path d="M8 21H6a2 2 0 0 1-2-2v-4"/><path d="M16 21h2a2 2 0 0 0 2-2v-4"/><path d="M9 9h6v6H9z"/>',
    refresh:
      '<path d="M21 12a9 9 0 1 1-2.6-6.3"/><path d="M21 3v6h-6"/>',
    download:
      '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>'
  };

  var VIEWBOX = {
    chevronDown: "0 0 16 16",
    chevronRight: "0 0 16 16"
  };

  function html(name, opts) {
    opts = opts || {};
    var size = opts.size || "medium";
    var className = opts.className || "";
    var paths = PATHS[name];
    if (!paths) return "";
    var sizeCls = SIZE_CLASS[size] || SIZE_CLASS.medium;
    var cls = ["kn-icon", sizeCls, className].filter(Boolean).join(" ");
    var viewBox = VIEWBOX[name] || "0 0 24 24";
    return (
      '<svg class="' +
      cls +
      '" viewBox="' +
      viewBox +
      '" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      paths +
      "</svg>"
    );
  }

  window.KNIcons = { html: html, PATHS: PATHS, SIZE_CLASS: SIZE_CLASS };
})();
