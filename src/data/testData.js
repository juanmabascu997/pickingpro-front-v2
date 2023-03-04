import axios from "axios";
import { host, packingProductsRoute, pickingProductsRoute } from "../utils/APIRoutes";


export async function Login(email, password) {
    const { data } = await axios.post(`${host}/auth/login`,
        {
          email,
          password
        },
        { withCredentials: true }
    );
    return data
}

export async function GetPackingProducts() {

  const myUser = await JSON.parse(localStorage.getItem("userData"));

  const myData = {
    envio: 'bluemail',
    
  }

  const myRequest = {
    form: myData,
    token: myUser.token
  };

  const { data } = await axios.get(packingProductsRoute, {
    params: myRequest
  });
  return data
}



export async function GetPickingProducts(pedidos) {

  const myUser = await JSON.parse(localStorage.getItem("userData"));

  const myData = {
    pedidos: pedidos
  }
  
  const myRequest = {
    form: myData,
    token: myUser.token
  };

  const { data } = await axios.get(pickingProductsRoute, {
    params: myRequest
  });
  
  return data
}
