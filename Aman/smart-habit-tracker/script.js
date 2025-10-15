const habitInput = document.getElementById('habitInput');
const addHabitBtn = document.getElementById('addHabitBtn');
const habitList = document.getElementById('habitList');

const EMOJIS = ['😊', '😐', '😞', '😎', '😴'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

let habits = JSON.parse(localStorage.getItem('habits')) || [];

function saveHabits() {
  localStorage.setItem('habits', JSON.stringify(habits));
}

function getTodayIndex() {
  return new Date().getDay();
}

function renderHabits() {
  habitList.innerHTML = '';

  habits.forEach((habit, habitIndex) => {
    const habitDiv = document.createElement('div');
    habitDiv.classList.add('habit');

    const header = document.createElement('div');
    header.classList.add('habit-header');

    const name = document.createElement('div');
    name.classList.add('habit-name');
    name.textContent = habit.name;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = () => {
      habits.splice(habitIndex, 1);
      saveHabits();
      renderHabits();
    };

    header.appendChild(name);
    header.appendChild(deleteBtn);

    const dayEntries = document.createElement('div');
    dayEntries.classList.add('day-entries');

    DAYS.forEach((day, dayIndex) => {
      const dayEntry = document.createElement('div');
      dayEntry.classList.add('day-entry');

      const dayLabel = document.createElement('div');
      dayLabel.textContent = day;

      const emoji = document.createElement('div');
      emoji.classList.add('emoji-select');
      emoji.textContent = habit.logs[dayIndex] || '➕';

      emoji.onclick = () => {
        const current = EMOJIS.indexOf(habit.logs[dayIndex]);
        const next = (current + 1) % EMOJIS.length;
        habit.logs[dayIndex] = EMOJIS[next];
        saveHabits();
        renderHabits();
      };

      dayEntry.appendChild(dayLabel);
      dayEntry.appendChild(emoji);
      dayEntries.appendChild(dayEntry);
    });

    habitDiv.appendChild(header);
    habitDiv.appendChild(dayEntries);
    habitList.appendChild(habitDiv);
  });
}

addHabitBtn.onclick = () => {
  const name = habitInput.value.trim();
  if (name === '') return;
  habits.push({ name, logs: Array(7).fill('') });
  habitInput.value = '';
  saveHabits();
  renderHabits();
};

renderHabits();
