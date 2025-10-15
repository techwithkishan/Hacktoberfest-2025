const quizData = [
  {
    question: "What is the capital of France?",
    a: "London",
    b: "Berlin",
    c: "Paris",
    d: "Madrid",
    correct: "c"
  },
  {
    question: "Which language runs in a web browser?",
    a: "Python",
    b: "Java",
    c: "C",
    d: "JavaScript",
    correct: "d"
  },
  {
    question: "What does CSS stand for?",
    a: "Central Style Sheets",
    b: "Cascading Style Sheets",
    c: "Cascading Simple Sheets",
    d: "Cars SUVs Sailboats",
    correct: "b"
  },
  {
    question: "Which HTML tag is used to link a JavaScript file?",
    a: "<script>",
    b: "<js>",
    c: "<javascript>",
    d: "<link>",
    correct: "a"
  }
];

const questionEl = document.getElementById("question");
const answersEls = document.querySelectorAll("input[name='answer']");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  deselectAnswers();
  const currentData = quizData[currentQuiz];
  questionEl.textContent = currentData.question;
  a_text.textContent = currentData.a;
  b_text.textContent = currentData.b;
  c_text.textContent = currentData.c;
  d_text.textContent = currentData.d;
}

function getSelected() {
  let answer = undefined;
  answersEls.forEach(el => {
    if (el.checked) {
      answer = el.id;
    }
  });
  return answer;
}

function deselectAnswers() {
  answersEls.forEach(el => el.checked = false);
}

submitBtn.addEventListener("click", () => {
  const answer = getSelected();

  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
    }

    currentQuiz++;
    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      document.getElementById("quiz").innerHTML = `
        <h2>You scored ${score} out of ${quizData.length}!</h2>
        <button onclick="location.reload()">Reload</button>
      `;
    }
  } else {
    alert("Please select an answer before submitting.");
  }
});
