(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function markdownLite(markdown) {
    const escaped = escapeHtml(markdown);
    const lines = escaped.split(/\r?\n/);
    let html = "";
    let inList = false;
    let inCode = false;

    for (const line of lines) {
      if (line.startsWith("```")) {
        if (!inCode) {
          html += "<pre><code>";
          inCode = true;
        } else {
          html += "</code></pre>";
          inCode = false;
        }
        continue;
      }

      if (inCode) {
        html += line + "\n";
        continue;
      }

      const h = line.match(/^(#{1,6})\s+(.*)$/);
      if (h) {
        if (inList) { html += "</ul>"; inList = false; }
        const level = h[1].length;
        html += `<h${level}>${h[2]}</h${level}>`;
        continue;
      }

      const li = line.match(/^\s*[-*]\s+(.*)$/);
      if (li) {
        if (!inList) { html += "<ul>"; inList = true; }
        html += `<li>${li[1]}</li>`;
        continue;
      }

      if (line.trim() === "") {
        if (inList) { html += "</ul>"; inList = false; }
        continue;
      }

      if (inList) { html += "</ul>"; inList = false; }
      html += `<p>${line}</p>`;
    }

    if (inList) html += "</ul>";
    if (inCode) html += "</code></pre>";
    return html;
  }

  async function loadReadme(url) {
    const box = $("[data-dd-readme-box]");
    const body = $("[data-dd-readme-body]", box || document);
    if (!box || !body) return;

    const target = url || box.dataset.defaultReadme || "README.md";
    body.innerHTML = `<p class="dd-muted">Lade README: <code>${escapeHtml(target)}</code> …</p>`;

    try {
      const res = await fetch(target, { credentials: "same-origin" });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const text = await res.text();
      body.innerHTML = markdownLite(text);
    } catch (err) {
      const fallback = box.dataset.memoryReadme;
      if (fallback && target !== fallback) {
        try {
          const res = await fetch(fallback);
          if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
          const text = await res.text();
          body.innerHTML = markdownLite(text);
          return;
        } catch (fallbackErr) {
          body.innerHTML = `<p class="text-warning">README konnte nicht geladen werden: ${escapeHtml(err.message)} / ${escapeHtml(fallbackErr.message)}</p>`;
          return;
        }
      }
      body.innerHTML = `<p class="text-warning">README konnte nicht geladen werden: ${escapeHtml(err.message)}</p>`;
    }
  }

  function closeCard(card) {
    const li = card.closest(".dd-node");
    const content = $("[data-dd-node-content]", card);
    const btn = $("[data-dd-toggle]", card);

    card.classList.remove("is-active");
    card.classList.add("is-collapsed");
    if (li) li.setAttribute("aria-expanded", "false");
    if (btn) btn.setAttribute("aria-expanded", "false");
    if (content) content.hidden = true;

    const parentList = li?.parentElement;
    if (parentList) {
      $$(".dd-node-card.is-sibling-hidden", parentList).forEach(sib => sib.classList.remove("is-sibling-hidden"));
    }
  }

  function openCard(card) {
    const li = card.closest(".dd-node");
    const content = $("[data-dd-node-content]", card);
    const btn = $("[data-dd-toggle]", card);

    const parentList = li?.parentElement;
    if (parentList) {
      $$(".dd-node > .dd-node-card", parentList).forEach(siblingCard => {
        if (siblingCard !== card) siblingCard.classList.add("is-sibling-hidden");
      });
    }

    card.classList.add("is-active");
    card.classList.remove("is-collapsed");
    if (li) li.setAttribute("aria-expanded", "true");
    if (btn) btn.setAttribute("aria-expanded", "true");
    if (content) {
      content.hidden = false;
      const readmeUrl = content.dataset.readmeUrl;
      if (readmeUrl) loadReadme(readmeUrl);
    }
  }

  function toggleCard(btn) {
    const card = btn.closest("[data-dd-node-card]");
    if (!card) return;

    if (card.classList.contains("is-active")) {
      closeCard(card);
    } else {
      const parentList = card.closest(".dd-node")?.parentElement;
      if (parentList) {
        $$(".dd-node > .dd-node-card.is-active", parentList).forEach(open => {
          if (open !== card) closeCard(open);
        });
      }
      openCard(card);
    }
  }

  function collapseAll() {
    $$("[data-dd-node-card].is-active").forEach(closeCard);
    $$(".dd-node-card.is-sibling-hidden").forEach(el => el.classList.remove("is-sibling-hidden"));
    loadReadme();
  }

  function previewPdf(preview, link) {
    const title = $("[data-dd-preview-title]", preview);
    const body = $("[data-dd-preview-body]", preview);
    const url = link.dataset.previewUrl || link.href;
    title.textContent = link.dataset.filename || "PDF Vorschau";
    body.innerHTML = `<iframe title="${escapeHtml(title.textContent)}" src="${escapeHtml(url)}"></iframe>
      <p class="p-2 mb-0"><a href="${escapeHtml(link.href)}" target="_blank" rel="noopener">Auf GitHub öffnen</a></p>`;
    preview.hidden = false;
  }

  async function previewText(preview, link) {
    const title = $("[data-dd-preview-title]", preview);
    const body = $("[data-dd-preview-body]", preview);
    const url = link.dataset.previewUrl || link.href;
    title.textContent = link.dataset.filename || "Text Vorschau";
    preview.hidden = false;
    body.innerHTML = "<pre>Lade Vorschau …</pre>";
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const text = (await res.text()).slice(0, 5000);
      body.innerHTML = `<pre>${escapeHtml(text)}</pre>`;
    } catch (err) {
      body.innerHTML = `<pre>Vorschau nicht verfügbar: ${escapeHtml(err.message)}\n\n${escapeHtml(link.href)}</pre>`;
    }
  }

  function bindArtifactPreviews() {
    $$(".dd-artifact-link").forEach(link => {
      link.addEventListener("mouseenter", () => {
        const panel = link.closest("[data-dd-artifact-panel]");
        const preview = $("[data-dd-artifact-preview]", panel);
        if (!preview) return;

        const type = (link.dataset.artifactType || "").toLowerCase();
        const name = (link.dataset.filename || link.textContent || "").toLowerCase();

        if (type === "pdf" || name.endsWith(".pdf")) previewPdf(preview, link);
        else if (type === "nfo" || type === "diz" || name.endsWith(".nfo") || name.endsWith(".diz")) previewText(preview, link);
      });
    });
  }

  function bindThemeToggle() {
    const btn = $("[data-dd-theme-toggle]");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const html = document.documentElement;
      const next = html.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
      html.setAttribute("data-bs-theme", next);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    $$("[data-dd-toggle]").forEach(btn => {
      btn.addEventListener("click", () => toggleCard(btn));
      btn.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleCard(btn);
        }
      });
    });

    $$("[data-dd-action='collapse-all']").forEach(btn => btn.addEventListener("click", collapseAll));
    $$("[data-dd-action='focus-readme']").forEach(btn => btn.addEventListener("click", () => {
      loadReadme();
      $("#dd-readme-renderer")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }));

    bindArtifactPreviews();
    bindThemeToggle();
    loadReadme();
  });
})();
