import React from 'react'
import LessonsBanner from '../../Components/LandingPage/LessonsBanner'
import CourseCards from '../../Components/LandingPage/CourseCards'
import Benefits from '../../Components/LandingPage/Benefits'
import MoreCar from '../../Components/LandingPage/MoreCar'
import Footer from '../../Components/LandingPage/Footer'
const Home = () => {
  return (
    <div>
        <LessonsBanner />
        <CourseCards />
        <Benefits />
        <MoreCar />
        <Footer />
    </div>
  )
}

export default Home