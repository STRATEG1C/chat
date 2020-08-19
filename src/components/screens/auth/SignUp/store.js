import { action, observable } from 'mobx';
import AuthenticationService from '../../../services/AuthenticationService';
import ModalStore from '../../../common/Modal/store';

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
    modalStore = new ModalStore();

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
        const isValidPassword = Boolean(password.trim());
        const isValidRepeatPassword = Boolean(repeatPassword.trim());
        const isPasswordsEquals = repeatPassword.trim() === password.trim();
        const isValidFirstName = Boolean(firstName.trim());
        const isValidLastName = Boolean(lastName.trim());

        !isValidEmail && (error.email = 'Incorrect email');
        !isValidPassword && (error.password = 'Incorrect password');
        !isValidRepeatPassword && (error.repeatPassword = 'Passwords must match');
        !isPasswordsEquals && (error.repeatPassword = 'Passwords must match');
        !isValidFirstName && (error.firstName = 'Incorrect first name');
        !isValidLastName && (error.lastName = 'Incorrect last name');

        return isValidEmail
            && isValidPassword
            && isValidRepeatPassword
            && isPasswordsEquals
            && isValidFirstName
            && isValidLastName;
    }

    @action
    handleRegister = async () => {
        const { email, password, firstName, lastName } = this.form
        this.isLoading = true;

        try {
            await this.authenticationService.signUp(email, password);
            History.push('/sign-in');
        } catch (error) {
            console.error(error);
        } finally {
            this.isLoading = false;
        }
    }
}

export default SignUpStore;
