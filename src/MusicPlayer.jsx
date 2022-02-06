import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';
import $ from 'jquery';

const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

const synth = new Tone.PolySynth(Tone.Synth).toDestination();
synth.set({ oscillator: { type: "sine"}});
synth.set({ volume: -6 });

function MIDItoNoteName(MIDI) {
    const octave = Math.floor(MIDI / 12);
    const note = noteNames[MIDI % 12];
    return note + String(octave);
}

var playbacks = 0;

const playbackSpeedSettings = [{noteValue: "1n", noteDuration: 2.5}, {noteValue: "2n", noteDuration: 1.5},
                              {noteValue: "8n", noteDuration: 1}, {noteValue: "16n", noteDuration: 0.5}]

export function resetPlaybacks() {
    playbacks = 0;
}

function MusicPlayer(props) {
    const {intervalDirection, playbackSpeed, randomDirection, currentInterval, currentKey, totalQuestions, playbackRepeats} = props;


    useEffect(() => {
        window.addEventListener("keydown", (event) => {
            if(event.key === " ") {
                playQuestionSound();
            }
        })},[]
    );

    useEffect(() => {
        playbacks = 0;
        $("#circle-btn").removeClass("red");
    }, [totalQuestions])

    function playQuestionSound() {
        const noteValue = playbackSpeedSettings[playbackSpeed].noteValue;
        const noteDuration = playbackSpeedSettings[playbackSpeed].noteDuration;

        if(playbacks <= playbackRepeats || playbackRepeats === 3) {
            $("#circle-btn").addClass("unclickable");
            $("#circle-btn").addClass("blue");
    
            const note1 = MIDItoNoteName(currentKey);
            const note2 = MIDItoNoteName(currentKey + currentInterval);

            const now = Tone.now();

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
            playbacks++;
            setTimeout(function (){
                $("#circle-btn").removeClass("unclickable");
                $("#circle-btn").removeClass("blue");
                }, noteDuration * 1750);
        } 
        if(playbacks > playbackRepeats && playbackRepeats !== 3) {
            $("#circle-btn").addClass("red");
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