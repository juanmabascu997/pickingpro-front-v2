import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Chip, FormGroup, MenuList, OutlinedInput, Select } from "@mui/material";
import { FormHelperText, FormLabel } from "@mui/material";
import { setProductsToPick } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { storeRoute, shippingMethodsRoute } from "../../utils/APIRoutes";

const defaultValues = {
  pedidos: 20,
  tiendas: [],
  tiposDeEnvios: []
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const FormScreen = ({ setPickingScreen }) => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [loading, setLoading] = useState(false);
  const [connectedStores, setConnectedStores] = useState([]);
  const [shippingMethods, setShippingMethods] = useState([]);

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("userData"));

  React.useEffect(() => {
    getStores()
    getShippingMethods()
  }, [])

  async function getStores () {
    const { data } = await axios.get(storeRoute);
    if (data) {      
      let res = data.map((e, index) => {
        return {
          ...e,
          id: index,
        };
      });
      setConnectedStores(res);
    }
  }

  async function getShippingMethods () {
    const { data } = await axios.get(shippingMethodsRoute);
    if (data) {
      let res = data.map((e, index) => {
        return {
          nombre: e,
          id: index,
        };
      });
      setShippingMethods(res);
    }
  }

  const handleInputChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleTiendasChange = (e) => {
    e.preventDefault();

    const { value } = e.target;
    
    setFormValues({
      ...formValues,
      tiendas: value,
    });
  };

  const handleEnviosChange = (e) => {
    e.preventDefault();

    const { value } = e.target;

    setFormValues({
      ...formValues,
      tiposDeEnvios: value,
    });
  };

  
  const closeOnClick = (e) => {
    e.preventDefault();
    const { value } = e.target;
    console.log(value);
    setFormValues({
      ...formValues,
      tiendas: formValues.tiendas.filter((e) => e !== value),
    });
  }


  const handleSubmit = (event) => {
    //Prevenimos evento inicial
    event.preventDefault();
    let formCopy = {...formValues}

    setLoading(true);

    if(formCopy.tiendas.length > 0) {
      formCopy.tiendas = connectedStores.filter((e) => formCopy.tiendas.includes(e.nombre))
    }
      
    setProductsToPick(formCopy).then((resp) => {
      dispatch(resp).then((res) => {
        if (res.payload.length > 0) setPickingScreen(true);
        else {
            let menssage = "No hay productos para pickear."
            
            if(formCopy.tiendas.length > 0) menssage = "No hay productos para pickear en las tiendas seleccionadas."
            if(formCopy.tiposDeEnvios.length > 0) menssage = "No hay productos para pickear en los tipos de envios seleccionados."
            if(formCopy.tiendas.length > 0 && formCopy.tiposDeEnvios.length > 0) menssage = "No hay productos para pickear con los filtros seleccionados."
            
            toast.error(menssage, {
              position: "bottom-right",
              closeOnClick: false,
          });
        }
        setLoading(false);
      });
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <FormGroup>
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
              <hr />
              <FormLabel>Tiendas</FormLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={formValues.tiendas}
                onChange={handleTiendasChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={`${value}-tiendas`} label={value}/>
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {connectedStores.map((stores) => (
                  <MenuList
                    key={`${stores.id}-tiendasItems`}
                    value={stores.nombre}
                    onClick={handleTiendasChange}
                  >
                    {stores.nombre}
                  </MenuList>
                ))}
              </Select>
              <FormHelperText>Filtrar por tienda.</FormHelperText>
              <hr />
              <FormLabel>Tipos de envios</FormLabel>
              <Select
                labelId="demo-multiple-chip-label2"
                id="demo-multiple-chip2"
                multiple
                value={formValues.tiposDeEnvios}
                onChange={handleEnviosChange}
                input={<OutlinedInput id="select-multiple-chip2" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={`${value}-envios`} label={value}/>
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {shippingMethods.map((stores) => (
                  <MenuList
                    key={`${stores.id}-enviosItems`}
                    value={stores.nombre}
                    onClick={handleEnviosChange}
                  >
                    {stores.nombre}
                  </MenuList>
                ))}
              </Select>
              <FormHelperText>Filtrar por tipos de envios.</FormHelperText>
            </FormGroup>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!user.valid || loading}
            >
              {loading ? "Cargando..." : "Comenzar Tarea"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormScreen;
