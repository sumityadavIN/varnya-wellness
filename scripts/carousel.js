(function() {
    const track = document.querySelector('.testimonial-track');
    const items = Array.from(document.querySelectorAll('.testimonial-item'));
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;

    function updateCarousel() {
        items.forEach((item, index) => {
            item.classList.remove('active', 'prev', 'next');
            
            if (index === currentIndex) {
                item.classList.add('active');
            } else if (index === (currentIndex - 1 + items.length) % items.length) {
                item.classList.add('prev');
            } else if (index === (currentIndex + 1) % items.length) {
                item.classList.add('next');
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel();
    }

    // --- DRAG / SWIPE LOGIC ---
    const handleDragStart = (e) => {
        isDragging = true;
        startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    };

    const handleDragEnd = (e) => {
        if (!isDragging) return;
        const endX = e.type.includes('mouse') ? e.pageX : e.changedTouches[0].clientX;
        const diff = startX - endX;

        // Threshold of 50px to trigger change
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
        isDragging = false;
    };

    // Event Listeners for Mouse
    track.addEventListener('mousedown', handleDragStart);
    window.addEventListener('mouseup', handleDragEnd);

    // Event Listeners for Touch (Mobile)
    track.addEventListener('touchstart', handleDragStart);
    track.addEventListener('touchend', handleDragEnd);

    // Keep Button Functionality
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Auto-advance every 5 seconds (Optional)
    let autoRun = setInterval(nextSlide, 5000);
    track.addEventListener('mouseenter', () => clearInterval(autoRun));
    track.addEventListener('mouseleave', () => autoRun = setInterval(nextSlide, 5000));

    // Initialize
    updateCarousel();
})();