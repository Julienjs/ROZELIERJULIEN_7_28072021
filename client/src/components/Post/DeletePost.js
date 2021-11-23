import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../actions/post.action';
import Popup from '../Popup/Popup';
import ReactToolTip from 'react-tooltip'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
toast.configure();

const DeleteCard = (props) => {
    const dispatch = useDispatch();
    const [buttonPopup, setButtonPopup] = useState(false)

    const deleteQuote = () => {
        dispatch(deletePost(props.id));

        toast.success("Publication supprimé !", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        });
    }
    return (
        <div className="container-deletePost">
            <button onClick={() => setButtonPopup(true)}
                className="invisible-button"
                aria-label="Supprimer la publication">
                <i className="far fa-trash-alt"
                    data-tip="Supprimer"></i>
            </button>
            <ReactToolTip
                place="bottom"
                type="info"
                effect="solid"
            />

            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <h2 className="popup-title" style={{ fontSize: "1em" }}>Supprimer la publication</h2>
                <div className="border-bottom"></div>
                <p tabIndex="0">Voulez-vous supprimer ce post ?</p>
                <div className="button-popupDelete">
                    <button className="button green-button popupButton"
                        onClick={() => setButtonPopup(false)}>
                        Annuler
                    </button>
                    <button className="button red-button popupButton"
                        onClick={deleteQuote}>
                        Confirmer
                    </button>
                </div>
            </Popup>
        </div>
    );

};

export default DeleteCard;