import React, { useState } from 'react';
import './Cart.css';
import { Link } from 'react-router-dom';
import noCart from './carts.png'
import axios from 'axios'
import Swal from 'sweetalert2';

const Cart = () => {
    const token = localStorage.getItem('LampToken');
    const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem('cart')) || []);

    const deleteGame = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
        sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const totalMoney = cart.reduce((total, item) => total + item.gamePrice, 0);

    const handlePayButtonClick = async () => {
        try {
            for (let i = 0; i < gameIds.length; i++) {
                const selectedNumbersArray = GameNumbers[i].map(num => ({ selectNumber: num })); // Convert numbers to objects

                const response = await axios.post(
                    'http://localhost:5074/api/v1/make-a-games',
                    {
                        cart
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                const paymentData = response.data.paymentData;
                if (paymentData && paymentData.data && paymentData.data.instrumentResponse && paymentData.data.instrumentResponse.redirectInfo && paymentData.data.instrumentResponse.redirectInfo.url) {
                    const redirectUrl = paymentData.data.instrumentResponse.redirectInfo.url;
                    console.log(`Redirecting to: ${redirectUrl}`);
                    window.location.href = redirectUrl; // Redirect to the payment page
                    break; // Exit the loop after the first successful payment initiation
                } else {
                    console.error("Invalid payment data received:", paymentData);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };



    const gameIds = cart.map(games => games.gameId);
    const gameName = cart.map(games => games.gameName);
    const GameNumbers = cart.map(games => games.GameNumbers);
    // console.log("Items-Which-Prensent",cart)


    return (
        <div className='cart cartBg  w-full min-h-screen px-2 py-3 m-2'>
            <div className="cart-container max-w-7xl w-full mx-auto h-full bg-white">
                <div className="heading text-center mt-5 relative p-2 ">
                    <h2 className='font-bold text-5xl md:text-8xl font'><span className='text-orange-400'>Your</span> Cart</h2>
                </div>
                <div className="cart-table mt-5 text-left overflow-y-hidden overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 " border={2}>
                        <thead className="bg-orange-200">
                            <tr>
                                <th scope="col" className="px-6 py-3  text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    S.no
                                </th>
                                <th scope="col" className="px-6 py-3  text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    Game Name
                                </th>
                                <th scope="col" className="px-6 py-3  text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    Selected Number
                                </th>
                                <th scope="col" className="px-6 py-3  text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3  text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    Quantity
                                </th>
                                <th scope="col" className="px-6 py-3  text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    Remove Game
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {cart.length === 0 ? (

                                <>


                                    <tr className='text-center'>
                                        <th colSpan="6" className=' '><img src={noCart} className='w-full h-[400px]  flex items-center justify-center object-contain' alt="" /></th>



                                    </tr>
                                </>
                            ) : (
                                cart.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-6  py-4 whitespace-nowrap"><p className='bg-orange-200 w-8 h-8 text-center rounded-[50%]'>{index + 1}</p></td>
                                        <td className="px-6  py-4 whitespace-nowrap">{item.gameName}</td>
                                        <td className="px-6  py-4 whitespace-nowrap">{item.GameNumbers.join(', ')}</td>
                                        <td className="px-6  py-4 whitespace-nowrap">Rs {item.gamePrice}</td>
                                        <td className="px-6  py-4 whitespace-nowrap">{item.quantity}</td>
                                        <td className="px-6  py-4 whitespace-nowrap text-left cursor-pointer" onClick={() => deleteGame(index)}>
                                            <i className="ri-delete-bin-2-line font-bold text-lg text-red-500"></i>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>


                </div>
                <div className="total-money text-right pr-4">
                    <h3 className="font-bold m-5  text-lg">Total: Rs <span className='text-orange-600'>{totalMoney}</span></h3>

                    <button onClick={(e) => { handlePayButtonClick(gameIds, GameNumbers, totalMoney); e.preventDefault(); }} className='button-ctas w25 mt-5 text-right hover:bg-orange-400'>Click To Pay</button>
                </div>

            </div>
        </div>
    );
};

export default Cart;
