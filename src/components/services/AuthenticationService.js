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
}

export default AuthenticationService;
