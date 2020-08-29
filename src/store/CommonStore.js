import { action } from 'mobx';
import UserService from '../services/UserService';

class CommonStore {
    userService;

    constructor() {
        this.userService = new UserService();
    }

    @action
    checkAuth = () => {
        console.log(this.userService.getCurrentUser());
        return !!this.userService.getCurrentUser();
    }
}

export default CommonStore;
