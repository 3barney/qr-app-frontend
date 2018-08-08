import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

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
class DeviceListing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      devices: {},
      open: false,
    };
    this.buttonClicked = this.buttonClicked.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextprops) {
    if (this.props.devices !== nextprops.devices) {
      this.setState({ devices: nextprops.devices });
    }
  }

  handleClose() {
    this.setState({ open: false });
  }
  

  buttonClicked(singleItem) {
    const { qrString } = singleItem;
    this.setState({ open: true })
  }

  render() {
    const { classes } = this.props;
    const { loading, devices } = this.state;
    const deviceItems = [];
    if (Object.keys(devices).length > 0) {
      Object.keys(devices).forEach((key) => {
        deviceItems.push((devices[key]));
      })
    }

    if (deviceItems.length === 0) {
      return (
        <Paper className={classes.root}>No device add One</Paper>
      );
    }

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Device Name</TableCell>
            <TableCell>Manufacturer</TableCell>
            <TableCell>Serial Number</TableCell>
            <TableCell>QR Data</TableCell>
            <TableCell>View QR</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deviceItems.map(n => {
            return (
              <TableRow key={n.serialNumber}>
                <TableCell component="th" scope="row">
                  {n.deviceName}
                </TableCell>
                <TableCell>{n.manufacturer}</TableCell>
                <TableCell>{n.serialNumber}</TableCell>
                <TableCell>
                  {
                    n.qrString.length > 0
                    ? <Typography variant="paragraph" color="inherit" className={classes.flex}>Yes</Typography>
                    : <Typography variant="paragraph" color="inherit" className={classes.flex}>No</Typography>
                  }
                </TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" color="primary" className={classes.button}>
                    <Link className={classes.linkItem} params={{ id: n.serialNumber }} to={`/dashboard/device/single/${n.serialNumber}`}>view</Link>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Dialog onClose={this.handleClose} open={this.state.open}>
        <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
      </Dialog>
      </Paper>
    );
  }
}

DeviceListing.propTypes = {
  classes: PropTypes.any,
  auth: PropTypes.any,
  history: PropTypes.any,
  devices: PropTypes.any,
};

const mapStateToProps = (state) => { return { ...state }; };

export default compose(
  withStyles(styles, { name: 'DeviceListing' }),
  connect(mapStateToProps, null),
)(DeviceListing);
