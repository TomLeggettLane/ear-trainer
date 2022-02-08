import React from 'react';
import IntervalTraining from './IntervalTraining/IntervalTraining';
import ChordTraining from './ChordTraining/ChordTraining';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Sidebar from './Sidebar';;



function App() {
  return (
    <Container fluid id="appContainer">
      <Sidebar />
      {/* <IntervalTraining /> */}
      <ChordTraining />
    </Container>
  );
}

export default App;
