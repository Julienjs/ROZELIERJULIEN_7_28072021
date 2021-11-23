// import { GET_ALL_COMMENTS } from "../actions/comment.action";
import { DELETE_POST, GET_ALL_POSTS, UPDATE_POST, EDIT_COMMENT, DELETE_COMMENT, UPDATE_IMG_POST, LIKE_POST } from "../actions/post.action";

const initialState = {};

export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_POSTS:
            return action.payload;
        case UPDATE_POST:
            return state.map((post) => {
                if (post.id === action.payload.postId) {
                    return {
                        ...post,
                        message: action.payload.message,
                    };
                } else return post;
            });
        case UPDATE_IMG_POST:
            return state.map((post) => {
                if (post.id === action.payload.postId) {
                    return {
                        ...post,
                        image: action.payload.image,
                    };
                } else return post;
            });
        case DELETE_POST:
            return state.filter((post) => post.id !== action.payload.postId);
        // case GET_ALL_COMMENTS:
        //     return action.payload;
        case EDIT_COMMENT:
            return state.map((post) => {
                return {
                    ...post,
                    Comments: post.Comments.map((comment) => {
                        if (comment.id === action.payload.commentId) {
                            return {
                                ...comment,
                                comment: action.payload.comment,
                            };
                        } else {
                            return comment;
                        }
                    }),
                };
            });
        case DELETE_COMMENT:
            return state.map((post) => {
                return {
                    ...post,
                    Comments: post.Comments.filter(
                        (comment) => comment.id !== action.payload.commentId
                    ),
                };
            });
        case LIKE_POST:
            return state.map((post) => {
                if (post.id === action.payload.postId) {
                    if (action.payload.liked === true) {
                        return {
                            ...post,
                            Likes: [...post.Likes, 0],
                        }
                    }
                    else {
                        const likesArray = post.Likes;
                        likesArray.pop();
                        return { ...post, Likes: likesArray }
                    }
                } return post
            });
        default:
            return state;
    }
}