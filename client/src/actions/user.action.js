import axios from "axios";

export const GET_USER = "GET_USER";
// export const UPLOAD_PICTURE = "UPLOAD_PICTURE"
export const UPDATE_PROFIL = "UPDATE_PROFIL";
export const UPDATE_IMG = "UPDATE_IMG";
export const DELETE_ACCOUNT = "DELETE_ACCOUNT";


export const getUser = (uid) => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/auth/${uid}`)
            .then((res) => {
                // console.log(uid);
                // console.log(res);
                // for (let element of res.data.userId) {

                dispatch({ type: GET_USER, payload: res.data.userId })
                // }
            })
            .catch((err) => console.log(err));
    };
};

export const updateProfil = (uid, description) => {
    return (dispatch) => {
        // let data = new FormData();
        // data.append('description', description);
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/auth/${uid}`,
            data: { description }
        })
            .then((res) => {
                dispatch({ type: UPDATE_PROFIL, payload: description });

            })
            .catch((err) => console.log(err));
    };
};


export const updateImg = (uid, image) => {
    return (dispatch) => {
        let data = new FormData();
        data.append('image', image);

        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/auth/${uid}/image`,
            data: data
        })
            .then((res) => {
                dispatch({ type: UPDATE_IMG, payload: data });

            })
            .catch((err) => console.log(err));
    };
};

export const deleteAccount = (uid) => {
    const token = localStorage.getItem("token")
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}api/auth/${uid}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                dispatch({ type: DELETE_ACCOUNT, payload: uid });

            })
            .catch((err) => console.log(err));
    };
};


