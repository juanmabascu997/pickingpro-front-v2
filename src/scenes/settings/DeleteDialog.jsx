import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogActions, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DeleteStoreWebhoks } from "../../data/testData";
import { toast } from "react-toastify";

export default function DeleteDialog({row, reloadPage, reload}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    DeleteStoreWebhoks(row).then((res)=>{
      if(res){
        toast.success("Se elimino correctamente la conexión.", {
          position: "bottom-right",
          closeOnClick: false,
        });
        reloadPage(!reload);
      } else {
        toast.error("Error en proceso de eliminar conexión.", {
          position: "bottom-right",
          closeOnClick: false,
        });
      }
    })
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
        <Box>
        <Button variant="contained" color="secondary" onClick={() => {
          handleClickOpen();
        }}>
            Eliminar Conexión
        </Button>

        </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          Eliminar conexion con una tienda
        </DialogTitle>
        <DialogContent dividers sx={{ height: "100vh" }}>
          <DialogContent
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            sx={{ height: "100%" }}
          > 
            <Box  sx={{ display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent:'none'}}>
                <Typography variant="h4" sx={{ mt: 2 }}><strong>Conexión</strong></Typography>
                <Typography sx={{ mb: 1 }}>Recorda que para conectar los webhooks de tu tienda, debe estar abierta tu tienda en <a href="https://www.tiendanube.com/">tiendanube.com</a></Typography>
                <Typography sx={{ mb: 1 }}><i>Hace click abajo para continuar a la vinculación:</i></Typography>
            </Box>  
          </DialogContent>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" color="secondary" onClick={handleSubmit}>
                Desvincular
            </Button>
            <Button color="primary" onClick={handleClose}>
                Cancelar
            </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
