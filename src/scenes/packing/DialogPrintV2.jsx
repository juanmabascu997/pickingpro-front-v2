import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import HorizontalLinearStepper from './Stepper'
import { Typography } from '@mui/material';
import { ClearIsBeingPackagedBy, SetIsBeingPackagedBy } from '../../data/testData';
import { toast } from 'react-toastify';


export default function ScrollDialog({row}) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const carrito = row.row

  const handleClickOpen = (scrollType) => {
    SetIsBeingPackagedBy(carrito).then(res => {
      if(res !== "El producto esta asignado a otro usuario.") {
        setOpen(true);
        setScroll(scrollType);
      } else {
        toast.error("El producto esta asignado a otro usuario.", {
          position: "bottom-right",
          closeOnClick: false,
        });
      }
    }).catch((err)=>{
      console.log(err);
    })
  };

  const handleClose = async () => {
    await ClearIsBeingPackagedBy(carrito)
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      <Button variant="contained"
              disabled={carrito.order_asigned_to || null}
              color="secondary"
              onClick={()=>{handleClickOpen('paper')}}
      >
        <Typography color="black" sx={{ ml: "5px" }}>
          Empaquetar
        </Typography>        
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Empaquetar pedido {carrito.id}</DialogTitle>
        <DialogContent dividers sx={{ height: "100vh" }}>
          <DialogContent
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            sx={{ height: "100%" }}
          >
            <HorizontalLinearStepper carrito={carrito} handleClose={handleClose}/>
          </DialogContent>
        </DialogContent>
      </Dialog>
    </>
  );
}
