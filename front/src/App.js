import React from 'react';
import './App.css';
import SmartUserList from './view/SmartUserList';

import {HashRouter, Switch, Route} from "react-router-dom";
import SmartQuestionList from './view/SmartQuestionList';
import SmartQuestionDetails from './view/SmartQuestionDetails';

const App = () => (
  <div className="App">
    {/* <nav className="level hero-primary">
    <p className="level-item has-text-centered">
      <a className="link is-info">Home</a>
    </p>
    <p className="level-item has-text-centered">
      <a className="link is-info">Menu</a>
    </p>
    <p className="level-item has-text-centered">
      <img src="../public/stack-overflow.png" />
    </p>
    <p className="level-item has-text-centered">
      <a className="link is-info">Reservations</a>
    </p>
    <p className="level-item has-text-centered">
      <a className="link is-info">Contact</a>
    </p>
  </nav> */}
  <HashRouter>
    <Switch>
      <Route exact={true} component={SmartUserList} path="/"/>
      <Route exact={true} component={SmartQuestionList} path="/questions"/>
      <Route exact={true} component={SmartQuestionDetails} path="/question/:index" />
    </Switch>
  </HashRouter>
    
  </div>
);

export default App;