// toggle-sidebars.js
(function() {
    function initSidebarToggle() {
        // Create the toggle button
        const btn = document.createElement('button');
        btn.className = 'sidebar-toggle';
        btn.textContent = 'Toggle Sidebars';
        btn.setAttribute('aria-label', 'Toggle sidebars on/off');

        // Insert it into the body
        document.body.appendChild(btn);

        // Toggle the class on click
        btn.addEventListener('click', function() {
            document.body.classList.toggle('sidebars-hidden');
            // Update button text to reflect state
            const hidden = document.body.classList.contains('sidebars-hidden');
            btn.textContent = hidden ? 'Show Sidebars' : 'Hide Sidebars';
        });
    }

    if (document.body) {
        initSidebarToggle();
    } else {
        document.addEventListener('DOMContentLoaded', initSidebarToggle, { once: true });
    }
})();