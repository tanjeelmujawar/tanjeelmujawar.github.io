// ==================== MOBILE MENU TOGGLE ====================

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.style.display = 'none';
            });
        });
    }
});

// ==================== SMOOTH SCROLL & ACTIVE NAV ====================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Highlight active nav link
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== SCROLL ANIMATIONS ====================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill cards, project cards, etc.
document.querySelectorAll('.skill-card, .project-card, .cert-item, .contact-card').forEach(el => {
    el.style.animation = 'none';
    observer.observe(el);
});

// ==================== ANIMATE NUMBERS ====================

function animateNumbers() {
    document.querySelectorAll('.stat-number').forEach(element => {
        const target = parseInt(element.textContent);
        
        // Handle percentage
        if (element.textContent.includes('%')) {
            animateCounter(element, target, '%');
            return;
        }

        // Handle K+ notation
        if (element.textContent.includes('K')) {
            animateCounter(element, target, 'K+');
        }
    });
}

function animateCounter(element, target, suffix) {
    let current = 0;
    const increment = target / 50;
    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(interval);
        }
        element.textContent = Math.ceil(current) + suffix;
    }, 30);
}

// Trigger animation when stats section is visible
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutSection = document.getElementById('about');
if (aboutSection) {
    statsObserver.observe(aboutSection);
}

// ==================== NAVBAR BACKGROUND ON SCROLL ====================

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// ==================== BUTTON RIPPLE EFFECT ====================

document.querySelectorAll('.btn, .btn-project').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        // Clear previous ripples
        const ripples = this.querySelectorAll('.ripple');
        ripples.forEach(r => r.remove());

        this.appendChild(ripple);
    });
});

// Add ripple styles
const style = document.createElement('style');
style.textContent = `
    .btn, .btn-project {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== PRELOAD CHECK ====================

window.addEventListener('load', function() {
    // Set small delay for smooth appearance
    setTimeout(function() {
        document.body.style.opacity = '1';
    }, 100);
});

// ==================== HANDLE EXTERNAL LINKS ====================

document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.color = 'var(--accent-cyan)';
    });
    link.addEventListener('mouseleave', function() {
        this.style.color = 'inherit';
    });
});

// ==================== CONSOLE MESSAGE ====================

console.log('%cWelcome to Tanjeel Mujawar\'s Portfolio', 
    'font-size: 20px; font-weight: bold; color: #3b82f6;');
console.log('%cOpen to Data Analyst, Data Scientist, and ML Engineer roles', 
    'font-size: 14px; color: #06b6d4;');
