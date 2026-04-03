// ==================== DOM ELEMENTS ==================== 
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollToTopBtn = document.getElementById('scrollToTop');
const contactForm = document.getElementById('contactForm');
const accordionHeaders = document.querySelectorAll('.accordion-header');

// ==================== HAMBURGER MENU FUNCTIONALITY ==================== 
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==================== SCROLL TO TOP BUTTON ==================== 
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==================== ACCORDION FUNCTIONALITY ==================== 
accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const body = header.nextElementSibling;
        const isActive = body.classList.contains('active');

        // Close all open accordions
        document.querySelectorAll('.accordion-body.active').forEach(openBody => {
            openBody.classList.remove('active');
            openBody.previousElementSibling.classList.remove('active');
        });

        // Open clicked accordion
        if (!isActive) {
            body.classList.add('active');
            header.classList.add('active');
        }
    });
});

// ==================== CONTACT FORM VALIDATION ==================== 
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate form
    let isValid = true;

    // Name validation
    if (name === '') {
        showError('name', 'Name is required');
        isValid = false;
    } else if (name.length < 3) {
        showError('name', 'Name must be at least 3 characters');
        isValid = false;
    } else {
        clearError('name');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError('email', 'Please enter a valid email');
        isValid = false;
    } else {
        clearError('email');
    }

    // Subject validation
    if (subject === '') {
        showError('subject', 'Subject is required');
        isValid = false;
    } else if (subject.length < 3) {
        showError('subject', 'Subject must be at least 3 characters');
        isValid = false;
    } else {
        clearError('subject');
    }

    // Message validation
    if (message === '') {
        showError('message', 'Message is required');
        isValid = false;
    } else if (message.length < 10) {
        showError('message', 'Message must be at least 10 characters');
        isValid = false;
    } else {
        clearError('message');
    }

    // If form is valid, submit
    if (isValid) {
        submitForm(name, email, subject, message);
    }
});

// ==================== FORM HELPER FUNCTIONS ==================== 
function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    const inputElement = document.getElementById(fieldId);

    errorElement.textContent = message;
    errorElement.classList.add('show');
    inputElement.classList.add('error');
}

function clearError(fieldId) {
    const errorElement = document.getElementById(fieldId + 'Error');
    const inputElement = document.getElementById(fieldId);

    errorElement.textContent = '';
    errorElement.classList.remove('show');
    inputElement.classList.remove('error');
}

function submitForm(name, email, subject, message) {
    // Save to localStorage
    const formData = {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString()
    };

    let savedForms = JSON.parse(localStorage.getItem('contactForms')) || [];
    savedForms.push(formData);
    localStorage.setItem('contactForms', JSON.stringify(savedForms));

    // Show success message
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = '✅ Message sent successfully! Thank you for reaching out.';
    formMessage.classList.add('success');
    formMessage.classList.remove('error');

    // Reset form
    contactForm.reset();

    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.classList.remove('success');
    }, 5000);

    console.log('Form submitted:', formData);
}

// ==================== TYPING EFFECT ==================== 
const typingElement = document.querySelector('.typing');
const phrases = ['Front-End Developer', 'Web Designer', 'UI Developer', 'Creative Coder'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

// Start typing effect
typeEffect();

// ==================== SCROLL ANIMATION (INTERSECTION OBSERVER) ==================== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-card, .service-card, .project-card').forEach(element => {
    observer.observe(element);
});

// ==================== PROGRESS BAR ANIMATION ==================== 
const progressBars = document.querySelectorAll('.progress');
const skillsSection = document.getElementById('skills');

// Animate progress bars when skills section comes into view
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// ==================== ACTIVE NAV LINK ON SCROLL ==================== 
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== DARK MODE TOGGLE (OPTIONAL) ==================== 
// You can add a dark mode toggle button to the header if desired

// ==================== PAGE LOAD ANIMATION ==================== 
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ==================== SMOOTH SCROLL BEHAVIOR ==================== 
// Already set in CSS with 'scroll-behavior: smooth;'

// ==================== CONSOLE GREETING ==================== 
console.log('%c Welcome to my Portfolio! ', 'background: linear-gradient(90deg, #667eea, #764ba2); color: white; padding: 10px 20px; border-radius: 5px; font-size: 14px; font-weight: bold;');
console.log('%c Looking for a talented Front-End Developer? Let\'s work together! ', 'color: #667eea; font-size: 12px; font-style: italic;');