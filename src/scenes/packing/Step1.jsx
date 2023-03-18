import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import Chips from '../../components/Chips'
import OrderInfo from '../../components/OrderInfo'

export default function Step1({carrito, handleNext}) {
  return (
    <Box key="1" sx={{ display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent:'space-between', height: "100%"}}>
        <Box  sx={{ display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent:'none'}}>
            <Typography variant="h4" sx={{ mt: 2 }}><strong>Paso 1</strong></Typography>
            <Typography sx={{ mb: 1 }}>Productos que incluye la compra:</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 1, pb: 1 }}>
                {
                    carrito ? carrito.products.map((info, index)=>{
                    return <Chips info={info} index={index}/>
                    }) : <></>
                }
            </Box>
            <OrderInfo carrito={carrito}/>
            <Typography sx={{ mb: 1, mt: 2, fontStyle: 'italic' }}>Para mas información del producto, pasa el cursor sobre cada tarjeta.</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
                color="inherit"
                disabled={true}
                sx={{ mr: 1 }}
            >
                Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
                Next
            </Button>
        </Box>
    </Box>
  )
}
