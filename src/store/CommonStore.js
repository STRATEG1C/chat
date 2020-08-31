import { action } from 'mobx';
import UserService from '../services/UserService';
import AuthenticationService from '../services/AuthenticationService';
import history from '../routing/history';

class CommonStore {
    userService = new UserService();
    authenticationService = new AuthenticationService();

    currentUser;

    constructor() {
        this.currentUser = this.userService.getCurrentUser();
    }

    @action
    checkAuth = () => {
        return !!this.currentUser;
    }

    @action
    setCurrentUser = (user) => {
        this.currentUser = user;
        this.userService.setCurrentUser(user);
    }

    @action
    clearCurrentUser = () => {
        this.currentUser = null;
        this.userService.clearCurrentUser();
    }

    @action
    handleLogout = async () => {
        try {
            this.clearCurrentUser();
            await this.authenticationService.signOut();
        } catch (error) {
            console.log(error);
        } finally {
            history.push('/sign-in');
        }
    }
}

export default CommonStore;
