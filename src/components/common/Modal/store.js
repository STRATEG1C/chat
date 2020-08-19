import { action, observable } from 'mobx';

class ModalStore {
    @observable currentOpenModal = '';
    @observable successCallback = () => {};

    @action
    openModal = (name) => {
        this.currentOpenModal = name;
    }

    @action
    closeModal = () => {
        this.currentOpenModal = '';
    }

    @action
    openModalWithSuccessCallback = (name, successCallback) => {
        this.currentOpenModal = name;
        this.successCallback = successCallback;
    }

    @action
    doSuccessAndCloseModal = () => {
        this.successCallback();
        this.closeModal();
        this.clearSuccessCallback();
    }

    @action
    clearSuccessCallback = () => {
        this.successCallback = () => {};
    }
}

export default ModalStore;
