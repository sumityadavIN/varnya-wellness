// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {

    // ========== GSAP SETUP ==========
    if (typeof gsap === 'undefined') {
        console.error('GSAP not loaded!');
        // Show content immediately if GSAP fails to load
        document.body.classList.remove('loading');
        const loader = document.querySelector('.loader');
        if (loader) loader.style.display = 'none';
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        if (heroContent) heroContent.style.opacity = '1';
        if (heroImage) heroImage.style.opacity = '1';
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // ========== LOADER ANIMATION ==========
    window.scrollTo(0, 0);

    // Failsafe: Force content to show after 10 seconds if loader doesn't exit
    setTimeout(() => {
        if (document.querySelector('.loader')) {
            console.warn('Loader timeout - forcing content display');
            exitLoader();
        }
    }, 10000);

    const loaderSvg = document.querySelector(".loader svg");
    if (loaderSvg) {
        const textPaths = document.querySelectorAll(".loader svg textPath");
        const startTextLengths = [...textPaths].map(tp => parseFloat(tp.getAttribute("textLength")));
        const startOffsets = [...textPaths].map(tp => parseFloat(tp.getAttribute("startOffset")));
        const targetLengths = [4000, 3500, 3250, 3000, 2500, 2000, 1500, 1250];
        const orbitRadii = [775, 700, 625, 550, 475, 400, 325, 250];
        const maxRadius = orbitRadii[0];

        textPaths.forEach((tp, i) => {
            const radius = orbitRadii[i];
            const duration = 1 + (radius / maxRadius) * 0.25;
            const pathLength = 2 * Math.PI * radius * 3;
            const lengthDiff = targetLengths[i] - startTextLengths[i];
            const offsetShift = (lengthDiff / 2 / pathLength) * 100;

            gsap.to(tp, {
                attr: {
                    textLength: targetLengths[i],
                    startOffset: startOffsets[i] - offsetShift + "%"
                },
                duration,
                delay: (textPaths.length - i) * 0.1,
                ease: "power2.inOut",
                repeat: -1,
                yoyo: true
            });
        });

        // SVG Rotation
        let rotation = 0;
        function spin() {
            if (!document.querySelector('.loader svg')) return; // Stop if loader removed
            rotation += (Math.random() < 0.5 ? -1 : 1) * 25;
            gsap.to(".loader svg", {
                rotation,
                duration: 2,
                ease: "power2.inOut",
                onComplete: spin
            });
        }
        spin();

        // Counter
        const counterEl = document.querySelector(".counter p");
        const counter = { value: 0 };

        gsap.to(counter, {
            value: 100,
            duration: 4,
            delay: 1,
            ease: "power1.out",
            onUpdate: () => {
                if (counterEl) counterEl.textContent = Math.floor(counter.value);
            },
            onComplete: () => {
                gsap.to(".counter", {
                    opacity: 0,
                    duration: 0.5,
                    delay: 0.5
                });
            }
        });

        // Orbit text fade
        const orbitTexts = [...document.querySelectorAll(".orbit-text")].reverse();
        gsap.set(orbitTexts, { opacity: 0 });
        gsap.to(orbitTexts, {
            opacity: 1,
            stagger: 0.12,
            duration: 0.75,
            ease: "power1.out"
        });
        gsap.to(orbitTexts, {
            opacity: 0,
            stagger: 0.1,
            duration: 0.75,
            delay: 6,
            ease: "power1.out",
            onComplete: exitLoader
        });
    }

    function exitLoader() {
        const loader = document.querySelector('.loader');
        if (!loader) return;

        console.log('exitLoader called - removing loader');

        document.body.classList.remove('loading');
        loader.classList.add('fade-out');
        loader.style.pointerEvents = 'none';

        // Animate Loader Out
        gsap.to(loader, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                if (loader && loader.parentNode) {
                    loader.remove();
                    console.log('Loader removed from DOM');
                }
                document.body.style.overflow = '';
            }
        });
    }

    // ========== NAVBAR SCROLL EFFECT WITH AUTO-HIDE ==========
    const navbar = document.getElementById('navbar');
    const scrollIndicator = document.querySelector('.scroll-indicator');
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
                const currentScrollY = window.pageYOffset;

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

    // ========== MOBILE MENU ANIMATION ==========
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    let isMenuOpen = false;

    // Separate timeline for hamburger icon (instant)
    const hamburgerTimeline = gsap.timeline({ paused: true });
    hamburgerTimeline
        .to('.hamburger span:nth-child(1)', {
            y: 3.25,
            rotation: 45,
            scaleX: 0.75,
            duration: 0.4,
            ease: 'cubic-bezier(0.85, 0, 0.15, 1)'
        }, 0)
        .to('.hamburger span:nth-child(2)', {
            y: -3.25,
            rotation: -45,
            scaleX: 0.75,
            duration: 0.4,
            ease: 'cubic-bezier(0.85, 0, 0.15, 1)'
        }, 0);

    // Separate timeline for menu (with delay)
    const menuTimeline = gsap.timeline({ paused: true });
    menuTimeline
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
        }, 0.6)
        .to('.mobile-dropdown-header .line', {
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            stagger: 0.1
        }, 0.6)
        .to('.mobile-dropdown-header i', {
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            stagger: 0.1
        }, 0.6);

    hamburger.addEventListener('click', () => {
        if (isMenuOpen) {
            // Reverse hamburger immediately
            hamburgerTimeline.reverse();
            menuTimeline.reverse();
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            // Play hamburger immediately
            hamburgerTimeline.play();
            menuTimeline.play();
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        isMenuOpen = !isMenuOpen;
    });

    // Mobile dropdown toggles
    document.querySelectorAll('.mobile-dropdown-header').forEach(header => {
        header.addEventListener('click', (e) => {
            e.stopPropagation();
            const dropdown = header.parentElement;

            // Close all other dropdowns
            document.querySelectorAll('.mobile-dropdown').forEach(d => {
                if (d !== dropdown) d.classList.remove('active');
            });

            // Toggle current dropdown
            dropdown.classList.toggle('active');
        });
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-menu-items a').forEach(link => {
        link.addEventListener('click', () => {
            hamburgerTimeline.reverse();
            menuTimeline.reverse();
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
            isMenuOpen = false;

            // Close all dropdowns
            document.querySelectorAll('.mobile-dropdown').forEach(d => d.classList.remove('active'));
        });
    });

    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 100;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== DRAG SCROLL FOR TREATMENTS ==========
    const scrollWrapper = document.querySelector('.scroll-wrapper');
    if (scrollWrapper) {
        let isDown = false;
        let startX;
        let scrollLeft;

        scrollWrapper.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - scrollWrapper.offsetLeft;
            scrollLeft = scrollWrapper.scrollLeft;
        });

        scrollWrapper.addEventListener('mouseleave', () => {
            isDown = false;
        });

        scrollWrapper.addEventListener('mouseup', () => {
            isDown = false;
        });

        scrollWrapper.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollWrapper.offsetLeft;
            const walk = (x - startX) * 2;
            scrollWrapper.scrollLeft = scrollLeft - walk;
        });
    }

    // ========== SCROLL TRIGGER FOR CARDS (Replaces IntersectionObserver) ==========
    // This uses GSAP to handle the fade-in, which is more reliable
    const cards = document.querySelectorAll('.philosophy-card, .treatment-card, .testimonial-card');

    cards.forEach(card => {
        gsap.fromTo(card,
            { y: 30 },
            {
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%", // Triggers when top of card hits 85% of viewport height
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // ========== TEXT REVEAL ANIMATION ==========
    // Function to split text into lines based on actual wrapping
    function splitIntoLines(element) {
        const text = element.textContent;
        const words = text.split(' ');

        // Create temporary spans to measure line breaks
        element.innerHTML = words.map(word => `<span class="temp-word">${word}</span>`).join(' ');

        const tempWords = element.querySelectorAll('.temp-word');
        const lines = [];
        let currentLine = [];
        let currentTop = null;

        tempWords.forEach(word => {
            const rect = word.getBoundingClientRect();

            if (currentTop === null) {
                currentTop = rect.top;
            }

            if (Math.abs(rect.top - currentTop) > 5) {
                // New line detected
                lines.push(currentLine.join(' '));
                currentLine = [word.textContent];
                currentTop = rect.top;
            } else {
                currentLine.push(word.textContent);
            }
        });

        if (currentLine.length > 0) {
            lines.push(currentLine.join(' '));
        }

        // Replace content with wrapped lines
        element.innerHTML = lines.map(line =>
            `<span class="line-wrapper"><span class="line">${line}</span></span>`
        ).join('');

        return element.querySelectorAll('.line');
    }

    // Split all elements with .split-lines class
    const splitElements = document.querySelectorAll('.split-lines');
    splitElements.forEach(element => {
        const lines = splitIntoLines(element);

        // Animate each line
        lines.forEach((line, index) => {
            gsap.to(line, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                delay: index * 0.1, // Stagger delay for each line
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });
        });
    });

    // ========== CHARACTER-BY-CHARACTER REVEAL ANIMATION ==========
    function splitIntoChars(element) {
        const text = element.textContent;
        const chars = text.split('');

        // Wrap each character in a span
        element.innerHTML = chars.map(char => {
            // Preserve spaces
            if (char === ' ') {
                return '<span class="char" style="display: inline;">&nbsp;</span>';
            }
            return `<span class="char">${char}</span>`;
        }).join('');

        return element.querySelectorAll('.char');
    }

    // Split all elements with .char-reveal class
    const charRevealElements = document.querySelectorAll('.char-reveal');
    charRevealElements.forEach(element => {
        const chars = splitIntoChars(element);

        // Animate each character
        chars.forEach((char, index) => {
            gsap.to(char, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    end: "top 50%",
                    scrub: 0.5,
                    onEnter: () => {
                        gsap.to(char, {
                            y: 0,
                            opacity: 1,
                            duration: 0.5,
                            delay: index * 0.02,
                            ease: "power2.out"
                        });
                    }
                }
            });
        });
    });

}); // End DOMContentLoaded
