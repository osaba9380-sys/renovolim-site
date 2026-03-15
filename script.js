/* ===========================================
   Rénov'Olim – script.js v2
   =========================================== */

// ── Scroll Progress Bar ──────────────────────
const scrollBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
    if (!scrollBar) return;
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    scrollBar.style.width = height > 0 ? (winScroll / height * 100) + '%' : '0%';
}, { passive: true });

// ── Header glass effect on scroll ────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.pageYOffset > 60);
}, { passive: true });

// ── Hero Carousel ─────────────────────────────
const heroImages = document.querySelectorAll('.hero-carousel img');
let heroIndex = 0;
if (heroImages.length > 1) {
    setInterval(() => {
        heroImages[heroIndex].classList.remove('active');
        heroIndex = (heroIndex + 1) % heroImages.length;
        heroImages[heroIndex].classList.add('active');
    }, 7000);
}

// ── Fade-in sections ──────────────────────────
const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            sectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll('.fade-section').forEach(s => sectionObserver.observe(s));

// ── Staggered card reveal ─────────────────────
const cardObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll(
                '.service-card, .project-card, .testimonial'
            ).forEach((card, i) => {
                setTimeout(() => card.classList.add('card-visible'), i * 130);
            });
            cardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.05 });

document.querySelectorAll('.services-grid, .projects-grid, .testimonials-grid').forEach(g => cardObserver.observe(g));

// ── Counter animation ─────────────────────────
function animateCounter(el, target, duration) {
    const startTime = performance.now();
    (function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(ease * target);
        if (progress < 1) requestAnimationFrame(update);
    })(startTime);
}

const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Reveal stat items with stagger
            entry.target.querySelectorAll('.stat-item').forEach((item, i) => {
                setTimeout(() => item.classList.add('card-visible'), i * 100);
            });
            // Animate counters
            entry.target.querySelectorAll('.stat-number[data-target]').forEach(el => {
                animateCounter(el, parseInt(el.dataset.target, 10), 1800);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const statsStrip = document.querySelector('.stats-strip');
if (statsStrip) statsObserver.observe(statsStrip);

// ── Back to top ───────────────────────────────
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.pageYOffset > 450);
    }, { passive: true });
}

// ── Nav: close on outside click ───────────────
document.addEventListener('click', e => {
    const nav = document.getElementById('nav-menu');
    const hamburger = document.querySelector('.hamburger-menu');
    if (nav && hamburger && !nav.contains(e.target) && !hamburger.contains(e.target)) {
        nav.classList.remove('open');
        hamburger.classList.remove('toggle');
    }
});

// ── Language toggle (legacy support) ─────────
const langToggle = document.getElementById('langToggle');
if (langToggle) {
    langToggle.addEventListener('change', () => {
        window.location.href = langToggle.checked ? 'hebrew.html' : 'index.html';
    });
}
