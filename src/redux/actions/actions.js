import { GetPackingProducts, GetPickingProducts } from "../../data/testData";

export const SET_LOGIN = "SET_LOGIN";
export const SET_USER = "SET_USER";
export const SET_PACKING = 'SET_PACKING';
export const SET_PICKING = 'SET_PICKING';



export async function setLogin(bool){
  return async function (dispatch) {
    try {
      return dispatch({
        type: SET_LOGIN,
        payload: bool,
      });
    } catch (e) {
      console.error("Error: " + e.message);
    }
  };
}

export async function setUser(user){
  return async function (dispatch) {
    try {
      return dispatch({
        type: SET_USER,
        payload: user,
      });
    } catch (e) {
      console.error("Error: " + e.message);
    }
  };
}

export async function setProductsToPack(){
  return async function (dispatch) {
    try {
      let packing = await GetPackingProducts()
      return dispatch({
        type: SET_PACKING,
        payload: packing,
      });
    } catch (e) {
      console.error("Error: " + e.message);
    }
  };
}

export async function setProductsToPick(cantidad){
  return async function (dispatch) {
    try {
      let picking = await GetPickingProducts(cantidad)
      if(picking.length === 0) {
        return dispatch({
          type: SET_PICKING,
          payload: []
        });
      }
      let productsToPick = picking.map(e => {
        return {
          ...e,
          select: false
        }
      })
      
      return dispatch({
        type: SET_PICKING,
        payload: productsToPick,
      });
    } catch (e) {
      console.error("Error: " + e.message);
    }
  };
}
