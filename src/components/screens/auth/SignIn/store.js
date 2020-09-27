import { action, observable } from 'mobx';
import AuthenticationService from '../../../../services/AuthenticationService';
import { modal } from '../../../../constants/modal';
import history from '../../../../routing/history';

const DEFAULT_FORM = {
    email: '',
    password: '',
};

class SignInStore {
    @observable form = DEFAULT_FORM;
    @observable error = {};
    @observable isLoading = false;

    authenticationService = new AuthenticationService();

    modalStore;
    commonStore;

    constructor(rootStore) {
        this.modalStore = rootStore.modalStore;
        this.commonStore = rootStore.commonStore;
    }

    @action
    onLoadSignIn = () => {
        this.form = DEFAULT_FORM;
        this.error = {};
        this.checkCurrentSignIn();
    }

    @action
    checkCurrentSignIn = async () => {
        const user = await this.authenticationService.getCurrentAuthenticatedUser();

        const attributes = user.attributes;
        if (!attributes.email || !attributes.email_verified) {
            return history.push('/add-email');
        }

        this.commonStore.setCurrentUser(attributes);
        history.push('/');
    }

    @action
    setIsLoading = (state) => {
        this.isLoading = state;
    }

    @action
    onChangeInput = (field, value) => {
        this.error[field] = null;
        this.form[field] = value
    }

    @action
    onSubmitForm = async () => {
        if (!this.isValidForm()) {
            return;
        }

        await this.handleSignIn();
    }

    @action
    isValidForm = () => {
        const { form, error } = this;
        const { email, password } = form;

        const isValidEmail = !!(email.trim());
        const isValidPassword = !!(email.trim()) && password.trim().length >= 7;

        !isValidEmail && (error.email = 'Incorrect email');
        !isValidPassword && (error.password = 'Incorrect password');

        return isValidEmail
            && isValidPassword;
    }

    @action
    handleSignIn = async () => {
        this.setIsLoading(true);
        const { email, password } = this.form

        try {
            const user = await this.authenticationService.signIn(email, password);
            this.commonStore.setCurrentUser(user.attributes);
            history.push('/');
        } catch (error) {
            console.log(error);
            if (error.code === 'UserNotConfirmedException') {
                this.modalStore.openModalWithSuccessCallback(modal.EMAIL_NOT_CONFIRMED, () => {
                    history.push('/confirm-email')
                });
            } else {
                this.modalStore.openModal(modal.INCORRECT_CREDENTIALS);
            }
        } finally {
            this.setIsLoading(false);
        }
    }

    handleLoginWithGoogle = async () => {
        await this.authenticationService.socialSignIn('Google');
    }

    handleLoginWithFacebook = async () => {
        await this.authenticationService.socialSignIn('Facebook');
    }

    // Add email

    @observable email = '';
    @observable mode = 'email';
    @observable verificationCode = '';

    @action
    changeMode = (mode) => {
        this.mode = mode;
    }

    @action
    handleChangeEmail = (field, email) => {
        this.email = email;
    }

    @action
    callEmailVerification = async () => {
        this.setIsLoading(true);
        await this.authenticationService.callVerifyAddEmail(this.email);
        this.changeMode('code');
        this.setIsLoading(false);
    }

    @action
    handleChangeVerificationCode = (field, code) => {
        this.verificationCode = code;
    }

    @action
    addEmailSubmit = async () => {
        this.setIsLoading(true);
        await this.authenticationService.submitVerifyAttribute('email', this.verificationCode);
        this.setIsLoading(false);
        this.authenticationService.signOut();
    }
}

export default SignInStore;
