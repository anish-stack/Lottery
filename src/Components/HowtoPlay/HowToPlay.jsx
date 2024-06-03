import React from 'react'
import img from './customer-service.png'
import img2 from './htp-2.webp'
import img3 from './C.png'
import img4 from './pay.png'
import img5 from './LIVE.png'




const HowToPlay = () => {
    return (
        <div className='w-full px-2 py-3 max-w-[1400px] border-t-[0.5px]  h-full md:h-[80dvh] mx-auto   '>
            <div className="heading text-center mt-5 relative p-2 ">
                <h2 className='font-bold text-5xl md:text-8xl font'><span className='text-orange-400'>How</span> To Play</h2>
            </div>
            <div className='cards-body mt-5  gap-2 grid md:grid-cols-5 w-full grid-cols-2  '>
                <div className='card w-full text-pretty md:border-r-2 text-center px-5 py-5'>
                    <div className="card-number text-center  flex items-center mb-5 px-2 justify-center "><span className='card-num  bg-orange-400 rounded-[50%] w-8 h-8'>1</span></div>
                    <div className="card-img  flex items-center justify-center ">
                        <img src={img} className='w-[80%] h-full object-cover' alt="register" />
                    </div>
                    <div className="card-content">
                        <p>
                            <b>REGISTER</b> OR <b>LOGIN</b> TO YOUR ACCOUNT
                        </p>
                    </div>
                </div>
               <div className='card w-full text-pretty md:border-r-2 text-center px-5 py-5'>
                    <div className="card-number text-center  flex items-center mb-5 px-2 justify-center "><span className='card-num  bg-orange-400 rounded-[50%] w-8 h-8'>2</span></div>
                    <div className="card-img  flex items-center justify-center ">
                        <img src={img2} className='w-[80%] h-full object-cover' alt="register" />
                    </div>
                    <div className="card-content">
                        <p>
                            <b>SELECT</b> YOUR <b>GAME</b> OF YOUR CHOICE
                        </p>
                    </div>
                </div>
               <div className='card w-full text-pretty md:border-r-2 text-center px-5 py-5'>
                    <div className="card-number text-center  flex items-center mb-5 px-2 justify-center "><span className='card-num  bg-orange-400 rounded-[50%] w-8 h-8'>3</span></div>
                    <div className="card-img  flex items-center justify-center ">
                        <img src={img3} className='w-[80%] h-full object-cover' alt="register" />
                    </div>
                    <div className="card-content">
                        <p>
                            <b>SELECT </b> YOUR <b> YOUR FAVORITE</b> TICKET NUMBERS
                        </p>
                    </div>
                </div>
               <div className='card w-full text-pretty md:border-r-2 text-center px-5 py-5'>
                    <div className="card-number text-center  flex items-center mb-5 px-2 justify-center "><span className='card-num  bg-orange-400 rounded-[50%] w-8 h-8'>4</span></div>
                    <div className="card-img  flex items-center justify-center ">
                        <img src={img4} className='w-[80%] h-full object-cover' alt="register" />
                    </div>
                    <div className="card-content">
                        <p>
                            <b>COMPLETE </b> THE <b>PAYMENT</b> USING UPI OR CARDS
                        </p>
                    </div>
                </div>
               <div className='card w-full text-pretty md:border-r-2 text-center px-5 py-5'>
                    <div className="card-number text-center  flex items-center mb-5 px-2 justify-center "><span className='card-num  bg-orange-400 rounded-[50%] w-8 h-8'>5</span></div>
                    <div className="card-img  flex items-center justify-center ">
                        <img src={img5} className='w-[80%] h-full object-cover' alt="register" />
                    </div>
                    <div className="card-content">
                        <p>
                            <b>WATCH OUR LIVE</b> OR <b>DRAW EVERY</b> WEEK, TO SEE THE WINNING NUMBERS.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HowToPlay