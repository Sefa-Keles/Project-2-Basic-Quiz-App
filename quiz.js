
//Question Constructor

let Question = function(text, options, answer){ // Buradaki answer soru nesnesinden gelen answer. Benim sectigim cevap olan answer degil. O guess metodunun icerisinde
    this.text = text;
    this.options = options;
    this.answer = answer;
}

Question.prototype.checkAnswer = function(answer){
     return this.answer === answer;       
}

//Quiz Constructor

function Quiz(questions){ // diziler gelecek
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0; // Gelen soru dizisini baslatmak icin kullanacagim sayac. Sorunun hangi soru oldugunu ayarlayacak.
}

Quiz.prototype.getQuestion = function(){ // Index numarasina gore sorulari getirecek fonksiyondur
    let nextQuestion = this.questions[this.questionIndex];
    //console.log("getQuestion :",nextQuestion)
    return nextQuestion;
    
}

Quiz.prototype.isFinish = function(){
    return this.questions.length === this.questionIndex;
}

Quiz.prototype.guess = function (answer){ // Burada yaptigim sey quize sectigim cevabimi gondermem gerekiyor. Bu yolladigim cevabin sonucunda ne olacagini ayarliyorum.
    let myQuestion = this.getQuestion();

    if(myQuestion.checkAnswer(answer)){
        this.score++;
        console.log("Dogru cevap")
    }

    this.questionIndex++;
    //console.log(myQuestion)
    
}

//Yani kisacasi Constructorlari olustur. Soruyu goster. Cevabimi al ve bu cevaba gore gereken islemleri yap. Quiz bittimi sorgula...

let q1 =  new Question("How many degrees are the interior angles of the triangle?", ["90", "180", "270", "360"], "180");
let q2 =  new Question("0,1,1,2,3,5,8,13,21,x   What number could x be?", ["29", "32", "34", "43"], "34");
let q3 =  new Question("24-4x3/(8+4) = ?", ["0", "5", "8", "23"], "23");

var questions = [q1, q2, q3];

// Start Quiz

let quiz = new Quiz(questions);

function loadQuestion(){
    if(quiz.isFinish()){
        showScore();
    }else{
        let quizQuestion = quiz.getQuestion();
        let quizOptions = quizQuestion.options;
        //console.log(quizOptions)
        document.querySelector("#question").textContent = quizQuestion.text; //Soru elemente yuklendi.

        for(let i=0; i<quizOptions.length; i++){
            let optionElement = document.querySelector("#option"+i);
            optionElement.innerText = quizOptions[i];   
            getSelection("btn"+i, quizOptions[i]); //Bu fonksiyon ile for'dan donen butun butonlari ve secimleri disaridaki fonksiyona parametre olarak yollayacagim.
        }

        showProgress();
    }
}



loadQuestion();

// Buttonlarin hepsi array olarak burda duruyor. button degiskenine onclick atadigimda otomatik olarak arrayin tumune onclick atanacak ve
//otomatik olarak hangisi tiklanirsa onun onclick ozelligi tetiklenecegi icin parametre olarak o quess metoduna gonderilecek.
function getSelection(id, option){
    let button = document.getElementById(id); 
    console.log(button)
    button.onclick = function(){
        quiz.guess(option);
        loadQuestion();
    };
};

function showScore(){
    let html  = `<h2>Score</h2><h4>${quiz.score}</h4>`;
    document.querySelector(".card-body").innerHTML = html;
};

function showProgress(){
    let total = quiz.questions.length;
    let questionNumber = quiz.questionIndex+1;
    document.querySelector("#progress").innerHTML =  "Question "+ questionNumber + " of " + total;
};







//console.log(quiz.isFinish());



