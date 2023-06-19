import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function PedidoCard({pedido}) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
            Id: {pedido.id}   
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Siguiente acción: {pedido.next_action}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Nota del usuario: {pedido.note}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Estado de pago: {pedido.payment_status}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Modo de envio: {pedido.shipping_option}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Tienda: {pedido.store_id}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Total: ${pedido.total}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Fecha de creación: {pedido.created_at}
        </Typography>
        {
            pedido.order_picked || pedido.order_packed ? 
            <>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Orden pickeada por: {pedido.order_picked_for}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Orden empaquetada por: {pedido.order_packed_for}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Orden con problemas: {pedido.order_problem}
                </Typography>  
            </>
            : 
            <></>
        }
      </CardContent>
    </Card>
  );
}