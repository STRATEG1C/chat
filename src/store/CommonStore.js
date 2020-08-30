import { action, computed } from 'mobx';
import UserService from '../services/UserService';
import AuthenticationService from '../services/AuthenticationService';
import history from '../routing/history';

class CommonStore {
    userService = new UserService();
    authenticationService = new AuthenticationService();

    @computed
    get currentUser() {
        return this.userService.getCurrentUser();
    }

    @action
    checkAuth = () => {
        return !!this.userService.getCurrentUser();
    }

    @action
    handleLogout = async () => {
        try {
            this.userService.clearCurrentUser();
            await this.authenticationService.signOut();
        } catch (error) {
            console.log(error);
        } finally {
            history.push('/sign-in');
        }
    }
}

export default CommonStore;
