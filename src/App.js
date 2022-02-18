import React, { useState } from 'react';
import IntervalTraining from './IntervalTraining/IntervalTraining';
import ChordTraining from './ChordTraining/ChordTraining';
import Home from './Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Sidebar from './Sidebar';

function App() {
  const [currentGame, setCurrentGame] = useState("Home");

  function handleGameChange(newGame) {
    Array.from(document.querySelectorAll('.nav-link')).forEach((el) => el.classList.remove('active'));
    document.getElementById(newGame + "-link").classList.add('active');
    console.log(newGame);
    setCurrentGame(newGame);
  }

  function getGameComponent() {
    switch (currentGame) {
      case "IntervalTraining":
        return <IntervalTraining /> 
      case "ChordTraining": 
        return <ChordTraining />
      case "Home":
        return <Home 
                  onClick={handleGameChange}
              />
    }
  }

  return (
    <Container fluid id="appContainer">
      <Sidebar 
        changeGame={handleGameChange}
      />
      { getGameComponent() }
    </Container>
  );
}

export default App;
