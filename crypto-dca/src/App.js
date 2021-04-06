import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Navigation,
  Footer,
  Dashboard,
  DCAControl,
  ApiParam,
} from "./components";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact>
            <Dashboard />
          </Route>
          <Route path="/dcaControl">
            <DCAControl />
          </Route>
          <Route path="/apiParam">
            <ApiParam />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
