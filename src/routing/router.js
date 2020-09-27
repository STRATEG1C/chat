import React from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import history from './history';
import SignUp from '../components/screens/auth/SignUp';
import Modal from '../components/common/Modal';
import SignIn from '../components/screens/auth/SignIn';
import AuthenticatedRoute from '../components/common/AuthenticatedRoute';
import Main from '../components/screens/Main';
import ConfirmEmail from '../components/screens/auth/ConfirmEmail';
import RecoverPassword from '../components/screens/auth/RecoverPassword';
import AddEmail from '../components/screens/auth/AddEmail';
import 'mobx-react-lite/batchingForReactDom';

const Routing = props => {
  return (
      <Router history={history}>
          <Modal />
          <Switch>
              <AuthenticatedRoute exact path="/" component={Main} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/sign-in" component={SignIn} />
              <Route path="/confirm-email" component={ConfirmEmail} />
              <Route path="/add-email" component={AddEmail} />
              <Route path="/recover-password" component={RecoverPassword} />
          </Switch>
      </Router>
  )
};

export default Routing;
