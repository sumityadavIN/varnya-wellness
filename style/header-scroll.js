(function() {
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    const scrollThreshold = 10; // Pixels to scroll before hiding/showing

    function handleScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Skip if movement is smaller than threshold
        if (Math.abs(lastScrollTop - scrollTop) <= scrollThreshold) return;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling Down - Hide Header
            header.classList.add('header-hidden');
        } else {
            // Scrolling Up - Show Header
            header.classList.remove('header-hidden');
        }

        lastScrollTop = scrollTop;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
})();