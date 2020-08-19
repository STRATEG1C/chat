import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import History from './history';
import SignUp from '../components/screens/auth/SignUp';
import Modal from '../components/common/Modal';
import SignIn from '../components/screens/auth/SignIn';

const Routing = props => {
  return (
      <Router history={History}>
          <Modal />
          <Switch>
              <Route exact path="/" component={() => <div>Main</div>} />
              <Route exact path="/sign-up" component={SignUp} />
              <Route exact path="/sign-in" component={SignIn} />
          </Switch>
      </Router>
  )
};

export default Routing;
