import React from 'react';
import {inject, observer} from 'mobx-react';
import PageLayout from '../../../common/PageLayout';
import InputWithError from '../../../common/InputGroups/InputWithError';
import Button from '../../../common/Button';
import Loader from '../../../common/Loader';
import { modal } from '../../../constants/modal';
import History  from '../../../../routing/history';
import './style.scss';

const SignUpComponent = props => {
    const {
        form,
        error,
        isLoading,
        onChangeInput,
        onSubmitForm
    } = props.signUpStore;
    const { openModalWithSuccessCallback } = props.modalStore;

    const handleSubmit = async () => {
        await onSubmitForm();

        openModalWithSuccessCallback(modal.SUCCESS_REGISTRATION, () => {
            History.push('/sign-in');
        });
    }

    return (
        <PageLayout title="Sign up" headerTitle="NixChat">
            <div className="auth-content">
                <h1 className="auth-page-title">Register</h1>
                <InputWithError
                    name="email"
                    value={form.email}
                    placeholder="Email"
                    labelText="Email"
                    onChange={onChangeInput}
                    errorMsg={error.email}
                    className="auth-inputs"
                />
                <InputWithError
                    name="password"
                    value={form.password}
                    placeholder="Password"
                    labelText="Password"
                    onChange={onChangeInput}
                    errorMsg={error.password}
                    className="auth-inputs"
                />
                <InputWithError
                    name="repeatPassword"
                    value={form.repeatPassword}
                    placeholder="Repeat Password"
                    labelText="Repeat Pass"
                    onChange={onChangeInput}
                    errorMsg={error.repeatPassword}
                    className="auth-inputs"
                />
                <InputWithError
                    name="firstName"
                    value={form.firstName}
                    placeholder="First Name"
                    labelText="FirstName"
                    onChange={onChangeInput}
                    errorMsg={error.firstName}
                    className="auth-inputs"
                />
                <InputWithError
                    name="lastName"
                    value={form.lastName}
                    placeholder="Last Name"
                    labelText="LastName"
                    onChange={onChangeInput}
                    errorMsg={error.lastName}
                    className="auth-inputs"
                />
                <div className="action-buttons">
                    <Button
                        text="Sign up"
                        className="auth-btn-done"
                        onClick={handleSubmit}
                    />
                </div>
                { isLoading && <Loader mode="fullscreen" className="auth-loader"/> }
            </div>
        </PageLayout>
    );
}

const SignUp = inject('signUpStore', 'modalStore')(observer(SignUpComponent));
export default SignUp;
