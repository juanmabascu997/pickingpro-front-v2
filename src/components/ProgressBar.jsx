import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { useTheme } from '@emotion/react';
import { tokens } from '../theme';

const BorderLinearProgress = styled(LinearProgress)(({ theme,colorTwo, colorOne, height }) => ({
  height: height,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: colorTwo,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: colorOne,
  },
  thickness: 4
}));

export default function CustomizedProgressBars({progress, limit}) {
    let value =100/(limit/progress);

    if(!value) value = 5;

    if(value>100) value=100;
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return (
    <Box sx={{ flexGrow: 1 , width: '100%'}} >
        <br />
      <BorderLinearProgress className='circle change-color' variant="determinate" value={value} colorOne={colors.greenAccent[600]} colorTwo={colors.primary[700]} height={20} />
    </Box>
  );
}