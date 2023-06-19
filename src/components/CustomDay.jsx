import * as React from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Button } from "@mui/material";

export default function CustomDay({primeraFecha, setPrimeraFecha, segundaFecha, setSegundaFecha, segundaFechaHabilitada, setSegundaFechaHabilitada}){
  return (
    <>
      <DateCalendar
        disableFuture
        value={primeraFecha}
        onChange={(newValue) =>{ 
          setPrimeraFecha(newValue)
          setSegundaFecha(newValue)
        }}
      />
      {
        segundaFechaHabilitada ? 
          <DateCalendar
            disableFuture
            value={segundaFecha}
            onChange={(newValue) => setSegundaFecha(newValue)}
          /> 
          : 
          <></>
      }
      <Button variant="outlined" onClick={() => setSegundaFechaHabilitada(!segundaFechaHabilitada)}>
        {
          segundaFechaHabilitada ? 'Quitar segunda fecha' : 'Agregar segunda fecha'
        }
      </Button>
    </>
  );
}
