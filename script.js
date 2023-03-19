var timeEl = document.querySelector(".time");
var startEl = document.querySelector(".start-button");
var titleEl = document.getElementById("webpage-title");
var subEl = document.getElementById("webpage-subheader");
var secondsLeft = 60;

var questions = {
    question1: "JavaScript arrays can be used to store:",
    question2: "You can set the display attribute in css to:",
    question3: "== is used for:",
    question4: "=== is used for:",
    question5: "You use this data structure to take an action a specific number of times that you know: "
};

var options = {
    question1: ["booleans", "numbers", "strings", "all of the above"],
    question2: ["none", "block", "flex", "all of the above"],
    question3: ["assignment", "equality", "strict-equality", "none of the above"],
    question4: ["assignment", "equality", "strict-equality", "none of the above"],
    question5: ["for loop", "while loop", "if statement", "queue"]
};

var answers = {
    answer1: "all of the above",
    answer2: "all of the above",
    answer3: "equality",
    answer4: "strict-equality",
    answer5: "for loop"
};

function showHighScores(){
    window.location.href = "highscores.html"
}

function showMainPage(){
    window.location.href = "index.html"
}

function showEndScreen(){
    console.log("end screen!");
}

function detachElements() {  
    
    startEl.style.display = "none";
    titleEl.style.display = "none";
    subEl.style.display = "none";

}

function setTime(){
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = "Time:  " + secondsLeft;

        if (secondsLeft === 0){
            clearInterval(timerInterval);
            showEndScreen();
        }
    }, 1000);
}

function startQuiz(){
    displayQuestion(questions.question1, options.question1, answers.answer1);
}

function displayQuestion(questions, options, answers){
    var question = document.createElement("h3");
    question.style.textAlign = "center";
    question.style.fontSize = "50px";
    question.textContent = questions;
    document.body.appendChild(question);

    var optionsList = document.createElement("ul");
    // var op1 = document.createElement("li");
    // var b1 = document.createElement("button");
    for (var i = 0; i < 4; i++){
        var op = document.createElement("li");
        var b = document.createElement("button");
        b.innerHTML = options[i];
        b.setAttribute("id", "option-button");
        b.addEventListener("click", checkAnswer);
        b.userAnswer = b.innerHTML;
        b.correctAnswer = answers;
        op.appendChild(b);
        op.setAttribute("id", "question-option");
        optionsList.appendChild(op);
    }
    document.body.appendChild(optionsList);
}

function checkAnswer(event){
    console.log(event.currentTarget.userAnswer);
    console.log(event.currentTarget.correctAnswer);
}

if (document.URL.includes("index.html")){
    startEl.addEventListener("click", setTime);
    startEl.addEventListener("click", detachElements);
    startEl.addEventListener("click", startQuiz);
}


