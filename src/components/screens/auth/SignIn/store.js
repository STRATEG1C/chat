import { action, observable } from 'mobx';
import AuthenticationService from '../../../../services/AuthenticationService';
import UserService from '../../../../services/UserService';
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
    userService = new UserService();

    modalStore;

    constructor(rootStore) {
        this.modalStore = rootStore.modalStore;
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

        const isValidEmail = Boolean(email.trim());
        const isValidPassword = Boolean(email.trim()) && password.trim().length >= 7;

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
            this.userService.setCurrentUser(user);
            history.push('/');
        } catch (error) {
            console.error(error);
            this.modalStore.openModal(modal.INCORRECT_CREDENTIALS);
        } finally {
            this.setIsLoading(false);
        }
    }
}

export default SignInStore;
