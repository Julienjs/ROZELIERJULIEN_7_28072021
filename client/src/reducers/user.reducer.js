import { GET_USER, UPDATE_PROFIL, UPDATE_IMG, DELETE_ACCOUNT } from "../actions/user.action";

const initialState = {};
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return action.payload;
        case UPDATE_PROFIL:
            return {
                ...state,
                description: action.payload,
            };
        case UPDATE_IMG:
            return {
                ...state,
                data: action.payload,
            };
        case DELETE_ACCOUNT:
            return state.filter((user) => user.id !== action.payload.uid);
        default:
            return state
    }
};