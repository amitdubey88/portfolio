document.addEventListener("DOMContentLoaded", () => {
   
    // Text array to cycle through
    const textArray = [
        "Salesforce Developer",
        "Salesforce Certified",
        "Apex & LWC Expert",
        "Agentforce",
        "HTML, CSS, JavaScript, Java",
        "Experience Cloud",
        "Health Cloud Enthusiast",
        "Double Star Ranger @ Trailhead",
        "Driving Innovation with Salesforce Solutions"
    ];

    // DOM element
    const typingTextElement = document.getElementById("typing-text");

    // Timing variables (in milliseconds)
    const typingSpeed = 100; // Slower speed for typing characters
    const erasingSpeed = 50; // Faster speed for erasing characters
    const pauseDuration = 2000; // 2 seconds pause between texts

    // State variables
    let textIndex = 0;
    let charIndex = 0;
    let isTyping = true;
    let typingTimeout = null;

    // Main function to handle the typing effect
    function typeEffect() {
        // Clear any existing timeout
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        const currentText = textArray[textIndex];

        if (isTyping) {
            // Typing mode
            if (charIndex < currentText.length) {
                // Continue typing the current text
                typingTextElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingTimeout = setTimeout(typeEffect, typingSpeed);
            } else {
                // Finished typing, pause before erasing
                isTyping = false;
                typingTimeout = setTimeout(typeEffect, pauseDuration);
            }
        } else {
            // Erasing mode
            if (charIndex > 0) {
                // Continue erasing the current text
                typingTextElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingTimeout = setTimeout(typeEffect, erasingSpeed);
            } else {
                // Finished erasing, move to next text
                isTyping = true;
                textIndex = (textIndex + 1) % textArray.length;
                typingTimeout = setTimeout(typeEffect, typingSpeed);
            }
        }
    }

    // Start the typing effect after a short delay
    setTimeout(typeEffect, 500); // Start typing effect after 0.5 seconds

    document.getElementById("year").textContent = new Date().getFullYear();
    // Clean up on page unload to prevent memory leaks
    window.addEventListener("beforeunload", () => {
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
    });
});
})

