const bubbleContainer = document.getElementById("bubble-container");
const resetButton = document.getElementById("reset-button");
const counterDisplay = document.getElementById("counter");

const fullBubbleImage = "https://myopicdesign.github.io/scoppiapp/src/Ballpiena.png";
const poppedImages = [
  "https://myopicdesign.github.io/scoppiapp/src/ballvuota-tipo1.png",
  "https://myopicdesign.github.io/scoppiapp/src/ballvuota-tipo2.png",
  "https://myopicdesign.github.io/scoppiapp/src/ballvuota-tipo3.png",
  "https://myopicdesign.github.io/scoppiapp/src/ballvuota-tipo4.png",
];

const popSounds = [
  document.getElementById("pop1"),
  document.getElementById("pop2"),
  document.getElementById("pop3"),
  document.getElementById("pop4"),
];

let poppedCount = 0;
let totalRows = 0;

function generateBubbleRow(bubblesPerRow = 6) {
  const row = document.createElement("div");
  row.classList.add("bubble-row");
  if (totalRows % 2 !== 0) row.classList.add("odd");

  for (let i = 0; i < bubblesPerRow + 2; i++) {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.style.backgroundImage = url(${fullBubbleImage});

    bubble.addEventListener("click", () => {
      if (!bubble.classList.contains("popped")) {
        bubble.classList.add("popped");
        const poppedImg = poppedImages[Math.floor(Math.random() * poppedImages.length)];
        bubble.style.backgroundImage = url(${poppedImg});
        poppedCount++;
        counterDisplay.textContent = Scoppiate: ${poppedCount};
        const sound = popSounds[Math.floor(Math.random() * popSounds.length)];
        sound.currentTime = 0;
        sound.play();
        if (navigator.vibrate) {
          navigator.vibrate(200);
        }
      }
    });

    row.appendChild(bubble);
  }

  bubbleContainer.appendChild(row);
  totalRows++;
}

function generateInitialBubbles(rowCount = 12) {
  for (let i = 0; i < rowCount; i++) {
    generateBubbleRow();
  }
}

function resetBubbles() {
  bubbleContainer.innerHTML = "";
  poppedCount = 0;
  totalRows = 0;
  counterDisplay.textContent = "Scoppiate: 0";
  generateInitialBubbles();
}

resetButton.addEventListener("click", resetBubbles);

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    generateInitialBubbles(6);
  }
});

generateInitialBubbles();