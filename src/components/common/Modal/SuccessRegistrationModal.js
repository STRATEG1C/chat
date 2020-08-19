import React from 'react';
import Button from "../Button";

const SuccessRegistrationModal = ({ successCallback }) => (
    <div className="modal-content">
        <div className="modal-title">Congratulations!</div>
        <div className="modal-body">You've now joined our community! Go ahead!</div>
        <div className="modal-actions">
            <Button
                text="Login"
                onClick={successCallback}
            />
        </div>
    </div>
);

export default SuccessRegistrationModal;
