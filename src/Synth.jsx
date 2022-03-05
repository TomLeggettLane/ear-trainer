import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';

var count = 0;
const synth1 = new Tone.PolySynth(Tone.Synth).toDestination();
const synth2 = new Tone.PolySynth(Tone.Synth).toDestination();
const synths = [synth1, synth2];
changeSynthSettings("volume", -12);
changeSynthSettings("oscillator", "sine");


const limiter = new Tone.Limiter(-10).toDestination();

var reverb = new Tone.Reverb(5).toDestination();
reverb.wet.value = 0;

const chorus = new Tone.Chorus(4, 2.5, 0.5).toDestination();
chorus.wet.value = 0;

const autoFilter = new Tone.AutoFilter("4n").toDestination();
autoFilter.wet.value = 0;

const autoWah = new Tone.AutoWah(50, 6, -30).toDestination();
autoWah.Q.value = 8;

var volume = -12;
synths.forEach((synth) => { synth.connect(reverb);
                            synth.connect(chorus);
                            synth.connect(autoFilter);
                            synth.connect(autoWah);
                            });


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
        case "reverb":
            reverb.wet.value = newValue ? 1 : 0;
            break
        case "autofilter":
            autoFilter.wet.value = newValue ? 1 : 0;
            newValue ? autoFilter.start() : autoFilter.stop();
            break
        case "chorus":
            chorus.wet.value = newValue ? 1 : 0;
            newValue ? chorus.start() : chorus.stop();
            break
        case "autowah":
            autoWah.wet.value = newValue ? 1 : 0;
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