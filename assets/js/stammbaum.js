(() => {
  const setToggleText = (button, expanded) => {
    if (!button) return;
    button.textContent = expanded ? "[-]" : "[+]";
    button.setAttribute("aria-expanded", expanded ? "true" : "false");
  };

  document.addEventListener("shown.bs.collapse", (event) => {
    const button = document.querySelector(`[data-bs-target="#${event.target.id}"]`);
    setToggleText(button, true);
  });

  document.addEventListener("hidden.bs.collapse", (event) => {
    const button = document.querySelector(`[data-bs-target="#${event.target.id}"]`);
    setToggleText(button, false);
  });

  const collapseElement = (element, show) => {
    const instance = bootstrap.Collapse.getOrCreateInstance(element, { toggle: false });
    show ? instance.show() : instance.hide();
  };

  const setAll = (show) => {
    document.querySelectorAll(".tree-children.collapse").forEach((el) => collapseElement(el, show));
  };

  const openFirstBranchOnly = () => {
    setAll(false);
    const rootChildren = document.querySelector("#children-root");
    if (rootChildren) collapseElement(rootChildren, true);

    const firstChild = document.querySelector("#children-root-0");
    if (firstChild) collapseElement(firstChild, true);
  };

  document.querySelectorAll("[data-tree-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.getAttribute("data-tree-action");
      if (action === "expand-all") setAll(true);
      if (action === "collapse-all") setAll(false);
      if (action === "expand-first") openFirstBranchOnly();
    });
  });
})();
