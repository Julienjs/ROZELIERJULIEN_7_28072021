import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import "./Log.css"

const Log = (props) => {
    const [signUpModal, setSignUpModal] = useState(props.signup);
    const [signInModal, setSignInModal] = useState(props.signin);

    const handleModals = (e) => {
        if (e.target.id === "signup") {
            setSignInModal(false);
            setSignUpModal(true);
        } else if (e.target.id === "signin") {
            setSignUpModal(false);
            setSignInModal(true);
        }
    }

    return (
        <div id="form-container">
            <div className="form-home-link">
                <p tabIndex="0" id="signin" className="link"
                    onClick={handleModals} >
                    S'identifier
                </p>
                <p tabIndex="0" id="signup" className="link"
                    onClick={handleModals} >
                    Créer un compte
                </p>
            </div>
            {signInModal && <SignIn />}
            {signUpModal && <SignUp />}
        </div>
    );
};

export default Log;
