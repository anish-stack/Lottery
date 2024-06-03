import React, { useEffect, useState } from 'react';
import './banner.css';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Keyboard, Pagination } from 'swiper/modules';
import axios from 'axios';

const Draw = () => {
    const [DrawGames, setDrawGames] = useState([]);

    const fetchDrawData = async () => {
        try {
            const res = await axios.get('http://localhost:5074/api/v1/draws');
            console.log(res.data.data);
            setDrawGames(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchDrawData();
    }, []);
    const [slidesPerView, setSlidesPerView] = useState('3');

    const handleResize = () => {
        const windowWidth = window.innerWidth;
    
        // Adjust slidesPerView based on window width
        if (windowWidth < 400) {
          setSlidesPerView(1);
        } else if (windowWidth >= 400 && windowWidth < 768) {
          setSlidesPerView(2);
        } else {
          setSlidesPerView(3);
        }
      };
    
      useEffect(() => {
        handleResize(); // Set initial slidesPerView value
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
    return (
        <div className='w-full px-2 banner py-3 min-h-screen'>
            <div className="heading text-center mt-5 relative p-2">
                <h2 className='font-bold text-5xl md:text-8xl font'>
                    <span className='text-orange-400'> Latest</span> Draw Results
                </h2>
            </div>
            <div className='draw-card-body max-w-7xl mx-auto p-5'>
                <Swiper
                    slidesPerView={slidesPerView}
                    spaceBetween={30}
                    keyboard={{ enabled: true }}
                   
                    pagination={{ clickable: true }}
                    modules={[Keyboard, Pagination]}
                    className="mySwiper"
                >
                    {DrawGames && DrawGames.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="draw-card">
                                <div className="gameName text-center">
                                    <h2 className='font text-3xl mb-5 md:text-5xl'>{item.gameName}</h2>
                                </div>
                                <div className="numbers-win">
                                    {item.WinningNumbers && item.WinningNumbers.map((number, idx) => (
                                        <span key={idx} className='numb font-bold'>{number}</span>
                                    ))}
                                </div>
                                <div className="matchingPortaions">
                                    <div className="matching">
                                        <h3 className='mr-1 ml-1 font-semibold'>Matching 5/5</h3>
                                        <h3 className='mr-1 ml-1 font-semibold'>{item.MatchingAll} Winner</h3>
                                    </div>
                                    <div className="matching">
                                        <h3 className='mr-1 ml-1 font-semibold'>Matching 4/5</h3>
                                        <h3 className='mr-1 ml-1 font-semibold'>{item.MatchingFour} Winner</h3>
                                    </div>
                                    <div className="matching">
                                        <h3 className='mr-1 ml-1 font-semibold'>Matching 3/5</h3>
                                        <h3 className='mr-1 ml-1 font-semibold'>{item.MatchingThree} Winner</h3>
                                    </div>
                                    <div className="matching">
                                        <h3 className='mr-1 ml-1 font-semibold'>Matching 2/5</h3>
                                        <h3 className='mr-1 ml-1 font-semibold'>{item.MatchingTwo} Winner</h3>
                                    </div>
                                </div>
                                <div className="data">
                                    <h2>{item.WinnerAnnounceDate}</h2>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default Draw;
