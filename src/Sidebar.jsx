import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

function Sidebar() {
    return (
      <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{width: 280}} id="sidebar">
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <svg className="bi me-2" width="40" height="32"><use href="#bootstrap"></use></svg>
          <span className="fs-4">Ear Trainer</span>
        </a>
        <hr/>
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <a href="#" className="nav-link active" aria-current="page">
              <svg className="bi me-2" width="16" height="16"><use href="#home"></use></svg>
              Home
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              <svg className="bi me-2" width="16" height="16"><use href="#speedometer2"></use></svg>
              Note Intervals
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              <svg className="bi me-2" width="16" height="16"><use href="#table"></use></svg>
              Chords
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              <svg className="bi me-2" width="16" height="16"><use href="#grid"></use></svg>
              Chord Progressions
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              <svg className="bi me-2" width="16" height="16"><use href="#people-circle"></use></svg>
              Rhythms
            </a>
          </li>
        </ul>
        <hr/>

  </div>
  )
}

export default Sidebar;


      