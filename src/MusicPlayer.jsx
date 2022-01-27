import React, { useState } from 'react';

function MusicPlayer(props) {
    const [playing, setPlaying] = useState(false);
    
    function handleClick() {
        setPlaying(!playing);
        props.playQuestionSound();
    }

    return(
        <div className="circle">
            <button id="circle-btn" className={ playing ? "animated-circle-border spin" : "spin" } onClick={handleClick}>
            { playing ? <i className="fas fa-pause music-btn"></i> : <i className="fas fa-play music-btn"></i> }</button>
        </div>
    )
}

export default MusicPlayer;