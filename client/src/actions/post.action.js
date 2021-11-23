import axios from 'axios';

export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const ADD_POST = "ADD_POST";

export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_IMG_POST = "UPDATE_IMG_POST";

// export const GET_ALL_COMMENTS = "GET_ALL_COMMENTS"
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const LIKE_POST = "LIKE_POST";
// export const LIKE_COMMENT = "LIKE_COMMENT";

const token = localStorage.getItem("token");


export const getAllPosts = (num) => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/post/`,
                {
                    headers: { 'Authorization': `Bearer ${token}` },
                })
            .then((res) => {
                const array = res.data.posts.slice(0, num);
                dispatch({ type: GET_ALL_POSTS, payload: array })
            })
            .catch((err) => console.log(err));
    }
}

export const addPost = (data, uid) => {
    return (dispatch) => {
        return axios({
            method: "post",
            url: (`${process.env.REACT_APP_API_URL}api/post/${uid}`),
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: data
        })

    }
}

export const updatePost = (postId, message) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: (`${process.env.REACT_APP_API_URL}api/post/${postId}`),
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
                message,
            }
        })
            .then((res) => {
                dispatch({ type: UPDATE_POST, payload: { message, postId } })
            })
            .catch((err) => console.log(err));
    };
};

export const updateImgPost = (postId, image) => {
    return (dispatch) => {
        let data = new FormData();
        data.append('image', image);
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}/image`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: data
        })
            .then((res) => {
                dispatch({ type: UPDATE_IMG_POST, payload: data });

            })
            .catch((err) => console.log(err));
    };
};

export const deletePost = (postId) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
            .then((res) => {
                dispatch({ type: DELETE_POST, payload: { postId } })
            })
            .catch((err) => console.log(err));
    };
};

export const addComment = (data, postId,) => {
    return (dispatch) => {
        return axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/comment/${postId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: data
        })
    };
};

export const editComment = (commentId, comment) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/comment/${commentId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
                comment
            }
        })
            .then((res) => {
                dispatch({ type: EDIT_COMMENT, payload: { comment, commentId } })
            })
            .catch((err) => console.log(err));
    };
};


export const deleteComment = (commentId) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}api/comment/${commentId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: { commentId },
        })
            .then((res) => {
                dispatch({ type: DELETE_COMMENT, payload: { commentId } });
            })
            .catch((err) => console.log(err));
    };
};

export const likePost = (postId) => {
    return (dispatch) => {
        return axios
            .post(`${process.env.REACT_APP_API_URL}api/like/`,
                { PostId: postId },
                {
                    headers: { 'Authorization': `Bearer ${token}` },
                }
            ).then((res) => {
                dispatch({ type: LIKE_POST, payload: { postId, liked: res.data.liked } })
            })
            .catch((err) => console.log(err));
    }
}

