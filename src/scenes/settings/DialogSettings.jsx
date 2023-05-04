import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogActions, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function ScrollDialogSettings() {
  const [open, setOpen] = React.useState(false);
  const user = JSON.parse(localStorage.getItem("userData"))

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    window.open("https://www.tiendanube.com/apps/6152/authorize", '_blank', 'noreferrer')
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
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={() => {
            handleClickOpen();
          }}
          disabled={!user.valid}
        >
        AGREGAR CONEXIÓN
        </Button>

        </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          Conectarse a una tienda
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
                Vincular
            </Button>
            <Button color="primary" onClick={handleClose}>
                Cancelar
            </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
