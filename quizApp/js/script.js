const questions = [
    {
        question: "Does catching the red dot REALLY MATTER?",
        answers: [
            { text: "yes", correct: false},
            { text: "YES, INDEED", correct: true},
        ]
    },
    {
        question: "Is your bowl is half-empty or half-full?",
        answers: [
            { text: "There is no such thing as half full!", correct: true},
            { text: "Feed me. Now. OR ELSE...", correct: true},
        ]
    },
    {
        question: "What do you think of pet beds?",
        answers: [
            { text: "Yes, they are very comfortable. As long as they belong to the dog.", correct: true},
            { text: "I meow them!", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn")

let currentQuestionIndex = 0;
let score = 0;


function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
}
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct == "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
 }


 function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Meow Again";
    nextButton.style.display = "block";
 }


function handleNextbutton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
   }else{
    showScore();
   }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextbutton();
    }else{
        startQuiz();
    }
    
});

const audio = new Audio("/cat-meow-85175.mp3");
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    audio.play();
  });
});




startQuiz();