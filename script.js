var timeEl = document.querySelector(".time");
var startEl = document.querySelector(".start-button");
var titleEl = document.getElementById("webpage-title");
var subEl = document.getElementById("webpage-subheader");

var secondsLeft = 60;
var currentQuestion = 0;
var score = 0;
var validated = false;

var pageMoveEl = document.createElement("a");
var correctOrIncorrectText = document.createElement("h3");
var question = document.createElement("h3");
var optionsList = document.createElement("ul");
var finishText = document.createElement("h2");
var scoreText = document.createElement("h4");
var highscoreForm = document.createElement("form");
var highscoreInput = document.createElement("input");
var highscoreSubmit = document.createElement("input");
var highscoreText = document.createElement("h1");
var highscoreList = document.createElement("ol");
var backButton = document.createElement("input");

// gets the object from the local storage. if it does not exist it will create an empty object
var userScores = JSON.parse(localStorage.getItem("highscores"));

if (userScores === null){
    userScores = {};
}

// objects to store the questions, the multiple choices, and the answers to those questions
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

// functions that allow switching between pages
function showHighScores(){
    window.location.href = "highscores.html"
}

function showMainPage(){
    window.location.href = "index.html"
}

// when the timer is up or user is at the end of quiz, an end screen is shown for the user to add their score to highscores
function showEndScreen(){
    score = secondsLeft;
    // timeEl.textContent = "";
    question.style.display = "none";
    // question.textContent = "";
    optionsList.style.display = "none";
    correctOrIncorrectText.style.display = "none";

    finishText.style.fontWeight = "bolder";
    finishText.style.textAlign = "center";
    finishText.style.fontSize = "50px"
    finishText.textContent = "All Done!"

    scoreText.style.textAlign = "center";
    scoreText.style.fontSize = "30px";
    scoreText.textContent = "Your final score is " + score;
    document.body.appendChild(finishText);
    document.body.appendChild(scoreText);

    highscoreInput.setAttribute("type", "text");
    highscoreInput.setAttribute("id", "hs");
    highscoreInput.setAttribute("name", "hs");
    highscoreInput.setAttribute("placeholder", "enter initials")
    highscoreForm.style.textAlign = "center";
    highscoreForm.style.fontSize = "30px";
    highscoreForm.appendChild(highscoreInput);
    document.body.appendChild(highscoreForm);

    highscoreSubmit.setAttribute("type", "submit");
    highscoreSubmit.setAttribute("value", "Submit");
    highscoreSubmit.style.textAlign = "center";
    highscoreSubmit.style.marginLeft = "auto";
    highscoreSubmit.style.marginRight = "auto";
    highscoreSubmit.style.marginBottom = "20px";
    highscoreSubmit.style.display = "block";
    highscoreSubmit.addEventListener("click", validateUser);
    highscoreSubmit.addEventListener("click", saveHighScore);
    highscoreSubmit.addEventListener("click", goBackToMain);
    document.body.appendChild(highscoreSubmit);
}

// button on end screen that allows user to go back to the main page
function goBackToMain(){
    backButton.setAttribute("type", "button");
    backButton.setAttribute("value", "GO BACK");
    backButton.setAttribute("class", "start-button");
    backButton.addEventListener("click", showMainPage);
    document.body.appendChild(backButton);
}

// checks to see if user input isnt empty for highscore
function validateUser(){
    var userInitials = highscoreInput.value;

    if (userInitials == ""){
        alert("name must be filled");
        validated = false;
    } else {
        validated = true;
    }
}

// if the input isnt empty, the highscore will be saved to local storage
function saveHighScore(){
    var userInitials = highscoreInput.value;

    if (validated){
        
        userScores[userInitials] = score;
        localStorage.setItem("highscores", JSON.stringify(userScores));
    }
    
}

// when start button is pressed get rid of these elements
function detachElements() {  
    
    startEl.style.display = "none";
    titleEl.style.display = "none";
    subEl.style.display = "none";
}


// timer function to count down 60 seconds when the user presses start
function setTime(){
    var timerInterval = setInterval(function() {
        if (secondsLeft <= 0 || currentQuestion > 5){
            clearInterval(timerInterval);
            showEndScreen();
        }
        secondsLeft--;
        timeEl.textContent = "Time:  " + secondsLeft;

        
    }, 1000);
}

// function to start the quiz and display the correct question. if at the end, the end screen function is called
function startQuiz(){
    console.log(currentQuestion);
    if (currentQuestion === 0){
        displayQuestion(questions.question1, options.question1, answers.answer1);
        currentQuestion = 1;
    } else if (currentQuestion === 1){
        displayQuestion(questions.question2, options.question2, answers.answer2);
        currentQuestion = 2;
    } else if (currentQuestion === 2){
        displayQuestion(questions.question3, options.question3, answers.answer3);
        currentQuestion = 3;
    } else if (currentQuestion === 3){
        displayQuestion(questions.question4, options.question4, answers.answer4);
        currentQuestion = 4;
    } else if (currentQuestion === 4){
        displayQuestion(questions.question5, options.question5, answers.answer5);
        currentQuestion = 5;
    } else {
        currentQuestion = 6;
        showEndScreen();
    }
    
}

// this function displays the correct question as well as the options for the user to select
function displayQuestion(questions, options, answers){
    question.style.textAlign = "center";
    question.style.fontSize = "50px";
    question.textContent = questions;
    document.body.appendChild(question);

    var list = document.querySelectorAll("#options-list li");
    for (var i=0; liEl = list[i]; i++){
        liEl.parentNode.removeChild(liEl);
    }

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

// once an option is selected by the user this function checks if that option is correct or not displays that information and then moves to the next question
function checkAnswer(event){
    userAnswer = event.currentTarget.userAnswer;
    correctAnswer = event.currentTarget.correctAnswer;

    if (userAnswer !== correctAnswer){
        secondsLeft -= 10;
        
        correctOrIncorrectText.textContent = "Incorrect!";
        document.body.appendChild(correctOrIncorrectText);
        startQuiz();
    } else {
        
        correctOrIncorrectText.textContent = "Correct!";
        document.body.appendChild(correctOrIncorrectText);
        startQuiz();
    }
}

// this code is executed if the user is on the main page that starts up the quiz
if (document.URL.includes("index.html") || document.URL.includes("https://kitdhing.github.io/practice-quiz-site/")){
    optionsList.setAttribute("id", "options-list");
    correctOrIncorrectText.setAttribute("id", "bottom");
    startEl.addEventListener("click", setTime);
    startEl.addEventListener("click", detachElements);
    startEl.addEventListener("click", startQuiz);
}

// this code is executed if the user is on the highscores page which lists the users and their scores from local storage.
if (document.URL.includes("highscores.html")){
    pageMoveEl.setAttribute("id", "movePageButtons")
    pageMoveEl.setAttribute("href", "index.html");
    pageMoveEl.textContent = "Go Back";
    document.body.appendChild(pageMoveEl);


    highscoreText.style.textAlign = "center";
    highscoreText.textContent = "High Scores"
    // highscoreText.style.float = "left";
    highscoreText.style.paddingBottom = "20px"
    document.body.appendChild(highscoreText);

    var highscoreObject = window.localStorage.getItem("highscores");
    highscoreObject = JSON.parse(highscoreObject);

    for (var key in highscoreObject){
        if (highscoreObject.hasOwnProperty(key)){
            console.log("hello")
            var highscoreLi = document.createElement("li");
            highscoreLi.style.textAlign = "center";
            highscoreLi.style.fontSize = "30px";
            highscoreLi.style.paddingRight = "50px";
            highscoreLi.textContent = key + ": " + highscoreObject[key];
            highscoreList.appendChild(highscoreLi);
        }
    }
    highscoreList.style.textAlign = "center";
    highscoreList.style.listStyle = "none";
    document.body.appendChild(highscoreList)
}

