(() => {
  const storageKey = "drdebug-theme";

  const setTheme = (theme) => {
    const normalized = theme === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-bs-theme", normalized);
    localStorage.setItem(storageKey, normalized);
    const icon = document.getElementById("themeToggleIcon");
    const text = document.getElementById("themeToggleText");
    if (icon) icon.textContent = normalized === "dark" ? "☾" : "☀";
    if (text) text.textContent = normalized === "dark" ? "Dark" : "Light";
  };

  const initTheme = () => {
    const current = document.documentElement.getAttribute("data-bs-theme") || "light";
    setTheme(current);
    const toggle = document.getElementById("themeToggle");
    if (toggle) {
      toggle.addEventListener("click", () => {
        const now = document.documentElement.getAttribute("data-bs-theme") || "light";
        setTheme(now === "dark" ? "light" : "dark");
      });
    }
  };

  const cssEscape = (value) => {
    if (window.CSS && CSS.escape) return CSS.escape(value);
    return value.replace(/([!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~])/g, "\\$1");
  };

  const setToggleText = (button, expanded) => {
    if (!button) return;
    const symbol = button.querySelector(".tree-toggle-symbol") || button;
    symbol.textContent = expanded ? "[-]" : "[+]";
    button.setAttribute("aria-expanded", expanded ? "true" : "false");
    button.classList.toggle("is-expanded", expanded);
  };

  const targetButtons = (collapseEl) =>
    Array.from(document.querySelectorAll(`[aria-controls="${cssEscape(collapseEl.id)}"]`));

  const syncOne = (collapseEl) => {
    const expanded = collapseEl.classList.contains("show");
    targetButtons(collapseEl).forEach((button) => setToggleText(button, expanded));
  };

  const syncAll = () => {
    document.querySelectorAll(".tree-children.collapse").forEach(syncOne);
  };

  document.addEventListener("show.bs.collapse", (event) => {
    if (!event.target.classList.contains("tree-children")) return;
    targetButtons(event.target).forEach((button) => setToggleText(button, true));
    event.target.classList.add("is-opening");
    event.target.classList.remove("is-closing");
  });

  document.addEventListener("shown.bs.collapse", (event) => {
    if (!event.target.classList.contains("tree-children")) return;
    event.target.classList.remove("is-opening");
    syncOne(event.target);
  });

  document.addEventListener("hide.bs.collapse", (event) => {
    if (!event.target.classList.contains("tree-children")) return;
    targetButtons(event.target).forEach((button) => setToggleText(button, false));
    event.target.classList.add("is-closing");
    event.target.classList.remove("is-opening");
  });

  document.addEventListener("hidden.bs.collapse", (event) => {
    if (!event.target.classList.contains("tree-children")) return;
    event.target.classList.remove("is-closing");
    syncOne(event.target);
  });

  const collapseElement = (element, show) => {
    const instance = bootstrap.Collapse.getOrCreateInstance(element, { toggle: false });
    show ? instance.show() : instance.hide();
  };

  const setAll = (show) => {
    document.querySelectorAll(".tree-children.collapse").forEach((el) => collapseElement(el, show));
    requestAnimationFrame(syncAll);
  };

  const openFirstBranchOnly = () => {
    setAll(false);
    const rootChildren = document.querySelector("#children-root");
    if (rootChildren) collapseElement(rootChildren, true);

    const firstChild = document.querySelector("#children-root-0");
    if (firstChild) collapseElement(firstChild, true);

    requestAnimationFrame(syncAll);
  };

  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    syncAll();

    document.querySelectorAll("[data-tree-action]").forEach((button) => {
      button.addEventListener("click", () => {
        const action = button.getAttribute("data-tree-action");
        if (action === "expand-all") setAll(true);
        if (action === "collapse-all") setAll(false);
        if (action === "expand-first") openFirstBranchOnly();
      });
    });
  });
})();
