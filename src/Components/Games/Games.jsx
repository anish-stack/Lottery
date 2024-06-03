import React, { useEffect, useState } from 'react';
import './Games.css';
import axios from 'axios';
import Timer from './Timer';
import Swal from 'sweetalert2';

const Games = () => {
    const [games, setGames] = useState([]);
    const [selectedNumbersByGame, setSelectedNumbersByGame] = useState({});
    const [quantities, setQuantities] = useState({});
    const [Price, setPrices] = useState({});
    const handleIncrease = (gameId) => {
        setQuantities(prevState => ({
            ...prevState,
            [gameId]: (prevState[gameId] || 0) + 1
        }));
    };

    const handleDecrease = (gameId) => {
        setQuantities(prevState => ({
            ...prevState,
            [gameId]: Math.max((prevState[gameId] || 1) - 1, 1)
        }));
    };

    useEffect(() => {
        const updatedPrices = {};
        for (const gameId in quantities) {
            updatedPrices[gameId] = quantities[gameId] * 100; // Multiply quantity by default price (100)
        }
        setPrices(updatedPrices);
    }, [quantities]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5074/api/v1/games');
                console.log(response.data.data)
                setGames(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const clickNumber = (number, gameId) => {
        const selectedNumbers = selectedNumbersByGame[gameId] || [];

        if (selectedNumbers.includes(number)) {
            // If the number is already selected, remove it
            const updatedNumbers = selectedNumbers.filter(n => n !== number);
            setSelectedNumbersByGame({
                ...selectedNumbersByGame,
                [gameId]: updatedNumbers
            });
            
        } else if (selectedNumbers.length < 5) {
            // If the number is not selected and total selected numbers are less than 5, add it
            const updatedNumbers = [...selectedNumbers, number];
            setSelectedNumbersByGame({
                ...selectedNumbersByGame,
                [gameId]: updatedNumbers
            });
        }
    };

    const shuffleNumbers = (gameId) => {
        const availableNumbers = generateNumber(games.find(game => game._id === gameId).HowMuchNumber.endNumber);
        const shuffledNumbers = [];
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * availableNumbers.length);
            shuffledNumbers.push(availableNumbers.splice(randomIndex, 1)[0]);
        }
        setSelectedNumbersByGame({
            ...selectedNumbersByGame,
            [gameId]: shuffledNumbers
        });

    };

    const clearAllNumbers = (gameId) => {
        setSelectedNumbersByGame({
            ...selectedNumbersByGame,
            [gameId]: []
        });
        setPrices({
            ...setPrices,
            [gameId]: [100]
        });
        setQuantities({
            ...setQuantities,
            [gameId]: 0
        })
    };

    function generateNumber(endNumber) {
        const numbers = Array.from({ length: endNumber }, (_, index) => index + 1);
        return numbers;
    }

    function calculateTimeLeft(DateAndTimeOfWinnerAnnouncement) {
        console.log(DateAndTimeOfWinnerAnnouncement)
        const difference = new Date(DateAndTimeOfWinnerAnnouncement) - new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    }
    const GameDetailSendToCart = (id,GameName) => {
        // Retrieve existing cart data from session storage
        const existingCartData = JSON.parse(sessionStorage.getItem('cart'));
    
        // Create details for the new game
        const newGameDetails = {
            gameId: id,
            gameName:GameName,
            GameNumbers: selectedNumbersByGame[id] || [],
            gamePrice: Price[id] || 100,
            quantity: quantities[id] || 1
        };
    
        // If existingCartData is not an array, initialize it as an empty array
        const updatedCartData = Array.isArray(existingCartData) ? [...existingCartData, newGameDetails] : [newGameDetails];
    
        // Store the updated cart data in session storage
        sessionStorage.setItem('cart', JSON.stringify(updatedCartData));
        Swal.fire({
            title: 'Success!',
            text: `${GameName} Game Added Success Full`,
            icon: 'success',
            confirmButtonText: 'Cool'
          });
          clearAllNumbers(id)
    }
    
    
    

    return (
        <div className='games hmGame '>
            <div className="games-container">
                {games.map((game, index) => {
                    const timeLeft = calculateTimeLeft(game.DateAndTimeOfWinnerAnnouncement);
                    const isActive = timeLeft.days >= 0 || timeLeft.hours >= 0 || timeLeft.minutes >= 0 || timeLeft.seconds >= 0;

                    return (
                        <div key={index} data-id={game._id} className={`game ${isActive ? '' : 'notActive'}`}>
                            <div className="game-name"><h2>{game.GameName} </h2></div>
                            <div className="pricevalue">
                                <h2>Rs {game.PricePool}</h2>
                            </div>
                            <div className="draw-date">
                                <h3>{new Date(game.DateAndTimeOfWinnerAnnouncement).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</h3>
                            </div>
                            <div className="timer">
                                <Timer drawDate={game.DateAndTimeOfWinnerAnnouncement} />
                            </div>
                            <div className="selectedNumbers">
                                {(selectedNumbersByGame[game._id] || []).map((number, index) => (
                                    <div className="selectedNumber" key={index}>
                                        <span className="number-select text-lg font-bold">{number}</span>
                                    </div>
                                ))}
                                {(!selectedNumbersByGame[game._id] || selectedNumbersByGame[game._id].length < 5) && Array.from({ length: 5 - (selectedNumbersByGame[game._id] || []).length }).map((_, index) => (
                                    <div className="selectedNumber" key={index}>
                                        <span className="number-select text-lg font-bold">?</span>
                                    </div>
                                ))}
                            </div>
                            <div className='divder'></div>
                            <div className="number-container">
                                {generateNumber(game.HowMuchNumber.endNumber).map((number, index) => (
                                    <div
                                        onClick={isActive ? () => clickNumber(number, game._id) : null}
                                        className={`number ${selectedNumbersByGame[game._id] && selectedNumbersByGame[game._id].includes(number) ? 'active' : ''}`}
                                        key={number}
                                    >
                                        {number}
                                    </div>
                                ))}
                            </div>
                            <div className="game-cart">
                                <div className="buttons-like">
                                    <div className="likeandshare">
                                        <button><i className="ri-heart-line"></i></button>
                                        <button onClick={() => shuffleNumbers(game._id)}><i className="ri-shuffle-fill"></i></button>
                                    </div>
                                    <div className="counters">
                                        <button onClick={() => handleDecrease(game._id)} className='btn-counter'><i className="ri-subtract-line"></i></button>
                                        <span className='screen'>{quantities[game._id] || 1}</span>
                                        <button onClick={() => handleIncrease(game._id)} className='btn-counter'><i className="ri-add-line"></i></button>
                                    </div>
                                </div>
                                <div className='carts-buttons'>
                                    <div className="pricevalue">
                                        <span><i className="ri-money-rupee-circle-fill"></i> {Price[game._id] || 100}</span>

                                    </div>
                                    <div className="cta">
                                        <button onClick={() => clearAllNumbers(game._id)}>Clear All</button>
                                        <button onClick={()=>GameDetailSendToCart(game._id,game.GameName)}>Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Games;
