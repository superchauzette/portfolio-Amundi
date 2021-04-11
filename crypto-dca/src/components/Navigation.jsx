import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    color: '#f1c086',
  },
  iconColor: {
    flexGrow: 1,
    color: '#f1c086',
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Crypto DCA App
          </Typography>
          <Button color="inherit" href='/'>Dashboard</Button>
          <Button color="inherit" href='/dcaControl'>DCA Control</Button>
          <Button color="inherit">Login</Button>
          <IconButton href='/apiParam'>
            <SettingsIcon className={classes.iconColor}/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}