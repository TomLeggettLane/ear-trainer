import React from 'react';
import $ from 'jquery';

function AnswerButton(props) {
    const answerText = ['Perfect Unison', 'Minor 2nd', 'Major 2nd', 'Minor 3rd',
                        'Major 3rd', 'Perfect 4th', 'Tritone', 'Perfect 5th', 
                        'Minor 6th', 'Major 6th', 'Minor 7th', 'Major 7th',
                        'Perfect Octave', 'Minor 9th', 'Major 9th', 'Minor 3rd (8va)',
                        'Major 3rd (8va)', 'Perfect 11th', '#11', 'Perfect 5th (8va)',
                        'Minor 13th', 'Major 13th', 'Minor 7th (8va)', 'Major 7th (8va)']


    function handleClick(event) {
        props.playGuessSound(props.isCorrect);
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
            <p className="answer-choice">{answerText[props.answerIndex]}</p>
        </div>
    )
}

export default AnswerButton;