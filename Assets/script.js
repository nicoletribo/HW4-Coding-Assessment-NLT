//questions & answer choices
  var questions = [{
    question: "1. All are commonly used data types EXCEPT?",
    choices: ["numbers", "booleans", "strings", "alerts"],
    rightAnswer: "alerts"
}, {
    question: "2. Which language is used for styling web pages?",
    choices: ["HTML", "CSS", "JavaScript", "JQuery"],
    rightAnswer: "CSS"
}, {
	question: "3. Which of the following will result in a numbered list?",
    choices: ["ol", "dl", "ul", "li"],
    rightAnswer: "ol"
},{
	question: "4. Which of the following is NOT an example of a semantic element?",
    choices: ["header", "article", "nav", "div"],
    rightAnswer: "div"
},{
	question: "5. which of the following is NOT a falsy value?",
    choices: ["0", "1", "null", "undefined"],
    rightAnswer: "1"
}];

var currentQuestion = 0;
var rightAnswers = 0;
var quizComplete = false;
var answerChoice = [];
var timeLeft=0;

$(function () {
displayCurrentQuestion();
    $(".quizMessage").hide();
    $(".prevBtn").attr('disabled', 'disabled');

	$(".prevBtn").on("click", function () {		
        if (!quizComplete) {
			if(currentQuestion === 1) {
			  $(".prevBtn").attr('disabled', 'disabled');
			  currentQuestion--;
			}		
		} else {
			viewResults();		
		}
    });
    $(".nextBtn").on("click", function () {
        if (!quizComplete) {
            var val = $("input[type='radio']:checked").val();
            if (val == undefined) {
                $(".quizMessage").text("You must choose an answer!");
                $(".quizMessage").show();
            } 
			else {
                $(".quizMessage").hide();
				if (val === questions[currentQuestion].rightAnswer) {
					rightAnswers++;
				}
				answerChoice[currentQuestion] === val;
				
				currentQuestion++;
				if(currentQuestion >= 1) {
					  $('.prevBtn').prop("disabled", false);
				}
				if (currentQuestion < questions.length) {
					displayCurrentQuestion();	
				} 
				else {
					displayScore();
					quizOver = true;
				}
			}			
		} else { 
            quizComplete = false; $('#displayTime').html(timeLeft); answerChoice = [];
			$(".nextBtn").text("Next Question");
			$(".prevBtn").text("Previous Question");
			 $(".prevBtn").attr('disabled', 'disabled');
			resetQuiz();
			displayCurrentQuestion();
			hideScore();
		}
    });
});
	// timer
function countdown(){
timeLeft=60;
timeInterval = setInterval(function (){
		if (timeLeft > 0) {
			$('#displayTime').html("Time Left:");
			$('#timer').html(timeLeft)
			timeLeft --;
		} else {
			clearInterval(timeInterval);
			$(".prevBtn").text("View Answer");
			$(".nextBtn").text("Play Again?");
			displayScore();
			quizComplete = true;
		}       
},1000);
} 
	
// display questions and answer choices
function displayCurrentQuestion() {
	if(timeLeft === 60) { timeLeft === 60; countdown(); }
	if(currentQuestion == 5) { currentQuestion === 0;return false; }
    var question = questions[currentQuestion].question;
    var questionClass = $(".quizContainer > .question");
    var answerChoices = $(".quizContainer > .answerChoices");
    var numChoices = questions[currentQuestion].choices.length;
    $(questionClass).text(question);
    $(answerChoices).find("li").remove();
    var choice;
	
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
		
		if(answerChoice[currentQuestion] === i) {
			if(questions[currentQuestion].rightAnswer === i) {
				$('<li><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(answerChoices);
			} else {
				$('<li><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(answerChoices);
			}
		} else {
			if(questions[currentQuestion].rightAnswer === i) {
				$('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(answerChoices);
			} else {
				$('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(answerChoices);
			}
		}
    }
	
}

function displayScore(){
    $(".quizContainer > .result").text("You answered: " + rightAnswers + " correctly out of: " + questions.length);
    $(".quizContainer > .result").show();
}

function viewResults() {
    if(currentQuestion == 5) { currentQuestion === 0;return false; }
	currentQuestion++;	
}
countdown ();

function resetQuiz(){
    currentQuestion = 0;
    rightAnswers = 0;
    hideScore();
}
