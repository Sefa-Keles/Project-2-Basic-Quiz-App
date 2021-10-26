
//QUESTION CONSTRUCTOR
let Question = function(text, options, answer,comment){
    this.text = text;
    this.options = options;
    this.answer = answer;
    this.comment = comment;
}

Question.prototype.checkAnswer = function(selectedElement){
    let parent = selectedElement.parentNode;
    if(this.answer === selectedElement.innerText){
        $(parent).attr("class", "btn btn-success");
        $(parent).siblings().attr ("disabled", "disabled");
        return true;
    }else {
        $(parent).attr("class", "btn btn-danger");
        $(parent).siblings().attr ("disabled", "disabled");
        let  infoHtml= `<br><p>${this.comment}</p>`
        document.getElementById("solutionInfo").innerHTML = infoHtml;
    }  
}

//QUIZ CONSTRUCTOR
function Quiz(questions){
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0; 
}

Quiz.prototype.getQuestion = function(){ 
    let nextQuestion = this.questions[this.questionIndex];
    return nextQuestion;
    
}

Quiz.prototype.isFinish = function(){
    return this.questions.length === this.questionIndex
        
    
}

Quiz.prototype.guess = function (selectedElement){ 
    let myQuestion = this.getQuestion();
    if(myQuestion.checkAnswer(selectedElement)){
        this.score++;
    }
}

let q1 = new Question("1 What is the best programming language", ["php", "C#", "JS", "Phyton"], "C#","C# is a Microsoft product and Microsoft products are the most used products in the world.");
let q2 = new Question("2 What is the most popular programming language", ["php", "C#", "JS", "Phyton"], "JS", "The most up-to-date technologies on web pages are produced based on Javascript.");
let q3 = new Question("3 What is the best modern programming language", ["php", "C#", "JS", "Phyton"], "Phyton", "The latest technology used in artificial intelligence programming is Python");

let questions = [q1, q2, q3];
let quiz = new Quiz(questions);

//LOAD ELEMENTS TO HTML
function loadQuestion(){
    let nextButton = document.getElementById("btnNext");
    let previousButton = document.getElementById("btnPrevious");
    if(quiz.isFinish()){
        showScore(previousButton, nextButton);
    }else{  
        let quizQuestion = quiz.getQuestion();
        let quizOptions = quizQuestion.options;
        document.querySelector("#question").innerText = quizQuestion.text;
        for(let i=0; i<quizOptions.length; i++){
            let optionElement = document.querySelector("#option"+i);
            let parentElements = optionElement.parentElement;
            optionElement.innerText = quizOptions[i];   
            getSelection("btn"+i, optionElement); 
            previousQuestion(previousButton, parentElements);
            nextQuestion(nextButton, parentElements);
        }
        showProgress();
    }  
}

function getSelection(id, optionElement){
    let button = document.getElementById(id);
    button.onclick = function(){ 
        quiz.guess(optionElement);
    };
};

function previousQuestion(btn, btnOptions){
    document.getElementById("solutionInfo").innerHTML ="";
    btnOptions.setAttribute("class", "btn btn-primary");
    btnOptions.removeAttribute("disabled");
    if(quiz.questionIndex !== 0){
        btn.style.display = "block";
        btn.onclick = function(){
            quiz.questionIndex--;
            loadQuestion();
        }
    }else {
        btn.style.display = "none";
    }

}


function nextQuestion(btnNext,btnOptions){
    document.getElementById("solutionInfo").innerHTML ="";
    btnOptions.setAttribute("class", "btn btn-primary");
    btnOptions.removeAttribute("disabled");
    if(quiz.questionIndex == 0){
        btnNext.style.display ="block";
        btnNext.onclick = function(){
            quiz.questionIndex++;
            loadQuestion();
        };
    }
    
};

function showScore(...buttons){
    for(let i=0; i<buttons.length; i++){
        buttons[i].style.display = "none";
    };
    let html  = `<h2>Total Score: ${quiz.score}</h2>`;
    document.querySelector("#question").innerHTML = html;
    let againButton = "<button id ='btnAgain' class ='btn btn-secondary'>Start Again</button>"
    document.querySelector("#startAgain").innerHTML=againButton;
    let btnAgain = document.getElementById("btnAgain");
    btnAgain.onclick = function(){
        btnAgain.style.display = "none";
        quiz.questionIndex = 0;
        questions = questions.sort(()=> Math.random()-0.5);
        loadQuestion();
    };
};

function showProgress(){
    let total = quiz.questions.length;
    let questionNumber = quiz.questionIndex+1;
    document.querySelector("#progress").innerText =  "Question "+ questionNumber + " of " + total;
};

loadQuestion();



