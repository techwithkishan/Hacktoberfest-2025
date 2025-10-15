const textarea = document.getElementById('message');
const charCount = document.getElementById('char-count');
const counterBox = document.querySelector('.counter');

const maxLength = 280;

textarea.addEventListener('input', () => {
  const length = textarea.value.length;
  charCount.textContent = length;

  // Color alert system
  if (length >= maxLength) {
    counterBox.className = 'counter danger';
  } else if (length >= maxLength * 0.8) {
    counterBox.className = 'counter warning';
  } else {
    counterBox.className = 'counter normal';
  }
});
