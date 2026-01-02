// Load Header and Footer dynamically
document.addEventListener('DOMContentLoaded', function() {
    loadIncludes();
});

function loadIncludes() {
    // Try to load with fetch (works on GitHub Pages and most servers)
    loadHeader();
    loadFooter();
}

function loadHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) return;

    // Determine the correct path based on current location
    const path = window.location.pathname.includes('/varnya-wellness/') || window.location.pathname !== '/'
        ? '../includes/header.html'
        : './includes/header.html';

    fetch(path)
        .then(response => {
            if (!response.ok) throw new Error('Header not found');
            return response.text();
        })
        .then(data => {
            headerPlaceholder.innerHTML = data;
            initializeHeader();
        })
        .catch(error => {
            console.error('Error loading header:', error);
            // Fallback: header is already in the page
        });
}

function loadFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (!footerPlaceholder) return;

    // Determine the correct path based on current location
    const path = window.location.pathname.includes('/varnya-wellness/') || window.location.pathname !== '/'
        ? '../includes/footer.html'
        : './includes/footer.html';

    fetch(path)
        .then(response => {
            if (!response.ok) throw new Error('Footer not found');
            return response.text();
        })
        .then(data => {
            footerPlaceholder.innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading footer:', error);
            // Fallback: footer is already in the page
        });
}

// Initialize header functionality after loading
function initializeHeader() {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    if (hamburger && mobileMenu) {
        let isMenuOpen = false;

        // Check if GSAP is loaded
        if (typeof gsap !== 'undefined') {
            const menuTimeline = gsap.timeline({ paused: true });

            menuTimeline
                .to('.hamburger span:nth-child(1)', {
                    y: 3.25,
                    rotation: 45,
                    scaleX: 0.75,
                    duration: 1,
                    ease: 'cubic-bezier(0.85, 0, 0.15, 1)'
                }, 0)
                .to('.hamburger span:nth-child(2)', {
                    y: -3.25,
                    rotation: -45,
                    scaleX: 0.75,
                    duration: 1,
                    ease: 'cubic-bezier(0.85, 0, 0.15, 1)'
                }, 0)
                .to('.mobile-menu-bg', {
                    rotate: 0,
                    duration: 1,
                    ease: 'cubic-bezier(0.85, 0, 0.15, 1)'
                }, 0)
                .to('.mobile-menu-items a .line', {
                    y: 0,
                    duration: 0.75,
                    ease: 'power3.out',
                    stagger: 0.1
                }, 0.6);

            hamburger.addEventListener('click', () => {
                if (isMenuOpen) {
                    menuTimeline.reverse();
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                } else {
                    menuTimeline.play();
                    mobileMenu.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
                isMenuOpen = !isMenuOpen;
            });

            // Close mobile menu on link click
            document.querySelectorAll('.mobile-menu-items a').forEach(link => {
                link.addEventListener('click', () => {
                    menuTimeline.reverse();
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                    isMenuOpen = false;
                });
            });
        } else {
            // Fallback if GSAP is not loaded (simple toggle)
            hamburger.addEventListener('click', function() {
                if (isMenuOpen) {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                } else {
                    mobileMenu.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
                isMenuOpen = !isMenuOpen;
            });

            // Close mobile menu on link click
            document.querySelectorAll('.mobile-menu-items a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                    isMenuOpen = false;
                });
            });
        }
    }

    // Navbar scroll effect with auto-hide
    const navbar = document.getElementById('navbar');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (navbar) {
        let lastScrollY = window.scrollY;
        let ticking = false;
        let hasScrolled = false;

        // Hide scroll indicator immediately if page is already scrolled on load
        if (scrollIndicator && window.scrollY > 50) {
            scrollIndicator.classList.add('hidden');
            hasScrolled = true;
        }

        window.addEventListener('scroll', function() {
            // Hide scroll indicator on first scroll
            if (!hasScrolled && scrollIndicator && window.scrollY > 50) {
                scrollIndicator.classList.add('hidden');
                hasScrolled = true;
            }

            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const currentScrollY = window.scrollY;

                    // Add scrolled class for styling
                    if (currentScrollY > 50) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }

                    // Auto-hide on scroll down, show on scroll up
                    if (currentScrollY > lastScrollY && currentScrollY > 100) {
                        // Scrolling down
                        navbar.classList.add('navbar-hidden');
                    } else {
                        // Scrolling up
                        navbar.classList.remove('navbar-hidden');
                    }

                    lastScrollY = currentScrollY;
                    ticking = false;
                });

                ticking = true;
            }
        });
    }

    // Auto-expand service items when navigating from anchor links
    function expandTargetItem() {
        const hash = window.location.hash;
        if (hash) {
            const targetElement = document.querySelector(hash);
            if (targetElement && targetElement.classList.contains('service-item')) {
                // Add expanded class to show content
                targetElement.classList.add('expanded');

                // Scroll to the element with offset for navbar
                setTimeout(() => {
                    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                    const offsetPosition = elementPosition - 120;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        }
    }

    // Run on page load
    expandTargetItem();

    // Also run when hash changes (for same-page navigation)
    window.addEventListener('hashchange', expandTargetItem);

    // Collapse expanded items when hovering over other items (desktop only)
    if (window.innerWidth > 768) {
        const serviceItems = document.querySelectorAll('.service-item');
        serviceItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                // Remove expanded class from all other items
                serviceItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('expanded');
                    }
                });
            });
        });
    }
}
