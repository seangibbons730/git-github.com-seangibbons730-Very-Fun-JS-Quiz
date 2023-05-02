const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

//function countdown() {
  //var timeInterval = setInterval(function () {
   // countEl.textContent = timeLeft;
   // timeLeft--;
   // if (timeLeft > 1) {
   //   countEl.textContent = timeLeft;
  // } else if (timeLeft === 1) {
   //   countEl.textContent = timeLeft;
   //   timeLeft--;
  //  } else {
   //   countEl.textContent = "";
   //   clearInterval(timeInterval);
  //    displayForm();
  //  }
//  }, 1000);

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
      { text: 'javascript', correct: false },
      { text: 'js', correct: false },
      { text: 'scripting', correct: false },
      { text: 'script', correct: true }
    ]
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    answers: [
      { text: 'Both the <head> section and the <body> section', correct: true },
      { text: 'The <body> section', correct: false },
      { text: 'The <head> section', correct: false }
    ]
  },
  {
    question: 'The external JavaScript file must contain the <script> tag.',
    answers: [
      { text: 'True', correct: false },
      { text: 'False', correct: true }
    ]
  },
  {
    question: 'How can you add a comment in a JavaScript?',
    answers: [
      { text: '!--THIS IS A COMMENT-->', correct: false },
      { text: '--!THIS IS A COMMENT-->', correct: false },
      { text: '//THIS IS A COMMENT', correct: true },
      { text: '/THIS IS A COMMENT/', correct: false }
    ]
  }
]
