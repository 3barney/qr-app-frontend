import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import RegisterViewHolder from '../../containers/registerViewHolder';

const styles = ({
  center: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    MozTransform: 'translate(-50%, -50%)',
  },
});

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      idNumber: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
    };
    this.onChange = this.onChange.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    this.navigateToLogin = this.navigateToLogin.bind(this);
    this.onRegisterButtonClick = this.onRegisterButtonClick.bind(this);
  }

  onChange = propertyName => event => {
    console.log("Props", propertyName)
    this.setState({ [propertyName]: event.target.value });
  }

  handleMouseDownPassword = event => { event.preventDefault(); }

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  }

  navigateToLogin = () => { this.props.history.push('/login'); }

  onRegisterButtonClick = () => {
    // TODO: // TODO: 
    this.props.history.push('/dashboard');
  }

  render() {
    return (
      <div style={styles.center}>
        <Grid container spacing={24} item xs={12}>
          <RegisterViewHolder
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            email={this.state.email}
            idNumber={this.state.idNumber}
            phoneNumber={this.state.phoneNumber}
            password={this.state.password}
            confirmPassword={this.state.confirmPassword}
            handleRegisterChange={this.onChange}
            handleClickShowPassword={this.handleClickShowPassword}
            handleMouseDownPassword={this.handleMouseDownPassword}
            showPassword={this.state.showPassword}
            navigateToLogin={this.navigateToLogin}
            onRegisterButtonClick={this.onRegisterButtonClick}
          />
        </Grid>
      </div>
    );
  }
}

Register.propTypes = {
  app: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => { return { ...state }; };

export default connect(mapStateToProps)(Register);
