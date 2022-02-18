import React from "react";

function Score(props) {
    return(
        <div id="scoreBoard">
            <label>Score:</label>
            <br />
            <span id="current-score">{props.currentScore}</span>
            {props.totalQuestions == 0 ? <span></span> : <span id="question-score"> /  {props.totalQuestions}</span>}
        {/* <p>{(props.currentScore / props.totalQuestions).toFixed(2) * 100}%</p> */}
        </div>
    )
}

export default Score;