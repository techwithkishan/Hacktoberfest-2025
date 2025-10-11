// Game variables
let gameActive = false;
let hidingSpot = null;
let timerInterval = null;
let timeLeft = 30;
let score = 0;
const spots = ['tree', 'bush', 'bench', 'swing', 'shed'];

// DOM elements
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const timerEl = document.getElementById('timer');
const scoreEl = document.getElementById('score');
const messageEl = document.getElementById('message');
const friendEl = document.getElementById('friend');
const sceneSpots = document.querySelectorAll('.spot');

// Start game
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);

function startGame() {
    gameActive = true;
    timeLeft = 30;
    hidingSpot = spots[Math.floor(Math.random() * spots.length)];
    messageEl.textContent = 'Your friend is hiding! Click spots to search.';
    startBtn.style.display = 'none';
    resetBtn.style.display = 'none';
    friendEl.classList.add('hidden'); // Hide friend initially
    
    // Position friend in random spot (for reveal)
    const spotEl = document.getElementById(hidingSpot);
    const sceneRect = document.getElementById('scene').getBoundingClientRect();
    const spotRect = spotEl.getBoundingClientRect();
    friendEl.style.left = (spotRect.left - sceneRect.left + 10) + 'px';
    friendEl.style.top = (spotRect.top - sceneRect.top + 10) + 'px';
    
    // Start timer
    timerInterval = setInterval(updateTimer, 1000);
    timerEl.textContent = `Time: ${timeLeft}s`;
    
    // Add click listeners to spots
    sceneSpots.forEach(spot => {
        spot.style.pointerEvents = 'auto';
        spot.addEventListener('click', handleSpotClick);
    });
}

// Handle spot click
function handleSpotClick(e) {
    if (!gameActive) return;
    
    const clickedSpot = e.currentTarget.id;
    const spotEl = e.currentTarget;
    
    if (clickedSpot === hidingSpot) {
        // Found!
        gameActive = false;
        clearInterval(timerInterval);
        messageEl.textContent = 'You found them! 🎉';
        score++;
        scoreEl.textContent = `Score: ${score}`;
        friendEl.classList.remove('hidden');
        friendEl.classList.add('found');
        resetBtn.style.display = 'inline-block';
        
        // Remove listeners
        sceneSpots.forEach(spot => spot.style.pointerEvents = 'none');
    } else {
        // Wrong spot
        messageEl.textContent = 'Not there! Try another spot.';
        spotEl.style.transform = 'scale(0.95)'; // Quick shake feedback
        setTimeout(() => spotEl.style.transform = '', 200);
    }
}

// Update timer
function updateTimer() {
    timeLeft--;
    timerEl.textContent = `Time: ${timeLeft}s`;
    
    if (timeLeft <= 0) {
        gameActive = false;
        clearInterval(timerInterval);
        messageEl.textContent = 'Time\'s up! Better luck next time. 😔';
        resetBtn.style.display = 'inline-block';
        
        // Remove listeners
        sceneSpots.forEach(spot => spot.style.pointerEvents = 'none');
    }
}

// Reset game
function resetGame() {
    gameActive = false;
    clearInterval(timerInterval);
    timeLeft = 30;
    timerEl.textContent = `Time: ${timeLeft}s`;
    messageEl.textContent = '';
    friendEl.classList.add('hidden');
    friendEl.classList.remove('found');
    startBtn.style.display = 'inline-block';
    resetBtn.style.display = 'none';
    
    // Reset spots
    sceneSpots.forEach(spot => {
        spot.style.pointerEvents = 'none';
        spot.removeEventListener('click', handleSpotClick);
        spot.style.transform = '';
    });
}