import React from 'react';
import Button from "../Button";

const SomethingWentWrongModal = ({ closeModal }) => (
    <div className="modal-content">
        <div className="modal-title">Oops...</div>
        <div className="modal-body">Something went wrong... try again...</div>
        <div className="modal-actions">
            <Button
                text="Close"
                onClick={closeModal}
            />
        </div>
    </div>
);

export default SomethingWentWrongModal;
