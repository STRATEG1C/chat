import { action, observable } from 'mobx';
import AuthenticationService from '../../../../services/AuthenticationService';
import { modal } from '../../../../constants/modal';
import history from '../../../../routing/history';
import LocalStorageService from '../../../../services/LocalStorageService';

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
    localStorageService = new LocalStorageService();

    modalStore;

    constructor(rootStore) {
        this.modalStore = rootStore.modalStore;
    }

    @action
    onLoadSignUp = () => {
        this.form = DEFAULT_FORM;
        this.error = {};
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

        const isValidEmail = !!(email.trim());
        const isValidPassword = !!(email.trim()) && password.trim().length >= 7;
        const isValidRepeatPassword = !!(email.trim()) && password.trim().length >= 7;
        const isPasswordsEquals = repeatPassword.trim() === password.trim();
        const isValidFirstName = !!(firstName.trim());
        const isValidLastName = !!(lastName.trim());

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

            this.localStorageService.save('registrationEmail', email);

            this.modalStore.openModalWithSuccessCallback(modal.SUCCESS_REGISTRATION, () => {
                history.push('/confirm-email?registration=true');
            });
        } catch (error) {
            console.error(error);
            if (error.code === 'UsernameExistsException') {
                this.modalStore.openModalWithSuccessCallback(modal.EMAIL_ALREADY_USE, () => {
                    history.push('/sign-in');
                });
            } else {
                this.modalStore.openModal(modal.SOMETHING_WENT_WRONG);
            }
        } finally {
            this.setIsLoading(false);
        }
    }


    // Verification page

    @observable verificationCode = '';
    @observable tmpMail = '';
    @observable confirmedEmail = this.localStorageService.load('registrationEmail');

    @action
    changeConfirmedEmail = (email) => {
        this.confirmedEmail = email;
    }

    @action
    loadVerificationPage = () => {
        this.confirmedEmail = '';
        this.verificationCode = '';
        this.confirmedEmail = this.localStorageService.load('registrationEmail');
    }

    @action
    onChangeConfirmedEmail = (field, value) => {
        this.tmpMail = value;
    }

    @action
    onResendConfirmationCode = async () => {
        this.setIsLoading(true);

        try {
            await this.authenticationService.resendEmailConfirmation(this.tmpMail);
            this.localStorageService.save('registrationEmail', this.tmpMail);
            this.modalStore.openModal(modal.SUCCESS_REGISTRATION);
            this.changeConfirmedEmail(this.tmpMail);
        } catch (error) {
            console.error(error);
            this.modalStore.openModal(modal.SOMETHING_WENT_WRONG);
        } finally {
            this.setIsLoading(false);
        }
    }

    @action
    onChangeVerificationCode = (field, value) => {
        this.verificationCode = value;
    }

    @action
    onSubmitVerificationCode = async () => {
        this.setIsLoading(true);

        try {
            await this.authenticationService.confirmEmail(this.confirmedEmail, this.verificationCode);
            this.localStorageService.clear('registrationEmail');
            history.push('/sign-in');
        } catch (error) {
            console.error(error);

            if (error.code) {
                this.modalStore.openModal(modal.INCORRECT_VERIFICATION_CODE);
            }
        } finally {
            this.setIsLoading(false);
        }
    }

    // Recover password

    @observable newPassword = '';

    @action
    onCallRecoverPassword = async () => {
        this.setIsLoading(true);

        try {
            await this.authenticationService.callRecoverPassword(this.tmpMail);
            this.localStorageService.save('registrationEmail', this.tmpMail);
            this.modalStore.openModal(modal.SUCCESS_REGISTRATION);
            this.changeConfirmedEmail(this.tmpMail);
        } catch (error) {
            console.error(error);
            this.modalStore.openModal(modal.SOMETHING_WENT_WRONG);
        } finally {
            this.setIsLoading(false);
        }
    }

    @action
    onChangeNewPassword = (field, value) => {
        this.newPassword = value;
    }

    @action
    onSubmitRecoverPassword = async () => {
        this.setIsLoading(true);

        try {
            await this.authenticationService.submitRecoverPassword(this.confirmedEmail, this.verificationCode, this.newPassword);
            this.localStorageService.clear('registrationEmail');
            this.modalStore.openModal(modal.RECOVER_PASSWORD);
            history.push('/sign-in');
        } catch (error) {
            console.error(error);
            this.modalStore.openModal(modal.SOMETHING_WENT_WRONG);
        } finally {
            this.setIsLoading(false);
        }
    }

    @action
    handleReturnBack = () => {
        this.confirmedEmail = '';
        this.localStorageService.clear('registrationEmail');
    }
}

export default SignUpStore;
