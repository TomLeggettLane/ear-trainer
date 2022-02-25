import React from 'react';
import { Tooltip } from 'react-bootstrap';

function Sidebar(props) {

    function handleClick(e) {
      props.changeGame(e.target.name);
    }

    return (
      <div className="d-flex flex-column flex-shrink-0 p-3 bg-dark" style={{width: 280}} id="sidebar">
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <svg id="ear-trainer-logo" xmlns="http://www.w3.org/2000/svg" width="40" height="32" fill="currentColor" className="bi bi-ear" viewBox="0 0 16 16">
            <path d="M8.5 1A4.5 4.5 0 0 0 4 5.5v7.047a2.453 2.453 0 0 0 4.75.861l.512-1.363a5.553 5.553 0 0 1 .816-1.46l2.008-2.581A4.34 4.34 0 0 0 8.66 1H8.5ZM3 5.5A5.5 5.5 0 0 1 8.5 0h.16a5.34 5.34 0 0 1 4.215 8.618l-2.008 2.581a4.555 4.555 0 0 0-.67 1.197l-.51 1.363A3.453 3.453 0 0 1 3 12.547V5.5ZM8.5 4A1.5 1.5 0 0 0 7 5.5v2.695c.112-.06.223-.123.332-.192.327-.208.577-.44.72-.727a.5.5 0 1 1 .895.448c-.256.513-.673.865-1.079 1.123A8.538 8.538 0 0 1 7 9.313V11.5a.5.5 0 0 1-1 0v-6a2.5 2.5 0 0 1 5 0V6a.5.5 0 0 1-1 0v-.5A1.5 1.5 0 0 0 8.5 4Z"/>
          </svg>
          <span className="fs-4">Ear Trainer</span>
        </a>
        <hr className="text-white"/>
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <a className="nav-link active" id="Home-link" name="Home" onClick={(e) => handleClick(e)}>
            <div className="nav-link-icon">
              <i className="fa-solid fa-house nav-link-icon"></i>
            </div>
              Home
            </a>
          </li>
          <li>
            <a name="IntervalTraining" id="IntervalTraining-link" onClick={(e) => handleClick(e)} className="nav-link text-white">
              <div className="nav-link-icon">
                <i className="fa-solid fa-music"></i>
              </div>
              Note Intervals
            </a>
          </li>
          <li>
            <a name="ChordTraining" id="ChordTraining-link" onClick={(e) => handleClick(e)}  className="nav-link text-white">
            <div className="nav-link-icon">
              <i className="fa-solid fa-guitar"></i>
            </div>
              Chords
            </a>
          </li>
          <li>
            <a className="nav-link locked">
            <div className="nav-link-icon">
              <i className="fa-solid fa-lock locked"></i>
            </div>
              Chord Progressions
            </a>
          </li>
          <li>
            <a className="nav-link locked">
            <div className="nav-link-icon">
              <i className="fa-solid fa-lock locked"></i>
            </div>
              Rhythms
            </a>
          </li>
        </ul>

        <hr/>
        <div className="feedback-grid">
        <a href="https://github.com/TomLeggettLane/ear-trainer" className="feedback-text">GitHub</a>
        <a className="feedback-text">|</a>
        <div className="feedback">
          <a className="feedback-text">Feedback</a>
          <span className="feedback-popup-text">Please contact: tomleggettdev@gmail.com</span>
        </div>
        </div>
  </div>
  )
}

export default Sidebar;


      