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

        if (selectedNumbersByGame[gameId]?.includes(number)) {
            // If the number is already selected, do nothing
            
            return;
        }

        const availableIndex = selectedNumbersByGame[gameId]?.findIndex(selectedNumber => selectedNumber === '?');
        if (availableIndex !== -1) {
            const newSelectedNumbers = [...selectedNumbersByGame[gameId]];
            newSelectedNumbers[availableIndex] = number;
            setSelectedNumbersByGame(prevState => ({
                ...prevState,
                [gameId]: newSelectedNumbers
            }));
        }
    };


    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get('http://localhost:5002/api/v1/games')
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
            <div className="games-container">{
                games.map((game, index) => (
                    <div key={index} className="game">
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
                {/* <div className="game">
                    <div className="game-name"><h2>Fortune 5 </h2></div>
                    <div className="pricevalue">
                        <h2>Rs 1 Million</h2>
                    </div>
                    <div className="draw-date">
                        <h3>FRI 29 MAR 2024 08:00 PM(UAE)</h3>
                    </div>
                    <div className="timer">
                        <div className="boxes days">
                            <h3>03</h3>
                            <p>Days</p>
                        </div>
                        <div className="boxes hours"><h3>13</h3>
                            <p>Hours</p></div>
                        <div className="boxes minutes"><h3>3</h3>
                            <p>Minutes</p></div>
                        <div className="boxes seconds"><h3>03</h3>
                            <p>Seconds</p></div>
                    </div>
                    <div className="selectedNumbers">
                        <div className="selectedNumber"></div>
                        <div className="selectedNumber"></div>
                        <div className="selectedNumber"></div>
                        <div className="selectedNumber"></div>
                        <div className="selectedNumber"></div>
                    </div>
                    <div className='divder'></div>
                    <div className="number-container">
                        {numbers.map(number => (
                            <div className="number" key={number}>
                                {number}
                            </div>
                        ))}
                    </div>

                </div>
                <div className="game">
                    <div className="game-name"><h2>Fortune 5 </h2></div>
                    <div className="pricevalue">
                        <h2>Rs 1 Million</h2>
                    </div>
                    <div className="draw-date">
                        <h3>FRI 29 MAR 2024 08:00 PM(UAE)</h3>
                    </div>
                    <div className="timer">
                        <div className="boxes days">
                            <h3>03</h3>
                            <p>Days</p>
                        </div>:
                        <div className="boxes hours"><h3>13</h3>
                            <p>Hours</p></div>:
                        <div className="boxes minutes"><h3>3</h3>
                            <p>Minutes</p></div>:
                        <div className="boxes seconds"><h3>03</h3>
                            <p>Seconds</p></div>:
                    </div>
                    <div className="selectedNumbers">
                        <div className="selectedNumber"></div>
                        <div className="selectedNumber"></div>
                        <div className="selectedNumber"></div>
                        <div className="selectedNumber"></div>
                        <div className="selectedNumber"></div>
                    </div>
                    <div className="divder"></div>
                    <div className="number-container">
                        {numbers.map(number => (
                            <div className="number" key={number}>
                                {number}
                            </div>
                        ))}
                    </div>

                </div>
                <div className="game">
                    <div className="game-name"><h2>Fortune 5 </h2></div>
                    <div className="pricevalue">
                        <h2>Rs 1 Million</h2>
                    </div>
                    <div className="draw-date">
                        <h3>FRI 29 MAR 2024 08:00 PM(UAE)</h3>
                    </div>
                    <div className="timer">
                        <div className="boxes days">
                            <h3>03</h3>
                            <p>Days</p>
                        </div>:
                        <div className="boxes hours"><h3>13</h3>
                            <p>Hours</p></div>:
                        <div className="boxes minutes"><h3>3</h3>
                            <p>Minutes</p></div>:
                        <div className="boxes seconds"><h3>03</h3>
                            <p>Seconds</p></div>:
                    </div>
                    <div className="selectedNumbers">
                        <div className="selectedNumber"></div>
                        <div className="selectedNumber"></div>
                        <div className="selectedNumber"></div>
                        <div className="selectedNumber"></div>
                        <div className="selectedNumber"></div>
                    </div>
                    <div className="divder"></div>
                    <div className="number-container">
                        {numbers.map(number => (
                            <div className="number" key={number}>
                                {number}
                            </div>
                        ))}
                    </div>

                </div> */}
            </div>
        </div>
    )
}

export default Games
