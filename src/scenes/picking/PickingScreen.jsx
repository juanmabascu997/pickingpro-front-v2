import { Button, Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useSelector } from 'react-redux'
import Cards from '../../components/Cards'
import './PickingStyles.css'
import DialogPicking from "../../components/DialogPicking";
import { useState } from 'react'


export default function PickingScreen({setPickingScreen}) {
    let pickingProducts = useSelector(state => state.pickingProducts)
    const [open, setOpen] = useState(false);

    const handleChange = (element) => {
        pickingProducts = pickingProducts.map((e) => {
            if(e.product_id === element.product_id) {
                return element
            } else {
                return e
            }
        })
    }

    const handleSubmit = async () => {
        setOpen(true);
    }

  return (
    <div>
        <DialogPicking setPickingScreen={setPickingScreen} pickingProducts={pickingProducts} setOpen={setOpen} open={open} />

        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} className="noWrap"> 
                {
                    pickingProducts ? pickingProducts.length === 0 ? <p>No hay pedidos</p> : pickingProducts.map((products, index) => {
                        return (
                            <Grid item xs={12} key={index}>
                                <Box display="flex" justifyContent="center">
                                    <Cards element={products} handleChange={handleChange}/>
                                </Box>
                            </Grid>
                        )
                    }) : null
                }
        </Grid>
        <Button onClick={handleSubmit} >MARCAR</Button>
    </div>
  )
}
