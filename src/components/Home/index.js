import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import purple from '@material-ui/core/colors/purple';

import AppBarNavigation from '../../containers/appbar';

const styles = ({
  root: {
    flexGrow: 1,
    display: 'grid',
  },
  element: {
    position: 'fixed',
    left: '50%',
    transform: 'translate(-50%)',
    MozTransform: 'translate(-50%)',
    width: 960,
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { dummy: false };
    this.onLoginClick = this.onLoginClick.bind(this);
  }

  onLoginClick = () => {
    this.props.history.push('/login');
  }

  onRegisterClick = () => {
    this.props.history.push('/register');
  }

  render() {
    return (
      <div style={styles.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <div style={{ height: 64, backgroundColor: purple[500] }}>
              <div style={styles}>
                <AppBarNavigation
                  loginClick={this.onLoginClick}
                  registerClick={this.onRegisterClick}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Home.propTypes = {
  app: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => { return { ...state }; };

export default connect(mapStateToProps)(Home);
