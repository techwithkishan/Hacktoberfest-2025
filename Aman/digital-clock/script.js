const clock = document.getElementById('clock');
const toggleBtn = document.getElementById('toggleBtn');
let is24Hour = false;

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let session = "";

  if (!is24Hour) {
    session = hours >= 12 ? ' PM' : ' AM';
    hours = hours % 12 || 12; // Convert to 12-hour format
  }

  // Add leading zeros
  hours = String(hours).padStart(2, '0');
  minutes = String(minutes).padStart(2, '0');
  seconds = String(seconds).padStart(2, '0');

  clock.textContent = `${hours}:${minutes}:${seconds}${is24Hour ? '' : session}`;
  clock.classList.remove("fade");
  void clock.offsetWidth; // Trigger reflow for animation
  clock.classList.add("fade");
}

toggleBtn.addEventListener('click', () => {
  is24Hour = !is24Hour;
  toggleBtn.textContent = is24Hour ? "Switch to 12-Hour" : "Switch to 24-Hour";
  updateClock();
});

setInterval(updateClock, 1000);
updateClock(); // Initial call
