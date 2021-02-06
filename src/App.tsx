import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';

// Components
import { Frame } from './Components/Frame/Frame';

const Hello = () => {
  return (
    <div>
      <h1></h1>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Frame />
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
