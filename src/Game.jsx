import React, {useState} from 'react';
import AnswerButton from './AnswerButton';
import {Howl, Howler} from 'howler';

function Game() {
    const [score, setScore] = useState(0);

    const [answerOptions, setAnswerOptions] = useState([
        {answerText: "answer1", isCorrect: true},
        {answerText: "answer2", isCorrect: false},
        {answerText: "answer3", isCorrect: false},
        {answerText: "answer4", isCorrect: false},
    ]);


    function shuffleArray(array) {
        /* Randomize array in-place using Durstenfeld shuffle algorithm */
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    function nextQuestion() {
        var questions = [
            {answerText: "answer1", isCorrect: true},
            {answerText: "answer2", isCorrect: false},
            {answerText: "answer3", isCorrect: false},
            {answerText: "answer4", isCorrect: false},
        ]
        shuffleArray(questions)
        setAnswerOptions(questions);
    }
    
    function playQuestionSound() {
        const sfx = {
            sound: new Howl ({
                src: ["/sounds/intervals/minor-2nd/Gb5-G5.mp3"],
                autoplay: true,
                volume: 1.0,
                loop: false,
                html5:true
            })
        }

        sfx.sound.play();
        console.log("audio played");
    }
    
    function updateScore() {
        setScore(score + 1);
    }
    
    return(
        <div className="container" id="game">
            <div className="container" id="game-title">
                <h1>Interval Training</h1>
            </div>
            <div>
            <button onClick={playQuestionSound}>Play Sound plz work</button>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <AnswerButton
                        answer={answerOptions[0].answerText}
                        isCorrect={answerOptions[0].isCorrect}
                        id="answerButton-0"
                        nextQuestion={nextQuestion}
                        updateScore={updateScore}
                    />
                    <AnswerButton
                        answer={answerOptions[1].answerText}
                        isCorrect={answerOptions[1].isCorrect}
                        id="answerButton-1"
                        nextQuestion={nextQuestion}
                        updateScore={updateScore}
                    />
                </div>
                <div className="col-md-6">
                    <AnswerButton
                        answer={answerOptions[2].answerText}
                        isCorrect={answerOptions[2].isCorrect}
                        id="answerButton-2"
                        nextQuestion={nextQuestion}
                        updateScore={updateScore}
                    />
                    <AnswerButton
                        answer={answerOptions[3].answerText}
                        isCorrect={answerOptions[3].isCorrect}
                        id="answerButton-3"
                        nextQuestion={nextQuestion}
                        updateScore={updateScore}
                    />
                </div>
            </div>
            <div>
                <p>Score:</p>
                <h1>{score}</h1>
            </div>
        </div>
    )
}

export default Game;