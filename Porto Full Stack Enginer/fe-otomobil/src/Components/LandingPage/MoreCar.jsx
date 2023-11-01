import Axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const MoreCar = () => {
    const [carTypes, setCarTypes] = useState([])
    useEffect(() => {
        Axios.get(`${import.meta.env.VITE_APP_API_URL}api/Category/GetActiveCategory`).then(res => {
            setCarTypes(res.data)
        })
    }, [])

  return (
    <section>
    <div style={{Width: '1280px', marginTop:'120px', marginBottom:'120px'}}>
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center' ,width: '100%', height:'100%',
            fontFamily: 'Montserrat', gap: '40px'}}>
            <div style={{display:'flex', justifyContent:'center',alignItems: 'center', flexDirection:'column', gap:'40px'}}>
                <div style={{fontWeight:'600', fontSize: '32px', color:'#790B0A', marginBottom:'40px'}}>More car type you can choose</div>
            <div style={{display: 'flex',gap:'40px', maxWidth: '1100px', flexWrap:'wrap', justifyContent:'center',alignItems: 'center' }}>
                {carTypes.map((type) => {
                    return(
                    <Link key={type.idCategory} style={{textDecoration:'none', color:'black'}} to={`/type-course/${type.idCategory}` }>
                    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', cursor: 'pointer'}}>
                        <div ><img src={`data:image/png;base64,${type.image}`} alt="Type Car" /></div>
                        <div style={{fontFamily: 'Inter', fontWeight:'400', fontSize:'24px'}}>{type.name}</div>
                    </div>
                    </Link>
                    )
                })
                }
            </div>
            </div>
        </div>
    </div>
    <hr></hr>
</section>
  )
}

export default MoreCar