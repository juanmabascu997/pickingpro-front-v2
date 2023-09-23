import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ValidateUser, AdminUser, ResetPass } from '../../data/testData'
import { Button, IconButton, InputAdornment, OutlinedInput, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #ccc',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({handleClose, open, data, email, funtionality, getUsers}) {
    const [password, setPassword] = React.useState('')
    const [newPassWord, setNewPassword] = React.useState('')
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  

    const handleSubmit = async () => {
        if(funtionality === 'Validate'){
            ValidateUser(data, email, password).then((res)=>{
                if(typeof res === 'string') {
                    toast.success(res, {
                        position: "bottom-right",
                        closeOnClick: false,
                    });
                    getUsers()
                    handleClose()
                }
                else {
                    toast.error(res.errors.password, {
                        position: "bottom-right",
                        closeOnClick: false,
                    });
                }
            })
            .catch((err)=>{
                toast.error(err.message, {
                    position: "bottom-right",
                    closeOnClick: false,
                });
            })
        }
        else if (funtionality === 'Admin') {
            AdminUser(data, email, password).then((res)=>{
                if(typeof res === 'string') {
                    toast.success(res, {
                        position: "bottom-right",
                        closeOnClick: false,
                    });
                    getUsers()
                    handleClose()
                }
                else {
                    toast.error(res.errors.password, {
                        position: "bottom-right",
                        closeOnClick: false,
                    });
                }
            })
            .catch((err)=>{
                toast.error(err.message, {
                    position: "bottom-right",
                    closeOnClick: false,
                });
            })
        }
        else if (funtionality === 'Pass') {
          if(!newPassWord) {
            toast.error("El campo de nueva contraseña no puede estar vacio", {
                position: "bottom-right",
                closeOnClick: false,
            });
            return;
          }
          ResetPass(password, email, newPassWord).then((res)=>{
              if(typeof res === 'string') {
                  toast.success(res, {
                      position: "bottom-right",
                      closeOnClick: false,
                  });
                  getUsers()
                  handleClose()
              }
              else {
                  toast.error(res.errors.password, {
                      position: "bottom-right",
                      closeOnClick: false,
                  });
              }
          })
          .catch((err)=>{
              toast.error(err.message, {
                  position: "bottom-right",
                  closeOnClick: false,
              });
          })
      }
    }
    
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{mb: '10px'}}>
            Confirmar acción con ingreso de tu contraseña:
          </Typography>
          <Box m="20px">
            <OutlinedInput
              id="outlined-basic"
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Tu contraseña"
            />
            {/* <TextField id="outlined-basic" label="Contraseña" variant="outlined" type='password' onChange={(e) => setPassword(e.target.value)} sx={{mb: '10px'}}/> */}
            {
              funtionality === 'Pass' ? 
                <>
                  <Typography id="modal-modal-title" variant="h6" component="h2" sx={{mb: '10px', ml: '-20px'}}>
                    Ingresa la nueva contraseña para el usuario seleccionado:
                  </Typography>
                  <Box> 
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      onChange={(e) => setNewPassword(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Nueva contraseña"
                    />
                    {/* <TextField id="outlined-basic-2" label="Nueva contraseña" variant="outlined" type='password' onChange={(e) => setNewPassword(e.target.value)} sx={{mb: '10px'}}/> */}
                  </Box>
                </>
              : <></>
            }
            <Button variant="contained" onClick={handleSubmit}>Ingresar</Button>
          </Box>
        </Box>
        
      </Modal>
    </div>
  );
}
