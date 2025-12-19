(function() {
    function initInfiniteScroll() {
        const containers = document.querySelectorAll('.infinite-scroll');

        containers.forEach(container => {
            let scrollSpeed = 0.8; 
            let isPaused = false;
            let animationId;
            let isDown = false;
            let startX;
            let scrollLeftStart;

            // 1. Clone content for infinite loop
            const content = Array.from(container.children);
            if (content.length > 0 && container.children.length === content.length) {
                content.forEach(item => {
                    const clone = item.cloneNode(true);
                    container.appendChild(clone);
                });
            }

            // 2. THE ANIMATION LOOP
            function autoScroll() {
                if (!isPaused && !isDown) {
                    container.scrollLeft += scrollSpeed;
                }

                // Reset Logic: If we reach the end of the original content, snap back
                if (container.scrollLeft >= (container.scrollWidth / 2)) {
                    container.scrollLeft = 0;
                } 
                
                animationId = requestAnimationFrame(autoScroll);
            }

            // 3. MOUSE & DRAG HANDLERS
            container.addEventListener('mousedown', (e) => {
                isDown = true;
                isPaused = true;
                startX = e.pageX - container.offsetLeft;
                scrollLeftStart = container.scrollLeft;
                container.style.scrollBehavior = 'auto'; // Disable smooth for drag
            });

            container.addEventListener('mouseup', () => {
                isDown = false;
                setTimeout(() => { isPaused = false; }, 1200);
                // We keep it 'auto' here so the JS loop doesn't fight 'smooth'
            });

            container.addEventListener('mouseleave', () => {
                isDown = false;
                isPaused = false;
            });

            container.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - container.offsetLeft;
                const walk = (x - startX) * 2;
                container.scrollLeft = scrollLeftStart - walk;
            });

            // 4. START THE ANIMATION IMMEDIATELY
            autoScroll(); 

            // IntersectionObserver toggles pause state for performance
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    isPaused = !entry.isIntersecting;
                });
            }, { threshold: 0.01 });

            observer.observe(container);
        });
    }

    if (document.readyState !== 'loading') initInfiniteScroll();
    else document.addEventListener('DOMContentLoaded', initInfiniteScroll);
})();