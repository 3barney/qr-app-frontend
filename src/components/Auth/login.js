import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import LoginViewHolder from '../../containers/loginViewHolder'; 

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
    };
    this.onChange = this.onChange.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.onLoginButtonClick = this.onLoginButtonClick.bind(this);
    this.onRegisterButtonClick = this.onRegisterButtonClick.bind(this);
  }

  onChange = propertyName => event => {
    this.setState({ [propertyName]: event.target.value });
  };

  handleMouseDownPassword = event => { event.preventDefault(); }

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  }

  onLoginButtonClick = () => {
    // TODO: Pick state value, check for null, set errors
    // aand send to action
    this.props.history.push('/dashboard');
  }

  onRegisterButtonClick = () => { this.props.history.push('/register'); }

  render() {
    return (
      <div style={styles.center}>
        <Grid container spacing={24} item xs={12}>
          <LoginViewHolder
            emailValue={this.state.emailValue}
            passwordValue={this.state.password}
            handleLoginChange={this.onChange}
            showPassword={this.state.showPassword}
            handleClickShowPassword={this.handleClickShowPassword}
            handleMouseDownPassword={this.handleMouseDownPassword}
            onLoginButtonClick={this.onLoginButtonClick}
            onRegisterButtonClick={this.onRegisterButtonClick}
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
