let score = 0;
let questionNumber = 1;
let choosenAnswer;

function selectedAnswer() {
    $('.answerButton').on('click', event => {
        choosenAnswer = ($(event.target).attr('value'));
        console.log(choosenAnswer);
        //need to be able to choose and then do this on submit
    })
}


function ontoNextQuestion() {
    $('#nextQuestion').on('click', event => {
        //$('.answerButton').removeAttr('checked');
        questionNumber++;
        // questionNumber = Math.min(questionNumber, STORE.length);
        // //this is temporary. eventually end of questions go to final score. 
        if (questionNumber <= STORE.length) {
            updateCurrentQuestionCount();
            displayQuestion();
            $('#QandAForm').show();
            $('#correctAnswer').hide();
        } else {
            $('#finalScore').show();
            $('#correctAnswer').hide();
        }
    })
}

function submitQuestion() {
    $('#submitAnswer').on('click', event => {
        //$('.answerButton').removeAttr('checked');
        let index = questionNumber - 1;
        if (choosenAnswer === STORE[index].correctAnswer) {
            score++;
            $('#answerInfo').text(`You are correct. ${STORE[index].answerFact}`)
        } else {
            $('#answerInfo').text(`I'm sorry, that was incorrect. ${STORE[index].answerFact}`);
        }
        $('#answerInfoImg').attr('src', STORE[index].icon.src).attr('alt', STORE[index].icon.alt).addClass('factImg');
        updateCurrentQuestionCount();
        $('#QandAForm').hide();
        $('#correctAnswer').show();
    })
}

function displayQuestion() {
    $('.answerButton').each((index, element) => { element.checked = false; });
    let index = questionNumber - 1;
    $('#question').text(STORE[index].question);
    for (let i = 0; i < 4; i++) {
        $(`#option${i}`).val(STORE[index].answers[i]);
    }
    for (let i = 0; i < 4; i++) {
        $(`#selected${i}`).text(STORE[index].answers[i]);
    }
}

function updateCurrentQuestionCount() {
    $('#currentQuestion').text(questionNumber);
    $('#currentScore').text(score);
    $('#finalScore').html(`<div id="finalScoreCount">Hope you enjoyed this Anatomy Quiz, and learned a lot!!<br>You scored ${score} points.<br> Click the skeleton to begin again.</div>`);
    $('#totalQuestions').text(STORE.length);
}

function createQuiz() {
    updateCurrentQuestionCount();
    displayQuestion();
    submitQuestion();
    ontoNextQuestion();
    selectedAnswer();
    finalScoreHtml()
}
$(createQuiz);