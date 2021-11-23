import React, { useState } from 'react';
import axios from 'axios';
import SignIn from './SignIn';
import ReactToolTip from 'react-tooltip'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
toast.configure();


const SignUp = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Controlpassword, setControlPassword] = useState('');
  const [visibility, setVisibility] = useState(false);
  const [confirmVisibility, setConfirmVisibility] = useState(false);


  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== Controlpassword) {
      toast.error("Les mots de passes ne correspondent pas", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });

    } else {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/auth/signup`,
        data: {
          username: name,
          email,
          password
        }
      })
        .then((res) => {
          setFormSubmit(true)
        })
        .catch((err) => {
          if (err.response.statusText === "Unprocessable Entity") {
            for (let error of err.response.data.errors) {
              toast.error(error.msg, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });

            };
          }
          else if (err.response.data.error.name === 'SequelizeUniqueConstraintError') {
            for (let error of err.response.data.error.errors) {
              if (error.message === "email must be unique") {
                toast.error("L'adresse email existe déjà", {
                  position: "bottom-right",
                  autoClose: 3000,
                  hideProgressBar: true,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });
              }

            }
          }
        });
    }
  };


  return (
    <div className="login">
      {formSubmit ? (
        <>
          <SignIn />
          <h4>
            Enregistrement réussi !
            <br />
            Veuillez vous connecté
          </h4>
        </>
      ) : (
        <>
          <h2 tabIndex="0" aria-label="espace inscription remplissez tout les champs">Inscription</h2>
          <div className="login-borderBottom"></div>
          <form action="">
            <label htmlFor="username"></label>
            <input
              id="username"
              aria-label="entrer votre nom"
              type="text"
              name="username"
              placeholder="Nom"
              aria-required="true"
              onChange={(e) => setName(e.target.value)}
              value={name}
              data-tip='Entrée votre nom'
            />
            <span ></span>
            <br />
            <label htmlFor="email" ></label>
            <input
              aria-required="true"
              aria-label="entrer votre adresse email"
              id="email"
              type="email"
              name="email"
              placeholder="Adresse e-mail"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              data-tip='Entrée une adresse email valide'
            />
            <ReactToolTip
              place="bottom"
              type="info"
              effect="solid"
            />

            <br />
            <label htmlFor="password"></label>
            <div className="container-inputPassword" >
              <input id="password"
                aria-required="true"
                aria-label=
                "entrer un mot de passe contenant au moins 8 caractère un chiffre et une majuscule"
                type={visibility ? "text" : "password"}
                name="password"
                placeholder="Mot de passe"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                data-tip
                data-for='global'
              />
              <p className="eye eyeSignIn">
                {!visibility ?
                  <i className="far fa-eye" onClick={() => setVisibility(true)}></i>
                  : <i className="far fa-eye-slash" onClick={() => setVisibility(false)}></i>
                }
              </p>
            </div>
            <br />
            <label htmlFor="password"></label>
            <div className="container-inputPassword error">
              <input
                aria-label="confirmer votre mot de passe"
                aria-required="true"
                type={confirmVisibility ? "text" : "password"}
                name="password"
                id="confirmPassword"
                placeholder="Confirmer mot de passe"
                onChange={(e) => setControlPassword(e.target.value)}
                value={Controlpassword}
                data-tip="Confirmer votre mot de passe"
              />
              <p className="eye eyeSignUpConfirm">
                {!confirmVisibility ?
                  <i className="far fa-eye" onClick={() => setConfirmVisibility(true)}></i>
                  : <i className="far fa-eye-slash" onClick={() => setConfirmVisibility(false)}></i>
                }
              </p>
            </div>
            <div className="confirmPassword"></div>
            <button onClick={handleRegister}
              className="button green-button"
            >S'inscrire</button>
            <ReactToolTip
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
            </ReactToolTip>
          </form>
        </>
      )
      }
    </div >
  )
};

export default SignUp;
