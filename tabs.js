"use strict";

const lyf_initialized = new WeakSet();

// 每个容器独立初始化；复用时为标签、面板设置各自唯一的 id。
function lyf_initTabs(lyf_root) {
  if (lyf_initialized.has(lyf_root)) return;

  const lyf_tabs = Array.from(lyf_root.querySelectorAll("[data-lyf-tab]"));
  const lyf_panels = Array.from(lyf_root.querySelectorAll("[data-lyf-panel]"));
  if (lyf_tabs.length === 0 || lyf_tabs.length !== lyf_panels.length) return;

  // 无效的标签与内容对应关系不绑定，避免显示错误内容。
  const lyf_targets = lyf_tabs.map(lyf_tab =>
    lyf_panels.find(lyf_panel => lyf_panel.id === lyf_tab.getAttribute("aria-controls"))
  );
  if (lyf_targets.some(lyf_panel => !lyf_panel) || new Set(lyf_targets).size !== lyf_tabs.length) return;

  function lyf_selectTab(lyf_current) {
    // 先清除全部旧选中状态，再设置当前标签。
    lyf_tabs.forEach(lyf_tab => {
      lyf_tab.classList.remove("lyf_active");
      lyf_tab.setAttribute("aria-selected", "false");
      lyf_tab.tabIndex = -1;
    });
    lyf_panels.forEach(lyf_panel => { lyf_panel.hidden = true; });
    lyf_current.classList.add("lyf_active");
    lyf_current.setAttribute("aria-selected", "true");
    lyf_current.tabIndex = 0;
    lyf_targets[lyf_tabs.indexOf(lyf_current)].hidden = false;
  }

  lyf_tabs.forEach((lyf_tab, lyf_index) => {
    lyf_tab.addEventListener("click", () => lyf_selectTab(lyf_tab));
    lyf_tab.addEventListener("keydown", lyf_event => {
      let lyf_next;
      if (lyf_event.key === "ArrowRight") lyf_next = (lyf_index + 1) % lyf_tabs.length;
      else if (lyf_event.key === "ArrowLeft") lyf_next = (lyf_index - 1 + lyf_tabs.length) % lyf_tabs.length;
      else if (lyf_event.key === "Home") lyf_next = 0;
      else if (lyf_event.key === "End") lyf_next = lyf_tabs.length - 1;
      else return;
      lyf_event.preventDefault();
      lyf_selectTab(lyf_tabs[lyf_next]);
      lyf_tabs[lyf_next].focus();
    });
  });
  lyf_selectTab(lyf_tabs.find(lyf_tab => lyf_tab.getAttribute("aria-selected") === "true") || lyf_tabs[0]);
  lyf_initialized.add(lyf_root);
}

document.querySelectorAll("[data-lyf-tabs]").forEach(lyf_initTabs);
