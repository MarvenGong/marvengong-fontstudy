import React, { useState, useEffect } from 'react';
import './style.less';
import { Route, Router, Switch } from 'react-router-dom';
import RegisterIndex from './RegisterIndex/index';
import SaasRegister from './SaasRegister';
const Register = (props: any) => {
  const { history = {} } = props;
  return (
    <div className="register-wraper">
      <Router history={history}>
        <Switch>
          <Route exact path="/register" component={RegisterIndex}></Route>
          <Route exact path="/register/saas" component={SaasRegister}></Route>
        </Switch>
      </Router>
    </div>
  );
};
export default Register;
