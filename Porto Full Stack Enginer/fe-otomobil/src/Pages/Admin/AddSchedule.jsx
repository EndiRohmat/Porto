import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Typography, Box, TableContainer, Table, TableHead, TableBody, TableRow, Button} from '@mui/material';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

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


const AddSchedule = () => {
    const [schedule, setSchedule] = useState([])
    const [scheduledate, setScheduledate] = useState();
    const navigate = useNavigate()
    const { courseName } = useParams()
    const { courseId } = useParams()
    useEffect(() => {
      axios.get(`${import.meta.env.VITE_APP_API_URL}api/Schedule/GetByCourseId?id=${courseId}`).then(res => {
          setSchedule(res.data)
      })
  }, [])

  const addNew = () => {
    axios.post(`${import.meta.env.VITE_APP_API_URL}api/Schedule`, {
    date : scheduledate,
    fkIdCourse : courseId,
    })
    .then(alert('Schedule Ditambahkan'))
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
    <Typography variant="h5">{`Manage Schedule ${courseName}`}</Typography>
      <Box sx={{display:'flex', alignItems:'center', gap:'20px', marginTop:'20px'}}>
        <CalendarMonthIcon color='action' fontSize='large'/>
            <DatePicker
                selected={scheduledate}
                onChange={(e) => setScheduledate(e)}
                dateFormat="yyyy-MM-dd"
            />
        <Button sx={{borderRadius:2, textTransform:'none'}} variant='contained' onClick={addNew}>
            <AddIcon/> Add Schedule
        </Button>
      </Box>
        <TableContainer sx={{mt:3}} component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">No</StyledTableCell>
              <StyledTableCell align="center">Schedule</StyledTableCell>
             </TableRow>
          </TableHead>
          <TableBody>
            {schedule.map((item,index)=>(
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                <StyledTableCell align="center" >{formatDate(item.date)}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default AddSchedule