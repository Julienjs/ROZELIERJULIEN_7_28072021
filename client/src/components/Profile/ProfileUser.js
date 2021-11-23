import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAccount, updateProfil } from '../../actions/user.action';
import UpdateImg from './UpdateImg';
import "./Profile.css"
import Popup from '../Popup/Popup';
import ChangePassword from './ChangePassword';



const ProfileUser = () => {
    const userData = useSelector((state) => state.userReducer);
    const [description, setDescription] = useState('');
    const [form, setForm] = useState(false);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [buttonPopupPassword, setButtonPopupPassword] = useState(false)
    const dispatch = useDispatch();


    const handleUpdateDescription = () => {
        dispatch(updateProfil(userData.id, description));
        setForm(false);
    }

    const handleDeleteAccount = () => {
        localStorage.clear();
        window.location.href = '/';
        dispatch(deleteAccount(userData.id));
    }


    return (
        <>
            < section>
                <article id="article-account-name-img">
                    <UpdateImg />
                    <div className="container-account-description">
                        {form === false && (
                            <div className="account-description" >
                                <p
                                    aria-label={`espace description, cliquer pour modifier`}
                                    tabIndex="0"
                                    className="description"
                                    onClick={() => setForm(!form)}>
                                    {userData.description}
                                </p>
                            </div>
                        )}
                        {form && (
                            <>
                                <textarea name="description" className="description" placeholder="Description..."
                                    defaultValue={userData.description}
                                    onChange={(e) => setDescription(e.target.value)} >
                                </textarea>
                                <button className="button green-button buttonSend-description" onClick={handleUpdateDescription}>
                                    Valider modifications
                                </button>
                            </>
                        )}
                        <button className="text-deleteAccount invisible-button" onClick={() => setButtonPopup(true)}>
                            Supprimer votre compte
                        </button>
                        {/* <Link to="/changePassword" style={{ textDecoration: "none" }}> */}
                        <button className="text-deleteAccount invisible-button" onClick={() => setButtonPopupPassword(true)} >
                            Modifier mot de passe
                        </button>
                        {/* </Link> */}
                    </div>
                </article>

                <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                    <h1 className="popup-title" tabIndex="0">Suppression du compte</h1>
                    <div className="border-bottom"></div>
                    <p tabIndex="0">  En supprimant votre compte toute vos publications ainsi que vos commentaires
                        seront perdus.
                    </p>
                    <p tabIndex="0">
                        Êtes vous sûr de vouloir supprimer votre compte ?
                    </p>
                    <div className="button-popupDelete">
                        <button className="button green-button"
                            onClick={() => setButtonPopup(false)}>
                            Annuler
                        </button>
                        <button className="button red-button"
                            onClick={handleDeleteAccount}>
                            Confirmer
                        </button>
                    </div>
                </Popup>
                <Popup trigger={buttonPopupPassword} setTrigger={setButtonPopupPassword}>
                    <ChangePassword />
                </Popup>


            </section >
        </>

    )
};

export default ProfileUser;