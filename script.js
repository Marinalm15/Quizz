//declaração de variáveis
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ['a', 'b', 'c', 'd'];
let points = 0;
let actualQuestion = 0;

//perguntas
const questions = [
  {
    "question": "PHP foi desenvolvido para qual fim?",
    "answers": [
      {
        "answer": "back-end",
        "correct": true
      },
      {
        "answer": "front-end",
        "correct": false
      },
      {
        "answer": "Sistema operacional",
        "correct": false
      },
      {
        "answer": "Banco de dados",
        "correct": false
      },
    ]
  },
  {
    "question": "Uma forma de declarar variável em JavaScript:",
    "answers": [
      {
        "answer": "$var",
        "correct": false
      },
      {
        "answer": "var",
        "correct": true
      },
      {
        "answer": "@var",
        "correct": false
      },
      {
        "answer": "#let",
        "correct": false
      },
    ]
  },
  {
    "question": "Qual o seletor de id no CSS?",
    "answers": [
      {
        "answer": "#",
        "correct": true
      },
      {
        "answer": ".",
        "correct": false
      },
      {
        "answer": "@",
        "correct": false
      },
      {
        "answer": "/",
        "correct": false
      },
    ]
  },
]

// Substituição do layout pela primeira questão
function init() {
  createQuestion(0)
}

//create a question 
function createQuestion(i) {

  const oldButtons = answersBox.querySelectorAll("button");

  oldButtons.forEach(function(btn) {
    btn.remove();
  });

  const questionText = question.querySelector("#question-text");
  const questionNumber = question.querySelector("#question-number");

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  questions[i].answers.forEach(function(answer, i) {
    
    const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

    const letterBtn = answerTemplate.querySelector(".btn-letter");
    const answerText = answerTemplate.querySelector(".question-answer");

    letterBtn.textContent = letters[i];
    answerText.textContent = answer['answer'];

    answerTemplate.setAttribute("correct-answer", answer["correct"]);

    answerTemplate.classList.remove("hide");
    answerTemplate.classList.remove("answer-template");

    answersBox.appendChild(answerTemplate);

  });

  //cria evento em todos os botões
  const buttons = answersBox.querySelectorAll("button");

  buttons.forEach(function(button) {
    button.addEventListener("click", function() {
      checkAnswer(this, buttons);
    });
  });

  //incrementa o número atual de questões
  actualQuestion++;

}

//verificando se resposta está correta
function checkAnswer(btn, buttons) {
  
  buttons.forEach(function(button) {

    if(button.getAttribute("correct-answer") === "true") {
      button.classList.add("correct-answer");
    
      if(btn === button) {
  
        points++;
      }
    } else {
      button.classList.add("wrong-answer");
    }

  });

  nextQuestion();

}

//exibe a próxima pergunta
function nextQuestion() {

  setTimeout(function() {

    if(actualQuestion >= questions.length) {
      showSuccessMessage();
      return;
    }

    createQuestion(actualQuestion)

  }, 1000);

}

//tela final
function showSuccessMessage() {

  hideOrShowQuizz();

  const score = ((points / questions.length) * 100).toFixed(2);
  const scoreDisplay = document.querySelector("#display-score span");

  scoreDisplay.textContent = score.toString();

  const correctAnswers = document.querySelector("#correct-answer");
  correctAnswers.textContent = points;

  const totalQuestions = document.querySelector("#questions-qty");
  totalQuestions.textContent = questions.length;

}

//reiniciar Quizz
const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", function() {
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz();
  init();
});

//mostra ou exibe o quizz
function hideOrShowQuizz() {
  quizzContainer.classList.toggle("hide");
  scoreContainer.classList.toggle("hide");
}

init();
  