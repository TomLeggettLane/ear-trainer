import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Checkbox from './Checkbox';
import $ from 'jquery';
import RangeSlider from 'react-bootstrap-range-slider';
import { changeSynthSettings } from '../Synth.jsx';

const waveforms =  [
    {name: 'sine', color: "outline-warning"},
    {name: 'triangle', color: "outline-success"},
    {name: 'square', color: "outline-danger"},
    {name: 'sawtooth', color: "outline-dark"},
    ]
  
function SynthSettings(props) {
    const [ attack, setAttack ] = useState(0.005);
    const [ decay, setDecay ] = useState(0.1);
    const [ sustain, setSustain ] = useState(0.3);
    const [ release, setRelease] = useState(1);
    const [ volume, setVolume] = useState(-6);
    
    function handleSlide(slider, newValue) {
        switch (slider) {
            case "attack":
                setAttack(newValue);
                break
            case "release":
                setRelease(newValue);
                break
            case "sustain":
                setSustain(newValue);
                break
            case "decay":
                setDecay(newValue);
                break
            case "volume":
                setVolume(newValue);
                break
        }
        changeSynthSettings(slider, newValue);
    }

    return (
        <div>
            <div className="synth-sliders">
                <label>A</label>
                <RangeSlider
                min={0.005}
                max={1}
                step={0.01}
                value={attack}
                onChange={changeEvent => handleSlide("attack", changeEvent.target.value)}
                />
                <label>D</label>
                <RangeSlider
                min={0.1}
                max={20}
                step={0.01}
                value={decay}
                onChange={changeEvent => handleSlide("decay", changeEvent.target.value)}
                />
                <label>S</label>
                <RangeSlider
                min={0.05}
                max={0.55}
                step={0.1}
                value={sustain}
                onChange={changeEvent => handleSlide("sustain", changeEvent.target.value)}
                />
                <label>R</label>
                <RangeSlider
                min={0.1}
                max={19.1}
                step={1}
                value={release}
                onChange={changeEvent => handleSlide("release", changeEvent.target.value)}
                />
            </div>
            <div id="waveforms">
                <ButtonGroup id='waveform-btn-group'>
                {waveforms.map((waveform, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`waveform-${idx}`}
                        type="radio"
                        variant={waveform.color}
                        name="waveform"
                        value={waveform.name}
                        checked={false}  //DOESN'T WORK!!!!!
                        onChange={(e) => {changeSynthSettings("oscillator", e.currentTarget.value)}}
                        size="sm"
                    >
                        {waveform.name}
                    </ToggleButton>
                ))}
                </ButtonGroup>
            </div>
                <label>Volume</label>
                <RangeSlider
                min={-40}
                max={10}
                step={1}
                value={volume}
                onChange={changeEvent => handleSlide("volume", changeEvent.target.value)}
                />
        </div>
    )
};

export default SynthSettings;