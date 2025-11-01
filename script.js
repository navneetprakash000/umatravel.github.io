// ============================================
// Modern Travel Website JavaScript
// Gen Z & Gen Alpha Friendly - Fixed & Optimized
// ============================================

// ============================================
// Theme Toggle (Dark Mode)
// ============================================
function updateThemeIcon() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    const theme = document.documentElement.getAttribute('data-theme');
    const icon = themeToggle.querySelector('i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Set initial theme
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

// ============================================
// Initialize All Features
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Uma International Travel Services - Website Loaded');
    
    // DOM Elements - All accessed after DOM is ready
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    const themeToggle = document.getElementById('themeToggle');
    const backToTop = document.getElementById('backToTop');
    const bookingTabs = document.querySelectorAll('.tab-btn');
    const bookingForms = document.querySelectorAll('.booking-form');
    const statNumbers = document.querySelectorAll('.stat-number');
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    
    // Initialize theme icon
    updateThemeIcon();
    
    // ============================================
    // Theme Toggle Handler
    // ============================================
    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon();
            createRippleEffect(themeToggle, e);
        });
    }
    
    // ============================================
    // Mobile Navigation
    // ============================================
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navToggle) navToggle.classList.remove('active');
                if (navMenu) navMenu.classList.remove('active');
                document.body.style.overflow = '';
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }
    
    // ============================================
    // Navbar Scroll Effect
    // ============================================
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (navbar) {
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        // Show/hide back to top button
        if (backToTop) {
            if (currentScroll > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
        
        lastScroll = currentScroll;
    });
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // ============================================
    // Smooth Scrolling
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // Booking Tabs
    // ============================================
    if (bookingTabs.length > 0) {
        bookingTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const targetTab = tab.getAttribute('data-tab');
                
                // Update active tab button
                bookingTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Update active form
                bookingForms.forEach(form => {
                    form.classList.remove('active');
                    if (form.id === `${targetTab}Form`) {
                        form.classList.add('active');
                    }
                });
                
                createRippleEffect(tab, e);
            });
        });
    }
    
    // ============================================
    // Animated Counter (Stats)
    // ============================================
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for counters
    if (statNumbers.length > 0) {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    animateCounter(entry.target);
                }
            });
        }, observerOptions);
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }
    
    // ============================================
    // Form Validation & Submission
    // ============================================
    const validateForm = (form) => {
        if (!form) return false;
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ef4444';
                setTimeout(() => {
                    input.style.borderColor = '';
                }, 3000);
            } else {
                input.style.borderColor = '#10b981';
            }
        });
        
        return isValid;
    };
    
    // Booking Forms
    if (bookingForms.length > 0) {
        bookingForms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                if (validateForm(form)) {
                    showNotification('Searching for best deals...', 'info');
                    // Simulate API call
                    setTimeout(() => {
                        showNotification('Found amazing options! Redirecting...', 'success');
                    }, 2000);
                } else {
                    showNotification('Please fill all required fields', 'error');
                }
            });
        });
    }
    
    // Contact Form
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateForm(contactForm)) {
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                contactForm.reset();
            } else {
                showNotification('Please fill all required fields', 'error');
            }
        });
    }
    
    // Newsletter Form
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]');
            if (email && email.value && email.validity.valid) {
                showNotification('Successfully subscribed to our newsletter!', 'success');
                newsletterForm.reset();
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
    }
    
    // ============================================
    // Back to Top Button
    // ============================================
    if (backToTop) {
        backToTop.addEventListener('click', (e) => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            createRippleEffect(backToTop, e);
        });
    }
    
    // ============================================
    // Ripple Effect
    // ============================================
    function createRippleEffect(element, event = null) {
        if (!element) return;
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event ? event.clientX - rect.left - size / 2 : size / 2;
        const y = event ? event.clientY - rect.top - size / 2 : size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        // Add ripple styles if not already added
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
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
        }
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
    
    // Add ripple to buttons
    document.querySelectorAll('.btn, .tab-btn, .service-link, .back-to-top').forEach(btn => {
        btn.addEventListener('click', function(e) {
            createRippleEffect(this, e);
        });
    });
    
    // ============================================
    // Scroll Animations
    // ============================================
    const scrollElements = document.querySelectorAll('.service-card, .package-card, .feature-card, .contact-card, .offer-card, .why-card, .gallery-item, .tip-card');
    
    const elementInView = (el, offset = 0) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            ((window.innerHeight || document.documentElement.clientHeight) * (1 - offset))
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('fade-in');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach(el => {
            if (elementInView(el, 0.2)) {
                displayScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Initial check
    handleScrollAnimation();
    
    // ============================================
    // Input Date Min (Today)
    // ============================================
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateInputs.forEach(input => {
        input.setAttribute('min', today);
    });
    
    // ============================================
    // Package Card Interactions
    // ============================================
    const packageCards = document.querySelectorAll('.package-card');
    packageCards.forEach(card => {
        const viewBtn = card.querySelector('.btn-outline');
        if (viewBtn) {
            viewBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const locationSpan = card.querySelector('.package-location span');
                if (locationSpan) {
                    const location = locationSpan.textContent;
                    showNotification(`Exploring packages for ${location}...`, 'info');
                }
            });
        }
    });
    
    // ============================================
    // Social Media Links
    // ============================================
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ============================================
    // Keyboard Navigation
    // ============================================
    document.addEventListener('keydown', (e) => {
        // ESC to close mobile menu
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            if (navToggle) navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const bookingSection = document.getElementById('booking');
            if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    const firstInput = bookingSection.querySelector('input');
                    if (firstInput) firstInput.focus();
                }, 500);
            }
        }
    });
    
    // ============================================
    // Form Input Enhancements
    // ============================================
    document.querySelectorAll('input, textarea').forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', function() {
            if (this.parentElement) {
                this.parentElement.classList.add('focused');
            }
        });
        
        input.addEventListener('blur', function() {
            if (!this.value && this.parentElement) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Add character count for textareas
        if (input.tagName === 'TEXTAREA' && input.hasAttribute('maxlength')) {
            const maxLength = input.getAttribute('maxlength');
            const counter = document.createElement('div');
            counter.className = 'char-counter';
            counter.textContent = `0 / ${maxLength}`;
            if (input.parentElement) {
                input.parentElement.appendChild(counter);
            }
            
            input.addEventListener('input', function() {
                counter.textContent = `${this.value.length} / ${maxLength}`;
                if (this.value.length > maxLength * 0.9) {
                    counter.style.color = '#ef4444';
                } else {
                    counter.style.color = '';
                }
            });
        }
    });
    
    // ============================================
    // Testimonials Slider
    // ============================================
    let currentTestimonial = 0;
    const testimonialsTrack = document.getElementById('testimonialsTrack');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialPrev = document.getElementById('testimonialPrev');
    const testimonialNext = document.getElementById('testimonialNext');
    const testimonialsDots = document.getElementById('testimonialsDots');
    
    function updateTestimonials() {
        if (testimonialsTrack && testimonialCards.length > 0) {
            const slider = testimonialsTrack.parentElement;
            if (slider) {
                const cardWidth = slider.offsetWidth;
                const gap = window.innerWidth > 968 ? 32 : 16;
                testimonialsTrack.style.transform = `translateX(-${currentTestimonial * (cardWidth + gap)}px)`;
            }
            
            // Update dots
            document.querySelectorAll('.testimonial-dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentTestimonial);
            });
        }
    }
    
    function goToTestimonial(index) {
        if (testimonialCards.length === 0) return;
        currentTestimonial = index;
        if (currentTestimonial < 0) currentTestimonial = testimonialCards.length - 1;
        if (currentTestimonial >= testimonialCards.length) currentTestimonial = 0;
        updateTestimonials();
    }
    
    // Create dots
    if (testimonialCards.length > 0 && testimonialsDots) {
        testimonialCards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `testimonial-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToTestimonial(index));
            testimonialsDots.appendChild(dot);
        });
    }
    
    if (testimonialPrev) {
        testimonialPrev.addEventListener('click', () => {
            currentTestimonial--;
            if (currentTestimonial < 0 && testimonialCards.length > 0) {
                currentTestimonial = testimonialCards.length - 1;
            }
            updateTestimonials();
        });
    }
    
    if (testimonialNext) {
        testimonialNext.addEventListener('click', () => {
            currentTestimonial++;
            if (currentTestimonial >= testimonialCards.length) {
                currentTestimonial = 0;
            }
            updateTestimonials();
        });
    }
    
    // Auto-play testimonials
    let testimonialInterval;
    function startTestimonialAutoPlay() {
        if (testimonialCards.length === 0) return;
        testimonialInterval = setInterval(() => {
            currentTestimonial++;
            if (currentTestimonial >= testimonialCards.length) currentTestimonial = 0;
            updateTestimonials();
        }, 5000);
    }
    
    function stopTestimonialAutoPlay() {
        clearInterval(testimonialInterval);
    }
    
    // Pause on hover
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    if (testimonialsSlider && testimonialCards.length > 0) {
        testimonialsSlider.addEventListener('mouseenter', stopTestimonialAutoPlay);
        testimonialsSlider.addEventListener('mouseleave', startTestimonialAutoPlay);
        updateTestimonials();
        startTestimonialAutoPlay();
    }
    
    // ============================================
    // FAQ Accordion
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
            
            // Keyboard accessibility
            question.setAttribute('tabindex', '0');
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    question.click();
                }
            });
        }
    });
    
    // ============================================
    // Check user prefers dark mode
    // ============================================
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme')) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcon();
    }
    
    // ============================================
    // Handle window resize for testimonials
    // ============================================
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (testimonialsTrack && testimonialCards.length > 0) {
                updateTestimonials();
            }
        }, 250);
    });
    
    // Add loaded class to body
    document.body.classList.add('loaded');
});

// ============================================
// Notification System
// ============================================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                z-index: 10000;
                animation: slideInRight 0.3s ease;
                max-width: 400px;
            }
            [data-theme="dark"] .notification {
                background: #1f2937;
                color: white;
            }
            .notification-success {
                border-left: 4px solid #10b981;
            }
            .notification-error {
                border-left: 4px solid #ef4444;
            }
            .notification-info {
                border-left: 4px solid #6366f1;
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            .notification-content i {
                font-size: 1.5rem;
            }
            .notification-success .notification-content i {
                color: #10b981;
            }
            .notification-error .notification-content i {
                color: #ef4444;
            }
            .notification-info .notification-content i {
                color: #6366f1;
            }
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// Loading Screen
// ============================================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1500);
    }
    
    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-buttons');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s ease';
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
});

// ============================================
// Parallax Effect for Hero
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * 0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// ============================================
// Performance Optimization - Lazy Loading
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// Console Message
// ============================================
console.log('%c✨ Uma International Travel Services ✈️', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cWelcome to our travel website! 🗺️', 'font-size: 14px; color: #6b7280;');

// ============================================
// Error Handling
// ============================================
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});
