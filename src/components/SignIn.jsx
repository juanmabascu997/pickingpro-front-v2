import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Login } from '../data/testData';
import { useNavigate } from 'react-router-dom';
import Register from './Register';
import { setUser } from '../redux/actions/actions';
import { useDispatch } from 'react-redux';
import CookieVerification from '../scenes/global/CookieVerification';
import { toast } from 'react-toastify';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Tu dashboard
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [ isRegister, setRegister ] = React.useState(false);

  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    Login(data.get('email'), data.get('password')).then((res)=>{
      if (res.errors) {
        toast.error("Usuario y/o contraseña incorrecta", {
          position: "bottom-right",
          closeOnClick: false,
        });
      } else {
        setUser(res).then((resp) => {
          dispatch(resp);
        })  
        if(res.valid) {
          toast.success("Bienvenido!", {
            position: "bottom-right",
            closeOnClick: false,
          });
        } else {
          toast.warning("Bienvenido! Recorda pedir al administrador la validación de tu cuenta.", {
            position: "bottom-right",
            closeOnClick: false,
          });
        }
        localStorage.setItem('userData', JSON.stringify(res));
        navigate("/");
      }
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <CookieVerification />
      <Grid container component="main" sx={{ height: '100%', width: '100%' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://casaperfecta.com.ar/wp-content/uploads/2021/09/Theresa-Couture-7-1024x683.png)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {
          !isRegister ? 
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
                Iniciar sesion
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Iniciar sesion
                </Button>
                <Grid container>
                  <Grid item>
                    <Link onClick={()=>setRegister(true)} variant="body2">
                      {"No tenes cuenta? Registrate aca"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
          :
          <Register setRegister={setRegister}/>
        }
      </Grid>
    </ThemeProvider>
  );
}


// css-jtrkzm css-y0u0hj