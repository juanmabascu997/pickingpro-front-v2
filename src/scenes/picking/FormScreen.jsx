import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import {
  FormHelperText,
  FormLabel,
} from "@mui/material";
import { setProductsToPick } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';

const defaultValues = {
  pedidos: 20
};

const FormScreen = ({setPickingScreen}) => {
  const [formValues, setFormValues] = useState(defaultValues);
  const dispatch = useDispatch();
  
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

    setProductsToPick(formValues.pedidos).then((resp) => {
      dispatch(resp).then((res)=>{
        if(res.payload.length > 0) setPickingScreen(true)
        else {
          toast.error("No hay productos para pickear", {
            position: "bottom-right",
            closeOnClick: false,
          });
        }
      })
    })
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

export default FormScreen;
