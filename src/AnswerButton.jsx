import React from 'react';
import $ from 'jquery';

function AnswerButton(props) {

    function handleClick(event) {
        console.log(props.currentGuess, props.guessesAllowed);
        if(!props.isCorrect) {
            $('#' + props.id).addClass('button-false');
            props.incrementGuessCount();
        }
        else {
            $('#' + props.id).addClass('button-correct');
        }
        if(props.isCorrect || props.currentGuess + 1 >= props.guessesAllowed) {
            setTimeout(function (){
                $('.button').removeClass('button-correct button-false');
                props.updateScore(props.isCorrect);
                props.nextQuestion();
              }, 1000); // How long you want the delay to be, measured in milliseconds.
        }
    }

    return (
        <div className="button" onClick={handleClick} id={props.id}>
            <p className="answer-choice">{props.answer}</p>
        </div>
    )
}

export default AnswerButton;