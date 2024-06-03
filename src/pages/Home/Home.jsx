import React from 'react'
import Slider from '../../Components/Slider/Slider'
import Games from '../../Components/Games/Games'
import HowToPlay from '../../Components/HowtoPlay/HowToPlay'
import Faq from '../../Components/Faq/Faq'
import Draw from '../Draw/Draw'
import Winners from '../../Components/Winner/Winners'

const Home = () => {
  return (
    <div className='min-h-screen'>
      <Slider/>
      <Games/>
      <Winners/>
      <HowToPlay/>
      <Draw/>
      <Faq/>
    </div>
  )
}

export default Home
