function initSidebarToggles() {
  const body = document.body;
  
  // Double-check to prevent creating duplicate buttons
  if (document.querySelector('.toggle-btn-left')) return;

  // Create Left Sidebar Toggle Button
  const leftBtn = document.createElement("div");
  leftBtn.className = "sidebar-toggle-btn toggle-btn-left";
  leftBtn.innerHTML = "◀";
  leftBtn.title = "Toggle Navigation Sidebar";
  body.appendChild(leftBtn);

  // Create Right Sidebar Toggle Button
  const rightBtn = document.createElement("div");
  rightBtn.className = "sidebar-toggle-btn toggle-btn-right";
  rightBtn.innerHTML = "▶";
  rightBtn.title = "Toggle Table of Contents";
  body.appendChild(rightBtn);

  // Left Button Click Event Handler
  leftBtn.addEventListener("click", function () {
    body.classList.toggle("hide-left-sidebar");
    leftBtn.innerHTML = body.classList.contains("hide-left-sidebar") ? "▶" : "◀";
  });

  // Right Button Click Event Handler
  rightBtn.addEventListener("click", function () {
    body.classList.toggle("hide-right-sidebar");
    rightBtn.innerHTML = body.classList.contains("hide-right-sidebar") ? "◀" : "▶";
  });
}

// Run immediately if DOM is ready, otherwise wait for it
if (document.readyState === "complete" || document.readyState === "interactive") {
  initSidebarToggles();
} else {
  document.addEventListener("DOMContentLoaded", initSidebarToggles);
}