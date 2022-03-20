//variable for each element needed for selection
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const greetingEl = document.getElementById('greeting');

//undeclared variable allows for shuffled index
let shuffledQuestions, currentQuestionIndex


//the event listener for clicking on the start or next button
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
});


//function to start game, shuffle questions randomly, and hide start button and greeting
function startGame() {
  startButton.classList.add('hide');
  greetingEl.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
};

//when next button is clicked, shuffle through questions and choose a random one
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
};

//when function is called, fill the container with array of question, create new button element with anwers from array
function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct
    };
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  });
};

//reset the state of the container so that it reverts back to the original form
function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
};

//use selectAnswer function to choose an answer then find out whether they should restart or continue through the array of questions
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
};


//change buttons to correct/wrong color depending on array
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
};

//clearstatusclass function to reset button colors
function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
};


// array for questions 
const questions = [
  {
    question: 'What is the DOM?',
        answers: [
            { text: 'a programming interface for web documents', correct: true },
            { text: 'a dominant element on a webpage', correct: false },
            { text: 'a series of objects listed as a string', correct: false },
            { text: 'shortened syntax that can grab a variable', correct: false }
        ]
  },
  {
    question: 'What does a break do?',
        answers: [
            { text: 'breaks the code', correct: false },
            { text: 'separates the different functions', correct: false },
            { text: 'attaches a line break', correct: false },
            { text: 'exits current loop', correct: true }
        ]
  },
  {
    question: 'Arrays in JavaScript can be stored in ______.',
    answers: [
        { text: 'number and strings', correct: false },
        { text: 'booleans', correct: false },
        { text: 'other arrays', correct: false },
        { text: 'all of the above', correct: true }
    ]
  }
]

