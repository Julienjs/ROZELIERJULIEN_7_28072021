import React, { useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import ReactTooltip from 'react-tooltip';
toast.configure();


const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [Controlpassword, setControlPassword] = useState('');
    const [visibility, setVisibility] = useState("false");
    const [confirmVisibility, setConfirmVisibility] = useState("false");
    const [newPasswordVisibility, setNewPasswordVisibility] = useState("false");

    const changePassword = (e) => {
        e.preventDefault()
        if (newPassword !== Controlpassword) {
            toast.error("Les mots de passes ne correspondent pas", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });

        } else {
            const token = localStorage.getItem("token");
            const uid = localStorage.getItem("id");
            axios({
                method: "put",
                url: `${process.env.REACT_APP_API_URL}api/auth/${uid}/changepassword`,
                data: {
                    password: oldPassword,
                    newPassword: newPassword
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }

            })
                .then((res) => {
                    toast.success(res.data.message, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored"
                    });

                    setOldPassword("");
                    setNewPassword("");
                    setControlPassword("");
                    window.location = "/post";

                })
                .catch((err) => {
                    if (err.response.data.error === "Mot de passe incorrect!") {
                        toast.warn("Mot de passe incorrect !", {
                            position: "bottom-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored"
                        });
                    }
                    if (err.response.statusText === "Unprocessable Entity") {
                        for (let error of err.response.data.errors) {
                            toast.warn(error.msg, {
                                position: "bottom-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored"
                            });
                        }
                    }
                });
        }
    }

    return (
        <form id="changePassword">
            <h1 tabIndex="0">Changer votre <br /> mot de passe</h1>
            <div className="login-borderBottom"></div>
            <div className="container-inputPassword">
                <input id="password"
                    aria-required="true"
                    type={!visibility ? "text" : "password"}
                    placeholder="Mot de passe actuel..."
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)} />
                <p className="eye eyeSignUp">
                    {!visibility ?
                        <i className="far fa-eye-slash" onClick={() => setVisibility(true)}></i>
                        : <i className="far fa-eye" onClick={() => setVisibility(false)}></i>
                    }
                </p>
            </div>
            <div className="container-inputPassword">
                <input id="newPassword"
                    aria-required="true"
                    type={!newPasswordVisibility ? "text" : "password"}
                    placeholder="Nouveau mot de passe..."
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    data-tip
                    data-for='global'
                />
                <p className="eye eyeSignUp">
                    {!newPasswordVisibility ?
                        <i className="far fa-eye-slash" onClick={() => setNewPasswordVisibility(true)}></i>
                        : <i className="far fa-eye" onClick={() => setNewPasswordVisibility(false)}></i>
                    }
                </p>
            </div>
            <div className="container-inputPassword">
                <input id="confirmPassword"
                    aria-required="true"
                    type={!confirmVisibility ? "text" : "password"}
                    name="password"
                    placeholder="Confirmer mot de passe"
                    onChange={(e) => setControlPassword(e.target.value)}
                    value={Controlpassword}
                    data-tip
                    data-for='global'
                />
                <p className="eye eyeSignUp">
                    {!confirmVisibility ?
                        <i className="far fa-eye-slash" onClick={() => setConfirmVisibility(true)}></i>
                        : <i className="far fa-eye" onClick={() => setConfirmVisibility(false)}></i>
                    }
                </p>
            </div>
            <ReactTooltip
                id="global"
                place="bottom"
                type="info"
                effect="solid"
            >
                <p>Le mot de passe doit contenir au moins:<br />
                    - 8 caractères<br />
                    - Un chiffre<br />
                    - Une majuscule
                </p>
            </ReactTooltip>
            <span className="validate"></span>
            <button className="button green-button" onClick={changePassword}>Enregistrer</button>
        </form >
    )
}

export default ChangePassword
