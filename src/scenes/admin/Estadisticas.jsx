import { Box, Button, Chip, FormControl, Grid, MenuList, Select, Typography, useTheme } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MenuItem } from 'react-pro-sidebar'
import { usersRoute } from '../../utils/APIRoutes';
import { GetUserDashboardData } from '../../data/testData';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { tokens } from '../../theme';
import dayjs from 'dayjs';
import CustomDay from '../../components/CustomDay';
import { toast } from 'react-toastify';
import { BarChart } from '@mui/x-charts/BarChart';
import LineChart from '../../components/LineChart';


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
    let d = new Date()
    let day = dayjs(d)
    const [ primeraFecha, setPrimeraFecha ] = useState(day);
    const [ segundaFecha, setSegundaFecha ] = useState(day);
    const [ segundaFechaHabilitada, setSegundaFechaHabilitada] = useState(false); 

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
        if(segundaFecha && segundaFechaHabilitada) {
            segundaFecha.startOf('day')
        }

        if(primeraFecha.diff(segundaFecha) < 0 && segundaFechaHabilitada) {
            toast.error( 'La segunda fecha debe ser anterior a la primera!' , {
                position: "bottom-right",
            });
        } else {
            let date1 = new Date(primeraFecha).toJSON()
            date1 = new Date(date1).setHours(20, 59, 59);
            date1 = new Date(date1).toJSON()
            
            if(segundaFechaHabilitada) {
                var date2 = new Date(segundaFecha).toJSON()
                date2 = new Date(date2).setHours(0o0, 0o0, 0o0);
                date2 = new Date(date2).toJSON()
            }
            
            setData(await GetUserDashboardData(id, date1, segundaFechaHabilitada ? date2 : null))
        }
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
      }, [user, primeraFecha, segundaFecha]);

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
                <FormControl>
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
                            item => {return(<MenuList style={{ padding: "0.5rem", cursor: "pointer" }} onClick={handleChange} key={item.id} value={item}>{item.name}</MenuList>)}
                            ) :
                            <MenuItem value="">
                                <em>Loading data</em>
                            </MenuItem>
                        }
                    </Select>
                    <Box pt={4}>
                        <Typography
                            variant="p"
                            fontWeight="ligth"
                            sx={{ color: colors.grey[100]}}
                        >
                            Selecciona una fecha:
                        </Typography>
                        <CustomDay 
                            primeraFecha={primeraFecha} 
                            segundaFecha={segundaFecha} 
                            setPrimeraFecha={setPrimeraFecha} 
                            setSegundaFecha={setSegundaFecha} 
                            setSegundaFechaHabilitada={setSegundaFechaHabilitada} 
                            segundaFechaHabilitada={segundaFechaHabilitada}  
                        />
                    </Box>
                </FormControl>
            </Grid>

            {
                data && !loading? 
                <Grid xs={8}>
                    <Grid xs={8}>
                        <Box width="100%" component="span" sx={{ p: 2}} display={'flex'} flexDirection={'row'} alignItems={'center'} textAlign={'center'}>
                            <Chip label="Ordenes empaquetadas en la semana: " />
                            <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
                                {data.packed_orders_in_the_week}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid xs={8}>
                        <Box width="100%" component="span" sx={{ p: 2}} display={'flex'} flexDirection={'row'} alignItems={'center'} textAlign={'center'}>
                            <Chip label="Ordenes pickeadas en la semana: " />
                            <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
                                {data.picked_orders_in_the_week}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid xs={8}>
                        <Box width="100%" component="span" sx={{ p: 2}} display={'flex'} flexDirection={'row'} alignItems={'center'} textAlign={'center'}>
                            <Chip label="Ordenes empaquetadas hoy: " />                                
                            <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
                                {data.packed_orders_today}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid xs={8}>
                        <Box width="100%" component="span" sx={{ p: 2}} display={'flex'} flexDirection={'row'} alignItems={'center'} textAlign={'center'}>
                            <Chip label="Ordenes pickeadas hoy: " />                                
                            <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
                                {data.picked_orders_today}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid xs={8}>
                        <Box width="100%" component="span" sx={{ p: 2}} display={'flex'} flexDirection={'row'} alignItems={'center'} textAlign={'center'}>
                            <Chip label="Ordenes pickeadas en las fechas seleccionadas: " />                                
                            <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
                                {data.picked_orders_in_selected_dates}
                            </Typography>
                        </Box>
                    </Grid>
                    <Box height="250px" m="-20px 0 0 0">
                        <LineChart isDashboard={false} dataProps={data.data_week} />
                        {/* <BarChart
                            xAxis={[{ scaleType: 'band', data: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'] }]}
                            series={data.data_week}
                            width={500}
                            height={300}
                            title="Ordenes por día de la semana"
                            xAxisLabel="Día"
                        /> */}
                    </Box>
                </Grid> :
                <Grid xs={8}>
                    <Item>{loading ? 'Cargando información de usuario...' : 'Seleccione un usuario para ver sus estadisticas'}</Item>
                </Grid>
            }

        </Grid>
              
    </Box>
  )
}

export default Estadisticas