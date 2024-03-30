import React, { useEffect, useState } from 'react'
import './Games.css'
import axios from 'axios'
import Timer from './Timer'
const Games = () => {
    const [games, setGames] = useState([])
    const [selectedNumbersByGame, setSelectedNumbersByGame] = useState({});

    const clickNumber = (number, index, gameId) => {
        // Ensure selectedNumbersByGame[gameId] is initialized as an array
        setSelectedNumbersByGame(prevState => ({
            ...prevState,
            [gameId]: Array.isArray(prevState[gameId]) ? prevState[gameId] : Array(5).fill("?")
        }));
    ``
        const selectedNumbers = selectedNumbersByGame[gameId] || [];
    
        if (selectedNumbers.includes(number)) {
            // If the number is already selected, remove it on double click
            const newSelectedNumbers = selectedNumbers.filter(selectedNumber => selectedNumber !== number);
            setSelectedNumbersByGame(prevState => ({
                ...prevState,
                [gameId]: newSelectedNumbers
            }));
    
            // Remove background color from the clicked number
            const numberElements = document.querySelectorAll(`.game[data-id="${gameId}"] .number`);
            numberElements[index].classList.remove('bg-green-400');
    
            // Update local storage
            localStorage.setItem(`${gameId}_selectedNumbers`, JSON.stringify(newSelectedNumbers));
        } else {
            // If the number is not selected, add it
            const availableIndex = selectedNumbers.findIndex(selectedNumber => selectedNumber === '?');
            if (availableIndex !== -1) {
                const newSelectedNumbers = [...selectedNumbers];
                newSelectedNumbers[availableIndex] = number;
                setSelectedNumbersByGame(prevState => ({
                    ...prevState,
                    [gameId]: newSelectedNumbers
                }));
    
                // Add background color to the clicked number
                const numberElements = document.querySelectorAll(`.game[data-id="${gameId}"] .number`);
                numberElements[index].classList.add('bg-green-400');
    
                // Update local storage
                localStorage.setItem(`${gameId}_selectedNumbers`, JSON.stringify(newSelectedNumbers));
            }
        }
    };
    


    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get('https://www.api.jackpotlamp.com/api/v1/games')
                console.log(response.data.data)
                setGames(response.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata()
    }, [])
    function generateNumber(endNumber) {
        // Generate numbers from 1 to endNumber
        const numbers = Array.from({ length: endNumber }, (_, index) => index + 1);
        return numbers;
    }

    return (
        <div className='games hmGame '>
            <div className="games-container">
                {
                games.slice(0,3).map((game, index) => (
                    <div key={index} data-id={game._id} className="game">
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
                            {selectedNumbersByGame[game._id] && selectedNumbersByGame[game._id].map((number, index) => (
                                <div key={index} className="selectedNumber">
                                    {number !== null ? number : ''}
                                </div>
                            ))}

                        </div>
                        <div className='divder'></div>
                        <div className="number-container">

                            {generateNumber(game.HowMuchNumber.endNumber).map((number, index) => (
                                <div onClick={() => clickNumber(number, index, game._id)} className="number" key={number}>
                                    {number}
                                </div>
                            ))}
                        </div>

                    </div>
                ))
            }

            </div>
        </div>
    )
}

export default Games
