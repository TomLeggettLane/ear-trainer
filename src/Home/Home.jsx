import React, {useState, useEffect} from 'react';
import { Button , Collapse, Container} from 'react-bootstrap';

function Home(props) {
    return (
        <div className="game">
            <h1 className="game-title">HOME</h1>
            <div className="grid-container">
                <div className="game-button game-card grid-item" onClick={() => props.onClick("IntervalTraining")}>
                    <h3 className="card-title">Interval Training</h3>
                    <i className="fa-solid fa-music fa-7x active"></i>
                    <p className="game-description">Identify the interval between two notes.</p>
                </div>
                <div className="game-button game-card grid-item" onClick={() => props.onClick("ChordTraining")}>
                    <h3 className="card-title">Chord Training</h3>
                    <i className="fa-solid fa-guitar fa-7x active"></i>
                    <p className="game-description">Identify the chord being played.</p>
                </div>
                <div className="game-button game-card grid-item locked unclickable" onClick={props.onClick}>
                    <h3 className="card-title">Chord Progressions</h3>
                    <i className="fa-solid fa-lock fa-7x"></i>
                    <p className="game-description">Identify the Chord Progressions.</p>
                </div>
                <div className="game-button game-card grid-item locked unclickable" onClick={props.onClick}>
                    <h3 className="card-title">Rhythm Training</h3>
                    <i className="fa-solid fa-lock fa-7x"></i>
                    <p className="game-description">Transcribe the rhythm.</p>
                </div>
            </div>
        </div>
    )
}

export default Home;