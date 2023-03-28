import axios from "axios";
import { getProblemsRoute, dashboardData, host, packingProductsRoute, packOrderRoute, pickingProductsRoute, reportProblemRoute, setIsBeingPackagedBy, setPickedProductsRoute, stopBeingPackaged, solveProblemRoute, storeInfo } from "../utils/APIRoutes";


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

export async function SetPickedProducts(pedidos, user) {


  const myRequest = {
      token: user,
      products: pedidos
  };

  const { data } = await axios.get(setPickedProductsRoute, {
      params: myRequest, 
  });
  
  return data
}


export async function PackedHandler(orderToPack) {
  try {
    const myUser = await JSON.parse(localStorage.getItem("userData"));
    let token = myUser.token;

    const { data } = await axios.post(packOrderRoute, 
      { myRequest: 
          {
            id: orderToPack.id, 
            store_id: orderToPack.store_id
          },
        token: token
      }
    );
    return true
  } catch (error) {
    console.log(error);
    return false
  }
}

export async function SetIsBeingPackagedBy(orderToPack) {
  try {
    const myUser = await JSON.parse(localStorage.getItem("userData"));
    let token = myUser.token;

    const res = await axios.post(setIsBeingPackagedBy, 
      { myRequest: 
          {
            id: orderToPack.id, 
          },
        token: token
      }
    );
    return res.data
  } catch (error) {
    console.log(error);
    return false
  }
}

export async function ClearIsBeingPackagedBy(orderToPack) {
  try {
    const { data } = await axios.post(stopBeingPackaged, 
      { myRequest: 
          {
            id: orderToPack.id, 
          }
      }
    );
    return true
  } catch (error) {
    console.log(error);
    return false
  }
}

export async function GetDashboardData() {
  try {
      const myUser = await JSON.parse(localStorage.getItem("userData"));
      const { data } = await axios.get(dashboardData, {
          params: myUser
      });
      if (data.err){
        console.log(data.err);
        return [];
      } else {
        return data;
      }
  } catch (error) {
      console.log(error);
  }
}


export async function ReportProblem(myProblem) {
  try {
      const myUser = await JSON.parse(localStorage.getItem("userData"));

      myProblem.token = myUser.token

      const { data } = await axios.post(reportProblemRoute, {
        ...myProblem
      });
      
      return true;
  } catch (error) {
      console.log(error);
  }
}



export async function GetOrdersWithProblem() {
  try {
      const { data } = await axios.get(getProblemsRoute);
      return data;
  } catch (error) {
      console.log(error);
  }
}

export async function SolveProblem(id) {
  try {
      const { data } = await axios.post(solveProblemRoute, {
        ...id
      });
      return data;
  } catch (error) {
      console.log(error);
  }
}

export async function GetStoreInfo(id) {
  try {
      const { data } = await axios.get(storeInfo,
        {
          params: {
            store_id: id
          }
        })
      return data.nombre;
  } catch (error) {
      console.log(error);
  }
}

