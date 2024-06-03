import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper-bundle.min.css';
import './winners.css'
const Winners = () => {
    // Sample winners data
    const winnersData = [
        { name: 'John Doe', winningAmount: 'Rs 500', gameName: 'Jackpot Queen', image: 'https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-855.jpg?w=740&t=st=1717417150~exp=1717417750~hmac=130dca924328a4d319cedc1d58953957a9182650d4f6731849bdc0b761c464df' },
        { name: 'Jane Smith', winningAmount: 'Rs 700', gameName: 'Jackpot King', image: 'https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-855.jpg?w=740&t=st=1717417150~exp=1717417750~hmac=130dca924328a4d319cedc1d58953957a9182650d4f6731849bdc0b761c464df' },
        { name: 'Alice Johnson', winningAmount: 'Rs 900', gameName: 'Big Prize', image: 'https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-855.jpg?w=740&t=st=1717417150~exp=1717417750~hmac=130dca924328a4d319cedc1d58953957a9182650d4f6731849bdc0b761c464df' },
        { name: 'John Doe', winningAmount: 'Rs 500', gameName: 'Jackpot Queen', image: 'https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-855.jpg?w=740&t=st=1717417150~exp=1717417750~hmac=130dca924328a4d319cedc1d58953957a9182650d4f6731849bdc0b761c464df' },
        { name: 'Jane Smith', winningAmount: 'Rs 700', gameName: 'Jackpot King', image: 'https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-855.jpg?w=740&t=st=1717417150~exp=1717417750~hmac=130dca924328a4d319cedc1d58953957a9182650d4f6731849bdc0b761c464df' },
        { name: 'Alice Johnson', winningAmount: 'Rs 900', gameName: 'Big Prize', image: 'https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-855.jpg?w=740&t=st=1717417150~exp=1717417750~hmac=130dca924328a4d319cedc1d58953957a9182650d4f6731849bdc0b761c464df' }
    ];
    const [slidesPerView, setSlidesPerView] = useState('4');

    const handleResize = () => {
        const windowWidth = window.innerWidth;
    
        // Adjust slidesPerView based on window width
        if (windowWidth < 400) {
          setSlidesPerView(1);
        } else if (windowWidth >= 400 && windowWidth < 768) {
          setSlidesPerView(2);
        } else {
          setSlidesPerView(4);
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
        <div className="my-10">
            <div className='p-4 text-center'>
                <h2 className="jackpotFonts">Winners Of The <span className='text-[#FB923C]'>Week</span></h2>
            </div>
            <Swiper
                slidesPerView={slidesPerView}
                spaceBetween={30}
                pagination={{ clickable: true }}
                loop={true}
                className="mySwiper"
            >
                {winnersData.map((winner, index) => (
                    <SwiperSlide key={index}>
                        <div className="bg-[#FB923C] p-5 rounded-lg shadow-md">
                            <div className="text-center">
                                <div className='w-20 h-20 mx-auto'>
                                    <img src={winner.image} alt={winner.name} className="rounded-full mx-auto w-12 h-12 mb-4" />
                                </div>
                                <h2 className="text-lg font-semibold">{winner.name}</h2>
                                <p className="text-[#ffffff] mb-2">Winning Amount: {winner.winningAmount}</p>
                                <p className="text-white mb-2">Game Name: {winner.gameName}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Winners;
