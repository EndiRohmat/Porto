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

const ManageCourse = () => {
  const [course, setCourse] = useState([])
  const navigate = useNavigate()

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'IDR',
});

  useEffect(() => {
    axios
    .get(`${import.meta.env.VITE_APP_API_URL}api/Course`).then(res => {
        setCourse(res.data)
    })
    .catch((error) => console.log(error))
}, [])

const inactivate = (id) =>{
  const confirmation = window.confirm('Inactivate Course?');
  if (confirmation) {
      axios
      .put(`${import.meta.env.VITE_APP_API_URL}api/Course/UpdateStatus?id=${id}`,{ isActivated: 0})
      .then(() => {
          window.location.reload();
          })
      .catch((error) => console.log(error))
  } else{
      alert('Inactivate dibatalkan')
  }
}
const activate = (id) =>{
  const confirmation = window.confirm('Activate Course?');
  if (confirmation) {
      axios
      .put(`${import.meta.env.VITE_APP_API_URL}api/Course/UpdateStatus?id=${id}`,{ isActivated: 1})
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
          <Link to={`/admin-view/update-course/${data}`}>
              <Button sx={{px:4, borderRadius:2, color:'white', textTransform:'none'}} variant='contained'>Edit</Button>
          </Link>
      </ThemeProvider>
  )
}

const AddSchedule = ({name, id}) =>{
  return (
    <ThemeProvider theme={secondary}>
    <Link to={`/admin-view/add-schedule/${name}/${id}`}>
        <Button sx={{px:4, borderRadius:2, color:'white', textTransform:'none'}} variant='contained'>Schedule</Button>
    </Link>
    </ThemeProvider>
  )
}

  return (
    <div>
      <Box sx={{display:'flex', justifyContent:'space-between'}}>
        <Typography variant="h5">Manage Course</Typography>
        <Button sx={{borderRadius:2, textTransform:'none'}} variant='contained' onClick={() => navigate('/admin-view/add-course')}>
        <AddIcon	/> Add Course
      </Button>
      </Box>
        <TableContainer sx={{mt:3}} component={Paper}>
        <Table sx={{ minWidth: 1300  }} aria-label="simple table">
          <TableHead>
            <TableRow>
                <StyledTableCell align="center">Image</StyledTableCell>
                <StyledTableCell align="center">Course</StyledTableCell>
                <StyledTableCell align="center">Category</StyledTableCell>
                <StyledTableCell align="center">Price</StyledTableCell>
                <StyledTableCell align="center">Description</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
                <StyledTableCell align="center">Schedule</StyledTableCell>
             </TableRow>
          </TableHead>
          <TableBody>
            {course.map((item)=>(
              <StyledTableRow key={item.idCourse}>
                <StyledTableCell align="center"><Box component='img' sx={{height:'100px'}} src={`data:image/png;base64,${item.image}`}/> </StyledTableCell>
                <StyledTableCell align="center">{item.name}</StyledTableCell>
                <StyledTableCell align="center">{item.category}</StyledTableCell>
                <StyledTableCell align="center">{formatter.format(item.price)}</StyledTableCell>
                <StyledTableCell align="justify">{item.description}</StyledTableCell>
                <StyledTableCell align="center" >
                {item.isActivated === true ? 
                  <Button onClick={() => inactivate(item.idCourse)} 
                  sx={{px:4, borderRadius:2, color:'white', textTransform:'none', backgroundColor:'green'}} variant='contained'>Active</Button>
                  :
                  <Button onClick={() => activate(item.idCourse)}
                  sx={{px:4, borderRadius:2, color:'white', textTransform:'none',backgroundColor:'red'}} variant='contained'>Inactive</Button>}
                </StyledTableCell>
                <StyledTableCell align="center"><EditButton data = {item.idCourse}/></StyledTableCell>
                <StyledTableCell align="center"><AddSchedule name = {item.name} id = {item.idCourse}/></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ManageCourse