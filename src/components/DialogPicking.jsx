import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { SetPickedProducts } from '../data/testData';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function DialogPicking({ setPickingScreen, pickingProducts, setOpen, open}) {
    let user = useSelector(state => state.user)
    

  const handleClose = async () => {
    setOpen(false);
  };

  const pickedHandler = async ()=> {
    const data = await SetPickedProducts(pickingProducts, user.user)
    if(data) {
        toast.success("Productos pickeados con exito", {
            position: "bottom-right",
            closeOnClick: false,
        });
        setPickingScreen(false)
    }
    setOpen(false);
  }


  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmar"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Si solicita continuar, van a darse por pickeados los siguientes articulos:
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={pickedHandler}>Continuar</Button>
          <Button onClick={handleClose} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
