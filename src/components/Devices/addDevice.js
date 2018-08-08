import React, { Component } from 'react';
import QRCode from 'qrcode';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';

import { db } from '../../firebase';


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
});

class AddDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceName: '',
      serialNumber: '',
      manufacturer: '',
      error: '',
      loading: false,
      open: false,
    }
    this.handleItemChange = this.handleItemChange.bind(this);
    this.onSaveButtonClicked = this.onSaveButtonClicked.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleItemChange = propertyName => event => {
    this.setState({ [propertyName]: event.target.value, error: '' });
  };

  onSaveButtonClicked = () => {
    this.setState({ loading: true });
    const { deviceName, serialNumber, manufacturer } = this.state;
    const { auth } = this.props;
    const userID = auth.authUser.uid;
    const deviceString = `${serialNumber}#${userID}`;
    let info;
    QRCode.toDataURL(deviceString)
      .then((data) => {
        return data;
      })
      .then((qrString) => {
        info = { userID, deviceName, serialNumber, manufacturer, qrString }
        return db.doCreateUserDevice(userID, deviceName, serialNumber, manufacturer, qrString);
      })
      .then((saveResponse) => {
        this.setState({ loading: false, open: true })
        setTimeout(() => {
          this.props.history.push('/dashboard');
        }, 1000);
      })
      .catch(error => {
        this.setState({ loading: false });
        this.setState({ error: error.message });
      })
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { deviceName, serialNumber, manufacturer, error, loading } = this.state;
  
    const isValid =
        deviceName === '' ||
        serialNumber === '' ||
        manufacturer === '';

    let errorDisplay = null;
    if (error) {
      errorDisplay = (
        <Typography style={{ color: '#CC0000' }} variant="subheading" gutterBottom>{error}</Typography>
      );
    }
    return (
      <div style={styles.center}>
        <Paper className={classes.root} elevation={4}>
          <Typography variant="headline" component="h3" align="center">
            Register a new Device
          </Typography>

          <FormControl fullWidth className={classNames(classes.margin, classes.textField)}>
            <InputLabel htmlFor="adornment-email">Device Name</InputLabel>
            <Input
              id="name"
              type='text'
              value={deviceName}
              onChange={this.handleItemChange('deviceName')}
            />
          </FormControl>

          <div style={{ marginTop: 10 }} />
          <FormControl fullWidth className={classNames(classes.margin, classes.textField)}>
            <InputLabel>Device Serial Number</InputLabel>
            <Input id='serialNumber' type='text' value={serialNumber}
              onChange={this.handleItemChange('serialNumber')}
            />
          </FormControl>
        
          <div style={{ marginTop: 10 }} />
          <FormControl fullWidth className={classNames(classes.margin, classes.textField)}>
            <InputLabel>Device manufacturer</InputLabel>
            <Input id='manufacturer' type='text' value={manufacturer}
              onChange={this.handleItemChange('manufacturer')}
            />
          </FormControl>

          <div style={{ marginTop: 10 }} />
          {errorDisplay}

          <div style={{ marginTop: 10 }} />
          {
            loading
              ? <CircularProgress size={50} />
              :
                <Button
                size="large"
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.onSaveButtonClicked}
                disabled={isValid}
                className={classes.button}>
                  SAVE
              </Button>
          }
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            open={this.state.open}
            onClose={this.handleClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Device Saved Successfully</span>}
          />
        </Paper>
      </div>
    );
  }
}

AddDevice.propTypes = {
  classes: PropTypes.any,
  auth: PropTypes.any,
  history: PropTypes.any,
};

const mapStateToProps = (state) => { return { ...state }; };

export default compose(
  withStyles(styles, { name: 'AddDevice' }),
  connect(mapStateToProps, null),
)(AddDevice);

