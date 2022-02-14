import React, { useState } from 'react';
import IntervalTraining from './IntervalTraining/IntervalTraining';
import ChordTraining from './ChordTraining/ChordTraining';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Sidebar from './Sidebar';;

function App() {
  const [currentGame, setCurrentGame] = useState("IntervalTraining");

  function handleGameChange(newGame) {
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
        return <h1>Home Page . . . </h1>
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
