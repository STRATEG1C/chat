import React from 'react';
import Button from "../Button";

const RecoverPassword = ({ closeModal }) => (
    <div className="modal-content">
        <div className="modal-title">Password Changes!</div>
        <div className="modal-body">Your password was successfully changed!</div>
        <div className="modal-actions">
            <Button
                text="Close"
                onClick={closeModal}
            />
        </div>
    </div>
);

export default RecoverPassword;
