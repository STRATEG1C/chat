import React from 'react';
import { observer, inject } from 'mobx-react';
import { Route } from 'react-router-dom';
import history from '../../../routing/history';

const AuthenticatedRoute = (props) => {
    const {
        exact,
        path,
        component,
        redirect,
        commonStore
    } = props;

    if (commonStore.checkAuth()) {
        return <Route exact={exact} path={path} component={component} />;
    } else if (redirect) {
        history.push(redirect);
    } else {
        history.push('/sign-in');
    }
};

export default inject('commonStore')(observer(AuthenticatedRoute));
