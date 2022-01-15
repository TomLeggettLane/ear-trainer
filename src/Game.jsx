import React, {useState} from 'react';
import AnswerButton from './AnswerButton';
import SettingsMenu from './SettingsMenu';
import MusicPlayer from './MusicPlayer';
import {Howl, Howler} from 'howler';
import $ from 'jquery';
import { Button , Collapse } from 'react-bootstrap';


function Game() {
    const [answerSet, setAnswerSet] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

    const [currentInterval, setCurrentInterval] = useState(4);
    const [score, setScore] = useState(0);
    const [answerOptions, setAnswerOptions] = useState([
        {answerIndex: answerSet[4], isCorrect: true},
        {answerIndex: answerSet[1], isCorrect: false},
        {answerIndex: answerSet[2], isCorrect: false},
        {answerIndex: answerSet[3], isCorrect: false},
    ]);

    const [currentGuess, setCurrentGuess] = useState(0);
    const [key, setKey] = useState(24 + Math.floor(Math.random() * 36));
    console.log('key', key);

    const [currentPlayback, setCurrentPlayback] = useState(0);
    const [playbackRepeats, setPlaybackRepeats] = useState([2]);
    const [guessesAllowed, setGuessesAllowed] = useState([3]);
    const [playbackSpeed, setPlaybackSpeed] = useState([1]);
    const [intervalDirection, setIntervalDirection] = useState('up');
    const [randomDirection, setRandomDirection] = useState(0);

    const sound = new Howl({
        src: ['./C3-B6.mp3'],
        html5: true,
        rate: playbackSpeed,
        volume: 1.0,
        loop: false,
        onload() {
            soundEngine.init();
        },
        onloaderror(e, msg) {
            console.log('Error', e, msg);
        }
    });

    const correctSound = new Howl({
        src: ['./correct.mp3'],
        html5: true,
        volume: 0.3
    })

    const incorrectSound = new Howl({
        src: ['./incorrect.mp3'],
        html5: true,
        volume: 0.2
    })

    const soundEngine = {
        init() {
            const lengthOfNote = 2000;
            let timeIndex = 0;
            //24 - 71 is C3 - B6
            for(let i=24; i < 72; i++) {
                sound['_sprite'][i] = [timeIndex, lengthOfNote];
                timeIndex += lengthOfNote;
            }
        }
    }

    function handleSettingsChange(setting, newValue) {
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
                break;
            case "intervalDirection":
                setIntervalDirection(newValue);
                break;
        }
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
        setCurrentPlayback(0);
        shuffleArray(answerSet);
        setCurrentInterval(answerSet[0]);
        setKey(24 + Math.floor(Math.random() * 36));

        var questions = [
            {answerIndex: answerSet[0], isCorrect: true},
            {answerIndex: answerSet[1], isCorrect: false},
            {answerIndex: answerSet[2], isCorrect: false},
            {answerIndex: answerSet[3], isCorrect: false},
        ]

        shuffleArray(questions)
        setAnswerOptions(questions);
        setRandomDirection(Math.random());
    }

    function playGuessSound(correct) {
        if(correct) correctSound.play();
        else incorrectSound.play();
    }
    
    function playQuestionSound() {
        const waitTime = 1800/playbackSpeed;
        setCurrentPlayback(currentPlayback+1);

        if(currentPlayback >= playbackRepeats) {
            $('#replayButton').prop('disabled', true);
        }

        switch(intervalDirection) {
            case 'up':
                sound.play((key).toString())
                setTimeout(function() {
                    sound.play((key + currentInterval).toString());
                  }, waitTime);
                break
            case 'down':
                sound.play((key + currentInterval).toString())
                setTimeout(function() {
                    sound.play(key.toString());
                  }, waitTime);
                break
            case 'random':
                if(randomDirection < 0.5) {
                    sound.play(key.toString());
                    setTimeout(function() {
                        sound.play((key + currentInterval).toString());
                      }, waitTime);
                } else {
                    sound.play((key + currentInterval).toString())
                    setTimeout(function() {
                        sound.play(key.toString());
                      }, waitTime);
                }
                break
            case 'unison':
                sound.play(key.toString());
                sound.play((key + currentInterval).toString());
                break;
        }
    }

    function updateScore(correct) {
        if(correct) setScore(score + 1);
    }

    function incrementGuessCount() {
        setCurrentGuess(currentGuess+1);
    }
    
    const [settingsOpen, setSettingsOpen] = useState(false);

    return(
        <div className="container" id="game">
            <div className="container" id="game-title">
                <h1>Interval Training</h1>
            </div>
            <div id="settings-toggle-btn">
                <Button
                    onClick={() => setSettingsOpen(!settingsOpen)}
                    aria-controls="example-collapse-text"
                    aria-expanded={settingsOpen}
                ><i className="fas fa-sliders-h"></i> Settings</Button>

                <Collapse in={settingsOpen}>
                    <div id="example-collapse-text">
                        <SettingsMenu
                            onChange={handleSettingsChange}
                            playbackRepeats = {playbackRepeats}
                            playbackSpeed = {playbackSpeed}
                            guessesAllowed={guessesAllowed}
                            answerSet={answerSet}
                            intervalDirection = {intervalDirection}
                         />
                    </div>
                </Collapse>
             </div>

             <div>
            <button id="replayButton" onClick={playQuestionSound}>👂🏻</button>
            </div>

            <div className="row">
                    {answerOptions.map((element, index) =>
                        <div className="col-md-6">
                            <AnswerButton
                                key={index}
                                answerIndex={element.answerIndex}
                                isCorrect={element.isCorrect}
                                id={"answerButton-" + index}
                                nextQuestion={nextQuestion}
                                updateScore={updateScore}
                                currentGuess={currentGuess}
                                incrementGuessCount={incrementGuessCount}
                                guessesAllowed={guessesAllowed}
                                playGuessSound={playGuessSound}
                            />
                        </div>
                    )}
            </div>

            <div>
                <p>Score:</p>
                <h1>{score}</h1>
            </div>
        </div>
    )
}

export default Game;