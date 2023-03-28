import { Box, Button, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { packOrderRoute } from '../../utils/APIRoutes';
import { setProductsToPack } from '../../redux/actions/actions';
import { useDispatch } from 'react-redux';

export default function Step2({carrito, handleNext, handleBack}) {
    const [loading, setLoading] = useState(false)
    const userInfo = useSelector(state => state.user)
    const dispatch = useDispatch();

    async function middelHandler () {   
        setLoading(true)
        const { data } = await axios.post(packOrderRoute, { id: carrito.id, store_id: carrito.store_id, token: userInfo.user});
        if(data) {
            setProductsToPack().then((resp) => {
              dispatch(resp);
            })
        }
        setLoading(false)
        handleNext()
    }

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
            <Button onClick={()=>{middelHandler()}} disabled={loading}>
                Finalizar
            </Button>
        </Box>
    </Box>
  )
}
