import React from 'react';
import {inject, observer} from 'mobx-react';
import PageLayout from '../../../common/PageLayout';
import InputWithError from '../../../common/InputGroups/InputWithError';
import Button from '../../../common/Button';
import Loader from '../../../common/Loader';

const ConfirmEmailComponent = props => {
    const {
        verificationCode,
        isLoading,
        confirmedEmail,
        onChangeVerificationCode,
        onChangeConfirmedEmail,
        onSubmitVerificationCode,
        onResendConfirmationCode,
        loadVerificationPage,
    } = props.signUpStore;

    loadVerificationPage();

    const handleSubmitCode = async () => {
        await onSubmitVerificationCode();
    }

    const handleSubmitEmail = async () => {
        await onResendConfirmationCode();
    }

    const renderEmailOrCodeInput = () => {
        if (confirmedEmail) {
            return (
                <>
                    <h1 className="auth-page-title">Confirm email</h1>
                    <InputWithError
                        name="verificationCode"
                        value={verificationCode}
                        placeholder="Code"
                        labelText="Verification"
                        onChange={onChangeVerificationCode}
                        className="auth-inputs"
                    />
                    <div className="action-buttons">
                        <Button
                            text="Confirm"
                            className="auth-btn auth-btn-done"
                            onClick={handleSubmitCode}
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
                        value={confirmedEmail}
                        placeholder="email"
                        labelText="Email"
                        onChange={onChangeConfirmedEmail}
                        className="auth-inputs"
                    />
                    <div className="action-buttons">
                        <Button
                            text="Sign in"
                            className="auth-btn auth-btn-done"
                            onClick={handleSubmitEmail}
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

const ConfirmEmail = inject('signUpStore')(observer(ConfirmEmailComponent));
export default ConfirmEmail;
