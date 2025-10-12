const paletteContainer = document.getElementById('palette');
const refreshBtn = document.getElementById('refreshBtn');

// Function to generate a random hex color
function getRandomColor() {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16);
  return `#${hex.padStart(6, '0')}`;
}

// Function to generate a new palette
function generatePalette(numColors = 4) {
  paletteContainer.innerHTML = ''; // Clear previous

  for (let i = 0; i < numColors; i++) {
    const color = getRandomColor();

    const box = document.createElement('div');
    box.className = 'color-box';
    box.style.backgroundColor = color;

    const code = document.createElement('div');
    code.className = 'color-code';
    code.textContent = color;

    box.appendChild(code);

    // Copy to clipboard on click
    box.addEventListener('click', () => {
      navigator.clipboard.writeText(color)
        .then(() => {
          code.textContent = 'Copied!';
          setTimeout(() => code.textContent = color, 1000);
        })
        .catch(err => {
          console.error('Copy failed', err);
        });
    });

    paletteContainer.appendChild(box);
  }
}

// Initial generation
generatePalette();

// Refresh button event
refreshBtn.addEventListener('click', () => generatePalette());
