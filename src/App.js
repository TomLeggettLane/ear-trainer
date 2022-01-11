import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

import Sidebar from './Sidebar';
import Footer from './Footer';
import Game from './Game';



function App() {
  return (
    <Container fluid id="appContainer">
      <Sidebar />
      <Game />
    </Container>
  );
}

export default App;
