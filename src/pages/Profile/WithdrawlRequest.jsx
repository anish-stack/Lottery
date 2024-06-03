import React, { useState } from 'react';

const WithdrawlRequest = () => {
    const [amount, setAmount] = useState('');
    const [selectedAmount, setSelectedAmount] = useState('');

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleTabClick = (selectedAmount) => {
        setSelectedAmount(selectedAmount);
        setAmount(selectedAmount); // Auto-fill amount field when tab is clicked
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Your logic for submitting withdrawal request
        console.log('Withdrawal request submitted:', amount);
        // Reset form after submission
        setAmount('');
        setSelectedAmount('');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Withdrawal Request</h1>
            <div className="flex mb-4">
                <div className="flex flex-wrap">
                    <button
                        className={`px-4 py-2 rounded border border-gray-400 mr-4 mb-4 ${selectedAmount === '500' && 'bg-blue-500 text-white'}`}
                        onClick={() => handleTabClick('500')}
                    >
                        Rs 500
                    </button>
                    <button
                        className={`px-4 py-2 rounded border border-gray-400 mr-4 mb-4 ${selectedAmount === '1000' && 'bg-blue-500 text-white'}`}
                        onClick={() => handleTabClick('1000')}
                    >
                        Rs 1000
                    </button>
                    <button
                        className={`px-4 py-2 rounded border border-gray-400 mr-4 mb-4 ${selectedAmount === '2000' && 'bg-blue-500 text-white'}`}
                        onClick={() => handleTabClick('2000')}
                    >
                        Rs 2000
                    </button>
                    <button
                        className={`px-4 py-2 rounded border border-gray-400 mr-4 mb-4 ${selectedAmount === '3000' && 'bg-blue-500 text-white'}`}
                        onClick={() => handleTabClick('3000')}
                    >
                        Rs 3000
                    </button>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex mb-4">
                    <input
                        type="number"
                        className="border border-gray-400 px-4 py-2 rounded mr-4"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={handleAmountChange}
                    />
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default WithdrawlRequest;
