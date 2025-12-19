(function() {
    function toggleMobileMenu() {
        const menu = document.getElementById("nav-menu");
        const hamburger = document.querySelector(".hamburger");
        if (menu) menu.classList.toggle("active");
        if (hamburger) hamburger.classList.toggle("active");
    }

    function toggleSubmenu(e) {
        e.preventDefault();
        e.stopPropagation();
        var btn = e.currentTarget;
        var li = btn.closest('.has-submenu');
        if (!li) return;
        var submenu = li.querySelector('.submenu');
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        
        btn.setAttribute('aria-expanded', String(!expanded));
        if (submenu) submenu.classList.toggle('open');
        li.classList.toggle('open');
        if (submenu) submenu.setAttribute('aria-hidden', String(expanded));
    }

    function initNav() {
        // Expose functions to window for the onclick handlers in header.html
        window.toggleMobileMenu = toggleMobileMenu;
        window.toggleSubmenu = toggleSubmenu;

        // Close dropdowns when clicking outside
        document.addEventListener('click', function(ev) {
            document.querySelectorAll('.has-submenu.open').forEach(function(el) {
                if (!el.contains(ev.target)) {
                    el.classList.remove('open');
                    var btn = el.querySelector('.submenu-toggle');
                    var submenu = el.querySelector('.submenu');
                    if (btn) btn.setAttribute('aria-expanded', 'false');
                    if (submenu) {
                        submenu.classList.remove('open');
                        submenu.setAttribute('aria-hidden', 'true');
                    }
                }
            });
        });
    }

    // Run init immediately or on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNav);
    } else {
        initNav();
    }
})();