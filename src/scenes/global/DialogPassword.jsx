import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ValidateUser, AdminUser } from '../../data/testData'
import { Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';

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
            Confirmar acción con ingreso de contraseña:
          </Typography>
          <Box m="20px">
            <TextField id="outlined-basic" label="Contraseña" variant="outlined" type='password' onChange={(e) => setPassword(e.target.value)} sx={{mb: '10px'}}/>
            <Button variant="contained" onClick={handleSubmit}>Ingresar</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
