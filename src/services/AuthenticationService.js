import { Auth } from 'aws-amplify';

class AuthenticationService {
    _provider = Auth;

    async signUp(email, password, attributes) {
        return await this._provider.signUp(email, password, attributes);
    }

    async signIn(email, password) {
        return await this._provider.signIn(email, password);
    }

    async signOut() {
        return await this._provider.signOut({ global: true });
    }

    async confirmEmail(email, code) {
        return await this._provider.confirmSignUp(email, code);
    }

    async resendEmailConfirmation(email) {
        return await this._provider.resendSignUp(email);
    }

    async callRecoverPassword(email) {
        return await this._provider.forgotPassword(email);
    }

    async submitRecoverPassword(email, code, newPassword) {
        return await this._provider.forgotPasswordSubmit(email, code, newPassword);
    }

    async socialSignIn(provider) {
        return await this._provider.federatedSignIn({ provider });
    }

    async getCurrentAuthenticatedUser() {
        return await this._provider.currentAuthenticatedUser({
            bypassCache: false,
        });
    }

    async callVerifyAddEmail(email) {
        const currentUser = await this._provider.currentAuthenticatedUser();
        return await this._provider.updateUserAttributes(currentUser, {
            email
        });
    }

    async submitVerifyAttribute(attr, code) {
        const currentUser = await this._provider.currentAuthenticatedUser();
        await this._provider.updateUserAttributes(currentUser, {
            'custom:is_verified': '1'
        });
        await this._provider.verifyCurrentUserAttributeSubmit(attr, code);
    }
}

export default AuthenticationService;

