import React, {useState, useEffect} from 'react';
import AnswerButton from '../AnswerButton';
import SettingsMenuTest from './SettingsMenuTest';
import MusicPlayer, { resetPlaybacks } from '../MusicPlayer';
import Score from './Score'
import { Howl, Howler } from 'howler';
import $ from 'jquery';
import { Button , Collapse, Container} from 'react-bootstrap';


const correctSound = new Howl({
    src: ['./correct.mp3'],
    html5: true,
    volume: 0.2
})

const incorrectSound = new Howl({
    src: ['./incorrect.mp3'],
    html5: true,
    volume: 0.2
})

const intervals = [
    { intervalName: "Perfect Unison", semitones : 0, difficulty: "easy"},
    { intervalName: 'Minor 2nd', semitones : 1, difficulty: "medium"},
    { intervalName: 'Major 2nd', semitones : 2, difficulty: "easy"},
    { intervalName: 'Minor 3rd', semitones : 3, difficulty: "medium"},
    { intervalName: 'Major 3rd', semitones : 4, difficulty: "easy"},
    { intervalName: 'Perfect 4th', semitones : 5, difficulty: "easy"},
    { intervalName: 'Tritone', semitones : 6, difficulty: "medium"},
    { intervalName: 'Perfect 5th', semitones : 7, difficulty: "easy"},
    { intervalName: 'Minor 6th', semitones : 8, difficulty: "medium"},
    { intervalName: 'Major 6th', semitones : 9, difficulty: "easy"},
    { intervalName: 'Minor 7th', semitones : 10, difficulty: "medium"},
    { intervalName: 'Major 7th', semitones : 11, difficulty: "easy"},

    { intervalName: 'Perfect Octave', semitones : 12, difficulty: "medium"},
    { intervalName: 'Minor 9th', semitones : 13, difficulty: "hard"},
    { intervalName: 'Major 9th', semitones : 14, difficulty: "medium"},
    { intervalName: 'Minor 3rd (8va)', semitones : 15, difficulty: "hard"},
    { intervalName: 'Major 3rd (8va)', semitones : 16, difficulty: "hard"},
    { intervalName: 'Perfect 11th', semitones : 17, difficulty: "hard"},
    { intervalName: '#11', semitones : 18, difficulty: "hard"},
    { intervalName: 'Perfect 5th (8va)', semitones : 19, difficulty: "hard"},
    { intervalName: 'Minor 13th', semitones : 20, difficulty: "hard"},
    { intervalName: 'Major 13th', semitones : 21, difficulty: "hard"},
    { intervalName: 'Minor 7th (8va)', semitones : 22, difficulty: "hard"},
    { intervalName: 'Major 7th (8va)', semitones : 23, difficulty: "expert"},
]

function getDifficultyArrays() {
    var easyIntervals = [];
    var mediumIntervals = [];
    var hardIntervals= [];
    var expertIntervals = [];

    for(let i = 0; i < intervals.length; i++) {
        switch (intervals[i].difficulty) {
            case "easy":
                easyIntervals.push(i);
            case "medium": 
                mediumIntervals.push(i);
            case "hard":
                hardIntervals.push(i);
            case "expert":
                expertIntervals.push(i);
        }
    }
    return {easy: easyIntervals, medium: mediumIntervals, hard: hardIntervals, expert: expertIntervals}
}

const difficultyArrays = getDifficultyArrays();

function IntervalTraining() {
    const [answerSet, setAnswerSet] = useState([0,2,4,5,7,9,11]);   
    const [answerBoxes, setAnswerBoxes] = useState(4);
    const [answerOptions, setAnswerOptions] = useState([]);

    const [currentInterval, setCurrentInterval] = useState(4);
    const [currentGuess, setCurrentGuess] = useState(0);
    const [playbackRepeats, setPlaybackRepeats] = useState(2);
    const [guessesAllowed, setGuessesAllowed] = useState(3);
    const [playbackSpeed, setPlaybackSpeed] = useState(2);

    const [currentKey, setCurrentKey] = useState(36 + Math.floor(Math.random() * 24));
    const [intervalDirection, setIntervalDirection] = useState('up');
    const [randomDirection, setRandomDirection] = useState(0);

    const [currentScore, setCurrentScore] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);

    const [settingsOpen, setSettingsOpen] = useState(true);

    useEffect(() => {
        nextQuestion();
    }, []);

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
                    setAnswerBoxes(2);
                }
                break;   
            case "answerSet":
                setAnswerSet(getNewAnswerSet([...answerSet], newValue, checkbox));
                break;
            case "intervalDirection":
                setIntervalDirection(newValue);
                break;
        }
    }

    function getNewAnswerSet(tempAnswerSet, newValue, checkbox) {
        if(newValue === "easy" || newValue === "medium" || newValue === "hard" || newValue === "expert") {
            switch (newValue) {
                case "easy":
                    return difficultyArrays.easy;
                case "medium":
                    return difficultyArrays.medium;
                case "hard":
                    return difficultyArrays.hard;
                case "expert":
                    return difficultyArrays.expert;
            }
        } else if(newValue === "first-octave" || newValue === "second-octave") {
            if(newValue === "first-octave") {
                for(let i = 0; i < 12; i++) {
                    const index = tempAnswerSet.indexOf(i);
                    if (index === -1 && checkbox) {
                        tempAnswerSet.push(i);
                    } else if(index > -1 && !checkbox) {
                        tempAnswerSet.splice(index, 1);   
                    }
                }
            } else {
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
        return newValue;
    }

    function getNewQuestion(answerSet) {
        const answers = [];
        if(answerSet.length < answerBoxes) {
            setAnswerBoxes(Math.min(Math.floor(answerSet.length/2) * 2, answerBoxes));
        }
        for(let i=0; i < Math.min(Math.floor(answerSet.length/2) * 2, answerBoxes); i++) {
            answers.push({answerIndex: intervals[answerSet[i]], isCorrect: false})
        }
        answers[0].isCorrect = true;
        return answers;
    }

    function getValidAnswerSet() {
        const tempAnswerSet = [0,2,4,5,7,9,11]
        if(answerSet.length <= 1) {
            setAnswerSet([0,2,4,5,7,9,11]);
            alert('Please select at least 2 intervals');
            return tempAnswerSet;
        } else {
            return answerSet;
        }
    }

    function nextQuestion() {
        $('#replayButton').prop('disabled', false);
        setCurrentGuess(0);
        const newAnswerSet = getValidAnswerSet();
        shuffleArray(newAnswerSet);
        const newQuestion = getNewQuestion(newAnswerSet);
        setAnswerOptions(newQuestion);
        setCurrentInterval(newAnswerSet[0]);
        shuffleArray(newQuestion);
        setCurrentKey(36 + Math.floor(Math.random() * 24));
        setRandomDirection(Math.random());
    }

    function playGuessSound(correct) {
        const guessSound = correct ? correctSound : incorrectSound;
        guessSound.play();
    }

    function resetStats() {
        resetPlaybacks();
        setCurrentGuess(0);
        setCurrentScore(0);
        setTotalQuestions(0);
        $("#circle-btn").removeClass("red");
        $('.answer-button').removeClass('button-correct button-false disabled');
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

    function makePopupVisible() {
        document.getElementById('settings-pop').classList.toggle("show");
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
                        <MusicPlayer 
                            intervalDirection={intervalDirection}
                            playbackSpeed={playbackSpeed}
                            randomDirection={randomDirection}
                            currentInterval={currentInterval}
                            currentKey={currentKey}
                            totalQuestions={totalQuestions}
                            playbackRepeats = {playbackRepeats}
                            chordOrInterval = "interval"
                        />
                    </div>
                </div>
                <div className="col-sm-4 relative">
                    <Button 
                        id="reset-score-btn"
                        onClick={() => {
                            resetStats();
                            nextQuestion();
                            }
                        }
                    ><i className="fas fa-redo"></i>
                    </Button>
                    <Button 
                        id="settings-toggle-btn"
                        onClick={makePopupVisible}
                    ><i className="fas fa-sliders-h"></i>
                    </Button>
                </div>
            </div>
            <div className="popup">
                <div className="popuptext" id="settings-pop">
                    <SettingsMenuTest
                        onChange={handleSettingsChange}
                        playbackRepeats = {playbackRepeats}
                        playbackSpeed = {playbackSpeed}
                        guessesAllowed={guessesAllowed}
                        answerSet={answerSet}
                        intervalDirection = {intervalDirection}
                        answerBoxes = {answerBoxes}
                    />
                </div>
            </div>
            <div className="answer-section">
                <div className="answer-boxes">
                    <div className="row">
                            {answerOptions.map((element, index) =>
                                <div key={index} className="col-md-6">
                                    <AnswerButton
                                        key={index}
                                        hotkey={index+1}
                                        answerText={element.answerIndex.intervalName}
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

function shuffleArray(array) {
    /* Randomize array in-place using Durstenfeld shuffle algorithm */
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
    

export default IntervalTraining;