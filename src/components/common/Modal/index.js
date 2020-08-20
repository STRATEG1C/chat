import React from 'react';
import { observer, inject } from 'mobx-react';
import SuccessRegistrationModal from './SuccessRegistrationModal';
import { modal } from '../../../constants/modal';
import './style.scss';

const modals = {
    [modal.SUCCESS_REGISTRATION]: SuccessRegistrationModal
}

const ModalComponent = (props) => {
    const {
        modalStore: {
            doSuccessAndCloseModal,
            currentOpenModal,
            closeModal,
        },
    } = props;

    const ShowedModal = modals[currentOpenModal];

    if (!ShowedModal) {
        return <></>;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <ShowedModal
                    closeModal={closeModal}
                    successCallback={doSuccessAndCloseModal}
                />
            </div>
        </div>
    )
}

const Modal = inject('modalStore')(observer(ModalComponent));
export default Modal;
