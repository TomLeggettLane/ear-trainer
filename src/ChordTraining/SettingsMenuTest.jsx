import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Checkbox from './Checkbox';

function SettingsMenuTest(props) {
    const [radioValue, setRadioValue] = useState('1');
    const [difficultyValue, setDifficultyValue] = useState('easy');

    const radios = [
        {name: 'Game Settings', value: '1'},
        {name: 'Included Chords', value: '2'},
        {name: 'Sound Settings', value: '3'},
    ]

    const difficulties = [
        {name: 'easy', value: '1', color: "outline-warning"},
        {name: 'medium', value: '2', color: "outline-success"},
        {name: 'hard', value: '3',  color: "outline-danger"},
        {name: 'expert', value: '4',  color: "outline-dark"},
    ]
    const settings = [
        <div id="game-settings">
            <ToggleButtonGroup className="settings-bar" size="sm" type="radio" name="playbackRepeats" value={props.playbackRepeats} onChange={(e) => props.onChange("playbackRepeats", e)}>
                <ToggleButton className="settings-label-button">Playback Repeats</ToggleButton>
                <ToggleButton id="repeats-btn-1" variant={props.playbackRepeats === 0 ? 'toggle-active': 'toggle'} value={0}>0</ToggleButton>
                <ToggleButton id="repeats-btn-2" variant={props.playbackRepeats === 1 ? 'toggle-active': 'toggle'} value={1}>1</ToggleButton>
                <ToggleButton id="repeats-btn-3" variant={props.playbackRepeats === 2 ? 'toggle-active': 'toggle'} value={2}>2</ToggleButton>
                <ToggleButton id="repeats-btn-4" variant={props.playbackRepeats === 3 ? 'toggle-active right': 'toggle right'} value={3}>∞</ToggleButton>
            </ToggleButtonGroup>
            <br />
            <ToggleButtonGroup className="settings-bar" size="sm" type="radio" name="playbackSpeed" value={props.playbackSpeed} onChange={(e) => props.onChange("playbackSpeed", e)}>
                <ToggleButton className="settings-label-button">Playback Speed</ToggleButton>
                <ToggleButton id="speed-btn-1" variant={props.playbackSpeed === 0 ? 'toggle-active': 'toggle'} value={0}>0.5x</ToggleButton>
                <ToggleButton id="speed-btn-2" variant={props.playbackSpeed === 1 ? 'toggle-active': 'toggle'} value={1}>0.75x</ToggleButton>
                <ToggleButton id="speed-btn-3" variant={props.playbackSpeed === 2 ? 'toggle-active': 'toggle'} value={2}>1x</ToggleButton>
                <ToggleButton id="speed-btn-4" variant={props.playbackSpeed === 3 ? 'toggle-active right': 'toggle right'} value={3}>2x</ToggleButton>
            </ToggleButtonGroup>
            <br />
            <ToggleButtonGroup className="settings-bar" size="sm" type="radio" name="guessesAllowed" value={props.guessesAllowed} onChange={(e) => props.onChange("guessesAllowed", e)}>
                <ToggleButton className="settings-label-button">Guesses Allowed</ToggleButton>
                <ToggleButton id="guesses-btn-1" variant={props.guessesAllowed === 1 ? 'toggle-active': 'toggle'} value={1}>1</ToggleButton>
                <ToggleButton id="guesses-btn-2" variant={props.guessesAllowed === 2 ? 'toggle-active': 'toggle'}  value={2}>2</ToggleButton>
                <ToggleButton id="guesses-btn-3" variant={props.guessesAllowed === 3 ? 'toggle-active': 'toggle'}  value={3}>3</ToggleButton>
                <ToggleButton id="guesses-btn-4" variant={props.guessesAllowed === 4 ? 'toggle-active right': 'toggle right'}  value={4}>4</ToggleButton>
            </ToggleButtonGroup>
            <br />
            <ToggleButtonGroup className="settings-bar" size="sm" type="radio" name="intervalDirection" value={props.intervalDirection} onChange={(e) => props.onChange("intervalDirection", e)}>
                <ToggleButton className="settings-label-button">Playback Direction</ToggleButton>
                <ToggleButton id="direction-btn-1" variant={props.intervalDirection === 'up' ? 'toggle-active': 'toggle'} value={'up'}>up</ToggleButton>
                <ToggleButton id="direction-btn-2" variant={props.intervalDirection === 'down' ? 'toggle-active': 'toggle'} value={'down'}>down</ToggleButton>
                <ToggleButton id="direction-btn-3" variant={props.intervalDirection === 'random' ? 'toggle-active': 'toggle'} value={'random'}>random</ToggleButton>
                <ToggleButton id="direction-btn-4" variant={props.intervalDirection === 'unison' ? 'toggle-active right': 'toggle right'} value={'unison'}>unison</ToggleButton>
            </ToggleButtonGroup>
            <br />
            <ToggleButtonGroup className="settings-bar" size="sm" type="radio" name="answerBoxes" value={props.answerBoxes} onChange={(e) => props.onChange("answerBoxes", e)}>
                <ToggleButton className="settings-label-button">Answer Boxes</ToggleButton>
                <ToggleButton id="answerBoxes-btn-1" variant={props.answerBoxes === 2 ? 'toggle-active': 'toggle'} value={2}>2</ToggleButton>
                <ToggleButton id="answerBoxes-btn-2" variant={props.answerBoxes === 4 ? 'toggle-active': 'toggle'} value={4}>4</ToggleButton>
                <ToggleButton id="answerBoxes-btn-3" variant={props.answerBoxes === 6 ? 'toggle-active': 'toggle'} value={6}>6</ToggleButton>
                <ToggleButton id="answerBoxes-btn-4" variant={props.answerBoxes === 8 ? 'toggle-active right': 'toggle right'} value={8}>8</ToggleButton>
            </ToggleButtonGroup>
        </div>,
        <div id="included-chord-settings">
            <div id="included-chord-btns">
                <ToggleButtonGroup size="sm" type="checkbox" className="settings-bar" value={props.answerSet} onChange={(e) => props.onChange("answerSet", e)}>
                <ToggleButton className="settings-label-button">Triads</ToggleButton>
                    <ToggleButton id="interval-btn-0" variant={props.answerSet.includes(0) ? 'toggle-active interval': 'toggle interval'} value={0}>min</ToggleButton>
                    <ToggleButton id="interval-btn-1" variant={props.answerSet.includes(1) ? 'toggle-active interval': 'toggle interval'} value={1}>maj</ToggleButton>
                    <ToggleButton id="interval-btn-2" variant={props.answerSet.includes(2) ? 'toggle-active interval': 'toggle interval'} value={2}>dim</ToggleButton>
                    <ToggleButton id="interval-btn-3" variant={props.answerSet.includes(3) ? 'toggle-active interval': 'toggle interval'} value={3}>aug</ToggleButton> 
                </ToggleButtonGroup>
                <br />
                <ToggleButtonGroup size="sm" type="checkbox" className="settings-bar" value={props.answerSet} onChange={(e) => props.onChange("answerSet", e)}>
                    <ToggleButton className="settings-label-button">Sus</ToggleButton>
                    <ToggleButton id="interval-btn-0" variant={props.answerSet.includes(0) ? 'toggle-active interval': 'toggle interval'} value={0}>sus2</ToggleButton>
                    <ToggleButton id="interval-btn-3" variant={props.answerSet.includes(3) ? 'toggle-active interval': 'toggle interval'} value={3}>sus4</ToggleButton>
                </ToggleButtonGroup>
                <br />
                <ToggleButtonGroup size="sm" type="checkbox" className="settings-bar" value={props.answerSet} onChange={(e) => props.onChange("answerSet", e)}>
                    <ToggleButton className="settings-label-button">6ths</ToggleButton>
                    <ToggleButton id="interval-btn-0" variant={props.answerSet.includes(0) ? 'toggle-active interval': 'toggle interval'} value={0}>min6</ToggleButton>
                    <ToggleButton id="interval-btn-3" variant={props.answerSet.includes(3) ? 'toggle-active interval': 'toggle interval'} value={3}>maj6</ToggleButton>
                </ToggleButtonGroup>
                <br />
                <ToggleButtonGroup size="sm" type="checkbox" className="settings-bar" value={props.answerSet} onChange={(e) => props.onChange("answerSet", e)}>
                    <ToggleButton className="settings-label-button">7ths</ToggleButton>
                    <ToggleButton id="interval-btn-0" variant={props.answerSet.includes(0) ? 'toggle-active interval': 'toggle interval'} value={0}>m7</ToggleButton>
                    <ToggleButton id="interval-btn-1" variant={props.answerSet.includes(1) ? 'toggle-active interval': 'toggle interval'} value={1}>Δ7</ToggleButton>
                    <ToggleButton id="interval-btn-2" variant={props.answerSet.includes(2) ? 'toggle-active interval': 'toggle interval'} value={2}>dom7</ToggleButton>
                    <ToggleButton id="interval-btn-2" variant={props.answerSet.includes(2) ? 'toggle-active interval': 'toggle interval'} value={2}>minΔ7</ToggleButton>
                    <ToggleButton id="interval-btn-2" variant={props.answerSet.includes(2) ? 'toggle-active interval': 'toggle interval'} value={2}>+Δ7</ToggleButton>
                    <ToggleButton id="interval-btn-2" variant={props.answerSet.includes(2) ? 'toggle-active interval': 'toggle interval'} value={2}>+7</ToggleButton>
                    <ToggleButton id="interval-btn-2" variant={props.answerSet.includes(2) ? 'toggle-active interval': 'toggle interval'} value={2}>o7</ToggleButton>
                    <ToggleButton id="interval-btn-2" variant={props.answerSet.includes(2) ? 'toggle-active interval': 'toggle interval'} value={2}>ø7</ToggleButton>
                    <ToggleButton id="interval-btn-3" variant={props.answerSet.includes(3) ? 'toggle-active interval': 'toggle interval'} value={3}>7b5</ToggleButton>
                </ToggleButtonGroup>
                <br />
                <ToggleButtonGroup size="sm" type="checkbox" className="settings-bar" value={props.answerSet} onChange={(e) => props.onChange("answerSet", e)}>
                    <ToggleButton className="settings-label-button">9ths</ToggleButton>
                    <ToggleButton id="interval-btn-0" variant={props.answerSet.includes(0) ? 'toggle-active interval': 'toggle interval'} value={0}>m9</ToggleButton>
                    <ToggleButton id="interval-btn-1" variant={props.answerSet.includes(1) ? 'toggle-active interval': 'toggle interval'} value={1}>maj9</ToggleButton>
                    <ToggleButton id="interval-btn-2" variant={props.answerSet.includes(2) ? 'toggle-active interval': 'toggle interval'} value={2}>dom9</ToggleButton>
                    <ToggleButton id="interval-btn-2" variant={props.answerSet.includes(2) ? 'toggle-active interval': 'toggle interval'} value={2}>madd9 </ToggleButton>
                    <ToggleButton id="interval-btn-2" variant={props.answerSet.includes(2) ? 'toggle-active interval': 'toggle interval'} value={2}>Madd9</ToggleButton>
                    <ToggleButton id="interval-btn-2" variant={props.answerSet.includes(2) ? 'toggle-active interval': 'toggle interval'} value={2}>m 6/9</ToggleButton>
                    <ToggleButton id="interval-btn-2" variant={props.answerSet.includes(2) ? 'toggle-active interval': 'toggle interval'} value={2}>M 6/9</ToggleButton>
                </ToggleButtonGroup>
                <br />
                <ToggleButtonGroup size="sm" type="checkbox" className="settings-bar" value={props.answerSet} onChange={(e) => props.onChange("answerSet", e)}>
                    <ToggleButton className="settings-label-button">11ths</ToggleButton>
                    <ToggleButton id="interval-btn-0" variant={props.answerSet.includes(0) ? 'toggle-active interval': 'toggle interval'} value={0}>11</ToggleButton>
                    <ToggleButton id="interval-btn-1" variant={props.answerSet.includes(1) ? 'toggle-active interval': 'toggle interval'} value={1}>Δ7#11</ToggleButton>
                </ToggleButtonGroup>
                <br />
                <ToggleButtonGroup size="sm" type="checkbox" className="settings-bar" value={props.answerSet} onChange={(e) => props.onChange("answerSet", e)}>
                    <ToggleButton className="settings-label-button">13ths</ToggleButton>
                    <ToggleButton id="interval-btn-0" variant={props.answerSet.includes(0) ? 'toggle-active interval': 'toggle interval'} value={0}>maj13</ToggleButton>
                    <ToggleButton id="interval-btn-1" variant={props.answerSet.includes(1) ? 'toggle-active interval': 'toggle interval'} value={1}>min13</ToggleButton>
                </ToggleButtonGroup>
                <br />
            </div>
            <ButtonGroup id='difficulty-btn-group'>
            {difficulties.map((difficulty, idx) => (
                <ToggleButton
                    key={idx}
                    id={`difficulty-${idx}`}
                    type="radio"
                    variant={difficulty.color}
                    name="difficulty"
                    value={difficulty.value}
                    checked={difficultyValue === difficulty.value}
                    onChange={(e) => setDifficultyValue(e.currentTarget.value)}
                    size="sm"
                >
                {difficulty.name}
                </ToggleButton>
            ))}
            </ButtonGroup>
        </div>,
        "Sound Settings - synth settings etc. ",
    ]

    function hideSettings() {
        document.getElementById('settings-pop').classList.toggle("show");
    }

    return (
    <div id='settings-menu'>
        <ButtonGroup id='settings-btn-group'>
        {radios.map((radio, idx) => (
            <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? 'outline-primary' : 'outline-secondary'}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
            {radio.name}
            </ToggleButton>
        ))}
        </ButtonGroup>
        
        <Button 
            id="close-settings-btn"
            onClick={hideSettings}
        >
        {/* <FontAwesomeIcon icon="fa-solid fa-xmark" /> */}
        X
        </Button>
        <div>
            {settings[radioValue-1]}
        </div>
    </div>
    );
  }

export default SettingsMenuTest;
