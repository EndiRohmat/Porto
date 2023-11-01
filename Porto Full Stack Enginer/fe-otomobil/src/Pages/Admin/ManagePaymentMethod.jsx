import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Typography, Box, TableContainer, Table, TableHead, TableBody, TableRow, Button} from '@mui/material';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';

const secondary = createTheme({
    palette: {
      primary: {
        main: '#790B0A'
      },
    },
  });
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#790B0A",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
      backgroundColor: "rgba(121, 11, 10, 0.1)",
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


const ManagePaymentMethod = () => {
  const [payment, setPayment] = useState([])
  const navigate = useNavigate()
  
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APP_API_URL}api/Payment/GetAllPayments`).then(res => {
        setPayment(res.data)
    })
}, [])

const inactivate = (id) =>{
  const confirmation = window.confirm('Inactivate Payment Method?');
  if (confirmation) {
      axios
      .put(`${import.meta.env.VITE_APP_API_URL}api/Payment/UpdateStatus?id=${id}`,{ isActivated: 0})
      .then(() => {
          window.location.reload();
          })
      .catch((error) => console.log(error))
  } else{
      alert('Inactivate dibatalkan')
  }
}
const activate = (id) =>{
  const confirmation = window.confirm('Activate Payment Method?');
  if (confirmation) {
      axios
      .put(`${import.meta.env.VITE_APP_API_URL}api/Payment/UpdateStatus?id=${id}`,{ isActivated: 1})
      .then(() => {
          window.location.reload();
          })
      .catch((error) => console.log(error))
  } else{
      alert('Activate dibatalkan')
  } 
}

const EditButton = ({data}) => {
  return (
      <ThemeProvider theme={secondary}>
          <Link to={`/admin-view/update-payment/${data}`}>
              <Button sx={{px:4, borderRadius:2, color:'white', textTransform:'none'}} variant='contained'>Edit</Button>
          </Link>
      </ThemeProvider>
  )
}
  return (
    <div>
      <Box sx={{display:'flex', justifyContent:'space-between'}}>
        <Typography variant="h5">Manage Payment Method</Typography>
        <Button sx={{borderRadius:2, textTransform:'none'}} variant='contained' onClick={() => navigate('/admin-view/add-payment')}>
        <AddIcon/> Add Payment Method
      </Button>
      </Box>
        <TableContainer sx={{mt:3}} component={Paper}>
        <Table sx={{ minWidth: 600 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Logo</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
             </TableRow>
          </TableHead>
          <TableBody>
            {payment.map((item)=>(
              <StyledTableRow key={item.id_payment}>
                <StyledTableCell align="center">{item.payment_name}</StyledTableCell>
                <StyledTableCell align="center"><Box component='img' sx={{height:'60px'}} src={`data:image/png;base64,${item.image}`}/> </StyledTableCell>
                <StyledTableCell align="center" >
                  {item.isActivated === true ? 
                  <Button onClick={() => inactivate(item.id_payment)} 
                  sx={{px:4, borderRadius:2, color:'white', textTransform:'none', backgroundColor:'green'}} variant='contained'>Active</Button>
                  :
                  <Button onClick={() => activate(item.id_payment)} 
                  sx={{px:4, borderRadius:2, color:'white', textTransform:'none',backgroundColor:'red'}} variant='contained'>Inactive</Button>}
                </StyledTableCell>
                <StyledTableCell align="center"><EditButton data = {item.id_payment}/></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ManagePaymentMethod