import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom';
import { Typography, Box, TableContainer, Table, TableHead, TableBody, TableRow} from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import axios from 'axios';

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

const UserInvoice = () => {
  const [invoice, setInvoice] = useState([]);
  const [invoiceDetails, setInvoiceDetails] = useState([]);
  const [oto, setOTO] = useState('')

  const { id } = useParams()

  useEffect(() => {
    getInvoiceByIdUser()
    getDetailInvoiceByIdUser()
  }, [])

  const getDetailInvoiceByIdUser = () => {
    axios.get(`${import.meta.env.VITE_APP_API_URL}api/InvoiceDetail/GetDetailInvoice?id_invoice=${id}`)
    .then(res => {
      setInvoiceDetails(res.data);
    })
    .catch(error => {
      console.error(error);
    });
  }

  const getInvoiceByIdUser = () => {
    axios.get(`${import.meta.env.VITE_APP_API_URL}api/Invoice/GetInvoicesById?id_invoice=${id}`)
    .then(res => {
      setInvoice(res.data);
      setOTO(res.data.invoice)
    })
    .catch(error => {
      console.error(error);
    });
  }

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

  return (
    <div>
        <Box>
            <Typography variant='h5'>Detail Invoice</Typography>
            <Box sx={{display:'flex', flexDirection:{sm:'row', xs:'column'}, justifyContent:{sm:'space-between', xs:'flex-start'}, alignItems:{sm:'flex-end'}, mt:2}}>
                <Box>
                    {/* <Typography>No. Invoice &nbsp;: {atob(oto)}</Typography> */}
                    <Typography>No. Invoice &nbsp;: OTO{oto}</Typography>
                    <Typography>Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;: {formatDate(invoice.date)}</Typography>
                </Box>
                <Typography variant='h6' sx={{color:'#4F4F4F', fontWeight:'bold', mt:{sm:0, xs:1}}}>
                  Total Price &nbsp; &nbsp; {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(invoice.totalPrice)}
                </Typography>
            </Box>
            <TableContainer sx={{mt:3}} component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">No</StyledTableCell>
                        <StyledTableCell align="center">Course Name</StyledTableCell>
                        <StyledTableCell align="center">Type</StyledTableCell>
                        <StyledTableCell align="center">Schedule</StyledTableCell>
                        <StyledTableCell align="center">Price</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoiceDetails.map((row, index) => (
                          <StyledTableRow key={row.id_detail}>
                            <StyledTableCell align="center">{index + 1}</StyledTableCell>
                            <StyledTableCell align="center">{row.title}</StyledTableCell>
                            <StyledTableCell align="center">{row.category}</StyledTableCell>
                            <StyledTableCell align="center">{formatDate(row.date)}</StyledTableCell>
                            <StyledTableCell align="center">
                              {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(row.price)}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
                </TableContainer>
        </Box>
    </div>
  )
}

export default UserInvoice