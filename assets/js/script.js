//variable for each element needed for selection
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const greetingEl = document.getElementById("greeting");
const timerEl = document.getElementById("timer");
const submitBtn = document.getElementById("submit");
const initialsEl = document.getElementById("initials");

//undeclared variable allows for shuffled index
let shuffledQuestions;
let currentQuestionIndex = 0;

//function to start game, shuffle questions randomly, and hide start button and greeting
function startGame() {
  startButton.classList.add("hide");
  greetingEl.classList.add("hide");
  //start timer
  timerId = setInterval(clockTick, 1000);
  //show starting time
  timerEl.textContent = time + " seconds remaining";
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

//when next button is clicked, shuffle through questions and choose a random one
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

//when function is called, fill the container with array of question, create new button element with anwers from array
function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
  timeRemaining();
}

//reset the state of the container so that it reverts back to the original form
function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
  //TODO add something to reset time
}

//use selectAnswer function to choose an answer then find out whether they should restart or continue through the array of questions
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

//change buttons to correct/wrong color depending on array
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

//clearstatusclass function to reset button colors
function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

// array for questions
const questions = [
  {
    question: "1. What is the DOM?",
    answers: [
      { text: "a programming interface for web documents", correct: true },
      { text: "a dominant element on a webpage", correct: false },
      { text: "a series of objects listed as a string", correct: false },
      { text: "shortened syntax that can grab a variable", correct: false },
    ],
  },
  {
    question: "2. What does a break do?",
    answers: [
      { text: "breaks the code", correct: false },
      { text: "separates the different functions", correct: false },
      { text: "attaches a line break", correct: true },
      { text: "exits current loop", correct: false },
    ],
  },
  {
    question: "3. Arrays in JavaScript can be stored in ______.",
    answers: [
      { text: "number and strings", correct: false },
      { text: "booleans", correct: false },
      { text: "other arrays", correct: false },
      { text: "all of the above", correct: true },
    ],
  },
];

// quiz state variable
let time = questions.length * 15;
let timerId;

//timer function
function timeRemaining() {
  //check if user guessed wrong
  if (this.value !== questions[currentQuestionIndex].answers) {
    //penalize time
    time -= 5;
    console.log("points taken off");

    if (time < 0) {
      time = 0;
    }
    //display new time on page
    timerEl.textContent = time;
  }
}

function clockTick() {
  //update time
  time--;
  timerEl.textContent = time;

  //check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighScore() {
  //get value of input box
  var initials = initialsEl.value.trim();

  //get saved scores from localStorage, if none, set to an empty array
  if (initials !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    //format new score object for current user
    var newScore = {
      score: time,
      initials: initials,
    };

    //save to localStorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirect to next page
    window.location.href = "score.html";
  }
}

function quizEnd() {
  //stop timer
  clearInterval(timerId);

  // show end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.classList.remove("hide");

  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hide questions section
  questionContainerElement.classList.add("hide");
}

//the event listener for clicking on the start or next button
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});
//submit initials
submitBtn.addEventListener("click", saveHighScore);
