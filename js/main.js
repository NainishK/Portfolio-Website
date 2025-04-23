// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.remove('dark-mode', 'light-mode');
    body.classList.add(savedTheme);
    updateThemeIcon(savedTheme === 'dark-mode');
} else {
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        updateThemeIcon(true);
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        updateThemeIcon(false);
    }
}

themeToggle.addEventListener('click', () => {
    const isCurrentlyDark = body.classList.contains('dark-mode');
    if (isCurrentlyDark) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light-mode');
        updateThemeIcon(false);
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
        updateThemeIcon(true);
    }
});

function updateThemeIcon(isDark) {
    themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}

// Mobile Navigation
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navLinks.classList.remove('active');
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Timeline card fade/slide-in on scroll
function handleTimelineScroll() {
    const cards = document.querySelectorAll('.timeline-content');
    const trigger = window.innerHeight * 0.88;
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < trigger) {
            card.classList.add('timeline-visible');
        }
    });
}
window.addEventListener('scroll', handleTimelineScroll);
window.addEventListener('resize', handleTimelineScroll);
document.addEventListener('DOMContentLoaded', handleTimelineScroll);
