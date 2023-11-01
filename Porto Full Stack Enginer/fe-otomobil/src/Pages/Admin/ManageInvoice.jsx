import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Typography, Box, TableContainer, Table, TableHead, TableBody, TableRow, Button} from '@mui/material';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

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


const ManageInvoice = () => {
  const [invoices, setInvoices] = useState([])
  const navigate = useNavigate()
  
  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
  
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
    const dayOfWeek = days[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
  
    return `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
}
useEffect(() => {
  axios
  .get(`${import.meta.env.VITE_APP_API_URL}api/Invoice`).then(res => {
      setInvoices(res.data)
  })
  .catch((error) => console.log(error))
}, [])

const EditButton = ({data}) => {
  return (
      <ThemeProvider theme={secondary}>
          <Link to={`/admin-view/detail-invoice/${data}`}>
              <Button sx={{px:4, borderRadius:2, color:'white', textTransform:'none'}} variant='contained'>Detail</Button>
          </Link>
      </ThemeProvider>
  )
}
  return (
    <div>
        <Typography variant="h5">Manage Invoice</Typography>
        <TableContainer sx={{mt:3}} component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">No.Invoice</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">Total Course</StyledTableCell>
              <StyledTableCell align="center">Total Price</StyledTableCell>
               <StyledTableCell align="center">Action</StyledTableCell>
             </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((row,index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">OTO{row.idOto}</StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{formatDate(row.date)}</StyledTableCell>
                <StyledTableCell align="center">{row.total_course}</StyledTableCell>
                <StyledTableCell align="center">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(row.totalPrice)}</StyledTableCell>
                  <StyledTableCell align="center"><EditButton data = {row.idInvoice}/></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ManageInvoice