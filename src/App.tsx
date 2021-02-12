import React from 'react';
import './App.global.css';

// Components
import { Frame } from './Components/Frame/Frame';
import { AppContainer } from './Components/AppContainer/AppContainer';

export default function App() {
  return (
    <div>
      <Frame />
      <AppContainer />
    </div>
  );
}
