import React, {useEffect} from 'react';
import {inject, observer} from 'mobx-react';
import PageLayout from '../../../common/PageLayout';
import InputWithError from '../../../common/InputGroups/InputWithError';
import Button from '../../../common/Button';
import Loader from '../../../common/Loader';

const RecoverPasswordComponent = props => {
    const {
        verificationCode,
        newPassword,
        isLoading,
        confirmedEmail,
        tmpMail,
        onChangeVerificationCode,
        onChangeConfirmedEmail,
        onSubmitRecoverPassword,
        onCallRecoverPassword,
        onChangeNewPassword,
        loadVerificationPage,
        handleReturnBack
    } = props.signUpStore;

    useEffect(loadVerificationPage, []);

    const handleSubmitCode = async () => {
        await onSubmitRecoverPassword();
    }

    const handleSubmitEmail = async () => {
        await onCallRecoverPassword();
    }

    const renderEmailOrChangePasswordInput = () => {
        if (confirmedEmail) {
            return (
                <>
                    <h1 className="auth-page-title">Change Password</h1>
                    <InputWithError
                        name="verificationCode"
                        value={verificationCode}
                        placeholder="Code"
                        labelText="Code"
                        onChange={onChangeVerificationCode}
                        className="auth-inputs"
                    />
                    <InputWithError
                        name="newPassword"
                        value={newPassword}
                        placeholder="New Password"
                        labelText="New Pass"
                        onChange={onChangeNewPassword}
                        className="auth-inputs"
                    />
                    <div className="action-buttons">
                        <Button
                            text="Confirm"
                            className="auth-btn auth-btn-done"
                            onClick={handleSubmitCode}
                        />
                        <Button
                            text="No code"
                            className="auth-btn auth-btn-done"
                            onClick={handleReturnBack}
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
                        value={tmpMail}
                        placeholder="email"
                        labelText="Email"
                        onChange={onChangeConfirmedEmail}
                        className="auth-inputs"
                    />
                    <div className="action-buttons">
                        <Button
                            text="Confirm"
                            className="auth-btn auth-btn-done"
                            onClick={handleSubmitEmail}
                        />
                    </div>
                </>
            )
        }
    }

    return (
        <PageLayout title="Recover Password" headerTitle="Recover Password">
            <div className="auth-content">
                { renderEmailOrChangePasswordInput() }
                { isLoading && <Loader mode="fullscreen" className="auth-loader"/> }
            </div>
        </PageLayout>
    );
}

const RecoverPassword = inject('signUpStore')(observer(RecoverPasswordComponent));
export default RecoverPassword;
