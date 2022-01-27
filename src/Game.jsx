import React, {useState} from 'react';
import AnswerButton from './AnswerButton';
import SettingsMenu from './SettingsMenu';
import MusicPlayer from './MusicPlayer';
import Score from './Score'
import {Howl, Howler} from 'howler';
import $ from 'jquery';
import { Button , Collapse, Container} from 'react-bootstrap';


function Game() {
    const [answerSet, setAnswerSet] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);   
    const [answerBoxes, setAnswerBoxes] = useState(4);
    const [answerOptions, setAnswerOptions] = useState([
        {answerIndex: answerSet[4], isCorrect: true},
        {answerIndex: answerSet[1], isCorrect: false},
        {answerIndex: answerSet[2], isCorrect: false},
        {answerIndex: answerSet[3], isCorrect: false},
    ]);

    const [currentInterval, setCurrentInterval] = useState(4);
    const [currentGuess, setCurrentGuess] = useState(0);
    const [currentPlayback, setCurrentPlayback] = useState(0);
    const [playbackRepeats, setPlaybackRepeats] = useState(2);
    const [guessesAllowed, setGuessesAllowed] = useState(3);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);

    const [key, setKey] = useState(24 + Math.floor(Math.random() * 36));
    const [intervalDirection, setIntervalDirection] = useState('up');
    const [randomDirection, setRandomDirection] = useState(0);

    const [currentScore, setCurrentScore] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);

    const [settingsOpen, setSettingsOpen] = useState(true);
    const [soundSource, setSoundSource] = useState('./C3-B6.mp3')

    const sound = new Howl({
        src: [soundSource],
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

    function handleSettingsChange(setting, newValue, checkbox) {
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
            case "answerBoxes":
                if(answerSet.length >= newValue) {
                    setAnswerBoxes(newValue);
                } else {
                    alert("Not enough intervals selected for " + newValue + " answer boxes!");
                }
                break;   
            case "answerSet":
                const tempAnswerSet = [...answerSet];

                if(newValue === "first-octave" || newValue === "second-octave") {
                    if(newValue === "first-octave") {
                        for(let i = 0; i < 12; i++) {
                            const index = tempAnswerSet.indexOf(i);
                            if (index === -1 && checkbox) {
                                tempAnswerSet.push(i);
                            } else if(index > -1 && !checkbox) {
                                tempAnswerSet.splice(index, 1);   
                            }
                        }
                    } else if(newValue === "second-octave") {
                        for(let i = 12; i < 24; i++) {
                            const index = tempAnswerSet.indexOf(i);
                            if (index === -1 && checkbox) {
                                tempAnswerSet.push(i);
                            } else if(index > -1 && !checkbox) {
                                tempAnswerSet.splice(index, 1);   
                            }
                        }
                    }
                    newValue = tempAnswerSet;
                }
                setAnswerSet(newValue);
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

    function getNewQuestion() {
        const answers = [];

        if(answerSet.length === 0) {
            alert('No intervals selected!');
            answers.push({answerIndex: "Please select at least 2 intervals", isCorrect: false});
            return;
        } else if(answerSet.length === 1) {
            alert('Only 1 interval selected!');
            return;
        } else {
            console.log(Math.min(Math.floor(answerSet.length/2) * 2, answerBoxes));
            if(answerSet.length < answerBoxes) {
                setAnswerBoxes(Math.min(Math.floor(answerSet.length/2) * 2, answerBoxes));
            }
            for(let i=0; i < Math.min(Math.floor(answerSet.length/2) * 2, answerBoxes); i++) {
                answers.push({answerIndex: answerSet[i], isCorrect: false})
            }
            answers[0].isCorrect = true;
            shuffleArray(answers)
        }
        return answers;
    }

    function nextQuestion() {
        $('#replayButton').prop('disabled', false);
        setCurrentGuess(0);
        setCurrentPlayback(0);
        shuffleArray(answerSet);

        const newQuestion = getNewQuestion();
        const newInterval = answerSet[0];
        const newKey = 24 + Math.floor(Math.random() * 36);

        setAnswerOptions(newQuestion);
        setCurrentInterval(newInterval);
        setKey(newKey);
        setRandomDirection(Math.random());

        playQuestionSound(newKey, newInterval);
    }

    function playGuessSound(correct) {
        const guessSound = correct ? correctSound : incorrectSound;
        guessSound.play();
    }

    function playQuestionSound(newKey=key, newInterval=currentInterval) {
        const waitTime = 1800/playbackSpeed;
        setCurrentPlayback(currentPlayback+1);

        if(currentPlayback >= playbackRepeats) {
            $('#replayButton').prop('disabled', true);
        }

        const rootNote = newKey.toString();
        const secondNote = (newKey + newInterval).toString()

        switch(intervalDirection) {
            case 'up':
                sound.play(rootNote)
                setTimeout(function() {
                    sound.play(secondNote);
                  }, waitTime);
                break
            case 'down':
                sound.play(secondNote)
                setTimeout(function() {
                    sound.play(rootNote);
                  }, waitTime);
                break
            case 'random':
                if(randomDirection < 0.5) {
                    sound.play(rootNote);
                    setTimeout(function() {
                        sound.play(secondNote);
                      }, waitTime);
                } else {
                    sound.play(secondNote)
                    setTimeout(function() {
                        sound.play(rootNote);
                      }, waitTime);
                }
                break
            case 'unison':
                sound.play(rootNote);
                sound.play(secondNote);
                break;
        }
    }

    function resetStats() {
        setCurrentGuess(0);
        setCurrentPlayback(0);
        setCurrentScore(0);
        setTotalQuestions(0);
    }

    function updateScore(correct) {
        const colorClass = correct ? 'score-correct' : 'score-incorrect';
        if(correct) setCurrentScore(currentScore + 1);
        setTotalQuestions(totalQuestions+1);

        $('#current-score').addClass(colorClass);
        setTimeout(function (){
            $('#current-score').removeClass(colorClass);
            }, 1000);
        }

    function incrementGuessCount() {
        setCurrentGuess(currentGuess+1);
    }

    return(
        <div id="game">
            <div className="" id="game-title">
                <h1>Interval Training</h1>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <Score 
                        currentScore={currentScore}
                        totalQuestions={totalQuestions}
                    />
                </div>
                <div className="col-sm-4">
                    <div id='playback'>
                        <button id="replayButton" onClick={playQuestionSound}>👂🏻</button>
                        <MusicPlayer 
                            playQuestionSound={playQuestionSound}
                        />
                    </div>
                </div>
                <div className="col-sm-4 relative">
                    <Button 
                        id="reset-score-btn"
                        onClick={() => {
                            nextQuestion();
                            resetStats();
                            
                            }
                        }
                    ><i className="fas fa-redo"></i>
                    </Button>
                    <Button 
                        id="settings-toggle-btn"
                        onClick={() => setSettingsOpen(!settingsOpen)}
                        aria-controls="example-collapse-text"
                        aria-expanded={settingsOpen}
                    ><i className="fas fa-sliders-h"></i></Button>
                </div>
                    <Collapse in={settingsOpen}>
                        <div id="example-collapse-text">
                            <SettingsMenu
                                onChange={handleSettingsChange}
                                playbackRepeats = {playbackRepeats}
                                playbackSpeed = {playbackSpeed}
                                guessesAllowed={guessesAllowed}
                                answerSet={answerSet}
                                intervalDirection = {intervalDirection}
                                answerBoxes = {answerBoxes}
                            />
                        </div>
                    </Collapse>
            </div>
            <div className="answer-section">
                <div className="answer-boxes">
                    <div className="row">
                            {answerOptions.map((element, index) =>
                                <div key={index} className="col-md-6">
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
                </div>
            </div>
        </div>
    )
}

export default Game;