import React, { useState, useEffect } from 'react';
// import { UidContext } from "../AppContext";
import { useSelector, useDispatch } from 'react-redux';
import { deleteComment, editComment } from '../../actions/post.action';
import { dateParser } from '../Utils';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
toast.configure();



const EditDeleteComment = ({ comment, postId }) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState("");
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);


    const handleEdit = () => {
        if (text) {
            dispatch(editComment(comment.id, text))
            setText(" ")
            setEdit(false)
            toast.success("Commentaire modifié", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
        }
    };

    const handleDelete = () => {
        dispatch(deleteComment(comment.id, postId));
        toast.success("Commentaire Supprimé", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        });
    }

    useEffect(() => {
        const checkAuthor = () => {
            if (userData.id === comment.userId) {
                setIsAuthor(true);
            }
        };
        checkAuthor();
    }, [userData.id, comment.userId]);

    return (
        <div>
            <div className="editDelete-comment">
                <p className="date-comment">{dateParser(comment.createdAt)}</p>
                {isAuthor && edit === false && (
                    <div className="button-editDelete-comment">
                        <button tabIndex="0"
                            className="invisible-button"
                            style={{ fontSize: "0.8em" }}
                            aria-label="Modifier commentaire"
                            onClick={() => setEdit(!edit)}>
                            Modifier
                        </button>
                        <button
                            tabIndex="0"
                            className="invisible-button"
                            style={{ fontSize: "0.8em" }}
                            aria-label="Supprimer commentaire"
                            onClick={handleDelete}>Supprimer</button>
                    </div>
                )}
            </div>
            {isAuthor && edit && (
                <div>
                    <textarea name="comment" id="textarea-comment"
                        onChange={(e) => setText(e.target.value)}
                        defaultValue={comment.comment}
                    />
                    <br />
                    <div className="container-EditClose-button">
                        <button className="button green-button button-EditCloseComment" onClick={handleEdit}>Envoyer</button>
                        <button className="button red-button button-EditCloseComment" onClick={() => setEdit(!edit)}>Annuler</button>
                    </div>
                </div>
            )
            }
        </div >

    )
};

export default EditDeleteComment;