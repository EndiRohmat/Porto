import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Typography, Box, TableContainer, Table, TableHead, TableBody, TableRow, Button} from '@mui/material';
import Axios from 'axios';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
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




const AdminView = () => {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()
 
  useEffect(() => {
    Axios
    .get(`${import.meta.env.VITE_APP_API_URL}api/User`).then(res => {
        setUsers(res.data)
    })
    .catch((error) => console.log(error))
  }, [])

  const inactivate = (id) =>{
    const confirmation = window.confirm('Inactivate User?');
    if (confirmation) {
        Axios
        .put(`${import.meta.env.VITE_APP_API_URL}api/User/UpdateStatus?id=${id}`,{ isActivated: 0})
        .then(() => {
            window.location.reload();
            })
        .catch((error) => console.log(error))
    } else{
        alert('Inactivate dibatalkan')
    }
  }
  const activate = (id) =>{
    const confirmation = window.confirm('Activate User?');
    if (confirmation) {
        Axios
        .put(`${import.meta.env.VITE_APP_API_URL}api/User/UpdateStatus?id=${id}`,{ isActivated: 1})
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
          <Link to={`/admin-view/update-user/${data}`}>
              <Button sx={{px:4, borderRadius:2, color:'white', textTransform:'none'}} variant='contained'>Edit</Button>
          </Link>
      </ThemeProvider>
  )
}

  return (
    <div>
      <Box sx={{display:'flex', justifyContent:'space-between'}}>
        <Typography variant="h5">Manage User</Typography>
        <Button sx={{borderRadius:2, textTransform:'none'}} variant='contained' onClick={() => navigate('/admin-view/add-user')}>
        <AddIcon/> Add User
        </Button>
      </Box>
      <TableContainer sx={{mt:3}} component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Role</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
             </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row, index)=>(
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{row.username}</StyledTableCell>
                <StyledTableCell align="center">{row.email}</StyledTableCell>
                <StyledTableCell align="center">{row.role}</StyledTableCell>
                <StyledTableCell align="center" >
                {row.isActivated === true ? 
                  <Button onClick={() => inactivate(row.id)}
                  sx={{px:4, borderRadius:2, color:'white', textTransform:'none', backgroundColor:'green'}} variant='contained'>Active</Button>
                  :
                  <Button onClick={() => activate(row.id)}
                  sx={{px:4, borderRadius:2, color:'white', textTransform:'none',backgroundColor:'red'}} variant='contained'>Inactive</Button>}
                </StyledTableCell>
                <StyledTableCell align="center"><EditButton data = {row.id}/></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default AdminView