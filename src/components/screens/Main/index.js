import React from 'react';
import { observer, inject } from 'mobx-react';
import PageLayout from '../../common/PageLayout';

const Main = (props) => {
    const {
        commonStore: {
            currentUser
        }
    } = props;

    return (
        <PageLayout title="Welcome!" headerTitle="Welcome!">
            {currentUser}
            You are logged in!
        </PageLayout>
    )
}

export default inject('commonStore')(observer(Main));
