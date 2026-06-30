document.addEventListener('DOMContentLoaded', () => {
    initGithubPagesAssets();
    initNoiseOverlay();
    initScrollProgress();
    initScrollAnimations();
    initNavbar();
    initThemeToggle();
    initChatWidget();
    initForm();
    initSmoothScroll();
    initCounterAnimation();
    initParallaxHero();
    initMagneticTilt();
    initButtonRipple();
    initFloatingParticles();
    initEcosystemLanding();
    initShimmerTitles();
    initFooterStagger();
});

/** Rutas correctas en GitHub Pages (usuario.github.io/nombre-repo/) */
function getGithubPagesBase() {
    if (!location.hostname.endsWith('github.io')) return '';
    const segments = location.pathname.split('/').filter(Boolean);
    if (segments.length === 0) return '';
    const first = segments[0];
    if (first.endsWith('.html')) return '';
    return '/' + first + '/';
}

function resolveAssetUrl(relativePath) {
    const clean = relativePath.replace(/^\.\//, '');
    const ghBase = getGithubPagesBase();
    if (ghBase) return ghBase + clean;
    return './' + clean;
}

function initGithubPagesAssets() {
    document.querySelectorAll('img[src^="./"]').forEach((img) => {
        const raw = img.getAttribute('src');
        if (!raw) return;
        img.src = resolveAssetUrl(raw);
    });
}

/* ══════════════════════════════════════
   NOISE OVERLAY
   ══════════════════════════════════════ */
function initNoiseOverlay() {
    if (document.querySelector('.noise-overlay')) return;
    const noise = document.createElement('div');
    noise.className = 'noise-overlay';
    noise.setAttribute('aria-hidden', 'true');
    document.body.appendChild(noise);
}

/* ══════════════════════════════════════
   SCROLL PROGRESS BAR
   ══════════════════════════════════════ */
function initScrollProgress() {
    if (document.querySelector('.scroll-progress')) return;
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = progress + '%';
    }, { passive: true });
}

/* ══════════════════════════════════════
   SCROLL ANIMATIONS (Enhanced)
   ══════════════════════════════════════ */
function initScrollAnimations() {
    // Standard fade-in elements
    const fadeElements = document.querySelectorAll(
        '.infra-card, .bot-step, .coingt-card, .agent-card, .press-card, .insight-card, .team-card, .leader-card, .ecosystem-card, .track-card, .home-pillar, .governance-highlight, .data-room, .gov-column, .port-showcase'
    );
    fadeElements.forEach(el => el.classList.add('fade-in'));

    // Add gradient-border and tilt to interactive cards
    document.querySelectorAll('.platform-impact-card, .platform-invest-card, .platform-news-card').forEach(el => {
        el.classList.add('gradient-border-card', 'tilt-card');
    });

    document.querySelectorAll('.home-pillar, .leader-card, .infra-card, .coingt-card, .agent-card').forEach(el => {
        el.classList.add('gradient-border-card', 'tilt-card');
    });

    // Add stagger class to grids
    document.querySelectorAll('.home-pillars, .leadership-grid, .infra-grid, .coingt-grid, .agents-grid, .press-grid, .insights-grid, .team-grid, .platform-impact-grid, .platform-invest-grid, .platform-news-grid, .platform-flow').forEach(el => {
        el.classList.add('stagger-grid');
    });

    // Animated section tags
    document.querySelectorAll('.section-tag').forEach(el => {
        el.classList.add('anim-tag');
    });

    // Slide animations for split sections
    document.querySelectorAll('.home-split > div:first-child').forEach(el => {
        el.classList.add('anim-slide-left');
    });
    document.querySelectorAll('.home-split-visual').forEach(el => {
        el.classList.add('anim-slide-right');
    });
    // Reverse for reversed splits
    document.querySelectorAll('.home-split-reverse > .home-split-visual').forEach(el => {
        el.classList.remove('anim-slide-right');
        el.classList.add('anim-slide-left');
    });
    document.querySelectorAll('.home-split-reverse > div:not(.home-split-visual)').forEach(el => {
        el.classList.remove('anim-slide-left');
        el.classList.add('anim-slide-right');
    });

    // Benchmark table — reveal animation
    document.querySelectorAll('.benchmark').forEach(el => {
        el.classList.add('anim-reveal');
    });

    // Configure watermark data attributes for sections
    document.querySelectorAll('.section').forEach(section => {
        const tag = section.querySelector('.section-tag');
        if (tag) {
            const text = tag.textContent.split('—')[1]?.trim() || '';
            section.setAttribute('data-watermark', text);
        }
    });

    // Section descriptions — blur-in
    document.querySelectorAll('.section-desc').forEach(el => {
        el.classList.add('anim-blur');
    });

    // Section headings
    document.querySelectorAll('.section h2').forEach(el => {
        el.classList.add('fade-in');
    });

    // Main observer
    const observer = new IntersectionObserver((entries) => {
        let delay = 0;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                delay += 80;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    // Observe all animated elements
    document.querySelectorAll('.fade-in, .anim-reveal, .anim-slide-left, .anim-slide-right, .anim-scale, .anim-blur, .anim-tag').forEach(el => {
        observer.observe(el);
    });
}

/* ══════════════════════════════════════
   NAVBAR
   ══════════════════════════════════════ */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    const scrollThreshold = 24;

    const updateNavbarOnScroll = () => {
        const currentScroll = window.pageYOffset;
        navbar.classList.toggle('navbar-scrolled', currentScroll > scrollThreshold);
        lastScroll = currentScroll;
    };

    updateNavbarOnScroll();
    window.addEventListener('scroll', updateNavbarOnScroll, { passive: true });

    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    const closeMobileNav = () => {
        navMenu?.classList.remove('mobile-active');
        mobileToggle?.classList.remove('active');
        document.body.classList.remove('nav-open');
    };

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-active');
            mobileToggle.classList.toggle('active');
            document.body.classList.toggle('nav-open', navMenu.classList.contains('mobile-active'));
        });

        navMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', closeMobileNav);
        });
    }
}

/* ══════════════════════════════════════
   THEME TOGGLE (Light / Dark)
   ══════════════════════════════════════ */
function initThemeToggle() {
    const STORAGE_KEY = 'cigsa-theme';
    const root = document.documentElement;
    const btn = document.querySelector('.theme-toggle');
    if (!btn) return;

    const getPreferred = () => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'light' || stored === 'dark') return stored;
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
            ? 'light'
            : 'dark';
    };

    const applyTheme = (theme) => {
        root.setAttribute('data-theme', theme);
        btn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    };

    let current = getPreferred();
    applyTheme(current);

    btn.addEventListener('click', () => {
        current = current === 'light' ? 'dark' : 'light';
        localStorage.setItem(STORAGE_KEY, current);
        applyTheme(current);
    });
}

/* ══════════════════════════════════════
   CHAT WIDGET
   ══════════════════════════════════════ */
function initChatWidget() {
    const bubble = document.getElementById('chatBubble');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');

    if (bubble && chatWindow) {
        bubble.addEventListener('click', () => {
            chatWindow.classList.toggle('active');
            bubble.style.display = chatWindow.classList.contains('active') ? 'none' : 'block';
        });
    }

    if (chatClose) {
        chatClose.addEventListener('click', () => {
            chatWindow.classList.remove('active');
            bubble.style.display = 'block';
        });
    }
}

/* ══════════════════════════════════════
   CONTACT FORM
   ══════════════════════════════════════ */
function initForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.btn-submit');
            const originalText = btn.textContent;
            btn.textContent = 'Submitting...';
            btn.style.opacity = '0.7';

            setTimeout(() => {
                btn.textContent = '✓ Inquiry Submitted';
                btn.style.background = 'linear-gradient(135deg, #4CAF50, #66BB6A)';

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.style.opacity = '';
                    form.reset();
                }, 3000);
            }, 1500);
        });
    }
}

/* ══════════════════════════════════════
   SMOOTH SCROLL
   ══════════════════════════════════════ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });

                const navMenu = document.querySelector('.nav-menu');
                const mobileToggle = document.querySelector('.mobile-toggle');
                if (navMenu?.classList.contains('mobile-active')) {
                    navMenu.classList.remove('mobile-active');
                    mobileToggle?.classList.remove('active');
                    document.body.classList.remove('nav-open');
                }
            }
        });
    });
}

/* ══════════════════════════════════════
   COUNTER ANIMATION (with glow)
   ══════════════════════════════════════ */
function initCounterAnimation() {
    const statValues = document.querySelectorAll('.stat-value, .gov-value, .platform-impact-value');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statValues.forEach(el => observer.observe(el));
}

function animateValue(element) {
    const text = element.textContent;
    const numMatch = text.match(/[\d,.]+/);
    if (!numMatch) return;

    // Add counting class for glow effect
    element.classList.add('counting');

    const finalNum = parseFloat(numMatch[0].replace(/,/g, ''));
    const prefix = text.substring(0, text.indexOf(numMatch[0]));
    const suffix = text.substring(text.indexOf(numMatch[0]) + numMatch[0].length);
    const hasComma = numMatch[0].includes(',');
    const duration = 1500;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        let currentVal = Math.floor(eased * finalNum);

        if (hasComma) {
            currentVal = currentVal.toLocaleString();
        }

        element.textContent = prefix + currentVal + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = text;
            // Remove counting class after animation
            setTimeout(() => element.classList.remove('counting'), 500);
        }
    }

    requestAnimationFrame(update);
}

/* ══════════════════════════════════════
   PARALLAX MULTI-LAYER HERO
   ══════════════════════════════════════ */
function initParallaxHero() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const heroContent = hero.querySelector('.hero-content');
    const heroBg = hero.querySelector('.hero-bg img');
    const heroStats = hero.querySelector('.hero-stats');
    const heroLabels = hero.querySelectorAll('.hero-label');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled > window.innerHeight) return;

        const factor = scrolled / window.innerHeight;

        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
            heroContent.style.opacity = 1 - factor * 1.2;
        }

        if (heroBg) {
            heroBg.style.transform = `scale(${1 + scrolled * 0.0003}) translateY(${scrolled * 0.08}px)`;
        }

        if (heroStats) {
            heroStats.style.transform = `translateY(${scrolled * 0.1}px)`;
            heroStats.style.opacity = 1 - factor * 1.5;
        }

        heroLabels.forEach(label => {
            label.style.transform = label.classList.contains('center')
                ? `translateX(-50%) translateY(${scrolled * 0.12}px)`
                : label.classList.contains('left')
                    ? `translateY(-50%) rotate(-90deg) translateX(${scrolled * 0.05}px)`
                    : `translateY(-50%) rotate(90deg) translateX(${-scrolled * 0.05}px)`;
        });
    }, { passive: true });
}

/* ══════════════════════════════════════
   MAGNETIC 3D TILT ON CARDS
   ══════════════════════════════════════ */
function initMagneticTilt() {
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

/* ══════════════════════════════════════
   BUTTON RIPPLE EFFECT
   ══════════════════════════════════════ */
function initButtonRipple() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple-circle';
            const rect = this.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
            this.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove());
        });
    });
}

/* ══════════════════════════════════════
   ECOSYSTEM LANDING — background & panels
   ══════════════════════════════════════ */
function initEcosystemLanding() {
    const landing = document.getElementById('ecosystem-home');
    if (!landing) return;

    initEcosystemParticles(landing.querySelector('.ecosystem-bg__particles'));
}

function initEcosystemParticles(container) {
    if (!container || container.childElementCount > 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const count = window.innerWidth < 768 ? 14 : 28;
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('span');
        particle.className = 'ecosystem-particle';
        const size = Math.random() * 2.5 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.setProperty('--dur', `${8 + Math.random() * 12}s`);
        particle.style.setProperty('--delay', `${Math.random() * 10}s`);
        particle.style.setProperty('--drift-x', `${-20 + Math.random() * 40}px`);
        particle.style.setProperty('--drift-y', `${-30 + Math.random() * 60}px`);
        container.appendChild(particle);
    }
}

/* ══════════════════════════════════════
   FLOATING PARTICLES
   ══════════════════════════════════════ */
function initFloatingParticles() {
    const hero = document.querySelector('.hero-home');
    if (!hero) return;

    const container = document.createElement('div');
    container.className = 'particles-container';
    container.setAttribute('aria-hidden', 'true');
    hero.appendChild(container);

    const particleCount = 8;
    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 6 + 3;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = (40 + Math.random() * 50) + '%';
        p.style.setProperty('--dur', (5 + Math.random() * 6) + 's');
        p.style.setProperty('--delay', (Math.random() * 8) + 's');
        container.appendChild(p);
    }
}

/* ══════════════════════════════════════
   TEXT SHIMMER ON SECTION HEADINGS
   ══════════════════════════════════════ */
function initShimmerTitles() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('shimmer-text');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.section h2').forEach(h2 => {
        observer.observe(h2);
    });
}

/* ══════════════════════════════════════
   FOOTER LINK STAGGER
   ══════════════════════════════════════ */
function initFooterStagger() {
    const footerItems = document.querySelectorAll('.footer-links-col li');
    if (!footerItems.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    footerItems.forEach(li => observer.observe(li));
}
