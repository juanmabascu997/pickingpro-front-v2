import {
    SET_LOGIN, 
    SET_USER,
    SET_PACKING,
    SET_PICKING,
    SET_PROBLEMS
} from "../actions/actions";


const initialState = {
    isLogin: false,
    user: {},
    
    packingProducts: [],

    pickingProducts: [],
    pickingOrders: [],
    
    problemOrders: []

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
            if(payload.payload !== "No product to pack"){
                let res = payload.payload.map((e)=>{
                    let totalProducts = e.products.map((e)=>{
                        return parseInt(e.quantity, 10)
                    })
                    return {
                        ...e,
                        total_quantity: totalProducts.reduce((a, b) => a + b, 0)
                    }
                })
                return {
                    ...state,
                    packingProducts: res,
                }
            } else {
                return {
                    ...state,
                    packingProducts: [],
                }
            }
        case SET_PICKING:
            return {
                ...state,
                pickingProducts: payload.payload,
            }
        case SET_PROBLEMS:
            return {
                ...state,
                problemOrders: payload.payload
            }
        default:
        return { ...state };
    }
}