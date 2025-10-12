const diceImage = document.getElementById('diceImage');
const diceValue = document.getElementById('diceValue');
const coinImage = document.getElementById('coinImage');
const coinValue = document.getElementById('coinValue');
const historyList = document.getElementById('historyList');

const diceImages = [
  'https://upload.wikimedia.org/wikipedia/commons/1/1b/Dice-1-b.svg',
  'https://upload.wikimedia.org/wikipedia/commons/5/5f/Dice-2-b.svg',
  'https://upload.wikimedia.org/wikipedia/commons/b/b1/Dice-3-b.svg',
  'https://upload.wikimedia.org/wikipedia/commons/f/fd/Dice-4-b.svg',
  'https://upload.wikimedia.org/wikipedia/commons/0/08/Dice-5-b.svg',
  'https://upload.wikimedia.org/wikipedia/commons/5/5a/Dice-6-b.svg'
];

const coinImages = {
  heads: 'https://upload.wikimedia.org/wikipedia/commons/2/28/1_Obverse_2013_One_Pound_Coin.png',
  tails: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/1_Reverse_2013_One_Pound_Coin.png'
};

let history = [];

function rollDice() {
  const result = Math.floor(Math.random() * 6) + 1;
  diceImage.src = diceImages[result - 1];
  diceValue.textContent = result;
  addToHistory(`🎲 Dice rolled: ${result}`);
}

function flipCoin() {
  const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
  coinImage.src = result === 'Heads' ? coinImages.heads : coinImages.tails;
  coinValue.textContent = result;
  addToHistory(`🪙 Coin flipped: ${result}`);
}

function addToHistory(entry) {
  history.unshift(entry);
  if (history.length > 10) {
    history.pop();
  }
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = '';
  history.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    historyList.appendChild(li);
  });
}
