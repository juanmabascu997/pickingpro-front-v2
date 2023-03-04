import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useSelector } from 'react-redux'
import Cards from '../../components/Cards'
import './PickingStyles.css'
export default function PickingScreen() {
    const pickingProducts = useSelector(state => state.pickingProducts)

  return (
    <div>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} className="noWrap"> 
                {
                    pickingProducts ? pickingProducts.map(products => {
                        return (
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="center">
                                    <Cards element={products}/>
                                </Box>
                            </Grid>
                        )
                    }) : null
                }
        </Grid>
    </div>
  )
}
