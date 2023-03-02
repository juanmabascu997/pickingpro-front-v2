import {
    SET_LOGIN, 
    SET_USER,
} from "../actions/actions";


const initialState = {
    isLogin: false,
    user: {}
}


export default function rootReducer(state = initialState, payload) {
    switch (payload.type) {
        case SET_LOGIN:
            return {
                ...state,
                isLogin: payload.payload
            }
        case SET_USER:
            console.log(payload);
            return {
                ...state,
                user: payload.payload
            }
        default:
        return { ...state };
    }
}