import SignUpStore from '../components/screens/auth/SignUp/store';
import ModalStore from '../components/common/Modal/store';

class RootStore {
    signUpStore;
    modalStore;

    constructor() {
        this.modalStore = new ModalStore(this);
        this.signUpStore = new SignUpStore(this);
    }
}

export default new RootStore();
