
// Loading Screen
document.addEventListener('DOMContentLoaded', () => {
    //scrollBehavior
    let isUserScrolling = false;
    let scrollTimeout;
    window.addEventListener("scroll", () => {
        isUserScrolling = true;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isUserScrolling = false;
        }, 120);
    });



    // Achievement Counters Animation
    const section = document.getElementById("achievements");
    const counters = section.querySelectorAll(".achievement-number");

    let hasAnimated = false;

    const animateCounter = (el) => {
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || "";
        const duration = 2000;

        let start = 0;
        const startTime = performance.now();

        const update = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOut
            const value = Math.floor(eased * target);
            el.textContent = value + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target + suffix;
            }
        };

        requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    counters.forEach(animateCounter);
                    hasAnimated = true;
                    observer.disconnect();
                }
            });
        },
        { threshold: 0.4 }
    );

    observer.observe(section);

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

    const toggleBtn = document.getElementById('toggleCerts');
    const certList = document.getElementById('certificationList');

    if (!toggleBtn || !certList) return;

    let expanded = false;

    toggleBtn.addEventListener('click', () => {
        expanded = !expanded;

        if (expanded) {
            certList.classList.remove('max-h-0', 'opacity-0', 'translate-y-2');
            certList.classList.add('max-h-[1000px]', 'opacity-100', 'translate-y-0');
            toggleBtn.textContent = 'Hide Certifications';
        } else {
            certList.classList.add('max-h-0', 'opacity-0', 'translate-y-2');
            certList.classList.remove('max-h-[1000px]', 'opacity-100', 'translate-y-0');
            toggleBtn.textContent = 'View Certifications';
        }
    });
});

const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');

// Store SVG icons for clarity
const hamburgerIconSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 menu-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
    </svg>`;

const closeIconSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 menu-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>`;

let isMenuOpen = false;

// Function to open the menu
function openMenu() {
    if (isMenuOpen) return;

    isMenuOpen = true;
    mobileMenu.classList.remove('hidden');

    requestAnimationFrame(() => {
        mobileMenu.classList.remove('opacity-0', '-translate-y-5', 'scale-95');
        mobileMenu.classList.add('opacity-100', 'translate-y-0', 'scale-100');
    });

    menuIcon.innerHTML = closeIconSVG;

    // Add listeners when menu opens
    setTimeout(() => { // Delay ensures the initial button click isn't caught
        document.addEventListener('click', handleClickOutside);
        mobileMenu.addEventListener('click', handleMenuClick); // Add listener for clicks *inside* menu
    }, 0);
}

// Function to close the menu
function closeMenu() {
    if (!isMenuOpen) return;

    isMenuOpen = false;
    mobileMenu.classList.remove('opacity-100', 'translate-y-0', 'scale-100');
    mobileMenu.classList.add('opacity-0', '-translate-y-5', 'scale-95');

    menuIcon.innerHTML = hamburgerIconSVG;

    // Remove listeners when menu closes
    document.removeEventListener('click', handleClickOutside);
    mobileMenu.removeEventListener('click', handleMenuClick); // Remove listener for clicks inside menu

    setTimeout(() => {
        mobileMenu.classList.add('hidden');
    }, 300); // Match transition duration
}

// Handler for clicks outside the menu
function handleClickOutside(event) {
    if (isMenuOpen &&
        !mobileMenuButton.contains(event.target) &&
        !mobileMenu.contains(event.target)) {
        closeMenu();
    }
}

// *** NEW: Handler for clicks *inside* the menu ***
function handleMenuClick(event) {
    // Check if the clicked element or its parent is an anchor tag (<a>)
    // or a button tag (<button>) within the menu.
    // Adjust the selectors if your menu items use different tags.
    const clickedItem = event.target.closest('a, button');

    if (clickedItem) {
        // Optional: Check if the clicked item is *meant* to close the menu.
        // You could add a specific class or attribute to items that *shouldn't* close it.
        // Example: if (!clickedItem.hasAttribute('data-no-close')) { ... }

        closeMenu();
    }
}


// Toggle menu on button click
mobileMenuButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent this click from triggering handleClickOutside
    if (isMenuOpen) {
        closeMenu();
    } else {
        openMenu();
    }
});

// Optional: Close menu on Escape key press
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isMenuOpen) {
        closeMenu();
    }
});

// Initial state setup
mobileMenu.classList.add('hidden', 'opacity-0', '-translate-y-5', 'scale-95');
menuIcon.innerHTML = hamburgerIconSVG;


// Reveal elements on scroll
function revealElements() {
    const elements = document.querySelectorAll(".reveal-element")
    const windowHeight = window.innerHeight

    elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
        const elementVisible = 150

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add("active")

            // Animate skill bars if in skills section
            if (element.closest("#skills")) {
                const skillBars = element.querySelectorAll(".skill-progress")
                skillBars.forEach((bar) => {
                    const width = bar.getAttribute("data-width")
                    if (width) {
                        bar.style.width = width
                    }
                })
            }
        }
    })
}

let ticking = false;

window.addEventListener("scroll", () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            revealElements();
            ticking = false;
        });
        ticking = true;
    }
});


// Initialize reveal on page load
setTimeout(revealElements, 100)

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

const canvas = document.getElementById("star-background");
const ctx = canvas.getContext("2d");

let stars = [];
let STAR_DENSITY = 7000; // higher = fewer stars

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Re-generate stars based on new size
    createStars();
}

function createStars() {
    stars = [];
    const starCount = Math.floor(
        (canvas.width * canvas.height) / STAR_DENSITY
    );

    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.7 + 0.3,
            o: Math.random(),
            v: Math.random() * 0.15 + 0.05,
        });
    }
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.o})`;
        ctx.fill();

        s.y += s.v;
        if (s.y > canvas.height) {
            s.y = 0;
            s.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(drawStars);
}

drawStars();



// Navbar Scroll Effect
const navbar = document.getElementById('navbar');


window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


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









