import React, { useEffect, useCallback } from 'react';


function StartButton(props) {
    return (
        <div className="start-button" onClick={props.onClick}>
            <p className="answer-choice">START</p>
        </div>
    )
}

export default StartButton;