import React from 'react'
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';
import AnotherFavoriteCar from '../ListMenu/AnotherFavoriteCar';
const DetailCourse = () => {
    const {payload, isLoggedIn} = useAuth()
    const {courseId} = useParams()
    const navigate = useNavigate()
    const [detailCourse,setDetailCourse] = useState([])
    const [date,setDate] = useState([])
    const [schedule, setSchedule] = useState([]);
    const [gambar, setGambar] = useState('');
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'IDR',
    });
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
        window.scrollTo(0, 0)
        course()
        scheduleDate()
    }, [courseId])

    const course = () => {
        axios.get(`${import.meta.env.VITE_APP_API_URL}api/Course/GetById?id=${courseId}`)
        .then(res => {setDetailCourse(res.data),setGambar(res.data.image)
        })
        .catch(error => {
        console.error(error);
        });
    }
    
    const scheduleDate = () =>{
        axios.get(`${import.meta.env.VITE_APP_API_URL}api/Schedule/GetByCourseId?id=${courseId}`)
        .then(res => {setDate(res.data)
        })
        .catch(error => {
        console.error(error);
        });
    }

    const addCart = (schedule, tocart) => {
        if(schedule.length === 0){
            alert('Pilih jadwal dulu')
            return 
        }
        if(!payload){
            alert('silahkan login terlebih dahulu')
            navigate('/login')
            return 
        }
        if (!tocart) {
            axios.post(`${import.meta.env.VITE_APP_API_URL}api/Cart/AddCart`, {
                fk_id_user : payload.id,
                fk_id_schedule: schedule
            })
            .then(alert('course telah ditambahkan'))
            .catch(error => {
                console.error(error);
            });
        } else {
            axios.post(`${import.meta.env.VITE_APP_API_URL}api/Cart/AddCart`, {
                fk_id_user : payload.id,
                fk_id_schedule: schedule
            })
            .then(alert('course telah ditambahkan'))
            .catch(error => {
                console.error(error);
            });
            
            navigate('/checkout')
        }
    }

    const handleSelect = (event) => {
        setSchedule(event.target.value)
    }

  return (
    <>
    <section>
        <div style={{display:'flex',width:'100%', justifyContent:'center', height:'100vh', marginBottom:'60px'}}>         
            <div style={{maxWidth:'1200px', width:'100%', padding:'20px'}}>
                <div style={{display:'flex', flexWrap:'wrap', gap:'30px'}}>
                    <div>
                        <img src={`data:image/png;base64,${gambar}`} alt="Course" style={{maxWidth:'400px',width:'100%', height:'266.67px', border: '1px solid #BDBDBD'}}/>
                    </div>
                    <div style={{display:'flex',flexDirection:'column', maxWidth:'700px', width:'100%', gap:'20px'}}>
                        <div>
                            <Typography  variant="h6" color="text.secondary">
                                {detailCourse.category}
                            </Typography>
                            <Typography  variant="h6" color="black">
                                {detailCourse.name}
                            </Typography>
                            <Typography  variant="h6" style={{ color: "#790B0A" }}>
                                {formatter.format(detailCourse.price)}
                            </Typography>
                        </div>
                        <div>
                            <FormControl sx={{minWidth: 220 }} size="small">
                                <InputLabel id="demo-select-small-label" style={{fontSize:'14px'}}>Select Schedule</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={schedule}
                                    label="Select Schedule"
                                    onChange={handleSelect}
                                >
                                    {date && date.map((list) => (
                                    <MenuItem value={list.idSchedule} key={list.idSchedule}>{formatDate(list.date)}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div style={{display:'flex', gap:'20px'}}>
                        <button  onClick={() => addCart(schedule, false)}
                            style={{
                            width:'233.5px', height:'40px', border:'2px solid #790B0A', borderRadius:'8px', 
                            backgroundColor:'#FFFFFF', padding:'10px 20px 10px 20px', gap:'10px', cursor:'pointer', 
                            fontFamily:'Montserrat', fontWeight:'500', fontSize:'16px', color:'#790B0A'}}>Add to Cart
                        </button>
                        <button  onClick={() => addCart(schedule, true)}
                            style={{
                            width:'233.5px', height:'40px', border:'2px solid #790B0A', borderRadius:'8px', 
                            backgroundColor:'#790B0A', padding:'10px 20px 10px 20px', gap:'10px', cursor:'pointer', 
                            fontFamily:'Montserrat', fontWeight:'500', fontSize:'16px', color:'#FFFFFF'}}>Buy Now
                        </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                    <Typography style={{variant:'h2', fontFamily:'Montserrat', fontWeight:'600', fontSize:'24px', color:'#333333'}}>Description</Typography>
                    </div>
                    <div>
                    <p style={{weight:'1140px', height:'80px', fontFamily:'Montserrat', fontWeight:'400', fontSize:'16px', color:'#333333', textAlign:'justify'}}>
                    {detailCourse.description}
                    </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <AnotherFavoriteCar></AnotherFavoriteCar>
    </>
  )
}

export default DetailCourse