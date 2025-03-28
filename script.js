document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
        document.getElementById("loader").classList.add("hidden");
    }, 1000); // Ensures loader is shown for at least 1 second
  // Text array to cycle through
  // Set current year in footer
  const yearElements = document.querySelectorAll("#year")
  yearElements.forEach((element) => {
    element.textContent = new Date().getFullYear()
  })

  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', function() {
          // Toggle the hidden class
          mobileMenu.classList.toggle('hidden');

          // Change icon based on menu state
          const icon = menuToggle.querySelector('i');
          if (icon) {
              if (mobileMenu.classList.contains('hidden')) {
                  icon.classList.remove('fa-times');
                  icon.classList.add('fa-bars');
              } else {
                  icon.classList.remove('fa-bars');
                  icon.classList.add('fa-times');
              }
          }

          // Log for debugging
          console.log('Menu toggled, hidden:', mobileMenu.classList.contains('hidden'));
      });

      // Close mobile menu when clicking on a link
      const mobileLinks = mobileMenu.querySelectorAll('a');
      mobileLinks.forEach(link => {
          link.addEventListener('click', function() {
              mobileMenu.classList.add('hidden');
              const icon = menuToggle.querySelector('i');
              if (icon) {
                  icon.classList.remove('fa-times');
                  icon.classList.add('fa-bars');
              }
          });
      });
  }
  
  
  // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-gray-900', 'bg-opacity-90', 'backdrop-blur-lg');
            navbar.classList.add('py-2');
            navbar.classList.remove('py-4');
            navbar.classList.add('shadow-lg');
        } else {
            navbar.classList.remove('bg-gray-900', 'bg-opacity-90', 'backdrop-blur-lg');
            navbar.classList.add('py-4');
            navbar.classList.remove('py-2');
            navbar.classList.remove('shadow-lg');
        }
    }
    
    // Initial check
    updateNavbar();
    // Check on scroll
    window.addEventListener('scroll', updateNavbar);

    // Active nav link indicator
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function setActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active-nav');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active-nav');
            }
        });
    }
    
    // Initial check
    setActiveNavLink();
    // Check on scroll
    window.addEventListener('scroll', setActiveNavLink);

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.85;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial check
    checkReveal();
    // Check on scroll
    window.addEventListener('scroll', checkReveal);

    // Create animated stars background
    function createStars() {
        const starsContainer = document.querySelector('.stars-container');
        const count = 100;
        
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            const size = Math.random() * 2;
            
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.position = 'absolute';
            star.style.borderRadius = '50%';
            star.style.backgroundColor = 'white';
            star.style.opacity = Math.random() * 0.8 + 0.2;
            
            // Add twinkling animation
            star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite ${Math.random() * 2}s`;
            
            starsContainer.appendChild(star);
        }
    }
    
    // Add twinkling animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Create stars
    createStars();
  // Clean up on page unload to prevent memory leaks
  window.addEventListener("beforeunload", () => {
    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }
  })
})

const typed = new Typed('.multiple-text', {
    strings: ["a Salesforce Developer.",
    "Salesforce Certified & Skilled.",
    "an Apex & LWC Expert.",
    "passionate about Agentforce.",
    "proficient in HTML, CSS, and JS.",
    "experienced in Experience Cloud.",
    "exploring Health Cloud innovations.",
    "a Double Star Ranger @ Trailhead."],  //add  multiple texts
    typeSpeed: 70,
    backSpeed: 70,
    backDelay: 1000,
    loop: true,
});
