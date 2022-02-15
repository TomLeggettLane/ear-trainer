import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';

var count = 0;
const synth1 = new Tone.PolySynth(Tone.Synth).toDestination();
const synth2 = new Tone.PolySynth(Tone.Synth).toDestination();
const synths = [synth1, synth2];
changeSynthSettings("volume", -12);
changeSynthSettings("oscillator", "sine");

var volume = -6;

export function changeSynthSettings(setting, newValue) {
    switch (setting) {
        case "volume":
            volume = newValue;
            break
        case "oscillator":
            synths.forEach(synth => synth.set({ oscillator: { type: newValue}}))
            break
        case "attack":
            synths.forEach(synth => synth.set({ envelope: { attack: newValue}}));
            break
        case "release":
            synths.forEach(synth => synth.set({ envelope: { release: newValue}}));
            break
        case "sustain":
            synths.forEach(synth => synth.set({ envelope: { sustain: newValue}}));
            break
        case "decay":
            synths.forEach(synth => synth.set({ envelope: { decay: newValue}}));
            break

    }
}

function toggleSynthUnmute(synthIndex) {
    // synths[synthIndex].volume.value = 0;
    for (let i=-120; i < volume; i += 10) {
        setTimeout(synths[synthIndex].volume.value = i, 10);
    }
    for (let i=volume; i > -120; i -= 10) {
        setTimeout(synths[(synthIndex + 1) % 2].volume.value = i, 10);
    }
}

export function getSynth() {
    toggleSynthUnmute(count % 2)
    return synths[count++ % 2];
}