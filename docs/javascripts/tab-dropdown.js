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

      // Check if this nav item has nested children
      var nestedNav = navItem.querySelector(":scope > .md-nav");
      if (nestedNav) {
        // Has nested navigation - get all direct links from the nested nav
        var nestedLinks = nestedNav.querySelectorAll(":scope > .md-nav__list > .md-nav__item > .md-nav__link, :scope > .md-nav__list > .md-nav__item > a.md-nav__link");
        
        if (nestedLinks.length > 0) {
          nestedLinks.forEach(function (link) {
            var href = link.getAttribute("href");
            var text = link.textContent.trim();
            if (!href || !text) return;

            var item = document.createElement("a");
            item.href = href;
            item.textContent = text;
            menu.appendChild(item);
          });
        }
      } else {
        // No nested nav - check if the nav item itself has a link
        var directLink = navItem.querySelector(":scope > a.md-nav__link");
        if (directLink) {
          var href = directLink.getAttribute("href");
          var text = directLink.textContent.trim();
          if (href && text) {
            var item = document.createElement("a");
            item.href = href;
            item.textContent = text;
            menu.appendChild(item);
          }
        }
      }

      // Only append if menu has items
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
