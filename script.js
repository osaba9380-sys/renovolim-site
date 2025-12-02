// Handle header style on scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Fade-in sections
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-section').forEach(section => {
    observer.observe(section);
});

// Hero carousel (full background)
const heroCarouselImages = document.querySelectorAll('.hero-carousel img');
let heroCarouselIndex = 0;
if (heroCarouselImages.length) {
    setInterval(() => {
        heroCarouselImages[heroCarouselIndex].classList.remove('active');
        heroCarouselIndex = (heroCarouselIndex + 1) % heroCarouselImages.length;
        heroCarouselImages[heroCarouselIndex].classList.add('active');
    }, 7000);
}

// Language toggle
const langToggle = document.getElementById('langToggle');
if (langToggle) {
    langToggle.addEventListener('change', () => {
        if (langToggle.checked) {
            window.location.href = 'hebrew.html';
        } else {
            window.location.href = 'index.html';
        }
    });
}

// Before/after slider
document.querySelectorAll('.project-slider').forEach(slider => {
    const card = slider.closest('.project-card');
    const before = card.querySelector('.project-before');
    slider.addEventListener('input', (e) => {
        const value = e.target.value;
        // Adjust opacity of the overlay (before) based on slider value
        const opacity = (100 - value) / 100;
        before.style.opacity = opacity;
    });
});
