import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import './App.global.css';

// Components
import { Frame } from './Components/Frame/Frame';
import { AppContainer } from './Components/AppContainer/AppContainer';

export default function App() {
  return (
    <HashRouter>
      <Frame />
      <AppContainer />
    </HashRouter>
  );
}
