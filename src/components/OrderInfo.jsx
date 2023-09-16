import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { formatoFecha } from '../utils/LabelGenerator';

const OrderInfo = ({carrito}) => {
    return (
        <Box sx={{ width: '100%', maxWidth: 360, mb: 1, mt: 2 }} key="1">
            <Typography variant="h6" align='center' >
                {carrito.shipping_address[0].name + ' - #' + carrito.number}
            </Typography>
            <Divider variant="middle" />
            <Typography variant="body1" mt={2}>
                <b>Fecha: </b>{formatoFecha(new Date(carrito.created_at), 'dd/mm/yy')}
            </Typography>
            <Typography variant="body1" mt={0.5}>
                <b>Tienda: </b>{carrito.store_name}
            </Typography>
            <Typography variant='body1' mt={0.5}>
                <b>Subtotal:</b> {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(carrito.subtotal)}
            </Typography>
            <Typography variant='body1' mt={0.5}>
                <b>Envio:</b> {carrito.shipping_cost_customer
                    ? (new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(carrito.shipping_cost_customer))
                    : 'Gratis'
                }
            </Typography>
            <Typography variant="h4" mt={2}>
                <strong>
                    {carrito.note
                        ? ('Notas del comprador: ' + carrito.note)
                        : ('No existen notas del comprador.')
                    }
                </strong>
            </Typography>

            <Box mt={0.5}>
                <Divider variant="middle" />
            </Box>

            <Typography variant="h4" mt={0.5}>
                <strong>
                    {carrito.owner_note
                        ? ('Notas de atención al cliente: ' + carrito.owner_note)
                        : ('No existen notas de atención al cliente.')
                    }
                </strong>
            </Typography>
        </Box>
    )
}

export default OrderInfo