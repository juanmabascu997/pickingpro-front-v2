import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { toast } from 'react-toastify';
import { useState } from 'react';

const steps = ['Revisar productos', 'Confirmar impresión', 'Finalizar'];

export default function HorizontalLinearStepper({carrito, handleClose}) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if(activeStep === steps.length - 1) {
      toast.success("Gestion realizada con exitó! ✅", {
        position: "bottom-right",
        closeOnClick: false,
      });
      handleClose()
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: '100%', height: "100%"}}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Aguarde mientras se termina la gestión.
          </Typography>
        </React.Fragment>
      ) :
      activeStep === 0 ? (<Step1 carrito={carrito} handleNext={handleNext}/>):
      activeStep === 1 ? (<Step2 carrito={carrito} handleNext={handleNext} handleBack={handleBack}/>):
      (<Step3 carrito={carrito} handleNext={handleNext} handleBack={handleBack}/>)
      }
    </Box>
  );
}
