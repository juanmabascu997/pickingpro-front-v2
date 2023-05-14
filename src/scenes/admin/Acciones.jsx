import { Button } from '@mui/material'
import React from 'react'
import BasicModal from '../global/DialogPassword';

function Acciones({data, action, getUsers}) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    if(action === "admin"){
        return (
            <>
                <BasicModal 
                    open={open}
                    handleClose={handleClose}
                    data={!data.admin}
                    email={data.email}
                    funtionality="Admin"
                    getUsers={getUsers}
                ></BasicModal>
                <Button 
                    variant="outlined"
                    color="secondary"
                    sx={{ m: "0 0 0 0" }}
                    onClick={handleOpen}
                >
                    { data.admin ? 'Quitar Admin' : 'Admin'}
                </Button>
            </>
        )
    }
    if(action === 'validar') {
        return (
            <>
                <BasicModal 
                    open={open}
                    handleClose={handleClose}
                    data={!data.userValid}
                    email={data.email}
                    funtionality="Validate"
                    getUsers={getUsers}
                ></BasicModal>
                <Button variant="outlined"
                    color="secondary"
                    sx={{ m: "0 0 0 0" }}
                    onClick={handleOpen}
                >
                    {data.userValid ? 'Quitar Validación' : 'Validar'}
                </Button>
            </>
        )
    }
}

export default Acciones