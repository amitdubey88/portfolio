
// Loading Screen
document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    const loadingScreen = document.getElementById('loading-screen');
    const loadingStatus = document.querySelector('.loading-status');
        
    // Simulate loading progress
    setTimeout(() => { loadingStatus.textContent = "Loading assets... 25%" }, 500);
    setTimeout(() => { loadingStatus.textContent = "Loading assets... 50%" }, 1000);
    setTimeout(() => { loadingStatus.textContent = "Loading assets... 75%" }, 1500);
    setTimeout(() => { loadingStatus.textContent = "Loading assets... 100%" }, 2000);

    // Hide loading screen after loading completes
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.visibility = 'hidden';

            // Start animations for header elements
            const headerElements = [
                document.querySelector('.welcome-text'),
                document.querySelector('.profile-image-container'),
                document.querySelector('.typing-container'),
                document.querySelector('.tagline'),
                document.querySelector('.cta-buttons'),
                document.querySelector('.scroll-indicator')
            ];

            headerElements.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add('animate-fadeInUp');
                    element.style.opacity = '1';
                }, index * 200);
            });

            
            // Reveal masks
            document.querySelectorAll('.reveal-mask').forEach((mask, index) => {
                setTimeout(() => {
                    mask.classList.add('revealed');
                }, 2500 + (index * 300));
            });
        }, 500);
    }, 2500);
});

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Typing Effect
const typingTextElement = document.getElementById('typing-text');
const texts = [
    "a Salesforce Developer.",
    "proficient in HTML, CSS, and JavaScript.",
    "Salesforce Certified & Skilled.",
    "an Apex & LWC Expert.",
    "passionate about Agentforce.",
    "experienced in Experience Cloud.",
    "exploring Health Cloud innovations.",
    "a Double Star Ranger @ Trailhead."
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 30;
let deletingDelay = 30;
let pauseDelay = 2000;

function typeText() {
    const currentText = texts[textIndex];

    if (isDeleting) {
        // Deleting text
        typingTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = deletingDelay;
        typingTextElement.classList.remove('blink');
    } else {
        // Typing text
        typingTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 30;
    }

    // Handle text completion or deletion
    if (!isDeleting && charIndex === currentText.length) {
        // Finished typing, pause before deleting
        isDeleting = true;
        typingDelay = pauseDelay;
        typingTextElement.classList.add('blink');
    } else if (isDeleting && charIndex === 0) {
        // Finished deleting, move to next text
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingTextElement.classList.remove('blink');
    }

    setTimeout(typeText, typingDelay);
}

// Start typing effect after loading screen
setTimeout(typeText, 3000);

const canvas = document.getElementById('star-background');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
function setCanvasDimensions() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setCanvasDimensions();
window.addEventListener('resize', setCanvasDimensions);

// Star properties
const stars = [];

function createStars() {
    const starCount = Math.floor(canvas.width * canvas.height / 5000); // Reduced density

    for (let i = 0; i < starCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 1.5 + 0.5;
        const opacity = Math.random() * 0.5 + 0.5; // Random initial opacity
        const twinkleSpeed = Math.random() * 0.05 + 0.02; // Twinkle speed
        const velocity = Math.random() * 0.2; // Star movement speed

        stars.push({ x, y, radius, opacity, twinkleSpeed, velocity });
    }
}

// Draw and animate stars
function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "rgba(10, 15, 26, 1)");
    gradient.addColorStop(1, "rgba(17, 24, 39, 1)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`; // White stars with opacity
        ctx.fill();

        // Twinkle effect (oscillating opacity)
        star.opacity += star.twinkleSpeed * (Math.random() > 0.5 ? 1 : -1);
        if (star.opacity > 1) star.opacity = 1;
        if (star.opacity < 0.2) star.opacity = 0.2;

        // Star movement (falling effect)
        star.y += star.velocity;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(drawStars);
}

createStars();
drawStars();


// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('shadow-md');
        navbar.classList.add('bg-dark-950/95');
        navbar.style.height = '64px';
    } else {
        navbar.classList.remove('shadow-md');
        navbar.classList.remove('bg-dark-950/95');
        navbar.style.height = '64px';
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// About Section Animation
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
            aboutObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const aboutContent = document.getElementById('about-content');
aboutObserver.observe(aboutContent);

// Skills Animation
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillItem = entry.target;
            skillItem.classList.add('animate-fadeInUp');

            // Animate progress bar
            setTimeout(() => {
                const progressBar = skillItem.querySelector('.progress-bar');
                const percentage = progressBar.getAttribute('data-percentage');
                progressBar.style.width = `${percentage}%`;

                // Update percentage text
                const percentageText = skillItem.querySelector('.skill-percentage');
                percentageText.textContent = `${percentage}%`;
            }, 300);

            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.15}s`;
    skillObserver.observe(item);
});

// Experience Cards Animation
const experienceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
            experienceObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.experience-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
    experienceObserver.observe(card);
});

// Project Cards Animation
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
            projectObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
    projectObserver.observe(card);
});

// Education Cards Animation
const educationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
            educationObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.education-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
    educationObserver.observe(card);
});

// Certification Card Animation
const certificationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
            certificationObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.certification-card').forEach(card => {
    certificationObserver.observe(card);
});

// Contact Section Animation
const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
            contactObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.contact-info, .contact-form').forEach((element, index) => {
    element.style.animationDelay = `${index * 0.3}s`;
    contactObserver.observe(element);
});



// Particle Effect on Button Click
function createParticles(e, button) {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('span');
        particle.className = 'particle';

        const size = Math.random() * 10 + 5;
        const tx = (Math.random() - 0.5) * 100;
        const ty = (Math.random() - 0.5) * 100;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        particle.style.background = `hsl(${Math.random() * 60 + 240}, 70%, 70%)`;

        button.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

document.querySelectorAll('button, a').forEach(button => {
    button.addEventListener('click', function (e) {
        createParticles(e, this);
    });
});

// Lazy Loading Images
const lazyImages = document.querySelectorAll('.lazy-image');

const lazyImageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.onload = () => {
                img.classList.add('loaded');
            };
            lazyImageObserver.unobserve(img);
        }
    });
}, { threshold: 0.1 });

lazyImages.forEach(image => {
    lazyImageObserver.observe(image);
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Show loading state
    submitBtn.innerHTML = `
                <span class="relative z-10">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 inline-block text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                </span>
            `;
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual form submission)
    setTimeout(() => {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        console.log('Form submitted:', { name, email, message });

        // Show success message
        formStatus.classList.remove('hidden');
        formStatus.classList.add('bg-green-900/50', 'border', 'border-green-500', 'text-green-200');
        formStatus.innerHTML = 'Thank you! Your message has been sent successfully.';

        // Reset form
        contactForm.reset();

        // Reset button
        submitBtn.innerHTML = '<span class="relative z-10">Send Message</span><span class="absolute top-0 left-0 w-full h-full bg-white opacity-10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>';
        submitBtn.disabled = false;

        // Hide status message after 5 seconds
        setTimeout(() => {
            formStatus.classList.add('hidden');
        }, 5000);
    }, 1500);

});


