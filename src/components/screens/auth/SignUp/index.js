import React from 'react';
import {inject, observer} from 'mobx-react';
import {Link} from "react-router-dom";
import PageLayout from '../../../common/PageLayout';
import InputWithError from '../../../common/InputGroups/InputWithError';
import PasswordInput from '../../../common/InputGroups/PasswordInput';
import Button from '../../../common/Button';
import Loader from '../../../common/Loader';
import './style.scss';

const SignUpComponent = props => {
    const {
        form,
        error,
        isLoading,
        onChangeInput,
        onSubmitForm
    } = props.signUpStore;

    const handleSubmit = async () => {
        await onSubmitForm();
    }

    return (
        <PageLayout title="Sign up" headerTitle="Sign up">
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
                <PasswordInput
                    name="password"
                    value={form.password}
                    placeholder="Password"
                    labelText="Password"
                    onChange={onChangeInput}
                    errorMsg={error.password}
                    className="auth-inputs"
                />
                <PasswordInput
                    name="repeatPassword"
                    value={form.repeatPassword}
                    placeholder="Repeat Password"
                    labelText="Repeat Pass"
                    onChange={onChangeInput}
                    errorMsg={error.repeatPassword}
                    className="auth-inputs"
                />
                {/* TODO: uncomment this when database with users will be added */}
                {/*<InputWithError*/}
                {/*    name="firstName"*/}
                {/*    value={form.firstName}*/}
                {/*    placeholder="First Name"*/}
                {/*    labelText="FirstName"*/}
                {/*    onChange={onChangeInput}*/}
                {/*    errorMsg={error.firstName}*/}
                {/*    className="auth-inputs"*/}
                {/*/>*/}
                {/*<InputWithError*/}
                {/*    name="lastName"*/}
                {/*    value={form.lastName}*/}
                {/*    placeholder="Last Name"*/}
                {/*    labelText="LastName"*/}
                {/*    onChange={onChangeInput}*/}
                {/*    errorMsg={error.lastName}*/}
                {/*    className="auth-inputs"*/}
                {/*/>*/}
                <div className="action-buttons">
                    <Button
                        text="Sign up"
                        className="auth-btn auth-btn-done"
                        onClick={handleSubmit}
                    />
                    <Link
                        to="/sign-in"
                        className="auth-btn sign-in-link"
                    >Sign in</Link>
                </div>
                { isLoading && <Loader mode="fullscreen" className="auth-loader"/> }
            </div>
        </PageLayout>
    );
}

const SignUp = inject('signUpStore')(observer(SignUpComponent));
export default SignUp;
