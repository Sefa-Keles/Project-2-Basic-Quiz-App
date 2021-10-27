
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
        let  infoHtml= `<br><div class="alert alert-warning" role="alert">${this.comment}</div>`
        document.getElementById("questionInfo").innerHTML = infoHtml;
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
let loadQuestion = () =>{
    let nextButton = document.getElementById("btnNext");
    let previousButton = document.getElementById("btnPrevious");
    document.getElementById("btnAgain").style.display= "none";
    document.querySelector("#buttons").style.display = "block";
    if(quiz.isFinish()){
        showScore(previousButton, nextButton);
    }else{  
        let quizQuestion = quiz.getQuestion();
        let quizOptions = quizQuestion.options;
        document.querySelector("#question").innerText = quizQuestion.text;
        for(let i in quizOptions){
            let optionElement = document.querySelector("#option"+i);
            let parentElements = optionElement.parentElement;
            optionElement.innerText = quizOptions[i]; 
            getSelection("btn"+i, optionElement); 
            pagingQuestion(previousButton, nextButton, parentElements);           
        }
        showProgress();
    }  
}

let getSelection = (...selectionElements) => {
    let button = document.getElementById(selectionElements[0]);
    button.onclick = function(){ 
        quiz.guess(selectionElements[1]);
    };
};

let pagingQuestion = (...pagingElements) => {
    document.getElementById("questionInfo").innerHTML ="";
    pagingElements[2].setAttribute("class", "btn btn-primary");
    pagingElements[2].removeAttribute("disabled");
    if(quiz.questionIndex !== 0){
        pagingElements[0].style.display = "block";
        pagingElements[0].disabled = false;
        pagingElements[0].onclick = () => {
            quiz.questionIndex--;
            loadQuestion();
        }
    } else{
        pagingElements[0].style.display = "block";
        pagingElements[0].disabled = true;
        pagingElements[1].style.display ="block";
        pagingElements[1].onclick = () => {
            quiz.questionIndex++;
            loadQuestion();
        };
    }

}

let showScore = (...pagingButtons) => {
    for(let i in pagingButtons){
        pagingButtons[i].style.display = "none";
    };
    document.querySelector("#buttons").style.display = "none";
    let html  = `<h3>Total Score: ${quiz.score}</h3>`;
    document.querySelector("#question").innerHTML = html;
    document.getElementById("questionInfo").innerHTML = "";
    let btnAgain = document.getElementById("btnAgain");
    btnAgain.style.display = "block";
    btnAgain.onclick = () => {
        btnAgain.style.display = "none";
        quiz.questionIndex = 0;
        questions = questions.sort(()=> Math.random()-0.5);
        loadQuestion();
    };
};

let showProgress = () => {
    let total = quiz.questions.length;
    let questionNumber = quiz.questionIndex+1;
    document.querySelector("#progress").innerText =  "Question "+ questionNumber + " of " + total;
};

loadQuestion();



