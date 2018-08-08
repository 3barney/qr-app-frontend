import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';

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

function loginViewHolder(props) {
  const {
    classes, handleLoginChange, passwordValue, showPassword,
    handleClickShowPassword, handleMouseDownPassword, emailValue,
    onLoginButtonClick, onRegisterButtonClick, error,
  } = props;

  const isValid =
    passwordValue === '' ||
    emailValue === '';

  let serverError = null;
  if (error) {
    serverError = (
      <Typography style={{ color: '#CC0000' }} variant="subheading" gutterBottom>{error}</Typography>
    );
  }

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3" align="center">
          LOGIN
        </Typography>

        <FormControl fullWidth className={classNames(classes.margin, classes.textField)}>
          <InputLabel htmlFor="adornment-email">Email</InputLabel>
          <Input
            id="adornment-email"
            type='email'
            value={emailValue}
            onChange={handleLoginChange('email')}
          />
        </FormControl>

        <div style={{ marginTop: 10 }} />
        <FormControl fullWidth className={classNames(classes.margin, classes.textField)}>
          <InputLabel htmlFor="adornment-password">Password</InputLabel>
          <Input
            id="adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={passwordValue}
            onChange={handleLoginChange('password')}
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
        { serverError }

        <div style={{ marginTop: 10 }} />
        <Button
          size="large"
          fullWidth
          variant="contained"
          color="primary"
          onClick={onLoginButtonClick}
          disabled={isValid}
          className={classes.button}>
            LOGIN
        </Button>
       
        <div style={{ marginTop: 10 }} />
        <Button
          fullWidth
          color="secondary"
          onClick={onRegisterButtonClick}
          className={classes.button}>
            No account, Register here
        </Button>
      </Paper>
    </div>
  );
}

loginViewHolder.propTypes = {
  classes: PropTypes.object.isRequired,
  handleLoginChange: PropTypes.func.isRequired,
  handleClickShowPassword: PropTypes.func.isRequired,
  handleMouseDownPassword: PropTypes.func.isRequired,
  passwordValue: PropTypes.any,
  emailValue: PropTypes.any,
  showPassword: PropTypes.bool.isRequired,
  onLoginButtonClick: PropTypes.func.isRequired,
  onRegisterButtonClick: PropTypes.func.isRequired,
  error: PropTypes.any,
};

export default withStyles(styles)(loginViewHolder);
