import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PurchaseGamesMe = () => {
    const [purchaseData, setPurchaseData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6); // Number of items to show per page
    const [searchTerm, setSearchTerm] = useState('');
    const [sortCriteria, setSortCriteria] = useState(null); // Sorting criteria: date, AtoZ, ZtoA
    const userId = JSON.parse(sessionStorage.getItem('user'))._id;
    const Token = sessionStorage.getItem('token');

    // Fetch data from API
    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:5074/api/v1/get-my-purchase', {
                headers: {
                    Authorization: `Bearer ${Token}`
                },
                params: {
                    userId: userId
                }
            });
            setPurchaseData(res.data.data);
            setFilteredData(res.data.data);
        } catch (error) {
            console.error('Error fetching purchase data:', error);
        }
    }

    // Filter data based on search term
    const filterData = () => {
        if (searchTerm.trim() === '') {
            setFilteredData(purchaseData);
        } else {
            const filtered = purchaseData.filter(purchase =>
                purchase.Game.some(game =>
                    game.GameName.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
            setFilteredData(filtered);
        }
    }

    // Sort data based on criteria
    const sortData = (data, criteria) => {
        switch (criteria) {
            case 'date':
                return data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            case 'AtoZ':
                return data.sort((a, b) => a.Game[0].GameName.localeCompare(b.Game[0].GameName));
                case 'ZtoA':
                    return data.sort((a, b) => b.Game[0].GameName.localeCompare(a.Game[0].GameName));
                
            default:
                return data;
        }
    }

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortData(filteredData, sortCriteria).slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        filterData();
    }, [searchTerm, purchaseData]);

    return (
        <div className="overflow-x-auto">
            <h1 className="text-2xl font-semibold mb-4">Purchase Games</h1>

            {/* Search input */}
            <input
                type="text"
                placeholder="Search by game name"
                className="mb-4 px-4 py-2 border border-gray-300 rounded-md"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />

            {/* Sorting options */}
            <div className="mb-4">
                <span className="mr-2">Sort By:</span>
                <button className="mr-2 px-2 py-1 bg-gray-200 rounded-md" onClick={() => setSortCriteria('date')}>Date</button>
                <button className="mr-2 px-2 py-1 bg-gray-200 rounded-md" onClick={() => setSortCriteria('AtoZ')}>A to Z</button>
                <button className="px-2 py-1 bg-gray-200 rounded-md" onClick={() => setSortCriteria('ZtoA')}>Z to A</button>
            </div>

            {/* Display filtered and sorted data */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentItems.map((purchase, index) => (
                    <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">Purchase ID: {purchase._id}</h2>
                            <p className="text-gray-600 mb-2">Transaction ID: {purchase.transactionId}</p>
                            {purchase.Game.map((game, gameIndex) => (
                                <div key={`${index}-${gameIndex}`} className="mb-4">
                                    <h3 className="text-lg font-semibold mb-1">Game Name: {game.GameName}</h3>
                                    <p className="text-gray-600 mb-1">Game Numbers: {game.selectedNumbers.map(numberObj => numberObj.selectNumber).join(', ')}</p>
                                    <p className="text-gray-600 mb-1">Price: Rs {game.TotalCartPrice}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                <button
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md mr-2"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={indexOfLastItem >= filteredData.length}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PurchaseGamesMe;
