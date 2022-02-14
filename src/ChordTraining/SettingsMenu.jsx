import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

function SettingsMenu(props) {
    const [radioValue, setRadioValue] = useState('1');

    const radios = [
        {name: 'Game Settings', value: '1'},
        {name: 'Included Chords', value: '2'},
        {name: 'Sound Settings', value: '3'},
    ]

    const difficulties = [
        {name: 'easy', color: "outline-warning"},
        {name: 'medium', color: "outline-success"},
        {name: 'hard', color: "outline-danger"},
        {name: 'expert', color: "outline-dark"},
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
                    <ToggleButton id="triad-min-btn" variant={props.answerSet.includes(0) ? 'toggle-active interval': 'toggle interval'} value={0}>min</ToggleButton>
                    <ToggleButton id="triad-maj-btn" variant={props.answerSet.includes(1) ? 'toggle-active interval': 'toggle interval'} value={1}>maj</ToggleButton>
                    <ToggleButton id="triad-dim-btn" variant={props.answerSet.includes(2) ? 'toggle-active interval': 'toggle interval'} value={2}>dim</ToggleButton>
                    <ToggleButton id="triad-aug-btn" variant={props.answerSet.includes(3) ? 'toggle-active interval': 'toggle interval'} value={3}>aug</ToggleButton> 
                </ToggleButtonGroup>
                <br />
                <ToggleButtonGroup size="sm" type="checkbox" className="settings-bar" value={props.answerSet} onChange={(e) => props.onChange("answerSet", e)}>
                    <ToggleButton className="settings-label-button">Sus</ToggleButton>
                    <ToggleButton id="sus-sus2-btn" variant={props.answerSet.includes(4) ? 'toggle-active interval': 'toggle interval'} value={4}>sus2</ToggleButton>
                    <ToggleButton id="sus-sus4-btn" variant={props.answerSet.includes(5) ? 'toggle-active interval': 'toggle interval'} value={5}>sus4</ToggleButton>
                </ToggleButtonGroup>
                <br />
                <ToggleButtonGroup size="sm" type="checkbox" className="settings-bar" value={props.answerSet} onChange={(e) => props.onChange("answerSet", e)}>
                    <ToggleButton className="settings-label-button">6ths</ToggleButton>
                    <ToggleButton id="6ths-min6-btn" variant={props.answerSet.includes(6) ? 'toggle-active interval': 'toggle interval'} value={6}>min6</ToggleButton>
                    <ToggleButton id="6ths-maj6-btn" variant={props.answerSet.includes(7) ? 'toggle-active interval': 'toggle interval'} value={7}>maj6</ToggleButton>
                </ToggleButtonGroup>
                <br />
                <ToggleButtonGroup size="sm" type="checkbox" className="settings-bar" value={props.answerSet} onChange={(e) => props.onChange("answerSet", e)}>
                    <ToggleButton className="settings-label-button">7ths</ToggleButton>
                    <ToggleButton id="7ths-min7-btn" variant={props.answerSet.includes(8) ? 'toggle-active interval': 'toggle interval'} value={8}>m7</ToggleButton>
                    <ToggleButton id="7ths-maj7-btn" variant={props.answerSet.includes(9) ? 'toggle-active interval': 'toggle interval'} value={9}>Δ7</ToggleButton>
                    <ToggleButton id="7ths-dom7-btn" variant={props.answerSet.includes(10) ? 'toggle-active interval': 'toggle interval'} value={10}>dom7</ToggleButton>
                    <ToggleButton id="7ths-minmaj7-btn" variant={props.answerSet.includes(11) ? 'toggle-active interval': 'toggle interval'} value={11}>minΔ7</ToggleButton>
                    <ToggleButton id="7ths-augmaj7-btn" variant={props.answerSet.includes(12) ? 'toggle-active interval': 'toggle interval'} value={12}>+Δ7</ToggleButton>
                    <ToggleButton id="7ths-aug7-btn" variant={props.answerSet.includes(13) ? 'toggle-active interval': 'toggle interval'} value={13}>+7</ToggleButton>
                    <ToggleButton id="7ths-dim7-btn" variant={props.answerSet.includes(14) ? 'toggle-active interval': 'toggle interval'} value={14}>o7</ToggleButton>
                    <ToggleButton id="7ths-halfdim7-btn" variant={props.answerSet.includes(15) ? 'toggle-active interval': 'toggle interval'} value={15}>ø7</ToggleButton>
                    <ToggleButton id="7ths-7b5-btn" variant={props.answerSet.includes(16) ? 'toggle-active interval': 'toggle interval'} value={16}>7b5</ToggleButton>
                </ToggleButtonGroup>
                <br />
                <ToggleButtonGroup size="sm" type="checkbox" className="settings-bar" value={props.answerSet} onChange={(e) => props.onChange("answerSet", e)}>
                    <ToggleButton className="settings-label-button">9ths</ToggleButton>
                    <ToggleButton id="9ths-min9-btn" variant={props.answerSet.includes(17) ? 'toggle-active interval': 'toggle interval'} value={17}>m9</ToggleButton>
                    <ToggleButton id="9ths-maj9-btn" variant={props.answerSet.includes(18) ? 'toggle-active interval': 'toggle interval'} value={18}>maj9</ToggleButton>
                    <ToggleButton id="9ths-dom9-btn" variant={props.answerSet.includes(19) ? 'toggle-active interval': 'toggle interval'} value={19}>dom9</ToggleButton>
                    <ToggleButton id="9ths-madd9-btn" variant={props.answerSet.includes(20) ? 'toggle-active interval': 'toggle interval'} value={20}>madd9 </ToggleButton>
                    <ToggleButton id="9ths-Madd9-btn" variant={props.answerSet.includes(21) ? 'toggle-active interval': 'toggle interval'} value={21}>Madd9</ToggleButton>
                    <ToggleButton id="9ths-m6/9-btn" variant={props.answerSet.includes(22) ? 'toggle-active interval': 'toggle interval'} value={22}>m 6/9</ToggleButton>
                    <ToggleButton id="9ths-M6/9-btn" variant={props.answerSet.includes(23) ? 'toggle-active interval': 'toggle interval'} value={23}>M 6/9</ToggleButton>
                </ToggleButtonGroup>
                <br />
                <ToggleButtonGroup size="sm" type="checkbox" className="settings-bar" value={props.answerSet} onChange={(e) => props.onChange("answerSet", e)}>
                    <ToggleButton className="settings-label-button">11ths</ToggleButton>
                    <ToggleButton id="11ths-min11-btn" variant={props.answerSet.includes(24) ? 'toggle-active interval': 'toggle interval'} value={24}>min11</ToggleButton>
                    <ToggleButton id="11ths-maj7#11-btn" variant={props.answerSet.includes(25) ? 'toggle-active interval': 'toggle interval'} value={25}>Δ7#11</ToggleButton>
                    <ToggleButton id="11ths-dom11-btn" variant={props.answerSet.includes(26) ? 'toggle-active interval': 'toggle interval'} value={26}>dom11</ToggleButton>
                </ToggleButtonGroup>
                <br />
                <ToggleButtonGroup size="sm" type="checkbox" className="settings-bar" value={props.answerSet} onChange={(e) => props.onChange("answerSet", e)}>
                    <ToggleButton className="settings-label-button">13ths</ToggleButton>
                    <ToggleButton id="13ths-min13-btn" variant={props.answerSet.includes(27) ? 'toggle-active interval': 'toggle interval'} value={27}>min13</ToggleButton>
                    <ToggleButton id="13ths-maj13-btn" variant={props.answerSet.includes(28) ? 'toggle-active interval': 'toggle interval'} value={28}>maj13</ToggleButton>
                    <ToggleButton id="13ths-dom13-btn" variant={props.answerSet.includes(29) ? 'toggle-active interval': 'toggle interval'} value={29}>dom13</ToggleButton>
                    
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
                    value={difficulty.name}
                    checked={false}  //DOESN'T WORK!!!!!
                    onChange={(e) => {props.onChange("answerSet", e.currentTarget.value)}}
                    size="sm"
                >
                    {difficulty.name}
                </ToggleButton>
            ))}
            </ButtonGroup>
        </div>,
        "Sound Settings - synth settings etc. ",
    ];

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
        ><i className="fa-solid fa-xmark"></i>
        </Button>
        <div>
            {settings[radioValue-1]}
        </div>
    </div>
    );
  }

export default SettingsMenu;
