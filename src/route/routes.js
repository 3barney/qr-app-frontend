import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Home from '../components/Home';
import Login from '../components/Auth/login';
import Register from '../components/Auth/register';
import Dashboard from '../components/Dashboard';

export default class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    );
  }
}