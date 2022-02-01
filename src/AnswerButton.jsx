import React, { useEffect, useCallback } from 'react';
import $ from 'jquery';

function AnswerButton(props) {
    const answerText = ['Perfect Unison', 'Minor 2nd', 'Major 2nd', 'Minor 3rd',
                        'Major 3rd', 'Perfect 4th', 'Tritone', 'Perfect 5th', 
                        'Minor 6th', 'Major 6th', 'Minor 7th', 'Major 7th',
                        'Perfect Octave', 'Minor 9th', 'Major 9th', 'Minor 3rd (8va)',
                        'Major 3rd (8va)', 'Perfect 11th', '#11', 'Perfect 5th (8va)',
                        'Minor 13th', 'Major 13th', 'Minor 7th (8va)', 'Major 7th (8va)']
    

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
        console.log(props);
        console.log(props.currentGuess, props.guessesAllowed);
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
        <div className="answer-button" onClick={handleClick} id={props.id}>
            <span>{props.hotkey}.</span><p className="answer-choice">{answerText[props.answerIndex]}</p>
        </div>
    )
}

export default AnswerButton;