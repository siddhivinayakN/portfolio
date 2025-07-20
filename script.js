// DOM Elements
const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const heroTitle = document.getElementById('hero-title');
const contactForm = document.getElementById('contact-form');

// Navigation functionality
let isMenuOpen = false;

navToggle.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
});

// Close menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        isMenuOpen = false;
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Header scroll effect
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
});

// Hero title rotation
const titles = [
    "Full Stack Developer",
    "UI/UX Designer", 
    "Problem Solver",
    "Creative Thinker"
];

let currentTitleIndex = 0;

function rotateTitle() {
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        currentTitleIndex = (currentTitleIndex + 1) % titles.length;
        heroTitle.textContent = titles[currentTitleIndex];
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
    }, 300);
}

// Start title rotation
setInterval(rotateTitle, 3000);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Animate skill bars
            if (entry.target.classList.contains('skills')) {
                animateSkillBars();
            }
            
            // Animate stats
            if (entry.target.classList.contains('about')) {
                animateStats();
            }
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    section.classList.add('animate-on-scroll');
    observer.observe(section);
});

// Animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        }, index * 100);
    });
}

// Animate stats counter
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = stat.textContent;
        if (target === '∞') return;
        
        const number = parseInt(target);
        const increment = number / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + '+';
            }
        }, 30);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Contact form handling
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.btn-submit');
    const formData = new FormData(contactForm);
    
    // Add loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate form submission
    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Success state
        submitBtn.classList.remove('loading');
        submitBtn.classList.add('success');
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.classList.remove('success');
            submitBtn.disabled = false;
        }, 3000);
        
    } catch (error) {
        // Error handling
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        alert('There was an error sending your message. Please try again.');
    }
});

// Form validation
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearValidation);
});

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing validation
    clearValidation(e);
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    field.style.borderColor = '#ef4444';
    
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        errorElement.style.color = '#ef4444';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
        errorElement.style.display = 'block';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

function clearValidation(e) {
    const field = e.target;
    field.style.borderColor = '#e5e7eb';
    
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.blob');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Lazy loading for images
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
        isMenuOpen = false;
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations and effects
    const scrolled = window.pageYOffset;
    
    // Update scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.style.opacity = scrolled > 100 ? '0' : '1';
    }
    
    // Floating elements animation
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
        const speed = 0.2 + (index * 0.1);
        element.style.transform = `translateY(${Math.sin(scrolled * 0.01 + index) * 10}px)`;
    });
}, 16)); // ~60fps

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add initial animation classes
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Initialize any other components
    console.log('Portfolio website loaded successfully!');
});

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        console.warn('Failed to load image:', this.src);
    });
});

// Add loading states for interactive elements
document.querySelectorAll('.project-card, .feature-card, .skill-category').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.willChange = 'transform';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.willChange = 'auto';
    });
});

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    // Skip to main content
    if (e.key === 'Tab' && e.target === document.body) {
        const mainContent = document.querySelector('main') || document.querySelector('#home');
        if (mainContent) {
            mainContent.focus();
        }
    }
});

// Add focus indicators for keyboard navigation
document.querySelectorAll('a, button, input, textarea').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid #3b82f6';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// Print styles handling
window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});

// Service worker registration (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}