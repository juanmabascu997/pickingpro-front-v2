import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function RecipeReviewCard({element, handleChange}) {
  const [elementCopy, setElement] = React.useState(element)
  
  React.useEffect(()=>{
    handleChange(elementCopy)
  }, [elementCopy])

  const handleSelectClick = () => {
    setElement({
        ...elementCopy,
        select: !elementCopy.select
    });
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            Art
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={elementCopy.name}
        subheader={elementCopy.product_id}
      />
      <CardMedia
        component="img"
        height="194"
        image={elementCopy.image_link}
        alt="elemento"
      />
      <CardContent>
        Cantidad: {elementCopy.quantity}
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="Marcar como pickeado" onClick={handleSelectClick}>
          {elementCopy.select ? <><Typography paragraph style={{"display": "inline-flex"}}><CheckBoxIcon /> Pickeado</Typography></>  : <><Typography paragraph  style={{"display": "inline-flex"}}><CheckBoxOutlineBlankIcon /> No pickeado </Typography></> }
        </IconButton>
      </CardActions>
    </Card>
  );
}