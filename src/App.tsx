import React from 'react';
import './App.global.css';

// Components
import { Frame } from './Components/Frame/Frame';
import { AppContainer } from './Components/AppContainer/AppContainer';
import { HashRouter } from 'react-router-dom';

export default function App() {
  return (
    <HashRouter>
      <Frame />
      <AppContainer />
    </HashRouter>
  );
}
