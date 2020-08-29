import React from 'react';
import Button from "../Button";

const IncorrectVerificationCodeModal = ({ closeModal }) => (
    <div className="modal-content">
        <div className="modal-title">Incorrect Credentials</div>
        <div className="modal-body">Please, try with your valid credentials!</div>
        <div className="modal-actions">
            <Button
                text="Close"
                onClick={closeModal}
            />
        </div>
    </div>
);

export default IncorrectVerificationCodeModal;
