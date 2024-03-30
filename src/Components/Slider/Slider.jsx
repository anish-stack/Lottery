import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Keyboard, Pagination } from 'swiper/modules';
import './styles.css';
import img1 from './slide1.jpg'
import img2 from './slide2.jpg'
import img3 from './slide3.jpg'


const Slider = () => {
    const data = [
        {
            img:img1
        },
        {
            img:img2

        },
        {
            img:img3

        }
    ]
  return (
    <div>
            <Swiper
        slidesPerView={1}
        spaceBetween={30}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
       
        modules={[Keyboard, Pagination]}
        className="mySwiper"
      >
        {data.map((item,index)=>(
            
            <SwiperSlide key={index}><img src={item.img} alt="img" /></SwiperSlide>
        ))}
       
      </Swiper>
    </div>
  )
}

export default Slider
