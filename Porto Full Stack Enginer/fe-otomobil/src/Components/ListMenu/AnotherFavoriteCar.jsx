import Cards from "../LandingPage/Cards"
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom"

const AnotherFavoriteCar = () => {
    const [carCourses, setCarCourses] = useState([])
    useEffect(() => {
        Axios
        .get(`${import.meta.env.VITE_APP_API_URL}api/Course/GetActiveCourse`).then(res => {
            setCarCourses(res.data)
        })
        .catch((error) => console.log(error))
    }, [])
  return (
    <section style={{display:'flex',width:'100%', borderTop:'1px solid #ccc', borderBottom: '1px solid #ccc'}}>
            <div style={{margin:'auto',width: '1380px'}}>
                <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center' ,width: '100%', height:'100%',
                    fontFamily: 'Montserrat', gap: '40px'}}>
                    <div style={{display:'flex', justifyContent:'center',alignItems: 'center', flexDirection:'column', margin:'100px'}}>
                        <div style={{fontWeight:'600', fontSize: '50px', color:'#790B0A', marginBottom:'100px'}}>Another favorite course</div>
                    <div style={{display: 'flex',gap:'20px', maxWidth: '1200px', flexWrap:'wrap', justifyContent:'center',alignItems: 'center' }}>
                    {carCourses.map((course) => {
                        return(
                            <Link key={course.idCourse} style={{textDecoration:'none', color:'black'}} to={`/course-detail/${course.idCourse}` }>
                                <Cards name={course.name} image={course.image} price={course.price} type={course.category}/>
                            </Link>
                        )
                    })}
                    </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default AnotherFavoriteCar