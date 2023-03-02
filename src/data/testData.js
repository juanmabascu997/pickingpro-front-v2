import axios from "axios";
import { host, packingProductsRoute } from "../utils/APIRoutes";


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
  console.log(myUser);

  const myData = "{envio:bluemail}"

  const myRequest = {
    form: myData,
    token: myUser.token
  };

  const { data } = await axios.get(packingProductsRoute, {
    params: myRequest
  });

  console.log(data);
}
