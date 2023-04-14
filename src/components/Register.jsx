import {
    Avatar,
    Box,
    Button,
    Grid,
    TextField,
    Typography,
  } from "@mui/material";
  import React from "react";
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { ToastContainer, toast } from "react-toastify";
  import axios from "axios";
  import { registerRoute } from "../utils/APIRoutes";
  import Paper from '@mui/material/Paper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { setLogin } from '../redux/actions/actions';
import { useDispatch } from 'react-redux';
  
  function Register({setRegister}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [values, setValues] = useState({
      name: "",
      email: "",
      password: "",
    });
  
    const generateError = (error) =>
      toast.error(error, {
        position: "bottom-right",
      });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          registerRoute,
          {
            ...values,
          },
          {
            withCredentials: true,
          }
        );
        if (data) {
          if (data.errors) {
            const { email, password } = data.errors;
            if (email) generateError(email);
            else if (password) generateError(password);
          } else {
            //Guardamos en el local storage datos de la cuenta
            localStorage.setItem("userData", JSON.stringify(data));
            navigate("/");
            setLogin(false).then((res) => {
              dispatch(res);
            })
          }
        }
      } catch (ex) {
        console.log(ex);
      }
    };
    return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
            sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Registrarte
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Nombre"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value={values.name}
                    onChange={(e) =>
                        setValues({ ...values, [e.target.name]: e.target.value })
                    }
                />
  
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={values.email}
                    onChange={(e) =>
                        setValues({ ...values, [e.target.name]: e.target.value })
                    }
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Contraseña"
                    name="password"
                    autoComplete="password"
                    autoFocus
                    value={values.password}
                    onChange={(e) =>
                        setValues({ ...values, [e.target.name]: e.target.value })
                    }
                />
    
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                    Registrarse
                </Button>
                <p onClick={()=>setRegister(false)}>
                    {"Ya tienes una cuenta? Iniciar sesión"}
                </p>
          </Box>
        </Box>
        <ToastContainer />
    </Grid>
    );
  }
  
  export default Register;
  