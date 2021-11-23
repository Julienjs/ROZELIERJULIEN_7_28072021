import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import Popup from '../Popup/Popup';
import ReactTooltip from 'react-tooltip';
toast.configure();


const SignIn = () => {
    const [email, setEmail] = useState("");
    const [sendEmail, setSendEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visibility, setVisibility] = useState(false);
    const [buttonPopup, setButtonPopup] = useState(false)


    const handleSignIn = (e) => {
        e.preventDefault();
        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/auth/login`,
            data: {
                email,
                password
            }
        })
            .then((res) => {
                console.log(res);
                window.localStorage.setItem('id', res.data.userId);
                window.localStorage.setItem('token', res.data.token);
                window.location = "/post";
            })
            .catch((err) => {
                toast.error(err.response.data.error, {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                });
            });
    }

    const forgotPassword = (e) => {
        e.preventDefault();
        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/auth/forgotPassword`,
            data: {
                email: sendEmail,
            }
        }).then((res) => {
            setButtonPopup(false);
            setSendEmail("")
            toast.success(res.data, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
        })
            .catch((err) => {
                toast.warning(err.response.data.error, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            })
    }

    return (
        <div className="login">
            <form action="#" >
                <h2 tabIndex="0" aria-label="espace d'identification">Identifiez-vous</h2>
                <div className="login-borderBottom"></div>
                <label htmlFor="email"></label>
                <input aria-label="entrer votre email"
                    aria-required="true"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Adresse e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <label htmlFor="password"></label>
                <div className="container-inputPassword">
                    <input id="password"
                        aria-required="true"
                        aria-label="entrer votre mot de passe"
                        type={visibility ? "text" : "password"}
                        name="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className="eye eyeSignIn">
                        {!visibility ?
                            <i className="far fa-eye" onClick={() => setVisibility(true)}></i>
                            : <i className="far fa-eye-slash" onClick={() => setVisibility(false)}></i>
                        }
                    </p>
                </div>
                <button id="login"
                    className="button green-button"
                    onClick={handleSignIn}>
                    Connexion
                </button>
            </form>
            <button
                onClick={() => setButtonPopup(true)}
                className="link invisible-button"
                style={{ fontSize: "0.7em", margin: "0", cursor: "pointer" }}>
                Mot de passe oublié ?
            </button>

            <Popup trigger={buttonPopup} setTrigger={setButtonPopup} >
                <h2 tabIndex="0" className="popup-title" >Mot de passe oublié</h2>
                <div className="border-bottom" style={{ right: "30px" }}></div>
                <p tabIndex="0">Veuillez renseigner votre email !</p>
                <div className="button-popupDelete">
                    <form >
                        <input type="email"
                            aria-required="true"
                            id="sendEmail"
                            label="email"
                            value={sendEmail}
                            onChange={(e) => setSendEmail(e.target.value)}
                            placeholder="Email"
                            data-tip="Ecrire une adresse Email valide"
                        >
                        </input>
                        <ReactTooltip place="bottom" type="info" effect="solid" />
                        <button type="submit"
                            style={{ width: "300px" }}
                            tabIndex={sendEmail ? "0" : "1"}
                            className={`button ${sendEmail ?
                                "green-button"
                                : "grey-button"}`}
                            onClick={forgotPassword}
                        >
                            Envoyer
                        </button>
                    </form>
                </div>
            </Popup>
        </div>
    )
};

export default SignIn;

