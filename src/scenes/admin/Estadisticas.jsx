import { Box, Button, FormControl, Grid, MenuList, Select, Typography, useTheme } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MenuItem } from 'react-pro-sidebar'
import { usersRoute } from '../../utils/APIRoutes';
import { GetUserDashboardData } from '../../data/testData';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { tokens } from '../../theme';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  
function Estadisticas({ backToMain }) {
    const [user, setUser] = useState("")
    const [users, setUsers] = useState([])
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    const handleChange = (val) => {
        setUser(state => {
           return val.target.value
        })
    }

    const getData = async (id) => {
        setLoading(true)
        setData(await GetUserDashboardData(id))
        setLoading(false)
    }

    const getUsers = async () => {
        const { data } = await axios.get(usersRoute);
        if (data) {
          let res = data.map((e, index) => {
            return {
              ...e,
              id: index,
            };
          });
          setUsers(res);
        }
      };
    
      useEffect(() => {
        getUsers();
      }, []);

      useEffect(() => {
        if(user) {
            getData(user._id)
        }
      }, [user]);
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
        <Box m="10px">
            <FormControl fullWidth>
                <Select 
                    value={user} 
                    onChange={handleChange}
                    inputProps={{
                        name: "name",
                        id: "demo-controlled-open-select",
                        "data-testid": "select-input"
                    }}
                >
                    {
                        users ? users.map(
                        item => {return(<MenuList onClick={handleChange} key={item.id} value={item}>{item.name}</MenuList>)}
                        ) :
                        <MenuItem value="">
                            <em>Loading data</em>
                        </MenuItem>
                    }
                </Select>
            </FormControl>
        </Box>
        {
            data && !loading? 
            <Grid mt="20px" container spacing={4} columns={16}>
                <Grid xs={8}>
                    <Box  width="100%" m="0 30px" component="span" sx={{ p: 2}}>
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            sx={{ color: colors.grey[100] }}
                        >
                           Ordenes empaquetadas en la semana:
                        </Typography>
                        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
                            {data.packed_orders_in_the_week}
                        </Typography>
                    </Box>
                </Grid>
                <Grid xs={8}>
                    <Box  width="100%" m="0 30px" component="span" sx={{ p: 2}}>
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            sx={{ color: colors.grey[100] }}
                        >
                           Ordenes pickeadas en la semana:
                        </Typography>
                        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
                            {data.picked_orders_in_the_week}
                        </Typography>
                    </Box>
                </Grid>
                <Grid xs={8}>
                    <Box  width="100%" m="0 30px" component="span" sx={{ p: 2}}>
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            sx={{ color: colors.grey[100] }}
                        >
                            Ordenes empaquetadas hoy:
                        </Typography>
                        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
                            {data.packed_orders_today}
                        </Typography>
                    </Box>
                </Grid>
                <Grid xs={8}>
                    <Box  width="100%" m="0 30px" component="span" sx={{ p: 2}} backgroundColor>
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            sx={{ color: colors.grey[100] }}
                        >
                            Ordenes pickeadas hoy:
                        </Typography>
                        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
                        {data.picked_orders_today}
                        </Typography>
                    </Box>
                </Grid>
            </Grid> :
            <Grid mt="20px" container spacing={2} columns={16}>
                <Grid xs={16}>
                    <Item>{loading ? 'Cargando información de usuario...' : 'Seleccione un usuario para ver sus estadisticas'}</Item>
                </Grid>
            </Grid>
        }
              
    </Box>
  )
}

export default Estadisticas