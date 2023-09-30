import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
  Typography,
} from "@mui/material";
import { SetGoals } from "../../data/testData";
import { toast } from "react-toastify";

function valueLabelFormat(value) {
  return `${value}`;
}

export default function DialogGoals({ user, setOpen, open }) {
  const [value, setValue] = useState(null);
  const [valueLinear, setValueLinear] = React.useState(10);

  const handleChangeLinear = (event, newValue) => {
    if (typeof newValue === "number") {
      setValueLinear(newValue);
    }
  };

  const handleClose = async () => {
    setOpen(false);
  };

  const handleChange = async (val) => {
    setValue(val.target.value);
  };

  const handleSubmit = async () => {
    if (value === null) {
      toast.success("Debe seleccionar un objetivo", {
        position: "bottom-right",
        closeOnClick: false,
      });
    } else {
      SetGoals({ email: user.email, select: value, goals: valueLinear });
      handleClose();
      toast.success("Se cargaron los objetivos solicitados", {
        position: "bottom-right",
        closeOnClick: false,
      });
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"Seteo de objetivos para este usuario"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Para continuar, seleccione que objetivos semanales va a setear.
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Opciones:</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="packing"
              name="radio-buttons-group"
              value={value}
              onChange={handleChange}>
              <FormControlLabel
                value="packing"
                control={<Radio />}
                label="Packing"
              />
              <FormControlLabel
                value="picking"
                control={<Radio />}
                label="Picking"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogContent>
          <FormControl fullWidth>
            <FormLabel id="demo-radio-buttons-group-label">Objetivo:</FormLabel>
            <Typography id="non-linear-slider" gutterBottom>
              Semanalmente: {valueLinear}
            </Typography>
            <Slider
              value={valueLinear}
              min={5}
              step={1}
              max={400}
              getAriaValueText={valueLabelFormat}
              valueLabelFormat={valueLabelFormat}
              onChange={handleChangeLinear}
              valueLabelDisplay="auto"
              aria-labelledby="non-linear-slider"
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Setear</Button>
          <Button onClick={handleClose} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
