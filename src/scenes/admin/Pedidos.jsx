import { Box, Button, Chip, Grid, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { GetPedidoByID } from '../../data/testData';
import { tokens } from '../../theme';
import { toast } from 'react-toastify';
import SearchBar from '../../components/SearchBar';
import PedidoCard from '../../components/PedidoCard';


  
function Pedidos({ backToMain }) {
    const [pedido, setPedido] = useState(null) 
    const [data, setData] = useState(null)	
    const [loading, setLoading] = useState(false)
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    const handleChange = (val) => {
        setPedido(state => {
           return val
        })
    }

    const getData = async (id) => {
        setLoading(true)
        let res = await GetPedidoByID(id)
        
        if(!res === null || res.length === 0){ 
            toast.error('No se encontro el pedido')
        } else {
            setData(res)
        }
        setLoading(false)
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if(pedido) {
                getData(pedido)
            } else {
                setPedido(null)
            }
        }, 3000)

        return () => clearTimeout(delayDebounceFn)
    }, [pedido])

  return (
    <Box m="20px">
        <Box>
            <Button
                onClick={backToMain}
                variant="contained"
                color="secondary"
                sx={{ m: "20px 0 0 0" }}
            >
                Back
            </Button>
        </Box> 
        <Grid m="20px" container direction="row" justifyContent="start">
            <Grid xs={4}>
                <SearchBar loading={loading} handleChange={handleChange} />
            </Grid>
            {
                data && !loading? 
                <Grid xs={8}>
                    <Grid xs={8}>
                        <Box width="100%" component="span" sx={{ p: 2}} display={'flex'} flexDirection={'row'} alignItems={'center'} textAlign={'center'}>
                            <PedidoCard pedido={data[0]} />
                        </Box>
                    </Grid>
                </Grid> :
                <Grid xs={8}>
                    <Chip label={loading ? 'Cargando información...' : 'Busca un pedido especifico'}/>
                </Grid>
            }
        </Grid>  
    </Box>
  )
}

export default Pedidos