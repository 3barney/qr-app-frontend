import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import * as base64Img from 'base64-img';

const styles = theme => ({
  center: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    MozTransform: 'translate(-50%, -50%)',
  },
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  input: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  table: {
    minWidth: 700,
  },
});

class OwnDevice extends Component {

  render() {
    const { match, devices } = this.props;
    const serialNumber = match.params.id;
    // const device = 

    const deviceItems = [];
    if (Object.keys(devices).length > 0) {
      Object.keys(devices).forEach((key) => {
        deviceItems.push((devices[key]));
      })
    }

    if (deviceItems.length === 0) {
      return (
        <Paper className={styles.root}>Loading</Paper>
      );
    }

    const item = deviceItems.filter((dev) => {
      if (dev.serialNumber === serialNumber) {
        return dev;
      }
    });

    const singleDevice = item[0];
    return (
      <div>
        <img width ={300} height={300} src={singleDevice.qrString}/>
      </div>
    );
  }
}

OwnDevice.propTypes = {
  classes: PropTypes.any,
  auth: PropTypes.any,
  match: PropTypes.any,
  devices: PropTypes.any,
};

const mapStateToProps = (state) => { return { ...state }; };

export default compose(
  withStyles(styles, { name: 'OwnDevice' }),
  connect(mapStateToProps, null),
)(OwnDevice);
