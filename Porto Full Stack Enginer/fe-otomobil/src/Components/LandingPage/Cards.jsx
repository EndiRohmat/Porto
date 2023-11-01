import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import PropTypes from 'prop-types';

const Cards = (props) => {
    const{
        name,
        image,
        price,
        type
    } = props

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'IDR',
    });
  return (
    <Card>
        <CardActionArea>
            <CardMedia
                component="img"
                height="250"
                image={`data:image/png;base64,${image}`}
                alt="Course"
            />
            <CardContent>
                <Typography  variant="h5" color="text.secondary">
                    {type}
                </Typography>
                <Typography  variant="h5" color="black">
                    {name}
                </Typography>
                <Typography  variant="h5" style={{ color: "#790B0A" }}>
                    <br /><br />
                    {formatter.format(price)}
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
  )
}

Cards.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
}


export default Cards