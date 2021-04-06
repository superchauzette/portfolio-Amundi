import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Dashboard, DCAControl, ApiParam } from "./components";


function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Dashboard />} />
          <Route path="/dcaControl" exact component={() => <DCAControl />} />
          <Route path="/apiParam" exact component={() => <ApiParam />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;