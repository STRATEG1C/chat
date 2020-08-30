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

    console.log(currentUser);

    return (
        <PageLayout title="Welcome!" headerTitle="Welcome!">
            <div className="auth-content">
                <p>You are logged in!</p>
                <ul>
                    <li>Email: <b>{currentUser.username}</b></li>
                    <li>Signed in via: <b>email</b></li>
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
