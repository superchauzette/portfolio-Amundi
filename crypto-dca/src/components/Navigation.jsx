import React from "react";
import { makeStyles, } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SettingsIcon from "@material-ui/icons/Settings";
import { NavLink } from "react-router-dom";
import { useAuth } from "./Auth";
import { Box } from "reflexbox";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    color: "#FF9416",
  },
  iconColor: {
    flexGrow: 1,
    color: "#FF9416",
  },
}));



export function Navigation() {
  const classes = useStyles();
  const { logout } = useAuth();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Crypto DCA
          </Typography>
          <Box px={2} />
          <NavLink to="/">Dashboard</NavLink>
          <Box px={2} />
          <NavLink to="/orders">Orders</NavLink>
          <Box px={2} />
          <NavLink to="/dcaControl">DCA Control</NavLink>
          <Box px={2} />
          <NavLink to="/apiParam">
            <SettingsIcon className={classes.iconColor} />
          </NavLink>
          <Box px={2} />
          <button onClick={logout}>Logout</button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
