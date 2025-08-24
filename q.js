const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const restartBtn = document.getElementById('restart-btn');
const questionEl = document.getElementById('question');
const answerBtns = document.getElementById('answer-buttons');
const progressEl = document.getElementById('progress');
const timerEl = document.getElementById('timer');
const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const scoreText = document.getElementById('score-text');

const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Trainer Marking Language", correct: false },
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Hyper Text Marketing Language", correct: false },
      { text: "High Text Markup Level", correct: false }
    ]
  },
  {
    question: "Which language is used for styling web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "Python", correct: false },
      { text: "CSS", correct: true },
      { text: "C++", correct: false }
    ]
  },
  {
    question: "Which is not a JavaScript Framework?",
    answers: [
      { text: "React", correct: false },
      { text: "Angular", correct: false },
      { text: "Django", correct: true },
      { text: "Vue", correct: false }
    ]
  },
  {
    question: "Which language runs in a web browser?",
    answers: [
      { text: "Java", correct: false },
      { text: "C", correct: false },
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true }
    ]
  }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', () => {
  currentQuestionIndex++;
  showQuestion();
});
prevBtn.addEventListener('click', () => {
  currentQuestionIndex--;
  showQuestion();
});
restartBtn.addEventListener('click', restartQuiz);

function startQuiz() {
  startBtn.classList.add('hide');
  quizContainer.classList.remove('hide');
  resultContainer.classList.add('hide');
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.textContent = answer.text;
    button.classList.add('btn');
    button.addEventListener('click', () => selectAnswer(answer));
    answerBtns.appendChild(button);
  });

  updateProgress();
  startTimer();

  prevBtn.classList.toggle('hide', currentQuestionIndex === 0);
  nextBtn.classList.add('hide');
}

function resetState() {
  nextBtn.classList.add('hide');
  answerBtns.innerHTML = '';
  clearInterval(timer);
  timerEl.textContent = '';
  timeLeft = 15;
}

function selectAnswer(answer) {
  if (answer.correct) score++;
  nextBtn.classList.remove('hide');
  if (currentQuestionIndex === questions.length - 1) {
    nextBtn.textContent = 'Show Score';
    nextBtn.onclick = showScore;
  } else {
    nextBtn.textContent = 'Next';
    nextBtn.onclick = () => {
      currentQuestionIndex++;
      showQuestion();
    };
  }
}

function updateProgress() {
  let progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressEl.style.width = progress + '%';
}

function startTimer() {
  timerEl.textContent = `Time Left: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time Left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextBtn.classList.remove('hide');
    }
  }, 1000);
}

function showScore() {
  quizContainer.classList.add('hide');
  resultContainer.classList.remove('hide');
  scoreText.textContent = `You scored ${score} out of ${questions.length}!`;

  const ctx = document.getElementById('scoreChart').getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Correct', 'Wrong'],
      datasets: [{
        data: [score, questions.length - score],
        backgroundColor: ['#2ecc71', '#e74c3c']
      }]
    }
  });
}

function restartQuiz() {
  startBtn.classList.remove('hide');
  quizContainer.classList.add('hide');
  resultContainer.classList.add('hide');
}
