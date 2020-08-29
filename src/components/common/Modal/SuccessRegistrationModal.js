import React from 'react';
import Button from "../Button";

const SuccessRegistrationModal = ({ successCallback }) => (
    <div className="modal-content">
        <div className="modal-title">Congratulations!</div>
        <div className="modal-body">
            You've now joined our community! There's remaining only one step.
            <br/>
            <br/>
            Confirm your email and continue exploring! We've already sent to your email confirmation code.
        </div>
        <div className="modal-actions">
            <Button
                text="Continue"
                onClick={successCallback}
            />
        </div>
    </div>
);

export default SuccessRegistrationModal;
