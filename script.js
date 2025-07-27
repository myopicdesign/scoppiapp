const bubbleContainer = document.getElementById("bubble-container");
const popSound = document.getElementById("pop-sound");
const counterDisplay = document.getElementById("counter");
const resetButton = document.getElementById("reset-button");

const poppedImages = [
  "https://myopicdesign.github.io/scoppiapp/src/ballvuota-tipo1.png",
  "https://myopicdesign.github.io/scoppiapp/src/ballvuota-tipo2.png",
  "https://myopicdesign.github.io/scoppiapp/src/ballvuota-tipo3.png",
  "https://myopicdesign.github.io/scoppiapp/src/ballvuota-tipo4.png",
];

const fullBubbleImage = "https://myopicdesign.github.io/scoppiapp/src/Ballpiena.png";

let poppedCount = 0;

function createBubble() {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.style.backgroundImage = `url(${fullBubbleImage})`;

  bubble.addEventListener("click", () => {
    if (!bubble.classList.contains("popped")) {
      bubble.classList.add("popped");

      const poppedImg = poppedImages[Math.floor(Math.random() * poppedImages.length)];
      bubble.style.backgroundImage = `url(${poppedImg})`;

      poppedCount++;
      counterDisplay.textContent = `Scoppiati: ${poppedCount}`;

      // Suono
      popSound.currentTime = 0;
      popSound.play();

      // Vibrazione
      if (navigator.vibrate) {
        navigator.vibrate(30);
      }
    }
  });

  bubbleContainer.appendChild(bubble);
}

function generateInitialBubbles(count = 60) {
  for (let i = 0; i < count; i++) {
    createBubble();
  }
}

function resetBubbles() {
  bubbleContainer.innerHTML = "";
  poppedCount = 0;
  counterDisplay.textContent = "Scoppiati: 0";
  generateInitialBubbles();
}

// Infinite scroll
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    generateInitialBubbles(40);
  }
});

// Reset
resetButton.addEventListener("click", resetBubbles);

// Init
generateInitialBubbles();
