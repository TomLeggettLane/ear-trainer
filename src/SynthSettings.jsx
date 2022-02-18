import React, {useState} from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import RangeSlider from 'react-bootstrap-range-slider';
import { changeSynthSettings } from './Synth.jsx'
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

const waveforms =  [
    {displayName: 'Sine', name: 'sine', color: "outline-warning"},
    {displayName: 'Triangle', name: 'triangle', color: "outline-success"},
    {displayName: 'Square', name: 'square', color: "outline-danger"},
    {displayName: 'Sawtooth', name: 'sawtooth', color: "outline-dark"},
    ]
  
function SynthSettings(props) {
    const [ attack, setAttack ] = useState(0.005);
    const [ decay, setDecay ] = useState(0.1);
    const [ sustain, setSustain ] = useState(0.3);
    const [ release, setRelease ] = useState(1);
    const [ volume, setVolume ] = useState(-6);
    const [ oscillator, setOscillator ] = useState("sine");

    const [ reverb, setReverb ] = useState(false);
    const [ chorus, setChorus ] = useState(false);
    const [ autoFilter, setAutoFilter ] = useState(false);
    const [ autoWah, setAutoWah ] = useState(false);
    
    function handleChange(setting, newValue) {
        switch (setting) {
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
            case "reverb":
                setReverb(newValue);
                break
            case "autofilter":
                setAutoFilter(newValue);
                break
            case "autowah":
                setAutoWah(newValue);
                break
            case "chorus":
                setChorus(newValue);
                break
        }
        changeSynthSettings(setting, newValue);
    }

    return (
        <div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="synth-sliders">
                        <label className="synth-slider-label">Attack </label>
                        <RangeSlider
                        min={0.005}
                        max={1}
                        step={0.01}
                        value={attack}
                        onChange={changeEvent => handleChange("attack", changeEvent.target.value)}
                        />
                        <label className="synth-slider-label">Decay </label>
                        <RangeSlider
                        min={0.1}
                        max={20}
                        step={0.01}
                        value={decay}
                        onChange={changeEvent => handleChange("decay", changeEvent.target.value)}
                        />
                        <label className="synth-slider-label">Sustain </label>
                        <RangeSlider
                        min={0.05}
                        max={0.55}
                        step={0.1}
                        value={sustain}
                        onChange={changeEvent => handleChange("sustain", changeEvent.target.value)}
                        />
                        <label className="synth-slider-label">Release </label>
                        <RangeSlider
                        min={0.1}
                        max={19.1}
                        step={1}
                        value={release}
                        onChange={changeEvent => handleChange("release", changeEvent.target.value)}
                        />
                    </div>
                </div>
                <div className="col-lg-6 synth-effects">
                    <div className="synth-effect">
                        <label className="synth-slider-label">Reverb </label>
                        <BootstrapSwitchButton
                            checked={reverb}
                            onlabel = ""
                            offlabel = ""
                            onChange={(e) => { handleChange("reverb", e ? 1 : 0) }
                            }
                        />
                    </div>
                    <div className="synth-effect">
                        <label className="synth-slider-label">Chorus </label>
                        <BootstrapSwitchButton
                            checked={chorus}
                            onlabel = ""
                            offlabel = ""
                            onChange={(e) => {  handleChange("chorus", e ? 1 : 0) }
                            }
                        />
                    </div>
                    <div className="synth-effect">
                        <label className="synth-slider-label">AutoFilter </label>
                        <BootstrapSwitchButton
                            checked={autoFilter}
                            onlabel = ""
                            offlabel = ""
                            onChange={(e) => {  handleChange("autofilter", e ? 1 : 0) }
                            }
                        />
                    </div>
                    <div className="synth-effect">
                        <label className="synth-slider-label">AutoWah </label>
                        <BootstrapSwitchButton
                            checked={autoWah}
                            onlabel = ""
                            offlabel = ""
                            onChange={(e) => {  handleChange("autowah", e ? 1 : 0) }
                            }
                        />
                    </div>
                </div>
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
                        checked={oscillator === waveform.name}  //DOESN'T WORK!!!!!
                        onChange={(e) => { setOscillator(e.currentTarget.value);
                                          changeSynthSettings("oscillator", e.currentTarget.value)}}
                        size="sm"
                    >
                        {waveform.displayName}
                    </ToggleButton>
                ))}
                </ButtonGroup>
            </div>
                <label className="synth-slider-label">Volume</label>
                <RangeSlider
                min={-40}
                max={10}
                step={1}
                value={volume}
                onChange={changeEvent => handleChange("volume", changeEvent.target.value)}
                />
        </div>
    )
};

export default SynthSettings;