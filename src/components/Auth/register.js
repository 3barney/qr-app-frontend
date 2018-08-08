import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import RegisterViewHolder from '../../containers/registerViewHolder';
import { auth, db } from '../../firebase';

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
      email: '',
      idNumber: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      error: '',
      loading: false,
    };
    this.onChange = this.onChange.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    this.navigateToLogin = this.navigateToLogin.bind(this);
    this.onRegisterButtonClick = this.onRegisterButtonClick.bind(this);
  }

  onChange = propertyName => event => {
    this.setState({ error: '' });
    this.setState({ [propertyName]: event.target.value });
  }

  handleMouseDownPassword = event => { event.preventDefault(); }

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  }

  navigateToLogin = () => { this.props.history.push('/login'); }

  onRegisterButtonClick = () => {
    this.setState({ loading: true });
    const { firstName, email, idNumber, phoneNumber, password } = this.state;
    auth.doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        return db.doCreateUser(authUser.user.uid, firstName, email, idNumber, phoneNumber);
      })
      .then(updatedData => {
        this.setState({ loading: false });
        this.props.history.push('/dashboard');
      })
      .catch(error => {
        this.setState({ error: error.message, loading: false });
      });
  }

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
          <RegisterViewHolder
            firstName={this.state.firstName}
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
            error={this.state.error}
            loading={this.state.loading}
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
