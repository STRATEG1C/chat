import React from 'react';
import {Router, Switch, Route, Link} from 'react-router-dom';
import history from './history';
import SignUp from '../components/screens/auth/SignUp';
import Modal from '../components/common/Modal';
import SignIn from '../components/screens/auth/SignIn';
import 'mobx-react-lite/batchingForReactDom';

const Routing = props => {
  return (
      <Router history={history}>
          <Modal />
          <Switch>
              <Route exact path="/" component={() => <div>Main<Link to="/sign-up">Sign up</Link></div>} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/sign-in" component={SignIn} />
          </Switch>
      </Router>
  )
};

export default Routing;
