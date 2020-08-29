import React from 'react';
import {inject, observer} from 'mobx-react';
import {Link} from 'react-router-dom';
import PageLayout from '../../../common/PageLayout';
import InputWithError from '../../../common/InputGroups/InputWithError';
import PasswordInput from '../../../common/InputGroups/PasswordInput';
import Button from '../../../common/Button';
import Loader from '../../../common/Loader';

const SignInComponent = props => {
    const {
        form,
        error,
        isLoading,
        onChangeInput,
        onSubmitForm,
    } = props.signInStore;

    const handleSubmit = async () => {
        await onSubmitForm();
    }

    return (
        <PageLayout title="Sign in" headerTitle="Sign in">
            <div className="auth-content">
                <h1 className="auth-page-title">Sign In</h1>
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
                <div className="action-buttons">
                    <Button
                        text="Sign in"
                        className="auth-btn auth-btn-done"
                        onClick={handleSubmit}
                    />
                    <Link
                        to="/sign-up"
                        className="auth-btn sign-in-link"
                    >Sign up</Link>
                </div>
                { isLoading && <Loader mode="fullscreen" className="auth-loader"/> }
            </div>
        </PageLayout>
    );
}

const SignUp = inject('signInStore')(observer(SignInComponent));
export default SignUp;
