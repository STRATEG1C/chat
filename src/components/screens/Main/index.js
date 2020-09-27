import React from 'react';
import { observer, inject } from 'mobx-react';
import PageLayout from '../../common/PageLayout';
import Button from "../../common/Button";

const Main = (props) => {
    const {
        commonStore: {
            currentUser,
            handleLogout
        }
    } = props;

    let identities = {};
    if (currentUser.identities) {
        identities = JSON.parse(currentUser.identities)[0];
    }

    return (
        <PageLayout title="Welcome!" headerTitle="Welcome!">
            <div className="auth-content">
                <p>You are logged in!</p>
                <ul>
                    <li>Email: <b>{currentUser.email}</b></li>
                    <li>Signed in via: <b>{ identities.providerName || 'email' }</b></li>
                </ul>
                <Button
                    text="Logout"
                    className="auth-btn auth-btn-done"
                    onClick={handleLogout}
                />
            </div>
        </PageLayout>
    )
}

export default inject('commonStore')(observer(Main));
