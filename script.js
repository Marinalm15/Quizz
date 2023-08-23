//declaração de variáveis
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

//Perguntas
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

//substituição do quizz para a primeira pergunta
function init() {
    createQuestion(0)
}

//cria uma pergunta
function createQuestion(i) {
    const oldButtons = answersBox.querySelectorAll("button")

    oldButtons.forEach(function(btn) {
        btn.remove();
    });

    const questionText = question.querySelector("#question-text");
    const questionNumber = question.querySelector("#question-number");

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    //insere as alternativas
    questions[i].answers.forEach(function(answer, i) {
    
        // Altera texto do template
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);
    
        const letterBtn = answerTemplate.querySelector(".btn-letter");
        const answerText = answerTemplate.querySelector(".question-answer");
    
        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer'];
    
        answerTemplate.setAttribute("correct-answer", answer["correct"]);
    
        // remove classe de hide e template do template
        answerTemplate.classList.remove("hide");
        answerTemplate.classList.remove("answer-template");
    
        // Insere template na tela
        answersBox.appendChild(answerTemplate);

        //inserir evento click 
        answerTemplate.addEventListener("click", function() {
            console.log(this);
        })

      });

      //incrementar o número da questão
      actualQuestion++;
}

//verificando resposta do usuário
function checkAnswer(btn, buttons) {
  
    // Exibir respostas erradas e a certa
    buttons.forEach(function(button) {
  
      if(button.getAttribute("correct-answer") === "true") {
        button.classList.add("correct-answer");
        // checa se o usuário acertou
        if(btn === button) {
          // incrementa os pontos
          points++;
        }
      } else {
        button.classList.add("wrong-answer");
      }
  
    });
  
    nextQuestion();
  
}

function nextQuestion() {
    setTimeout(function() {
        if(actualQuestion >= question.length) {

        }

        createQuestion(actualQuestion);
        
    }, 1500)
}

init();
  