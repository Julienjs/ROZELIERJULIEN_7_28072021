import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEmpty } from '../Utils';
import { addPost, getAllPosts } from "../../actions/post.action";
import avatar from '../../avatar/avatar.jpg';
import Popup from '../Popup/Popup';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
toast.configure();



const NewPostForm = () => {
    const [message, setMessage] = useState("");
    const [postImg, setPostImg] = useState(null);
    const [image, setImage] = useState();
    const [video, setVideo] = useState("");
    const [buttonPopup, setButtonPopup] = useState(false)
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const inputRef = useRef();

    const triggerFile = () => {
        inputRef.current.click();
    }

    const handlePicture = (e) => {
        setPostImg(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0]);
        setVideo('');
    }

    const handleNewPost = async () => {
        if (message || postImg || video) {
            const data = new FormData();
            data.append('userId', userData.id);
            data.append('message', message);
            if (image) data.append("image", image);
            data.append('video', video)

            await (dispatch(addPost(data)));
            dispatch(getAllPosts());
            setButtonPopup(false);
            setPostImg("");
            setVideo("");
            setMessage("");

            toast.success("Publication ajouté !", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });

        } else {
            alert("Veuillez entrer un message")
        }
    };

    useEffect(() => {
        const handleVideo = () => {
            let findLink = message.split(" ");
            for (let i = 0; i < findLink.length; i++) {
                if (findLink[i].includes('https://www.youtube')
                    || findLink[i].includes("https://youtube")) {
                    let embed = findLink[i].replace('watch?v=', "embed/");
                    setVideo(embed.split('&')[0]);
                    console.log(embed.split('&')[0]);
                    findLink.splice(i, 1);
                    setMessage(findLink.join(" "));
                    setPostImg('');
                }
            }
        };
        handleVideo();
    }, [video, message])
    return (
        <>
            <section className="section-newPost">
                <article className="article-newPost">
                    <Link aria-label="Profil" to="/profil/">
                        <div>
                            <img tabIndex="0" className="picture picture-newPost" src={userData.imageUrlUser === null ?
                                (avatar)
                                : (userData.imageUrlUser)}
                                alt="Profil" />
                        </div>
                    </Link>
                    <button className="newPublication" onClick={() => setButtonPopup(true)}>
                        Nouvelle publication ...
                    </button>
                </article>
            </section>

            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <h1 className="popup-title" tabIndex="0">Créer une publication</h1>
                <div className="border-bottom"></div>
                <div className="header-popup-newPost">
                    {userData.imageUrlUser === null ?
                        < img tabIndex="0" className="picture" src={avatar} alt="profil" />
                        : <img tabIndex="0" alt="profil" className="picture"
                            src={userData.imageUrlUser}
                        />
                    }
                    <h3 tabIndex="0">{userData.username}</h3>
                </div>
                <div className="textPopup">
                    <textarea
                        placeholder="De quoi souhaitez-vous parlez ?"
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    {postImg && (
                        <>
                            <button
                                aria-label="annuler l'image"
                                className="close-btn-img"
                                onClick={() => setPostImg("")}
                            >
                                <i className="fas fa-times"></i>
                            </button>
                            <img className="img-post-popup"
                                id="imgpost"
                                src={postImg}
                                alt="publication" />
                        </>
                    )}
                    <div id="containerVideo-Newpost">
                        {video && (
                            // <div id="closeVideo-nexPost">
                            <button
                                aria-label="annuler la vidéo"
                                className="close-btn-video"
                                onClick={() => setVideo("")}
                                style={{}}
                            >
                                <i className="fas fa-times"></i>
                            </button>
                            // </div>
                        )}
                        {video && (
                            <p className="video">
                                <iframe tabIndex="0" aria-label="video"
                                    src={video}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title={video}
                                ></iframe>
                            </p>
                        )}
                    </div>
                    <div className="container-newPostPopup-img-btn">
                        {isEmpty(video) && (
                            <div className="newPostPopup-img">
                                {postImg ?
                                    <p>Modifier l'image</p>
                                    : <p>Ajouter une image</p>
                                }
                                <button aria-label={postImg ?
                                    "Modifier l'image"
                                    : "Ajouter une image"}
                                    className="newPostPopup-img-btn">
                                    <i className="far fa-images"
                                        onClick={triggerFile}
                                        onChange={handlePicture}
                                    >
                                    </i>
                                </button>
                                <input type="file"
                                    name="image"
                                    accept=".jpg, .jpeg, .png, .gif"
                                    onChange={(e) => handlePicture(e)}
                                    ref={inputRef}
                                    style={{ display: 'none' }}
                                />
                            </div>
                        )}
                        <div className="container-newPostBtnSendCancel" >
                            <button
                                className={`button ${message || postImg || video.length > 20 ?
                                    "green-button"
                                    : "grey-button"}`}
                                onClick={handleNewPost}>
                                Publier
                            </button>
                        </div>
                    </div>
                </div>
            </Popup>
        </>
    )
};

export default NewPostForm;