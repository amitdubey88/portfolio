
  
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
        document.getElementById("loader").classList.add("hidden");
    }, 1000); // Ensures loader is shown for at least 1 second
  // Text array to cycle through
  document.getElementById('year').textContent = new Date().getFullYear();

 
  // Text array to cycle through
  const textArray = [
    "Salesforce Developer",
    "Salesforce Certified",
    "Apex & LWC Expert",
    "Agentforce",
    "HTML, CSS, JavaScript",
    "Experience Cloud",
    "Health Cloud",
    "Double Star Ranger @ Trailhead",
  ]

  // DOM element
  const typingTextElement = document.getElementById("typing-text")

  // Timing variables (in milliseconds)
  const typingSpeed = 10 // Speed for typing characters
  const erasingSpeed = 10 // Speed for erasing characters (faster)
  const pauseDuration = 2000 // 2 seconds pause between texts

  // State variables
  let textIndex = 0
  let charIndex = 0
  let isTyping = true
  let typingTimeout = null

 function updateCursorPosition() {
    const cursor = document.querySelector('.cursor');
    const textWidth = typingTextElement.offsetWidth; // Get the width of the text
    cursor.style.left = `${textWidth + 4}px`; // Position cursor after the text
    cursor.style.top = `${typingTextElement.offsetTop}px`; // Align cursor with the top of the text
}

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

    // Update cursor position
    updateCursorPosition();
}

// Add event listener for window resize
window.addEventListener('resize', updateCursorPosition);

  // Start the typing effect
  typeEffect()

  // Clean up on page unload to prevent memory leaks
  window.addEventListener("beforeunload", () => {
    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }
  })
})

