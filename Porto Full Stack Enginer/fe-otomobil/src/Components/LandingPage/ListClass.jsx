import axios from 'axios';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import Footer from './Footer';

const ListClass = () => {
    const [myClass, setMyClass] = useState([]);
    const {payload} = useAuth()
    useEffect(() => {
        getMyClass()
      }, [])
  
      const getMyClass = () => {
        axios.get(`${import.meta.env.VITE_APP_API_URL}api/InvoiceDetail/GetMyClass?id_user=${payload.id}`)
        .then(res => {
          setMyClass(res.data);
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
    <>
    <div style={{width: '100%',gap:'20px',padding:'20px', display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center', borderBottom:'1px solid grey', minHeight:'55vh'}}>
        <div style={{ maxWidth: '1280px', padding: '20px', fontFamily:'Montserrat', width:'100%'}}>
        {myClass.map((row, index) => (
            <div key={index} style={{display: 'flex', alignItems:'center', borderBottom: '1px solid grey', paddingBottom: '30px', marginBottom:'20px'}}>
                <div style={{display:'flex', alignItems:'center', gap:' 30px'}}>
                    <Box component='img' sx={{height:'134px', width:'200px'}} src={`data:image/png;base64,${row.image}`}/>
                    <div style={{display:'flex', flexDirection:'column', gap: '5px'}}>
                        <span style={{fontWeight:'400', fontSize:'16px', color: '#828282'}}>{row.category}</span>
                        <span style={{fontWeight:'600', fontSize:'24px', color: '#333333'}}>{row.title}</span>
                        <span style={{fontWeight:'600', fontSize:'16px', color: '#790B0A'}}>{formatDate(row.date)}</span>
                    </div>
                 </div>
            </div>
        ))}
        </div>
    </div>
    <Footer></Footer>
    </>
  )
}

export default ListClass