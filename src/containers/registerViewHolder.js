import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import classNames from 'classnames';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
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

function createInputElements(classs, value, labelName, type, onChangeHandler) {
  let lastItem;
  let firstItem;
  let newString;
  const items = labelName.split(' ');
  if (items.length && items.length > 1) {
    lastItem = items[1].charAt(0).toUpperCase() + items[1].slice(1);
    firstItem = items[0].charAt(0).toLowerCase() + items[0].slice(1);
    newString = firstItem.concat(lastItem);
  } else {
    newString = labelName.charAt(0).toLowerCase() + labelName.slice(1);
  }

  const label = `adornment-${newString}`;
  return (
    <FormControl fullWidth className={classNames(classs.margin, classs.textField)}>
      <InputLabel htmlFor={label}>{labelName}</InputLabel>
      <Input
        id={label}
        type={type}
        value={value}
        onChange={onChangeHandler(newString)}
      />
    </FormControl>
  );
}

function registerViewHolder(props) {
  const {
    classes, handleRegisterChange, firstName, lastName, email, idNumber,
    phoneNumber, password, confirmPassword, handleClickShowPassword, handleMouseDownPassword,
    showPassword, navigateToLogin, onRegisterButtonClick,
  } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3" align="center">
          REGISTER.
        </Typography>

        { createInputElements(classes, firstName, 'First Name', 'text', handleRegisterChange) }
        <div style={{ marginTop: 10 }} />

        { createInputElements(classes, lastName, 'Last Name', 'text', handleRegisterChange) }
        <div style={{ marginTop: 10 }} />

        { createInputElements(classes, email, 'Email', 'email', handleRegisterChange) }
        <div style={{ marginTop: 10 }} />

        { createInputElements(classes, idNumber, 'Id Number', 'number', handleRegisterChange) }
        <div style={{ marginTop: 10 }} />

        { createInputElements(classes, phoneNumber, 'Phone Number', 'number', handleRegisterChange) }
        <div style={{ marginTop: 10 }} />

        <FormControl fullWidth className={classNames(classes.margin, classes.textField)}>
          <InputLabel htmlFor="adornment-password">Password</InputLabel>
          <Input
            id="adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handleRegisterChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl fullWidth className={classNames(classes.margin, classes.textField)}>
          <InputLabel htmlFor="adornment-confirm-password">Confirm Password</InputLabel>
          <Input
            id="adornment-confirm-password"
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={handleRegisterChange('confirmPassword')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <div style={{ marginTop: 10 }} />


        <Button
          size="large"
          fullWidth
          variant="contained"
          color="primary"
          onClick={onRegisterButtonClick}
          className={classes.button}>
            REGISTER
        </Button>

        <Button
          fullWidth
          color="secondary"
          onClick={navigateToLogin}
          className={classes.button}>
            Have an account, Login here
        </Button>
      </Paper>
    </div>
  );
}

registerViewHolder.propTypes = {
  classes: PropTypes.object.isRequired,
  handleRegisterChange: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  idNumber: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  showPassword: PropTypes.bool.isRequired,
  handleClickShowPassword: PropTypes.func.isRequired,
  handleMouseDownPassword: PropTypes.func.isRequired,
  navigateToLogin: PropTypes.func.isRequired,
  onRegisterButtonClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(registerViewHolder);
