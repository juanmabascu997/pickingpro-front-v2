import {
    SET_LOGIN, 
    SET_USER,
    SET_PACKING,
    SET_PICKING
} from "../actions/actions";


const initialState = {
    isLogin: false,
    user: {},
    packingProducts: [],
    pickingProducts: [],
}


export default function rootReducer(state = initialState, payload) {
    switch (payload.type) {
        case SET_LOGIN:
            return {
                ...state,
                isLogin: payload.payload
            }
        case SET_USER:
            return {
                ...state,
                user: payload.payload,
                isLogin: false
            }
        case SET_PACKING:
            return {
                ...state,
                packingProducts: payload.payload,
            }
        case SET_PICKING:
            return {
                ...state,
                pickingProducts: payload.payload,
            }
        default:
        return { ...state };
    }
}