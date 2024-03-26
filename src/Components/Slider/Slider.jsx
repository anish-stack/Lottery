import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Keyboard, Pagination } from 'swiper/modules';
import './styles.css';
const Slider = () => {
    const data = [
        {
            img:"https://gulfticket.com/cdn//web/home/S6_PRIZEWINNER_D.png"
        },
        {
            img:"https://gulfticket.com/cdn//web/home/F5_PRIZEWINNER_D.png"

        },
        {
            img:"https://gulfticket.com/cdn/web/home/Slider-20.jpg"

        },
        {
            img:"https://gulfticket.com/cdn//web/home/S6_PRIZEWINNER_D.png"

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
