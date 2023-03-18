import { Box, Button, Typography } from '@mui/material'
import React from 'react'

export default function Step2({carrito, handleNext, handleBack}) {
  return (
    <Box key="3" sx={{ display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent:'space-between', height: "100%"}}>
        <Box sx={{ display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent:'none'}}>
            <Typography variant="h4" sx={{ mt: 2 }}><strong>Paso 3</strong></Typography>
            <Typography sx={{ mb: 1 }}>El pedido ya fue empaquetado y la etiqueta ya fue impresa.</Typography>
            <Typography sx={{ mb: 1 }}>Ya podes continuar con otro pedido.</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
                color="inherit"
                onClick={handleBack}
                sx={{ mr: 1 }}
            >
                Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
                Finish
            </Button>
        </Box>
    </Box>
  )
}
