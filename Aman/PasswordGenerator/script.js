const passwordField = document.getElementById('password');
const copyBtn = document.getElementById('copy-btn');
const lengthInput = document.getElementById('length');
const lengthVal = document.getElementById('length-val');
const includeUppercase = document.getElementById('include-uppercase');
const includeNumbers = document.getElementById('include-numbers');
const includeSymbols = document.getElementById('include-symbols');
const generateBtn = document.getElementById('generate');
const strengthDisplay = document.getElementById('strength').querySelector('span');

const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

lengthInput.addEventListener('input', () => {
  lengthVal.textContent = lengthInput.value;
});

copyBtn.addEventListener('click', () => {
  passwordField.select();
  document.execCommand('copy');
  copyBtn.textContent = "✅";
  setTimeout(() => copyBtn.textContent = "📋", 1000);
});

generateBtn.addEventListener('click', () => {
  const length = parseInt(lengthInput.value);
  const hasUpper = includeUppercase.checked;
  const hasNumbers = includeNumbers.checked;
  const hasSymbols = includeSymbols.checked;

  let chars = lowercaseChars;
  if (hasUpper) chars += uppercaseChars;
  if (hasNumbers) chars += numberChars;
  if (hasSymbols) chars += symbolChars;

  let password = "";
  for (let i = 0; i < length; i++) {
    const rand = Math.floor(Math.random() * chars.length);
    password += chars[rand];
  }

  passwordField.value = password;
  showStrength(password);
});

function showStrength(password) {
  const strength = calculateStrength(password);
  strengthDisplay.className = ""; // reset classes

  if (strength === 'weak') {
    strengthDisplay.textContent = "Weak";
    strengthDisplay.classList.add('weak');
  } else if (strength === 'medium') {
    strengthDisplay.textContent = "Medium";
    strengthDisplay.classList.add('medium');
  } else {
    strengthDisplay.textContent = "Strong";
    strengthDisplay.classList.add('strong');
  }
}

function calculateStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[\W]/.test(password)) score++;

  if (score <= 1) return "weak";
  if (score === 2 || score === 3) return "medium";
  return "strong";
}
