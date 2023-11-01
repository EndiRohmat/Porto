import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';


const TableInvoices = () => {
    const {payload} = useAuth()
    const [invoice, setInvoice] = useState([]);

    useEffect(() => {
      getInvoiceByIdUser()
    }, [])

    const getInvoiceByIdUser = () => {
      axios.get(`${import.meta.env.VITE_APP_API_URL}api/Invoice/GetInvoicesByIdUser?id_user=${payload.id}`)
      .then(res => {
        setInvoice(res.data);
      })
      .catch(error => {
        console.error(error);
      });
    }
    const DetailButton = ({data}) => {
      return (
          <ThemeProvider theme={secondary}>
              <Link to={`/invoices/detail/${data}`}>
                  <Button sx={{px:4, borderRadius:2, color:'#790B0A',border: '1px solid #790B0A', textTransform:'none', fontWeight:'700'}} variant='contained'>Details</Button>
              </Link>
          </ThemeProvider>
      )  
    }

    const secondary = createTheme({
      palette: {
        primary: {
          main: '#FFFF'
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
      <Box sx={{pt:4, px:10, mb:20}}>
        <section>
          <Link to="/" style={{ color: '#828282', fontFamily: 'Montserrat', fontWeight: '600', fontSize: '16px', textDecoration:'none' }}>
            Home
          </Link>
          <span style={{ color: '#828282' }}> &gt; </span>
          <span style={{ color: '#790B0A', fontFamily: 'Montserrat', fontWeight: '600', fontSize: '16px' }}>
            Invoice
          </span>
        </section>
        <section style={{marginTop:'30px'}}>
          <h2 style={{ fontFamily: 'Montserrat', fontWeight: '600', fontSize: '20px', color: '#4F4F4F' }}>Menu Invoice</h2>
        </section>
        <TableContainer sx={{mt:2}} component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">No</StyledTableCell>
                <StyledTableCell align="center">No. Invoice</StyledTableCell>
                <StyledTableCell align="center">Date</StyledTableCell>
                <StyledTableCell align="center">Total Course</StyledTableCell>
                <StyledTableCell align="center">Total Price</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoice.map((row, index) => (
              <StyledTableRow key={row.idInvoice}>
              <StyledTableCell align="center">{index + 1}</StyledTableCell>
              {/* <StyledTableCell align="center">{window.atob(row.invoice)}</StyledTableCell> */}
              <StyledTableCell align="center">OTO{row.invoice}</StyledTableCell>
              <StyledTableCell align="center">{formatDate(row.date)}</StyledTableCell>
              <StyledTableCell align="center">{row.total_course}</StyledTableCell>
              <StyledTableCell align="center">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(row.totalPrice)}</StyledTableCell>
              <StyledTableCell align="center">{<DetailButton data={row.idInvoice}/>}</StyledTableCell>
              </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  )
}

export default TableInvoices