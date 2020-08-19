import SignUpStore from '../components/screens/auth/SignUp/store';
import ModalStore from '../components/common/Modal/store';

class RootStore {
    signUpStore;
    modalStore;

    constructor() {
        this.signUpStore = new SignUpStore();
        this.modalStore = new ModalStore();
    }
}

export default new RootStore();
