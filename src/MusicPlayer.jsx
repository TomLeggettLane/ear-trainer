import React, { useState } from 'react';

function MusicPlayer(props) {
    
    function handleClick() {
        props.setPlaying(!props.playing);
        props.playQuestionSound();
    }

    return(
        <div className="circle">
            <button id="circle-btn" className={ props.playing ? "animated-circle-border spin" : "spin" } onClick={handleClick}>
            { props.playing ? <i className="fas fa-pause music-btn"></i> : <i className="fas fa-play music-btn"></i> }</button>
        </div>
    )
}

export default MusicPlayer;