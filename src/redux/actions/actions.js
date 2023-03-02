import axios from "axios";

export const SET_LOGIN = "SET_LOGIN";
export const SET_USER = "SET_USER";



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
