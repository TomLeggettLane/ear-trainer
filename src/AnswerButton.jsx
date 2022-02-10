import React, { useEffect, useCallback } from 'react';
import $ from 'jquery';

function AnswerButton(props) {
    const handleKeyPress = useCallback((event) => {
        const key = event.key;
        if (key === '1' || key === '2' || key ===  '3' || key === '4') {   
            $('#answerButton-' + (key - 1)).addClass('button-false');
        }
        }, 
    []);

    useEffect(() => {
        // attach the event listener
        document.addEventListener('keydown', handleKeyPress);

        // remove the event listener
        return () => {
        document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);


    function handleClick() {
        if(!props.isCorrect) {
            $('#' + props.id).addClass('button-false disabled')
            props.incrementGuessCount();
        }
        else {
            $('#' + props.id).addClass('button-correct');
        }
        if(props.isCorrect || props.currentGuess + 1 >= props.guessesAllowed) {
            props.playGuessSound(props.isCorrect);
            $(".answer-button").addClass("disabled");
            setTimeout(function (){
                $('.answer-button').removeClass('button-correct button-false disabled');
                props.updateScore(props.isCorrect);
                props.nextQuestion();
              }, 1000); // How long you want the delay to be, measured in milliseconds.
        }
    }

    return (
        <div className="answer-button" onClick={handleClick} id={props.id} title="Minor Triad I-iii-V">
            <span>{props.hotkey}.</span><p className="answer-choice">{props.answerText}</p>
        </div>
    )
}

export default AnswerButton;