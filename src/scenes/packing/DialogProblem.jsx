import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  ClearIsBeingPackagedBy,
  ReportProblem,
  SetIsBeingPackagedBy,
} from "../../data/testData";
import { toast } from "react-toastify";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { DialogActions, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Chips from "../../components/Chips";

export default function ScrollDialogProblem({ row }) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [problem, setProblem] = React.useState("");

  const carrito = row.row;

  const handleChange = (value) =>{
    setProblem((problem)=> problem = value.target.value)
  }

  const handleClickOpen = (scrollType) => {
    SetIsBeingPackagedBy(carrito)
      .then((res) => {
        if (res !== "El producto esta asignado a otro usuario.") {
          setOpen(true);
          setScroll(scrollType);
        } else {
          toast.error("El producto esta asignado a otro usuario.", {
            position: "bottom-right",
            closeOnClick: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = async () => {
    await ClearIsBeingPackagedBy(carrito);
    setOpen(false);
  };

  const handleSubmit = async () => {
    await ReportProblem({id:carrito.id, value: problem})
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
      <Button
        color="error"
        disabled={carrito.order_asigned_to}
        onClick={() => {
          handleClickOpen("paper");
        }}
      >
        <ReportProblemIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          Reportar problema en pedido nro: {carrito.id}
        </DialogTitle>
        <DialogContent dividers sx={{ height: "100vh" }}>
          <DialogContent
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            sx={{ height: "100%" }}
          > 
            <Box  sx={{ display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent:'none'}}>
                <Typography variant="h4" sx={{ mt: 2 }}><strong>Problema</strong></Typography>
                <Typography sx={{ mb: 1 }}>Por favor, ingrese un motivo para reportar el problema.</Typography>
                <Typography sx={{ mb: 1 }}><i>Productos que incluye la compra:</i></Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 1, pb: 1 }}>
                    {
                        carrito ? carrito.products.map((info, index)=>{
                        return <Chips info={info} index={index}/>
                        }) : <></>
                    }
                </Box>
            </Box>  
            <Box sx={{ pt: 1, pb: 1, height: "80%" }}>
                <Paper elevation={3} sx={{ height: "100%" }}>
                    <textarea onChange={handleChange} style={{border:"none"}} placeholder="Escribir acá..." className="textAreaStyle"></textarea>
                </Paper>    
            </Box>
          </DialogContent>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" color="secondary" onClick={handleSubmit}>
                Aceptar
            </Button>
            <Button color="primary" onClick={handleClose}>
                Cancelar
            </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
