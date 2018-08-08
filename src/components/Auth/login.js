import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import LoginViewHolder from '../../containers/loginViewHolder';
import * as authenticationActionsHelpers from '../../thunk/authentication';
import { auth } from '../../firebase';

const styles = ({
  center: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    MozTransform: 'translate(-50%, -50%)',
  },
});

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showPassword: false,
      error: '',
      loading: false,
    };
    this.onChange = this.onChange.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.onLoginButtonClick = this.onLoginButtonClick.bind(this);
    this.onRegisterButtonClick = this.onRegisterButtonClick.bind(this);
  }

  onChange = propertyName => event => {
    this.setState({ [propertyName]: event.target.value, error: '' });
  };

  handleMouseDownPassword = event => { event.preventDefault(); }

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  }

  onLoginButtonClick = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    auth.doSignInWithEmailAndPassword(email, password)
      .then(user => {
        this.setState({ loading: false });
        const { uid } = user.user;
        console.log(uid);
        this.props.history.push('/dashboard');
      })
      .catch(error => {
        this.setState({ loading: false });
        this.setState({ error: error.message });
      });
    // const { dispatch } = this.props;
    // const { email, password } = this.state;
    // if (email.length === 0 || email.length < 5) {
    //   return this.setState({ error: 'Invalid Email Address' });
    // }

    // if (password.length === 0) {
    //   return this.setState({ error: 'Password is required' });
    // }
    // dispatch(authenticationActionsHelpers.loginUser(email, password));
    // // this.props.history.push('/dashboard');
  }

  onRegisterButtonClick = () => { this.props.history.push('/register'); }

  render() {
    if (this.state.loading) {
      return (
        <div style={styles.center}>
          <CircularProgress size={50} />
        </div>
      );
    }

    return (
      <div style={styles.center}>
        <Grid container spacing={24} item xs={12}>
          <LoginViewHolder
            errorMessage={this.state.error}
            emailValue={this.state.emailValue}
            passwordValue={this.state.password}
            handleLoginChange={this.onChange}
            showPassword={this.state.showPassword}
            handleClickShowPassword={this.handleClickShowPassword}
            handleMouseDownPassword={this.handleMouseDownPassword}
            onLoginButtonClick={this.onLoginButtonClick}
            onRegisterButtonClick={this.onRegisterButtonClick}
            error={this.state.error}
          />
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  app: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => { return { ...state }; };

export default connect(mapStateToProps)(Login);
