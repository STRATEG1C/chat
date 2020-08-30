import React from 'react';
import Button from "../Button";

const EmailNotConfirmed = ({ closeModal, successCallback }) => (
    <div className="modal-content">
        <div className="modal-title">Email not confirmed</div>
        <div className="modal-body">Email is not confirmed. You should confirm email to be able to sign in. Please, confirm your email!</div>
        <div className="modal-actions">
            <Button
                text="Confirm"
                onClick={successCallback}
            />
            <Button
                text="Close"
                onClick={closeModal}
            />
        </div>
    </div>
);

export default EmailNotConfirmed;
