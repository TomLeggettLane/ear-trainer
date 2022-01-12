import React, {useState} from 'react';
import AnswerButton from './AnswerButton';
import SettingsMenu from './SettingsMenu';
import {Howl, Howler} from 'howler';
import $ from 'jquery';

function Game() {
    const [answerSet, setAnswerSet] = useState(["minor 2nd", "major 2nd", "minor 3rd", "major 3rd", 
                                                "perfect 4th", "tritone", "perfect 5th", "minor 6th",
                                                "major 6th", "minor 7th", "major 7th"]);

    const [currentInterval, setCurrentInterval] = useState("minor 2nd");
    const [score, setScore] = useState(0);
    const [answerOptions, setAnswerOptions] = useState([
        {answerText: answerSet[0], isCorrect: true},
        {answerText: answerSet[1], isCorrect: false},
        {answerText: answerSet[2], isCorrect: false},
        {answerText: answerSet[3], isCorrect: false},
    ]);

    const [currentGuess, setCurrentGuess] = useState(0);

    const keys = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
    const [key, setKey] = useState(keys[Math.floor(Math.random() * 12)]);

    const [playbackRepeats, setPlaybackRepeats] = useState([2]);
    const [guessesAllowed, setGuessesAllowed] = useState([3]);
    const [playbackSpeed, setPlaybackSpeed] = useState([1]);

    function handleSettingsChange(setting, newValue) {
        console.log(setting, newValue);
        switch (setting) {
            case "playbackRepeats":
                setPlaybackRepeats(newValue);
                break;
            case "guessesAllowed":
                setGuessesAllowed(newValue);
                break;
            case "playbackSpeed":
                setPlaybackSpeed(newValue);
                break;   
            case "answerSet":
                setAnswerSet(newValue);
                console.log(answerSet);
                break
        }
        console.log(answerSet);
    }

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
        $('#replayButton').prop('disabled', false);
        setCurrentGuess(0);
        shuffleArray(answerSet);
        setCurrentInterval(answerSet[0].replace(" ", "-"));
        var questions = [
            {answerText: answerSet[0], isCorrect: true},
            {answerText: answerSet[1], isCorrect: false},
            {answerText: answerSet[2], isCorrect: false},
            {answerText: answerSet[3], isCorrect: false},
        ]
        shuffleArray(questions)
        setAnswerOptions(questions);
        setKey(keys[Math.floor(Math.random() * 12)]);
    }
    
    function playQuestionSound() {
        console.log(key);
        console.log(currentInterval);

        const sfx = {
            sound: new Howl ({
                src: ["/sounds/intervals/" + currentInterval + ".mp3"],
                autoplay: true,
                volume: 1.0,
                loop: false,
                html5:true,
                rate: playbackSpeed,
                sprite: {
                    C : [0, 1900],
                    Db : [2000, 1900],
                    D : [4000, 1900],
                    Eb : [6000, 1900],
                    E : [8000, 1900],
                    F : [10000, 1900],
                    Gb : [12000, 1900],
                    G : [14000, 1900],
                    Ab : [16000, 1900],
                    A : [18000, 1900],
                    Bb : [20000, 1900],
                    B : [22000, 1900],
                }
            })
        }

        sfx.sound.play(key);
        console.log("audio played");
        setCurrentGuess(currentGuess+1);
    
        if(currentGuess >= guessesAllowed) {
            $('#replayButton').prop('disabled', true);
        }
    }

    
    function updateScore(correct) {
        if(correct) setScore(score + 1);
    }

    function incrementGuessCount() {
        setCurrentGuess(currentGuess+1);
    }
    
    return(
        <div className="container" id="game">
            <div className="container" id="game-title">
                <h1>Interval Training</h1>
            </div>
            <SettingsMenu 
                onChange={handleSettingsChange}
                playbackRepeats = {playbackRepeats}
                playbackSpeed = {playbackSpeed}
                guessesAllowed={guessesAllowed}
                answerSet={answerSet}
            />
            <div>
            <button id="replayButton" onClick={playQuestionSound}>👂🏻</button>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <AnswerButton
                        answer={answerOptions[0].answerText}
                        isCorrect={answerOptions[0].isCorrect}
                        id="answerButton-0"
                        nextQuestion={nextQuestion}
                        updateScore={updateScore}
                        currentGuess={currentGuess}
                        incrementGuessCount={incrementGuessCount}
                        guessesAllowed={guessesAllowed}
                    />
                    <AnswerButton
                        answer={answerOptions[1].answerText}
                        isCorrect={answerOptions[1].isCorrect}
                        id="answerButton-1"
                        nextQuestion={nextQuestion}
                        updateScore={updateScore}
                        currentGuess={currentGuess}
                        incrementGuessCount={incrementGuessCount}
                        guessesAllowed={guessesAllowed}
                    />
                </div>
                <div className="col-md-6">
                    <AnswerButton
                        answer={answerOptions[2].answerText}
                        isCorrect={answerOptions[2].isCorrect}
                        id="answerButton-2"
                        nextQuestion={nextQuestion}
                        updateScore={updateScore}
                        currentGuess={currentGuess}
                        incrementGuessCount={incrementGuessCount}
                        guessesAllowed={guessesAllowed}
                    />
                    <AnswerButton
                        answer={answerOptions[3].answerText}
                        isCorrect={answerOptions[3].isCorrect}
                        id="answerButton-3"
                        nextQuestion={nextQuestion}
                        updateScore={updateScore}
                        currentGuess={currentGuess}
                        incrementGuessCount={incrementGuessCount}
                        guessesAllowed={guessesAllowed}
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