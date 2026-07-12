(function () {
  function buildTabDropdowns() {
    // Only run on desktop
    if (window.matchMedia("(max-width: 76.24em)").matches) return;

    var tabsList = document.querySelector(".md-tabs__list");
    if (!tabsList) return;

    var tabs = tabsList.querySelectorAll(":scope > .md-tabs__item");
    if (!tabs.length) return;

    // Get the primary navigation
    var primaryNav = document.querySelector(".md-nav--primary");
    if (!primaryNav) return;

    var navItems = primaryNav.querySelectorAll(":scope > .md-nav__list > .md-nav__item");
    if (!navItems.length) return;

    tabs.forEach(function (tab, index) {
      // Remove existing submenu if any
      var existing = tab.querySelector(":scope > .tab-submenu");
      if (existing) existing.remove();

      // Match tab with corresponding nav item
      var navItem = navItems[index];
      if (!navItem) return;

      var menu = document.createElement("div");
      menu.className = "tab-submenu";

      var nestedNav = Array.from(navItem.children).find(function (child) {
        return child.matches && child.matches("nav.md-nav") && !child.classList.contains("md-nav--secondary");
      });

      if (!nestedNav) return;

      // Has nested navigation - get all direct links from the nested nav.
      var nestedLinks = nestedNav.querySelectorAll(":scope > .md-nav__list > .md-nav__item > .md-nav__link, :scope > .md-nav__list > .md-nav__item > a.md-nav__link");

      nestedLinks.forEach(function (link) {
        var href = link.getAttribute("href");
        var text = link.textContent.trim();
        if (!href || !text) return;

        var item = document.createElement("a");
        item.href = href;
        item.textContent = text;
        menu.appendChild(item);
      });

      // Skip empty dropdowns so the desktop tabs stay compact.
      if (menu.childElementCount > 0) {
        tab.appendChild(menu);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", buildTabDropdowns);
  document.addEventListener("mkdocs:update", buildTabDropdowns);
  
  // Support for MkDocs Material's navigation system
  if (typeof document$ !== 'undefined') {
    document$.subscribe(buildTabDropdowns);
  }
})();
