import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ClearIsBeingPackagedBy } from '../data/testData';
import { generateLabelInfo } from '../utils/LabelGenerator';
import { useReactToPrint } from 'react-to-print'
import { useRef, useState } from 'react';


export default function DialogPrint({row, setOpen, open}) {
    const componentRef = useRef(null);
    const [labelInfo, setLabelInfo] = useState();

    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      pageStyle: "@page { size: 3.93in 5.9in }"
    });
  
  const handleClose = async () => {
    await ClearIsBeingPackagedBy(row.row)
    setOpen(false);
  };

  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  const onClickLabelButton = async () => {
    try {

        const myLabelInfo = await generateLabelInfo(row.row, "same-day");
        setLabelInfo(myLabelInfo);

        await timeout(100);
        handlePrint();
    } catch (error) {
      console.log(error);
    }
  }


  const packedHandler = async ()=> {
    await onClickLabelButton()
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
          {"Finalizar empaquetado"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Para continuar, seleccione imprimir para la etiqueta correspondiente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={packedHandler}>Imprimir</Button>
          <Button onClick={handleClose} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
      {!labelInfo
            ? <></>
            :
            <div style={{ display: "none" }}>
              <div ref={componentRef}>
                <div className='label'>
                  <div className='rotate'>
                    <h2 style={{ textAlign: "center" }}>{labelInfo.store_name}</h2>
                    <table className='mylabel'>
                      <tbody>
                        <tr className='mylabeltr'>
                          <td className='mylabeltd' colSpan={2}> Fecha:  {labelInfo.created_at}</td>
                        </tr >
                        <tr className='mylabeltr'>
                          <td className='mylabeltd' colSpan={2}> Remitente: {labelInfo.store_name}</td>
                        </tr>
                        <tr className='mylabeltr'>
                          <td className='mylabeltd' colSpan={2}> Destinatario: {labelInfo.name}</td>
                        </tr>
                        <tr className='mylabeltr'>
                          <td className='mylabeltd' colSpan={2}> Domicilio: {labelInfo.address}</td>
                        </tr>
                        <tr className='mylabeltr'>
                          <td className='mylabeltd'> CP: {labelInfo.zipcode}</td>
                          <td className='mylabeltd'> Localidad: {labelInfo.city}</td>
                        </tr>
                        <tr className='mylabeltr'>
                          <td className='mylabeltd' colSpan={2}> Referencia: {labelInfo.reference}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
        }
    </div>
  );
}
