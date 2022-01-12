import React, { useState } from 'react';

import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

function SettingsMenu(props) {
    return (
        <div>
            <ToggleButtonGroup size="sm" type="radio" name="playbackRepeats" value={props.playbackRepeats} onChange={(e) => props.onChange("playbackRepeats", e)}>
                <label>Playback Repeats :</label>
                <ToggleButton id="repeats-btn-1" value={0}>0</ToggleButton>
                <ToggleButton id="repeats-btn-2" value={1}>1</ToggleButton>
                <ToggleButton id="repeats-btn-3" value={2}>2</ToggleButton>
                <ToggleButton id="repeats-btn-4" value={3}>∞</ToggleButton>
                <p>{props.playbackRepeats}</p>
            </ToggleButtonGroup>
            <br />

            <ToggleButtonGroup size="sm" type="radio" name="guessesAllowed" value={props.guessesAllowed} onChange={(e) => props.onChange("guessesAllowed", e)}>
            <label>Guesses Allowed :</label>
            <ToggleButton id="guesses-btn-1" value={1}>1</ToggleButton>
            <ToggleButton id="guesses-btn-2" value={2}>2</ToggleButton>
            <ToggleButton id="guesses-btn-3" value={3}>3</ToggleButton>
            <p>{props.guessesAllowed}</p>
            </ToggleButtonGroup>
            <br />

            <ToggleButtonGroup size="sm" type="radio" name="playbackSpeed" value={props.playbackSpeed} onChange={(e) => props.onChange("playbackSpeed", e)}>
                <label>Playback Speed :</label>
                <ToggleButton id="speed-btn-1" value={0.5}>0.5x</ToggleButton>
                <ToggleButton id="speed-btn-2" value={1}>1x</ToggleButton>
                <ToggleButton id="speed-btn-3" value={1.5}>1.5x</ToggleButton>
                <ToggleButton id="speed-btn-4" value={2}>2x</ToggleButton>
                <ToggleButton id="speed-btn-5" value={3}>3x</ToggleButton>
                <p>{props.playbackSpeed}</p>
            </ToggleButtonGroup>
            <br />
            <ToggleButtonGroup size="sm" type="checkbox" value={props.answerSet} onChange={(e) => props.onChange("answerSet", e)}>
                <label>Included Intervals :</label>
                <ToggleButton id="interval-btn-1" value={"minor 2nd"}>m2</ToggleButton>
                <ToggleButton id="interval-btn-2" value={"major 2nd"}>M2</ToggleButton>
                <ToggleButton id="interval-btn-3" value={"minor 3rd"}>m3</ToggleButton>
                <ToggleButton id="interval-btn-4" value={"major 3rd"}>M3</ToggleButton>
                <ToggleButton id="interval-btn-5" value={"perfect 4th"}>P4</ToggleButton>
                <ToggleButton id="interval-btn-6" value={"tritone"}>Tri</ToggleButton>
                <ToggleButton id="interval-btn-7" value={"perfect 5th"}>P5</ToggleButton>
                <ToggleButton id="interval-btn-8" value={"minor 6th"}>m6</ToggleButton>
                <ToggleButton id="interval-btn-9" value={"major 6th"}>M6</ToggleButton>
                <ToggleButton id="interval-btn-10" value={"minor 7th"}>m7</ToggleButton>
                <ToggleButton id="interval-btn-11" value={"major 7th"}>M7</ToggleButton>
                <p>{props.answerSet}</p>
            </ToggleButtonGroup>
      </div>
    );
  }

export default SettingsMenu;
