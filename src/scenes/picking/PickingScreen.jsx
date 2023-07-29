import { Button, Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useSelector } from 'react-redux'
import Cards from '../../components/Cards'
import './PickingStyles.css'
import DialogPicking from "../../components/DialogPicking";
import { useState } from 'react'
import { toast } from 'react-toastify'
import { CancelPicking } from '../../data/testData'


export default function PickingScreen({setPickingScreen}) {
    let pickingProducts = useSelector(state => state.pickingProducts)
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const handleChange = (element) => {
        pickingProducts = pickingProducts.map((e) => {
            if(e.product_id === element.product_id) {
                return element
            } else {
                return e
            }
        })
        var flag = false;
        if(pickingProducts.length > 0){
            for(let i = 0; i < pickingProducts.length ; i++) {
                if(pickingProducts[i].select === false){
                    flag = true;
                }
            }
            if(!flag) {
                setDisabled(false)
            } else {
                setDisabled(true)
            }
        }
    }

    const handleCancel = () => {
        CancelPicking().then(res => {
            toast.success('Se cancelaron los pedidos a pickear', {
                position: "bottom-right",
                closeOnClick: false,
            });
            setPickingScreen(false)
        })
        .catch(err => {
            toast.error('Error al cancelar los pedidos a pickear', {
                position: "bottom-right",
                closeOnClick: false,
            });
            setPickingScreen(false)
        })
    }

    const handleSubmit = async () => {     
        setOpen(true);
    }

  return (
    <div>
        <DialogPicking setPickingScreen={setPickingScreen} pickingProducts={pickingProducts} setOpen={setOpen} open={open} />

        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} > 
                {
                    pickingProducts ? pickingProducts.length === 0 ? <p>No hay pedidos</p> : pickingProducts.map((products, index) => {
                        return (
                            <Grid item xs={6} key={index}>
                                <Box display="flex" justifyContent="center">
                                    <Cards element={products} handleChange={handleChange}/>
                                </Box>
                            </Grid>
                        )
                    }) : null
                }
        </Grid>
        <Button 
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }} 
            onClick={handleSubmit} 
            disabled={disabled}
        >
            MARCAR
        </Button>
        <Button 
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }} 
            onClick={handleCancel} 
            disabled={open}
        >
            Cancelar pickeo
        </Button>
    </div>
  )
}
