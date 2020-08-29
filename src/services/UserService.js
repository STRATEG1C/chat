import LocalStorageService from "./LocalStorageService";

class UserService {
    _currentUser;
    _localStorageService;

    constructor() {
        this._localStorageService = new LocalStorageService();

        this.loadCurrentUser();
    }

    loadCurrentUser() {
        this._currentUser = this._localStorageService.load('currentUser');
    }

    setCurrentUser(user) {
        this._localStorageService.save('currentUser', user);
    }

    clearCurrentUser() {
        this._localStorageService.clear('currentUser');
    }

    getCurrentUser() {
        return this._currentUser;
    }
}

export default UserService;
