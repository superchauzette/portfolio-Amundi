import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Navigation, Dashboard, DCAControl, ApiParam } from "./components";
import { AuthProvider, useAuth } from "./components/Auth";
import { Orders } from "./components/Orders";

import "./App.css";
import { Flex, Box } from "reflexbox";
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import { makeStyles, ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000"
    }
  },
})


function App() {
  return (
    <ThemeProvider>
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
      </ThemeProvider>
  );
}

export default App;

function Init({ children }) {
  const { user, loading, login } = useAuth();

  if (loading) return <p>...Loading</p>;
  if (user) return children;

  return (
    <Flex pt={1} m={1} flexDirection="column" width="100%" justifyContent="center" alignItems="center">
      <div style={{ width: "100%", height: "400px", padding: " 10px ", textAlign: "center" }}>
        <h2>Welcome on Crypto-DCA</h2>
        <h5>Make automatic trade on cryptocurrencies with your Binance account with DCA method (Dollar Cost Average)</h5>
        <img src="Bitcoin-Logo.png" className="logoBinance" ></img>
      </div>
      <div style={{ width: "100%", height: "100px", padding: " 30px ", textAlign: "center" }}>
        <h6>Login with your Google account to make yout first automation</h6>
      </div>
      <button onClick={login}> <VpnKeyIcon /> Login with Google</button>
      
    </Flex>
  );
}
