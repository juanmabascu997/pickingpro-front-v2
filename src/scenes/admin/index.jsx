import React from "react";

import { Box } from "@mui/material";
import Header from "../../components/Header";
import { useState } from "react";
import Main from "./Main";
import Usuarios from "./Usuarios";
import Estadisticas from "./Estadisticas";

const Admin = () => {
  const subtitle = "Pantalla solo disponible para administradores.";
  const [ screen, setScreen ] = useState('Main'); 

  let onClickHandler = (buttonInfo) => {
    setScreen(buttonInfo.target.title)
  }
  let backToMain = () => {
    setScreen('Main')
  }
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="ADMINISTRACIÓN" subtitle={subtitle} />
      </Box>
      {
        screen  === 'Estadisticas' ?
        <Estadisticas backToMain={backToMain}/>
        : screen  === 'Usuarios' ?
        <Usuarios backToMain={backToMain}/>
        : 
        <Main onClickHandler={onClickHandler} backToMain={backToMain} />
      }
    </Box>
  );
};

export default Admin;
