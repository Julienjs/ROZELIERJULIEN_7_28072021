import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty, dateParser } from '../Utils';
import avatar from '../../avatar/avatar.jpg'
import "./AllUsers.css"
import { deleteAccount } from '../../actions/user.action';
import Popup from '../Popup/Popup';

function AllUsers() {
    const usersData = useSelector((state) => state.usersReducer);

    const [buttonPopup, setButtonPopup] = useState(false);
    const [searchTherm, setSearchTherm] = useState("");
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        setSearchTherm(e.target.value)
    };


    return (
        <section >
            <form className="formSearch">
                <input type="text" name="searchBar" placeholder="Rechercher"
                    onChange={handleSearch} />
            </form>
            {!isEmpty(usersData[0]) &&
                usersData
                    .filter((user) => {
                        return user.username
                            .toLowerCase()
                            .includes(searchTherm.toLowerCase());
                    })
                    .map((user) => {
                        return (
                            <article key={user.id} className="article-user" >
                                <div className="user">
                                    {user.imageUrlUser === null ?
                                        < img className="picture picture-newPost" src={avatar} alt="utilisateur img" />
                                        : <img alt="utilisateur img" className="picture picture-newPost"
                                            src={user.imageUrlUser}
                                        />
                                    }
                                </div>
                                <p className="name-info">
                                    Nom : <span>{user.username}</span>
                                </p>
                                <p>Email : <span>{user.email}</span></p>
                                <p>Créer le : <span>{dateParser(user.createdAt)}</span></p>
                                <p>Description : <br /><span>{user.description}</span></p>
                                <p>Nombre de post : <span>{user.Posts.length}</span></p>
                                <button id="deleteUser" className=" button red-button "
                                    onClick={() => setButtonPopup(true)}
                                >
                                    Supprimer compte
                                </button>
                                <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                                    <h1 className="popup-title">Suppression du compte</h1>
                                    <div className="border-bottom"></div>
                                    <p>  En supprimant le compte toute vos publications ainsi que vos commentaires<br />
                                        seront perdus.
                                    </p>
                                    <p>
                                        Êtes vous sûr de vouloir supprimer se compte ?
                                    </p>
                                    <div className="button-popupDelete">
                                        <button className="button green-button"
                                            onClick={() => setButtonPopup(false)}>
                                            Annuler
                                        </button>
                                        <button className="button red-button"
                                            onClick={() =>
                                                dispatch(deleteAccount(user.id, setButtonPopup(false)))
                                            }>
                                            Confirmer
                                        </button>
                                    </div>
                                </Popup>
                            </article>
                        )
                    })}
        </section >
    )
}

export default AllUsers
