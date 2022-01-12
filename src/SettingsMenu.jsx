import React, { useState } from 'react';
import $ from 'jquery';

import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function SettingsMenu() {
    const [playbackRepeats, setPlaybackRepeats] = useState([2]);
    const [guessesAllowed, setGuessesAllowed] = useState([3]);
    const [playbackSpeed, setPlaybackSpeed] = useState([1]);

    function handleChange(setting, newValue) {
        console.log(setting);
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
        }
    }

    return (
        <div>
      <ToggleButtonGroup size="sm" type="radio" name="playbackRepeats" value={playbackRepeats} onChange={(e) => handleChange("playbackRepeats", e)}>
        <label>Playback Repeats :</label>
        <ToggleButton id="repeats-btn-1" value={0}>0</ToggleButton>
        <ToggleButton id="repeats-btn-2" value={1}>1</ToggleButton>
        <ToggleButton id="repeats-btn-3" value={2}>2</ToggleButton>
        <ToggleButton id="repeats-btn-4" value={3}>∞</ToggleButton>
        <p>{playbackRepeats}</p>
      </ToggleButtonGroup>
      <br />
      <ToggleButtonGroup size="sm" type="radio" name="guessesAllowed" value={guessesAllowed} onChange={(e) => handleChange("guessesAllowed", e)}>
        <label>Guesses Allowed :</label>
        <ToggleButton id="guesses-btn-1" value={1}>1</ToggleButton>
        <ToggleButton id="guesses-btn-2" value={2}>2</ToggleButton>
        <ToggleButton id="guesses-btn-3" value={3}>3</ToggleButton>
        <p>{guessesAllowed}</p>
      </ToggleButtonGroup>
      <br />
      <ToggleButtonGroup size="sm" type="radio" name="playbackSpeed" value={playbackSpeed} onChange={(e) => handleChange("playbackSpeed", e)}>
        <label>Playback Speed :</label>
        <ToggleButton id="speed-btn-1" value={0.5}>0.5x</ToggleButton>
        <ToggleButton id="speed-btn-2" value={1}>1x</ToggleButton>
        <ToggleButton id="speed-btn-3" value={1.5}>1.5x</ToggleButton>
        <ToggleButton id="speed-btn-4" value={2}>2x</ToggleButton>
        <ToggleButton id="speed-btn-5" value={3}>3x</ToggleButton>
        <p>{playbackSpeed}</p>
      </ToggleButtonGroup>
      </div>
    );
  }

export { SettingsMenu,
        playbackRepeats,
        guessesAllowed,
        playbackSpeed
};
