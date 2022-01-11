import React from 'react';
import $ from 'jquery';

function AnswerButton(props) {

    function handleClick(event) {
        if(props.isCorrect) {
            $('#' + props.id).addClass('button-correct');

            setTimeout(function (){
                $('.button').removeClass('button-correct button-false');
                props.updateScore();
                props.nextQuestion();
                          
              }, 1000); // How long you want the delay to be, measured in milliseconds.
        } else {
            $('#' + props.id).addClass('button-false');
        }
    }

    return (
        <div className="button" onClick={handleClick} id={props.id}>
            <p className="answer-choice">{props.answer}</p>
        </div>
    )
}

export default AnswerButton;