import React from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Checkbox from './Checkbox';

function SettingsMenu(props) {
    return (
    <div id='settings-menu'>
        <div className='row'>
            {/* game settings */}
            <div className='col-lg-6 settings-col'>
                <div className='settings-title'>
                    Main Settings 
                </div>
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
                    <ToggleButton className="settings-label-button">Interval Direction</ToggleButton>
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
            </div>

            {/* interval settings */}
            <div className="col-lg-6 settings-col">
                <div className='settings-title'>
                    Included Intervals 
                </div>
                <div>
                    <Checkbox 
                        onChange={props.onChange}
                        label="First Octave"
                        octave="first-octave"
                        checked={true}
                    />
                    
                    
                    <br />
                    <ToggleButtonGroup size="sm" type="checkbox" value={props.answerSet} onChange={(e) => props.onChange("answerSet", e)}>
                        <ToggleButton id="interval-btn-0" variant={props.answerSet.includes(0) ? 'toggle-active left interval': 'toggle left interval'} value={0}>P1</ToggleButton>
                        <ToggleButton id="interval-btn-1" variant={props.answerSet.includes(1) ? 'toggle-active interval': 'toggle interval'} value={1}>m2</ToggleButton>
                        <ToggleButton id="interval-btn-2" variant={props.answerSet.includes(2) ? 'toggle-active interval': 'toggle interval'} value={2}>M2</ToggleButton>
                        <ToggleButton id="interval-btn-3" variant={props.answerSet.includes(3) ? 'toggle-active interval': 'toggle interval'} value={3}>m3</ToggleButton>
                        <ToggleButton id="interval-btn-4" variant={props.answerSet.includes(4) ? 'toggle-active interval': 'toggle interval'} value={4}>M3</ToggleButton>
                        <ToggleButton id="interval-btn-5" variant={props.answerSet.includes(5) ? 'toggle-active interval': 'toggle interval'} value={5}>P4</ToggleButton>
                        <ToggleButton id="interval-btn-6" variant={props.answerSet.includes(6) ? 'toggle-active interval': 'toggle interval'} value={6}>Tri</ToggleButton>
                        <ToggleButton id="interval-btn-7" variant={props.answerSet.includes(7) ? 'toggle-active interval': 'toggle interval'} value={7}>P5</ToggleButton>
                        <ToggleButton id="interval-btn-8" variant={props.answerSet.includes(8) ? 'toggle-active interval': 'toggle interval'} value={8}>m6</ToggleButton>
                        <ToggleButton id="interval-btn-9" variant={props.answerSet.includes(9) ? 'toggle-active interval': 'toggle interval'} value={9}>M6</ToggleButton>
                        <ToggleButton id="interval-btn-10" variant={props.answerSet.includes(10) ? 'toggle-active interval': 'toggle interval'} value={10}>m7</ToggleButton>
                        <ToggleButton id="interval-btn-11" variant={props.answerSet.includes(11) ? 'toggle-active right interval': 'toggle right interval'} value={11}>M7</ToggleButton>
                        <br />
                    </ToggleButtonGroup>
                    </div>
                    <br />
                    <div>
                    <Checkbox 
                        onChange={props.onChange}
                        label="Second Octave (8va)"
                        octave="second-octave"
                        checked={false}
                    />
                    <br />
                    <ToggleButtonGroup size="sm" type="checkbox" value={props.answerSet} onChange={(e) => props.onChange("answerSet", e)}>
                        <ToggleButton id="interval-btn-12" variant={props.answerSet.includes(12) ? 'toggle-active left interval': 'toggle left interval'} value={12}>P8</ToggleButton>
                        <ToggleButton id="interval-btn-14" variant={props.answerSet.includes(14) ? 'toggle-active interval': 'toggle interval'} value={14}>M9</ToggleButton>
                        <ToggleButton id="interval-btn-15" variant={props.answerSet.includes(15) ? 'toggle-active interval': 'toggle interval'} value={15}>m3</ToggleButton>
                        <ToggleButton id="interval-btn-16" variant={props.answerSet.includes(16) ? 'toggle-active interval': 'toggle interval'} value={16}>M3</ToggleButton>
                        <ToggleButton id="interval-btn-17" variant={props.answerSet.includes(17) ? 'toggle-active interval': 'toggle interval'} value={17}>P11</ToggleButton>
                        <ToggleButton id="interval-btn-18" variant={props.answerSet.includes(18) ? 'toggle-active interval': 'toggle interval'} value={18}>#11</ToggleButton>
                        <ToggleButton id="interval-btn-19" variant={props.answerSet.includes(19) ? 'toggle-active interval': 'toggle interval'} value={19}>P5</ToggleButton>
                        <ToggleButton id="interval-btn-20" variant={props.answerSet.includes(20) ? 'toggle-active interval': 'toggle interval'} value={20}>m13</ToggleButton>
                        <ToggleButton id="interval-btn-21" variant={props.answerSet.includes(21) ? 'toggle-active interval': 'toggle interval'} value={21}>M13</ToggleButton>
                        <ToggleButton id="interval-btn-22" variant={props.answerSet.includes(22) ? 'toggle-active interval': 'toggle interval'} value={22}>m7</ToggleButton>
                        <ToggleButton id="interval-btn-13" variant={props.answerSet.includes(13) ? 'toggle-active interval': 'toggle interval'} value={13}>m9</ToggleButton>
                        <ToggleButton id="interval-btn-23" variant={props.answerSet.includes(23) ? 'toggle-active right interval': 'toggle right interval'} value={23}>M7</ToggleButton>
                        <br />
                    </ToggleButtonGroup>
                    </div>
                    <div className="warning-text">
                        <span>{props.answerSet.length < 2 ? "MUST INCLUDE AT LEAST 2 INTERVALS" : ""}</span>
                    </div>
                </div>
            </div>
        </div>
    );
  }

export default SettingsMenu;
