import SignUpStore from '../components/screens/auth/SignUp/store';
import SignInStore from '../components/screens/auth/SignIn/store';
import ModalStore from '../components/common/Modal/store';
import CommonStore from './CommonStore';

class RootStore {
    modalStore;
    commonStore;
    signUpStore;
    signInStore;

    constructor() {
        this.modalStore = new ModalStore(this);
        this.commonStore = new CommonStore(this);
        this.signUpStore = new SignUpStore(this);
        this.signInStore = new SignInStore(this);
    }
}

export default new RootStore();
