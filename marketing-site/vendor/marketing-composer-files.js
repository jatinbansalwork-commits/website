/**
 * Chat composer file attachments — marketing port of agentic-broker.js composer files.
 */
(function () {
  "use strict";

  const CHAT_ACCEPT = ".jpg,.jpeg,.png,.pdf,.xlsx";
  const CHAT_MAX_FILES = 3;
  const CHAT_MAX_BYTES = 5 * 1024 * 1024;

  const states = new WeakMap();

  const FILE_ITEM_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/><path d="M14 3v5h5"/></svg>';
  const FILE_CLOSE_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>';
  const FILE_TRASH_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V5h6v2M10 11v6M14 11v6M6 7l1 12h10l1-12"/></svg>';
  const FILE_RETRY_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4v6h6M20 20v-6h-6"/><path d="M5.5 9A8 8 0 0 1 20 12M18.5 15A8 8 0 0 1 4 12"/></svg>';

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function prefersReducedMotion() {
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }

  function formatFileSize(bytes) {
    const kb = Number(bytes || 0) / 1024;
    if (kb < 1024) {
      return `${kb.toFixed(kb < 10 ? 2 : 1)} KB`;
    }
    return `${(kb / 1024).toFixed(2)} MB`;
  }

  function isFileAccepted(file, acceptedFiles) {
    const accepted = acceptedFiles.split(",");
    const fileName = (file.name || "").toLowerCase();
    const mimeType = String(file.type || "").toLowerCase();
    return accepted.some((type) => {
      const valid = type.trim().toLowerCase();
      if (valid.startsWith(".")) {
        return fileName.endsWith(valid);
      }
      return mimeType === valid;
    });
  }

  function stateFor(root) {
    if (!states.has(root)) {
      states.set(root, { files: [], timers: new Map() });
    }
    return states.get(root);
  }

  function stopTimer(state, fileId) {
    const timer = state.timers.get(fileId);
    if (timer) {
      clearInterval(timer);
      state.timers.delete(fileId);
    }
  }

  function fileItemHtml(file) {
    const status = file.status || "success";
    const percent = Number.isFinite(file.uploadPercent) ? ` (${file.uploadPercent}%)` : "";
    const meta = file.errorText || `${formatFileSize(file.size)}${status === "uploading" ? percent : ""}`;
    const name = escapeHtml(file.name);
    let actions = "";
    if (status === "uploading") {
      actions = `<button type="button" class="marketing-file-action icon-btn" data-chat-file-dismiss="${file.id}" aria-label="Remove ${name}">${FILE_CLOSE_ICON}</button>`;
    } else if (status === "error") {
      actions = `<button type="button" class="marketing-file-action icon-btn" data-chat-file-reupload="${file.id}" aria-label="Reupload ${name}">${FILE_RETRY_ICON}</button>
        <button type="button" class="marketing-file-action icon-btn" data-chat-file-remove="${file.id}" aria-label="Remove ${name}">${FILE_TRASH_ICON}</button>`;
    } else {
      actions = `<button type="button" class="marketing-file-action icon-btn" data-chat-file-remove="${file.id}" aria-label="Remove ${name}">${FILE_TRASH_ICON}</button>`;
    }
    const progress =
      status === "uploading"
        ? `<div class="kn-file-upload__progress"><div class="kn-file-upload__progress-fill" style="--kn-file-upload-progress: ${file.uploadPercent || 0}%"></div></div>`
        : "";
    return `<div class="kn-chat-input__file">
      <div class="kn-file-upload__item${status === "error" ? " is-error" : ""}" data-status="${status}" data-file-id="${file.id}">
        <div class="kn-file-upload__item-body">
          <span class="kn-file-upload__item-icon" aria-hidden="true">${FILE_ITEM_ICON}</span>
          <div class="kn-file-upload__item-copy">
            <p class="kn-file-upload__item-name type-ui-sm">${name}</p>
            <p class="kn-file-upload__item-meta type-caption-sm">${escapeHtml(meta)}</p>
          </div>
          <div class="kn-file-upload__item-actions">${actions}</div>
        </div>
        ${progress}
      </div>
    </div>`;
  }

  function init(root, callbacks = {}) {
    if (!root) {
      return null;
    }

    const state = stateFor(root);
    const fileInput = root.querySelector("[data-chat-file-input]");
    const uploadBtn = root.querySelector("[data-chat-upload]");

    function render() {
      const row = root.querySelector("[data-chat-files]");
      const host = root.querySelector("[data-chat-files-host]") || row;
      if (!row || !host) {
        return;
      }
      if (!state.files.length) {
        host.classList.remove("is-open");
        row.innerHTML = "";
        return;
      }
      row.innerHTML = state.files.map(fileItemHtml).join("");
      host.classList.add("is-open");
      row.scrollTo({ left: row.scrollWidth, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    }

    function syncSubmit() {
      callbacks.onSync?.();
    }

    function startUpload(fileId) {
      stopTimer(state, fileId);
      const tick = () => {
        const file = state.files.find((item) => item.id === fileId);
        if (!file) {
          stopTimer(state, fileId);
          return;
        }
        file.uploadPercent = Math.min(100, (file.uploadPercent || 0) + 25);
        if (file.uploadPercent >= 100) {
          stopTimer(state, fileId);
          if (file.size > CHAT_MAX_BYTES) {
            file.status = "error";
            file.errorText = "File is too large";
          } else {
            file.status = "success";
            file.errorText = undefined;
          }
        }
        render();
        syncSubmit();
      };
      state.timers.set(fileId, setInterval(tick, prefersReducedMotion() ? 80 : 200));
    }

    function addFiles(incoming) {
      if (!incoming?.length) {
        return;
      }
      const accepted = incoming.filter((file) => isFileAccepted(file, CHAT_ACCEPT));
      if (accepted.length !== incoming.length) {
        callbacks.showError?.("That file type isn’t supported. Use JPG, PNG, PDF, or XLSX.");
      } else {
        callbacks.hideError?.();
      }
      if (!accepted.length) {
        return;
      }
      if (state.files.length + accepted.length > CHAT_MAX_FILES) {
        callbacks.showError?.("You can attach a maximum of 3 files.");
        return;
      }
      const next = accepted.map((file) => ({
        id: `${Date.now()}${Math.floor(Math.random() * 1000000)}`,
        name: file.name,
        size: file.size,
        type: file.type,
        status: "uploading",
        uploadPercent: 0,
        raw: file,
      }));
      state.files = state.files.concat(next);
      render();
      syncSubmit();
      next.forEach((file) => startUpload(file.id));
    }

    function removeFile(fileId) {
      stopTimer(state, fileId);
      state.files = state.files.filter((file) => file.id !== fileId);
      render();
      syncSubmit();
    }

    function reupload(fileId) {
      const file = state.files.find((item) => item.id === fileId);
      if (!file) {
        return;
      }
      file.status = "uploading";
      file.uploadPercent = 0;
      file.errorText = undefined;
      render();
      syncSubmit();
      startUpload(fileId);
    }

    uploadBtn?.addEventListener("click", () => {
      fileInput?.click();
    });

    fileInput?.addEventListener("change", () => {
      const list = Array.from(fileInput.files || []);
      fileInput.value = "";
      addFiles(list);
    });

    function handleFileActionClick(event) {
      const reuploadBtn = event.target.closest("[data-chat-file-reupload]");
      if (reuploadBtn) {
        event.preventDefault();
        event.stopPropagation();
        reupload(reuploadBtn.getAttribute("data-chat-file-reupload"));
        return;
      }
      const removeBtn = event.target.closest("[data-chat-file-remove], [data-chat-file-dismiss]");
      if (removeBtn) {
        event.preventDefault();
        event.stopPropagation();
        const fileId =
          removeBtn.getAttribute("data-chat-file-remove") || removeBtn.getAttribute("data-chat-file-dismiss");
        if (fileId) {
          removeFile(fileId);
        }
      }
    }

    root.querySelector("[data-chat-files]")?.addEventListener("click", handleFileActionClick);
    root.addEventListener("click", handleFileActionClick);

    return {
      getReadyFiles() {
        return state.files.filter((file) => file.status === "success").map(({ id, name, size, type }) => ({ id, name, size, type }));
      },
      clear() {
        Array.from(state.timers.keys()).forEach((id) => stopTimer(state, id));
        state.files = [];
        render();
        syncSubmit();
        callbacks.hideError?.();
      },
      isSubmitBlocked(text, { generating = false } = {}) {
        if (generating) {
          return true;
        }
        const trimmed = String(text || "").trim();
        const hasError = state.files.some((file) => file.status === "error" || file.status === "uploading");
        return (!trimmed && !state.files.length) || hasError;
      },
      hasFiles() {
        return state.files.length > 0;
      },
    };
  }

  window.MarketingComposerFiles = Object.freeze({ init, CHAT_ACCEPT, CHAT_MAX_FILES });
})();
