import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
    align: 'center',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  hello: {
    boxShadow: 'none',
  },
});

function AppBarNavigation(props) {
  const { classes, loginClick, registerClick } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.hello}>
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>Cool App</Typography>
          <Button color="inherit" onClick={loginClick}>Login</Button>
          <Button color="inherit" onClick={registerClick}>Register</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

AppBarNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
  loginClick: PropTypes.func.isRequired,
  registerClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(AppBarNavigation);
