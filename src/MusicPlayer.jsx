import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';
import $ from 'jquery';

const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

function changeSynthSettings(setting, newValue) {
    switch (setting) {
        case "volume":
            synths.forEach(synth => synth.volume.value = newValue);
            break
        case "oscillator":
            synths.forEach(synth => synth.set({ oscillator: { type: newValue}}))
            break
    }
}

function toggleSynthUnmute(synthIndex) {
    synths[synthIndex].volume.value = 0;
    for (let i=19; i > -1; i--) {
        setTimeout(synths[synthIndex].volume.value = -10 * i, 10);
    }
    for (let i=1; i < 20; i++) {
        setTimeout(synths[(synthIndex + 1) % 2].volume.value = -10 * i, 10);
    }
}

function MIDItoNoteName(MIDI) {
    const octave = Math.floor(MIDI / 12);
    const note = noteNames[MIDI % 12];
    return note + String(octave);
}

const synth1 = new Tone.PolySynth(Tone.Synth).toDestination();
const synth2 = new Tone.PolySynth(Tone.Synth).toDestination();
const synths = [synth1, synth2];
changeSynthSettings("volume", 0);
changeSynthSettings("oscillator", "sine");

var playbacks = 0;
var count = 0;

const playbackSpeedSettings = [{noteValue: "1n", noteDuration: 2.5}, {noteValue: "2n", noteDuration: 1.5},
                              {noteValue: "8n", noteDuration: 1}, {noteValue: "16n", noteDuration: 0.5}]

export function resetPlaybacks() {
    playbacks = 0;
}
function MusicPlayer(props) {
    const {intervalDirection, playbackSpeed, randomDirection, currentInterval, currentKey,
           totalQuestions, playbackRepeats, chordOrInterval, currentChord} = props;

    useEffect(() => {
        playbacks = 0;
        $("#circle-btn").removeClass("red");
        $('h1').addClass('red');
        setTimeout(() => $('h1').removeClass('red'), 3000);
        playQuestionSound();
    }, [totalQuestions])

    function playQuestionSound() {
        toggleSynthUnmute(count % 2)
        const currentSynth = synths[count % 2];

        const noteValue = playbackSpeedSettings[playbackSpeed].noteValue;
        const noteDuration = playbackSpeedSettings[playbackSpeed].noteDuration;

        if(playbacks <= playbackRepeats || playbackRepeats === 3) {
            $("#circle-btn").addClass("unclickable");
            $("#circle-btn").addClass("blue");

            if (chordOrInterval === "interval") {
                const note1 = MIDItoNoteName(currentKey);
                const note2 = MIDItoNoteName(currentKey + currentInterval);
                playInterval(note1, note2, noteValue, noteDuration, currentSynth);
            } else if (chordOrInterval === "chord") {
                const chordArray = [];
                for(let i=0; i < currentChord.chordIntervals.length; i++) {
                    chordArray.push(MIDItoNoteName(currentChord.chordIntervals[i] + currentKey));
                }
                playChord(chordArray, noteValue, noteDuration, currentSynth);
            }

            playbacks++;
            count++;
            setTimeout(function (){
                $("#circle-btn").removeClass("unclickable");
                $("#circle-btn").removeClass("blue");
                }, noteDuration * 1750);
        } 
        if(playbacks > playbackRepeats && playbackRepeats !== 3) {
            $("#circle-btn").addClass("red");
        }
    }

    function playInterval(note1, note2, noteValue, noteDuration, synth) {
        const now = Tone.now();
        console.log("volume", synth1.volume.value);

        switch(intervalDirection) {
            case 'up':
                synth.triggerAttackRelease(note1, noteValue, now);
                synth.triggerAttackRelease(note2, noteValue, now+noteDuration);
                break
            case 'down':
                synth.triggerAttackRelease(note2, noteValue, now);
                synth.triggerAttackRelease(note1, noteValue, now+noteDuration);
                break
            case 'random':
                if(randomDirection < 0.5) {
                synth.triggerAttackRelease(note1, noteValue, now);
                synth.triggerAttackRelease(note2, noteValue, now+noteDuration);
                } else {
                synth.triggerAttackRelease(note2, noteValue, now);
                synth.triggerAttackRelease(note1, noteValue, now+noteDuration);
                }
                break
            case 'unison':
                synth.triggerAttackRelease(note1, noteValue, now);
                synth.triggerAttackRelease(note2, noteValue, now);
                break;
        }
    }

    function playChord(chordArray, noteValue, noteDuration, synth) {
        
        synth.set({ volume: -6 - 2 * (chordArray.length)});
        const now = Tone.now();

        switch(intervalDirection) {
            case "up" : {
                chordArray.forEach((element, index) => {
                    synth.triggerAttack(element, now + 0.5 * index);
                })
                synth.triggerRelease(chordArray, now + chordArray.length);
                break
            }
            case "down" : {
                chordArray.slice().reverse().forEach((element, index) => {
                    synth.triggerAttack(element, now + 0.5 * index);
                })
                synth.triggerRelease(chordArray, now + chordArray.length);
                break
            }
            case "random" : {
                if(randomDirection < 0.5) {
                    chordArray.forEach((element, index) => {
                        synth.triggerAttack(element, now + 0.5 * index);
                    })
                    synth.triggerRelease(chordArray, now + chordArray.length);
                } else {
                    chordArray.slice().reverse().forEach((element, index) => {
                    synth.triggerAttack(element, now + 0.5 * index);
                    })
                    synth.triggerRelease(chordArray, now + chordArray.length);
                }
                break
            }
            case "unison" : {
                synth.triggerAttackRelease(chordArray, chordArray.length/2);
                return
            }
        }
    }
        
    return(
        <>
        <button id="circle-btn" onClick={playQuestionSound}>
            <i className="fas fa-play music-btn"></i> 
        </button>
        </>
    )
}

export default MusicPlayer;