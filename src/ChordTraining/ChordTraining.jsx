import React, {useState, useEffect} from 'react';
import AnswerButton from '../AnswerButton';
import SettingsMenu from './SettingsMenu';
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

const chords = [
    // triads
        { chordName : "Minor triad", chordIntervals : [0, 3, 7], chordFamily : "Triad", difficulty: "easy"},
        { chordName : "Major triad", chordIntervals : [0, 4, 7], chordFamily : "Triad", difficulty: "easy" },
        { chordName : "Augmented triad", chordIntervals : [0, 4, 8], chordFamily : "Triad", difficulty: "easy" },
        { chordName : "Diminished triad", chordIntervals : [0, 3, 6], chordFamily : "Triad", difficulty: "easy" },
    //sus
        { chordName : "Sus2", chordIntervals : [0, 2, 7], chordFamily : "7th", difficulty: "medium"},
        { chordName : "Sus4", chordIntervals : [0, 5, 7], chordFamily : "7th", difficulty: "medium"},
    // 6th's
        { chordName : "Minor 6th", chordIntervals : [0, 3, 7, 9], chordFamily : "7th", difficulty: "medium"},
        { chordName : "Major 6th", chordIntervals : [0, 4, 7, 9], chordFamily : "7th", difficulty: "medium"},
    // 7th's
        { chordName : "Minor 7th", chordIntervals : [0, 3, 7, 10], chordFamily : "7th", difficulty: "medium"},
        { chordName : "Major 7th", chordIntervals : [0, 4, 7, 11], chordFamily : "7th", difficulty: "medium"},
        { chordName : "Dominant 7th", chordIntervals : [0, 4, 7, 10], chordFamily : "7th", difficulty: "medium"},
        { chordName : "Minor-Major 7th", chordIntervals : [0, 3, 7, 11], chordFamily : "7th", difficulty: "medium"},
        { chordName : "Augmented-major 7th", chordIntervals : [0, 4, 8, 11], chordFamily : "7th", difficulty: "hard" },
        { chordName : "Augmented 7th", chordIntervals : [0, 4, 8, 10], chordFamily : "7th", difficulty: "hard"},
        { chordName : "Half-diminished 7th", chordIntervals : [0, 3, 6, 10], chordFamily : "7th", difficulty: "medium" },
        { chordName : "Diminished 7th", chordIntervals : [0, 3, 6, 9], chordFamily : "7th", difficulty: "hard" },
        { chordName : "7th flat 5", chordIntervals : [0, 4, 6, 10], chordFamily : "7th", difficulty: "hard" },
    //9th's
        { chordName : "Minor 9th", chordIntervals : [0, 3, 7, 10, 14], chordFamily : "7th", difficulty: "medium"},
        { chordName : "Major 9th", chordIntervals : [0, 4, 7, 11, 14], chordFamily : "7th", difficulty: "medium"},
        { chordName : "Dominant 9th", chordIntervals : [0, 4, 7, 10, 14], chordFamily : "7th", difficulty: "medium"},
        { chordName : "Minor add9", chordIntervals : [0, 3, 7, 14], chordFamily : "7th", difficulty: "medium"},
        { chordName : "Major add9", chordIntervals : [0, 4, 7, 14], chordFamily : "7th", difficulty: "medium"},
        { chordName : "Minor 6/9", chordIntervals : [0, 3, 7, 9, 14], chordFamily : "7th", difficulty: "hard"},
        { chordName : "Major 6/9", chordIntervals : [0, 4, 7, 9, 14], chordFamily : "7th", difficulty: "hard"},
    //11th's
        { chordName : "11th", chordIntervals : [0, 4, 7, 10, 14, 17], chordFamily : "7th", difficulty: "hard"},
        { chordName : "Major 7th #11", chordIntervals : [0, 4, 7, 11, 18], chordFamily : "7th", difficulty: "hard"},
    //13th's
        { chordName : "Major 13th", chordIntervals : [0, 4, 7, 11, 14, 17, 21], chordFamily : "7th", difficulty: "hard"},
        { chordName : "Major 13th", chordIntervals : [0, 3, 7, 10, 14, 17, 21], chordFamily : "7th", difficulty: "hard"},
]

function ChordTraining() {
    const [answerSet, setAnswerSet] = useState(chords);   
    const [answerBoxes, setAnswerBoxes] = useState(4);
    const [answerOptions, setAnswerOptions] = useState([]);

    const [currentChord, setCurrentChord] = useState(chords[0]);
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
        // if(newValue === "first-octave" || newValue === "second-octave") {
        //     if(newValue === "first-octave") {
        //         for(let i = 0; i < 12; i++) {
        //             const index = tempAnswerSet.indexOf(i);
        //             if (index === -1 && checkbox) {
        //                 tempAnswerSet.push(i);
        //             } else if(index > -1 && !checkbox) {
        //                 tempAnswerSet.splice(index, 1);   
        //             }
        //         }
        //     } else {
        //         for(let i = 12; i < 24; i++) {
        //             const index = tempAnswerSet.indexOf(i);
        //             if (index === -1 && checkbox) {
        //                 tempAnswerSet.push(i);
        //             } else if(index > -1 && !checkbox) {
        //                 tempAnswerSet.splice(index, 1);   
        //             }
        //         }
        //     }
        //     newValue = tempAnswerSet;
        // } 
        return newValue;
    }

    function getNewQuestion(answerSet) {
        const answers = [];
        if(answerSet.length < answerBoxes) {
            setAnswerBoxes(Math.min(Math.floor(answerSet.length/2) * 2, answerBoxes));
        }
        for(let i=0; i < Math.min(Math.floor(answerSet.length/2) * 2, answerBoxes); i++) {
            answers.push({answerIndex: answerSet[i], isCorrect: false})
        }
        answers[0].isCorrect = true;
        return answers;
    }

    function getValidAnswerSet() {
        const tempAnswerSet = [chords.minorTriad, chords.majorTriad];  
        if(answerSet.length <= 1) {
            setAnswerSet([chords.minorTriad, chords.majorTriad]);
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
        setCurrentChord(newAnswerSet[0]);
        shuffleArray(newQuestion);
        setCurrentKey(36 + Math.floor(Math.random() * 24));
        setRandomDirection(Math.random());
        console.log(newAnswerSet[0].chordName)
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
                <h1>Chord Training</h1>
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
                            currentChord={currentChord}
                            currentKey={currentKey}
                            totalQuestions={totalQuestions}
                            playbackRepeats = {playbackRepeats}
                            chordOrInterval = "chord"
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
                    ><i className="fas fa-sliders-h"></i></Button>
                    <Button 
                        id="popup-btn"
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
            <div className="popup">
                <div className="popuptext" id="settings-pop">
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
            </div>
            <div className="answer-section">
                <div className="answer-boxes">
                    <div className="row">
                            {answerOptions.map((element, index) =>
                                <div key={index} className="col-md-6">
                                    <AnswerButton
                                        key={index}
                                        hotkey={index+1}
                                        answerText={element.answerIndex.chordName}
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
    

export default ChordTraining;