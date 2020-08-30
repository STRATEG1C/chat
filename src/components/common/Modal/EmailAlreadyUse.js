import React from 'react';
import Button from "../Button";

const EmailAlreadyUse = ({ closeModal, successCallback }) => (
    <div className="modal-content">
        <div className="modal-title">Email already used</div>
        <div className="modal-body">This email already used! Please, sign in!</div>
        <div className="modal-actions">
            <Button
                text="Sign in"
                onClick={successCallback}
            />
            <Button
                text="Close"
                onClick={closeModal}
            />
        </div>
    </div>
);

export default EmailAlreadyUse;
