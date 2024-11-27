import axios from "axios";
import {
  resetPasswordRoute,
  getProblemsRoute,
  dashboardData,
  host,
  packingProductsRoute,
  packOrderRoute,
  pickingProductsRoute,
  reportProblemRoute,
  setIsBeingPackagedBy,
  setPickedProductsRoute,
  stopBeingPackaged,
  solveProblemRoute,
  storeInfo,
  deleteStoreRoute,
  validateUserRoute,
  adminUserRoute,
  userDataDash,
  pedidoById,
  cancelPickRoute,
  setPickingGoalsRoute,
  setPackingGoalsRoute,
  getGoalsRoute,
  getDowloadFile
} from "../utils/APIRoutes";
import dayjs from "dayjs";

export async function Login(email, password) {
  const { data } = await axios.post(
    `${host}/auth/login`,
    {
      email,
      password,
    },
    { withCredentials: true }
  );
  return data;
}

export async function GetPackingProducts() {
  const myUser = await JSON.parse(localStorage.getItem("userData"));

  const myData = {
    envio: "bluemail",
  };

  const myRequest = {
    form: myData,
    token: myUser.token,
  };

  const { data } = await axios.get(packingProductsRoute, {
    params: myRequest,
  });
  return data;
}

export async function GetPickingProducts({ pedidos, tiendas, tiposDeEnvios }) {
  const myUser = await JSON.parse(localStorage.getItem("userData"));

  const { data } = await axios.get(pickingProductsRoute, {
    params: {
      pedidos: pedidos,
      filtrosTiendas: tiendas,
      filtrosEnvios: tiposDeEnvios,
      token: myUser.token,
    },
  });

  return data;
}

export async function CancelPicking() {
  const myUser = await JSON.parse(localStorage.getItem("userData"));

  const { data } = await axios.post(cancelPickRoute, {
    token: myUser.token,
  });

  return data;
}

export async function SetPickedProducts(pedidos, user) {
  let ids = new Set();

  pedidos.map((prod) => {
    if (prod.id.length > 0) {
      prod.id.map((i) => {
        ids.add(i);
        return i;
      });
    } else {
      ids.add(prod.id);
    }
    return prod;
  });

  ids = Array.from(ids);

  const myRequest = {
    token: user,
    products: ids,
  };

  const { data } = await axios.get(setPickedProductsRoute, {
    params: myRequest,
  });

  return data;
}

export async function PackedHandler(orderToPack) {
  try {
    const myUser = await JSON.parse(localStorage.getItem("userData"));
    let token = myUser.token;

    await axios.post(packOrderRoute, {
      myRequest: {
        id: orderToPack.id,
        store_id: orderToPack.store_id,
      },
      token: token,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function SetIsBeingPackagedBy(orderToPack) {
  try {
    const myUser = await JSON.parse(localStorage.getItem("userData"));
    let token = myUser.token;

    const res = await axios.post(setIsBeingPackagedBy, {
      myRequest: {
        id: orderToPack.id,
        store_id: orderToPack.store_id,
      },
      token: token,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function ClearIsBeingPackagedBy(orderToPack) {
  try {
    await axios.post(stopBeingPackaged, {
      myRequest: {
        id: orderToPack.id,
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function GetDashboardData() {
  try {
    let d = new Date();
    let day = dayjs(d);
    let date1 = new Date(day).toJSON();
    date1 = new Date(date1).setHours(20, 59, 59);
    date1 = new Date(date1).toJSON();

    const myUser = await JSON.parse(localStorage.getItem("userData"));
    const param = {
      token: myUser.token,
      primeraFecha: date1,
    };
    const { data } = await axios.get(dashboardData, {
      params: param,
    });
    if (data.err) {
      return [];
    } else {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function GetUserDashboardData(userID, primeraFecha, segundaFecha) {
  try {
    const myUser = await JSON.parse(localStorage.getItem("userData"));

    const { data } = await axios.get(userDataDash, {
      params: {
        myUser: myUser.token,
        findUserId: userID,
        primeraFecha: primeraFecha,
        segundaFecha: segundaFecha,
      },
    });
    if (data.err) {
      return [];
    } else {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function GetPedidoByID(pedidoId) {
  try {
    const myUser = await JSON.parse(localStorage.getItem("userData"));

    const { data } = await axios.get(pedidoById, {
      params: {
        myUser: myUser.token,
        pedidoId: pedidoId,
      },
    });
    if (data.err) {
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

    myProblem.token = myUser.token;

    await axios.post(reportProblemRoute, {
      ...myProblem,
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
      ...id,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function GetStoreInfo(id) {
  try {
    const { data } = await axios.get(storeInfo, {
      params: {
        store_id: id,
      },
    });
    return data.nombre;
  } catch (error) {
    console.log(error);
  }
}

export async function DeleteStoreWebhoks(store) {
  try {
    const { data } = await axios.delete(deleteStoreRoute, {
      params: {
        access_token: store.access_token,
        user_id: store.user_id,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function ValidateUser(validate, toValidate, password) {
  try {
    const myUser = await JSON.parse(localStorage.getItem("userData"));
    const { email } = myUser;

    const { data } = await axios.post(
      validateUserRoute,
      {
        email,
        password,
        toValidate,
        validate,
      },
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function AdminUser(validate, toValidate, password) {
  try {
    const myUser = await JSON.parse(localStorage.getItem("userData"));
    const { email } = myUser;

    const { data } = await axios.post(
      adminUserRoute,
      {
        email,
        password,
        toValidate,
        validate,
      },
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function ResetPass(password, newMail, newPassword) {
  try {
    const myUser = await JSON.parse(localStorage.getItem("userData"));
    const { email } = myUser;

    const { data } = await axios.put(
      resetPasswordRoute,
      {
        email,
        password,
        newMail,
        newPassword,
      },
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function SetGoals({email, goals, select}) {
  try {
    const myUser = await JSON.parse(localStorage.getItem("userData"));
    const { token } = myUser;
    let setGoalsRoute = setPickingGoalsRoute;

    if (select === "packing") {
      setGoalsRoute = setPackingGoalsRoute;
    }

    const { data } = await axios.post(
      `${setGoalsRoute}?token=${token}&email=${email}`,
      {
        goals,
      },
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function GetGoals({email = null}) {
  try {
    const myUser = await JSON.parse(localStorage.getItem("userData"));
    const { email_user } = myUser;
    
    if(email === null) {
      email = email_user;
    }
    
    const { data } = await axios.get(
      `${getGoalsRoute}?email=${email}`,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function DowloadData({nombre}) {
  try {   
    const { data } = await axios.get(
      `${getDowloadFile}?storeName=${nombre}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

