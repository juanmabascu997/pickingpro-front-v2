import React from "react";

import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";

function Main( {onClickHandler} ) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridAutoRows="140px"
      gap="20px"
    >
      <Box
        gridColumn="span 4"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Button title="Estadisticas" onClick={onClickHandler} 
          variant="contained"
          color="secondary"
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          Ver estadisticas
        </Button>
      </Box>
      <Box
        gridColumn="span 4"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Button title="Usuarios" onClick={onClickHandler}
          variant="contained"
          color="secondary"
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          Ver usuarios
        </Button>
      </Box>
      <Box
        gridColumn="span 4"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Button title="Pedidos" onClick={onClickHandler} 
          variant="contained"
          color="secondary"
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          Ver pedido
        </Button>
      </Box>
      <Box
        gridColumn="span 4"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Button title="Pedidos" onClick={onClickHandler} 
          variant="contained"
          color="secondary"
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          Ver estanterias
        </Button>
      </Box>
    </Box>
  );
}

export default Main;
