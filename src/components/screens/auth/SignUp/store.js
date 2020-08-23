import { action, observable } from 'mobx';
import AuthenticationService from '../../../../services/AuthenticationService';
import { modal } from '../../../../constants/modal';
import history from '../../../../routing/history';

const DEFAULT_FORM = {
    email: '',
    password: '',
    repeatPassword: '',
    firstName: '',
    lastName: ''
};

class SignUpStore {
    @observable form = DEFAULT_FORM;
    @observable error = {};
    @observable isLoading = false;

    authenticationService = new AuthenticationService();

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

        await this.handleRegister();
    }

    @action
    isValidForm = () => {
        const { form, error } = this;
        const { email, password, repeatPassword, firstName, lastName } = form;

        const isValidEmail = Boolean(email.trim());
        const isValidPassword = Boolean(email.trim()) && password.trim().length >= 7;
        const isValidRepeatPassword = Boolean(email.trim()) && password.trim().length >= 7;
        const isPasswordsEquals = repeatPassword.trim() === password.trim();
        const isValidFirstName = Boolean(firstName.trim());
        const isValidLastName = Boolean(lastName.trim());

        !isValidEmail && (error.email = 'Incorrect email');
        !isValidPassword && (error.password = 'Password must be 7 or more symbols');
        !isValidRepeatPassword && (error.repeatPassword = 'Passwords must match');
        !isPasswordsEquals && (error.repeatPassword = 'Passwords must match');
        !isValidFirstName && (error.firstName = 'Incorrect first name');
        !isValidLastName && (error.lastName = 'Incorrect last name');

        return isValidEmail
            && isValidPassword
            && isValidRepeatPassword
            && isPasswordsEquals
            // TODO: uncomment this when database with users will be added
            // && isValidFirstName
            // && isValidLastName;
    }

    @action
    handleRegister = async () => {
        this.setIsLoading(true);
        const { email, password } = this.form

        try {
            await this.authenticationService.signUp(email, password);

            this.modalStore.openModalWithSuccessCallback(modal.SUCCESS_REGISTRATION, () => {
                history.push('/sign-in');
            });
        } catch (error) {
            console.error(error);
            this.modalStore.openModal(modal.SOMETHING_WENT_WRONG);
        } finally {
            this.setIsLoading(false);
        }
    }
}

export default SignUpStore;
