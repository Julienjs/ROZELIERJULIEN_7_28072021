import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateImg } from '../../actions/user.action';
import avatar from '../../avatar/avatar.jpg';
import ReactToolTip from 'react-tooltip'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
toast.configure();

const UpdateImg = () => {
    const userData = useSelector((state) => state.userReducer);
    const [image, setImage] = useState('');
    const [form, setForm] = useState(false);
    const [newImage, setNewImage] = useState(false);
    // const pictureUser = userData.username.substring(0, 1);
    const inputRef = useRef();
    const buttonDownload = useRef();
    const dispatch = useDispatch();

    const triggerFile = () => {
        inputRef.current.click();
        setForm(true)
    }

    const download = (e) => {
        e.preventDefault()
        toast.success("Photo de profil modifié !", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        });
        buttonDownload.current.click()
        setForm(false)
    }


    const handleUploadImage = () => {
        dispatch(updateImg(userData.id, image))

    };


    const handlePicture = (e) => {
        setNewImage(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0]);
    }

    return (
        <form action="" className="form-updatePicture" onSubmit={handleUploadImage} >
            <div className="container-userProfile-picture">
                <div className="container-account-picture">
                    {newImage === false ?
                        <img tabIndex="0" className="picture account-picture"
                            src={userData.imageUrlUser === null ?
                                (avatar) :
                                (userData.imageUrlUser)}
                            alt="profil" />
                        : <img tabIndex="0" className="picture account-picture" src={newImage} alt="profil" />
                    }
                </div>
                <h1 tabIndex="0" aria-label={`votre nom de profil est ${userData.username}`}> {userData.username}</h1>

                <div className="buttonChoice-picture">
                    {form === false ?
                        <i className="fas fa-camera"
                            type="button"
                            tabIndex="0"
                            aria-label="modifier votre photo de profil"
                            onClick={triggerFile}
                            data-tip="Modifier photo"
                            onChange={handlePicture}></i>
                        : <i onClick={download}
                            type="button"
                            tabIndex="0"
                            aria-label="télécharger la phto selectionné"
                            data-tip="Enregitrer"
                            className="far fa-arrow-alt-circle-down"></i>
                    }
                    <ReactToolTip
                        place="bottom"
                        type="info"
                        effect="solid"
                    />
                    <input
                        type="submit"
                        style={{ display: 'none' }}
                        ref={buttonDownload}
                    ></input>
                </div>
                <label htmlFor="image"></label>
                <input type="file"
                    id="image"
                    name="image"
                    accept=".jpg, .jpeg, .png"
                    ref={inputRef}
                    style={{ display: 'none' }}
                    onChange={handlePicture}
                />
            </div>
        </form>
    );
};

export default UpdateImg;