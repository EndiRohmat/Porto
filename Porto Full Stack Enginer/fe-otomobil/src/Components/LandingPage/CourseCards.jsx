import Axios from 'axios';
import { useEffect, useState } from 'react';
import Cards from './Cards';
import { Link } from "react-router-dom"



const CourseCards = () => {
    const [carCourses, setCarCourses] = useState([])
    useEffect(() => {
        Axios
        .get(`${import.meta.env.VITE_APP_API_URL}api/Course/GetActiveCourse`).then(res => {
            setCarCourses(res.data)
        })
        .catch((error) => console.log(error))
    }, [])


  return (
        <section>
            <div style={{Width: '1280px', marginTop:'80px'}}>
                <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center' ,width: '100%', height:'100%',
                    fontFamily: 'Montserrat', gap: '40px'}}>
                    <div style={{display:'flex', justifyContent:'center',alignItems: 'center', flexDirection:'column'}}>
                        <div style={{fontWeight:'600', fontSize: '32px', color:'#790B0A', marginBottom:'40px'}}>Join us for the course</div>
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

export default CourseCards