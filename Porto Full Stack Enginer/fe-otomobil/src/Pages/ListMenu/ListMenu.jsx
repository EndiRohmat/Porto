import React from 'react'
import ListMenuBanner from '../../Components/ListMenu/ListMenuBanner'
import ContentText from '../../Components/ListMenu/ContentText'
import AnotherFavoriteCar from '../../Components/ListMenu/AnotherFavoriteCar'
import Footer from '../../Components/LandingPage/Footer'
const ListMenu = () => {
  return (
    <div>
        <ListMenuBanner />
        <ContentText />
        <AnotherFavoriteCar />
        <Footer />
    </div>
  )
}

export default ListMenu