let score = 0;
let questionNumber = 1;
let choosenAnswer;

function selectedAnswer() {
    $('.answerButton').on('click', event => {
        choosenAnswer = ($(event.target).attr('value'));
    })
}


function ontoNextQuestion() {
    $('#nextQuestion').on('click', event => {
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

function checkselectedAnswer() {
    let result = false;
    $('.answerButton').each((index, element) => {
        if (element.checked === true) result = true;
    });
    // }
    return result;
}

function submitQuestion() {
    //if all input attr checked = false(means none are selected) then do not continue to the submit click event alert to select and answer  

    $('#submitAnswer').on('click', event => {
        if (checkselectedAnswer()) {
            let index = questionNumber - 1;
            console.log(choosenAnswer);
            console.log(STORE[index].correctAnswer);
            if (choosenAnswer === STORE[index].correctAnswer) {
                score++;
                $('#answerInfo').html(`<div class="displayAnswer" id="answerInfo">You are <span id="textDecRight">correct</span>. ${STORE[index].answerFact}</div>`)
            } else {
                $('#answerInfo').html(`<div class="displayAnswer" id="answerInfo"> I'm sorry, that was <span id="textDecWrong">incorrect</span>. ${STORE[index].answerFact}</div>`);
            }
            $('#answerInfoImg').attr('src', STORE[index].icon.src).attr('alt', STORE[index].icon.alt).addClass('factImg');
            updateCurrentQuestionCount();
            $('#QandAForm').hide();
            $('#correctAnswer').show();
        } else {
            alert('You must select an answer');

        }
    })
}

function displayQuestion() {
    $('.answerButton').each((index, element) => { element.checked = false; });
    let index = questionNumber - 1;
    $('#question').text(STORE[index].question);
    for (let i = 0; i < (STORE.length - 1); i++) {
        $(`#option${i}`).val(STORE[index].answers[i]);
    }
    for (let i = 0; i < (STORE.length - 1); i++) {
        $(`#selected${i}`).text(STORE[index].answers[i]);
    }
}

function updateCurrentQuestionCount() {
    $('#currentQuestion').text(questionNumber);
    $('#currentScore').text(score);
    $('#finalScore').html(`<div id="finalScoreCount">Hope you enjoyed this Anatomy Quiz, and learned a lot!!<br>You scored <span id="finalDec">${score}</span> points.<br> Click the skeleton to begin again.</div>`);
    $('#totalQuestions').text(STORE.length);
}


function createQuiz() {
    updateCurrentQuestionCount();
    displayQuestion();
    submitQuestion();
    ontoNextQuestion();
    selectedAnswer();

}

$(createQuiz);