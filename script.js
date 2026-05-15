document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initNavbar();
    initChatWidget();
    initForm();
    initSmoothScroll();
    initCounterAnimation();
});

function initScrollAnimations() {
    const elements = document.querySelectorAll(
        '.infra-card, .bot-step, .coingt-card, .agent-card, .press-card, .insight-card, .team-card, .governance-highlight, .benchmark, .data-room, .gov-column, .port-showcase'
    );

    elements.forEach(el => el.classList.add('fade-in'));

    // Configure watermark data attributes for sections
    document.querySelectorAll('.section').forEach(section => {
        const tag = section.querySelector('.section-tag');
        if (tag) {
            const text = tag.textContent.split('—')[1]?.trim() || '';
            section.setAttribute('data-watermark', text);
        }
    });

    const observer = new IntersectionObserver((entries) => {
        let delay = 0;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                delay += 100;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(el => observer.observe(el));

    const sectionHeaders = document.querySelectorAll('.section-tag, .section h2, .section-desc');
    sectionHeaders.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(8, 11, 15, 0.95)';
        } else {
            navbar.style.background = 'rgba(8, 11, 15, 0.85)';
        }
        lastScroll = currentScroll;
    });

    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
            mobileToggle.classList.toggle('active');
        });
    }
}

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

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });

                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('mobile-active')) {
                    navLinks.classList.remove('mobile-active');
                }
            }
        });
    });
}

function initCounterAnimation() {
    const statValues = document.querySelectorAll('.stat-value, .gov-value');

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
        }
    }

    requestAnimationFrame(update);
}

// Parallax effect on hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
            heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
        }
    }
});
