import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Navigation, Dashboard, DCAControl, ApiParam } from "./components";
import { AuthProvider, useAuth } from "./components/Auth";
import { Orders } from "./components/Orders";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Init>
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
              <Route path="/orders">
                <Orders />
              </Route>
            </Switch>
          </Router>
        </div>
      </Init>
    </AuthProvider>
  );
}

export default App;

function Init({ children }) {
  const { user, loading, login } = useAuth();

  if (loading) return <p>...loading</p>;
  if (user) return children;

  return (
    <div>
      Hello c'est l'ap de la mort qui tue
      <button onClick={login}>Auth</button>
    </div>
  );
}
