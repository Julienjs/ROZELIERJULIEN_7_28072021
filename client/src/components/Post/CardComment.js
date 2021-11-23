import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts, addComment } from '../../actions/post.action';
import { isEmpty } from '../Utils';
import EditDeleteComment from './EditDeleteComment';
import avatar from '../../avatar/avatar.jpg';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
toast.configure();



const CardComment = ({ post }) => {
    const [comment, setComment] = useState("");
    const [commentImg, setCommentImg] = useState(null);
    const [image, setImage] = useState();
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const inputRef = useRef();
    const dispatch = useDispatch();

    const triggerFile = () => {
        inputRef.current.click();
    }

    const handleComment = async () => {
        if (comment || commentImg) {
            const data = new FormData();
            data.append('userId', userData.id);
            data.append('postId', post.id);
            data.append('comment', comment);
            if (image) data.append("image", image);
            await (dispatch(addComment(data, post.id)));
            dispatch(getAllPosts());
            setComment('');
            setCommentImg('');
            setImage('');
            toast.success("Commentaire ajouté", {
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
    }

    const handlePicture = (e) => {
        setCommentImg(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0]);
        toast.success("Image chargé !", {
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

    const handleDeleteImg = () => {
        setCommentImg('');
        setImage('')
        toast.success("Image supprimé !", {
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

    return (
        <>
            <article id="article-comment" >
                {post.Comments.map((comment) => {
                    return (
                        <div className="comments" key={comment.id}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                < img className="picture pictureUser-comment"
                                    src={userData.imageUrlUser === null ?
                                        (avatar)
                                        : (
                                            !isEmpty(usersData[0]) &&
                                            usersData.map((user) => {
                                                if (user.id === comment.userId)
                                                    return user.imageUrlUser;
                                                else return null;
                                            }).join('')
                                        )} alt="utilisateur img" />
                                <div className={`containerComment ${comment.userId === userData.id ?
                                    "containerComment-User" : "containerComment-client"}`}
                                >
                                    <h3 tabIndex="0"
                                        aria-label={
                                            `Commentaire de ${!isEmpty(usersData[0]) &&
                                            usersData.map((user) => {
                                                if (user.id === post.User.id)
                                                    return user.username;
                                                else { return null; }
                                            }).join('')
                                            }`}
                                        style={{ margin: "0" }}>{
                                            !isEmpty(usersData[0]) &&
                                            usersData.map((user) => {
                                                if (user.id === post.User.id)
                                                    return user.username;
                                                else { return null; }
                                            }).join('')
                                        }
                                    </h3>
                                    <p tabIndex="0" className="text-comment">{comment.comment}</p>
                                </div>
                            </div>
                            {comment.imageUrl &&
                                < img className="picture-comment" src={comment.imageUrl} alt="comment img" />
                            }
                            <EditDeleteComment comment={comment} post={post.id} />
                        </div>
                    )
                })}
            </article>
            {userData.id && (
                <>
                    <div className="newComment">
                        <img className="picture pictureUser-comment"
                            src={userData.imageUrlUser === null ? (avatar) :
                                (userData.imageUrlUser)} alt="user" />
                        <div className="newComment-img-text">
                            <textarea id="textarea-comment" name="comment"
                                placeholder="Laisser un commentaire..."
                                onChange={(e) => setComment(e.target.value)}
                                value={comment}
                            />
                            <button
                                className="invisible-button"
                                style={{ backgroundColor: "inherit" }}
                                aria-label="ajouter une image"
                                onClick={triggerFile}
                                onChange={handlePicture}
                            >
                                <i className="far fa-image"></i>
                            </button>
                            <input type="file"
                                id="comment-file-upload"
                                name="image"
                                accept=".jpg, .jpeg, .png, .gif"
                                onChange={(e) => handlePicture(e)}
                                ref={inputRef}
                                style={{ display: 'none' }} />
                        </div>
                    </div>
                    {commentImg && (
                        <div className="imgComment">
                            <button className="close close-commentImg"
                                onClick={handleDeleteImg}
                                aria-label="supprimer cette image"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                            < img
                                tabIndex="0"
                                className=" picture-comment"
                                style={{ margin: "10px 0 0 0 " }}
                                src={commentImg}
                                alt="commentaire" />
                        </div>
                    )}
                    <button style={{ width: "100%" }}
                        tabIndex={comment || commentImg ? "0" : "1"}
                        className={`button ${comment || commentImg ? " SendComment-button" : "grey-button"}`}
                        onClick={handleComment}>
                        Envoyer
                    </button>
                </>
            )}



        </>
    )
};

export default CardComment;