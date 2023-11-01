import React from 'react'
import { Box, MenuItem, Button, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const UpdatePayment = () => {
  const [paymentName, setPaymentName] = useState()
  const [logo, setLogo] = useState()
  const [active, setActive] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getPayment()
  },[])

  const getPayment = () => {
    axios.get(`${import.meta.env.VITE_APP_API_URL}api/Payment/GetById?id=${id}`)
    .then(res => {
        setPaymentName(res.data.payment_name)
        setLogo(res.data.image)
        setActive(res.data.isActivated)
    })
    .catch(error => {
        console.error(error);
    });
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const dataURL = event.target.result;
        const bytes = dataURL.split(',')[1];
        setLogo(bytes);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateData = () => {
    axios.put(`${import.meta.env.VITE_APP_API_URL}api/Payment/?id=${id}`, {
        payment_name: paymentName,
        image: logo,
        isActivated: active
    })
    .then(navigate('/admin-view/manage-payment'))
  }

  return (
    <div>
      <Typography variant='h5'>Update Payment Method</Typography>
      {paymentName && 
      <Box sx={{mt:5, pr:{lg:50, md:25, sm:10}}}>
          <TextField 
              fullWidth 
              type='text' 
              label = 'Payment Name' 
              defaultValue = {paymentName} 
              onChange={(e) => setPaymentName(e.target.value)} 
          />
          <Box sx={{mt:3}}>
              {logo && (
                  <Box>
                      <Typography>Image for this Payment:</Typography>
                      <Box component='img' sx={{height:'140px'}} src={`data:image/png;base64,${logo}`}/>
                  </Box>
              )}
              <TextField type="file" inputProps={{accept:"image/*"}} onChange={handleImageChange} />    
          </Box>
          <Box sx={{mt:3}}>
              <TextField
                  select
                  label="Status"
                  defaultValue={active}
                  helperText="Please select status this payment"
                  onChange={(e) => setActive(e.target.value)}
              >
                  <MenuItem value={true}>Active</MenuItem>
                  <MenuItem value={false}>Inactive</MenuItem>
              </TextField>
          </Box>
              <Button sx={{ mt: 3, px: 5, borderRadius: 2 }} variant='contained' onClick={updateData}>Save</Button>
      </Box>
      }
    </div>
  )
}

export default UpdatePayment