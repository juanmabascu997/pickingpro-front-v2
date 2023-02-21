import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box } from "@mui/material";
import {
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const defaultValues = {
  pedidos: 20,
  envio: "same-day",
};

const TaskPicker = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    //Prevenimos evento inicial
    event.preventDefault();
    console.log(formValues);
    /*
    //Guardamos en el local storage CORREGIR
    localStorage.setItem("dataTask", JSON.stringify(formValues));

    //Redireccionamos
    if (formValues.tarea == "picking") navigate("/picking");
    if (formValues.tarea == "packing") navigate("/packing");
    */
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box display='flex' justifyContent='center'>
            <FormControl>
              <FormLabel>Pedidos</FormLabel>
              <TextField
              fullWidth
                id="q-input"
                name="pedidos"
                type="number"
                value={formValues.pedidos}
                onChange={handleInputChange}
              />
              <FormHelperText>Cantidad de pedidos a recibir</FormHelperText>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box display='flex' justifyContent='center' >
            <FormControl>
              <FormLabel>Envio</FormLabel>
              <RadioGroup
                value={formValues.envio}
                name="envio"
                onChange={handleInputChange}
              >
                <FormControlLabel
                  key="same-day"
                  value="same-day"
                  control={<Radio />}
                  label="Envio en el día"
                />
                <FormControlLabel
                  key="bluemail"
                  value="bluemail"
                  control={<Radio />}
                  label="Bluemail"
                />
                <FormControlLabel
                  key="cod"
                  value="cod"
                  control={<Radio />}
                  label="Pago Contraentrega"
                />
              </RadioGroup>
              <FormHelperText>Método de envío a empaquetar</FormHelperText>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" >
            <Button variant="contained" color="primary" type="submit">
              Comenzar Tarea
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default TaskPicker;
