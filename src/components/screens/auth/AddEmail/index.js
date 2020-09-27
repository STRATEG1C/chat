import React from 'react';
import {inject, observer} from 'mobx-react';
import PageLayout from '../../../common/PageLayout';
import InputWithError from '../../../common/InputGroups/InputWithError';
import Button from '../../../common/Button';
import Loader from '../../../common/Loader';

const AddEmailComponent = props => {
    const {
        isLoading,
        verificationCode,
        mode,
        email,
        callEmailVerification,
        addEmailSubmit,
        handleChangeEmail,
        handleChangeVerificationCode,
    } = props.signInStore;

    const { handleLogout } = props.commonStore;

    const renderEmailOrCodeInput = () => {
        if (mode === 'code') {
            return (
                <>
                    <h1 className="auth-page-title">Enter verification code</h1>
                    <InputWithError
                        name="verificationCode"
                        value={verificationCode}
                        placeholder="Code"
                        labelText="Verification"
                        onChange={handleChangeVerificationCode}
                        className="auth-inputs"
                    />
                    <div className="action-buttons">
                        <Button
                            text="Confirm"
                            className="auth-btn auth-btn-done"
                            onClick={addEmailSubmit}
                        />
                        <Button
                            text="Cancel"
                            className="auth-btn auth-btn-done"
                            onClick={handleLogout}
                        />
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <h1 className="auth-page-title">Enter email</h1>
                    <InputWithError
                        name="confirmedEmail"
                        value={email}
                        placeholder="email"
                        labelText="Email"
                        onChange={handleChangeEmail}
                        className="auth-inputs"
                    />
                    <div className="action-buttons">
                        <Button
                            text="Add"
                            className="auth-btn auth-btn-done"
                            onClick={callEmailVerification}
                        />
                        <Button
                            text="Cancel"
                            className="auth-btn auth-btn-done"
                            onClick={handleLogout}
                        />
                    </div>
                </>
            )
        }
    }

    return (
        <PageLayout title="Email confirmation" headerTitle="Email confirmation">
            <div className="auth-content">
                { renderEmailOrCodeInput() }
                { isLoading && <Loader mode="fullscreen" className="auth-loader"/> }
            </div>
        </PageLayout>
    );
}

const AddEmail = inject('signInStore', 'commonStore')(observer(AddEmailComponent));
export default AddEmail;
