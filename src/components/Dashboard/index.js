import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { Route, Link, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import StarBorder from '@material-ui/icons/StarBorder';

import DeviceListing from '../Devices';
import AddDevice from '../Devices/addDevice';
import OwnDevice from '../Devices/ownDevice';
import { auth } from '../../firebase';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    position: 'fixed',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  toolbar: theme.mixins.toolbar,
  linkItem: {
    color: '#424242',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
  },
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDevice: true,
      redirect: false,
      devices: {},
    };
    this.handleDeviceMenu = this.handleDeviceMenu.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  componentDidMount() {
    const userDevices = firebase.database().ref('devices/');
    userDevices.orderByKey().on('child_added', (data) => {
      this.setState({ devices: data.val() });
    });
  }

  handleDeviceMenu = () => { this.setState({ openDevice: !this.state.openDevice }); }

  logoutUser = () => {
    auth.doSignOut();
    this.setState({ redirect: true });
  }

  render() {
    const { classes, auth } = this.props;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            {auth.authUser
              ? <Typography variant="title" color="inherit" className={classes.flex}>Welcome {auth.authUser.email}</Typography>
              : <Typography variant="title" color="inherit" className={classes.flex}>Welcome Guest</Typography>              
            }
            <div>
              {/* <IconButton
                aria-owns='menu-appbar'
                color="inherit"
                position ="static"
              >
                <AccountCircle />
              </IconButton> */}
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <List component="nav">
            <ListItem
              button
              onClick={this.handleDeviceMenu}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText inset primary="My Devices"></ListItemText>
              {this.state.openDevice ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.openDevice} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText inset><Link className={classes.linkItem} to="/dashboard">List</Link></ListItemText>
                </ListItem>

                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText inset><Link className={classes.linkItem} to="/dashboard/device">Add Device</Link></ListItemText>
                </ListItem>
              </List>
            </Collapse>


            <ListItem button>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Drafts" />
            </ListItem>

            <ListItem button onClick={this.logoutUser}>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText inset>Logout</ListItemText>
            </ListItem>
          </List>
          {/* <Divider /> */}
        </Drawer>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Route
            exact
            path='/dashboard'
            render={(props) => (
              <DeviceListing {...props} devices={this.state.devices}/>
            )}            
          />
          <Route
            exact
            path='/dashboard/device'
            component={AddDevice}
          />
          <Route
            exact
            path='/dashboard/device/single/:id'
            render={(props) => (
              <OwnDevice {...props} devices={this.state.devices} />
            )}
          />
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => { return { ...state }; };

export default compose(
  withStyles(styles, { name: 'Dashboard' }),
  connect(mapStateToProps, null),
)(Dashboard);

