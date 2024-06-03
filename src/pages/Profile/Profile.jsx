import React, { useState } from 'react';
import profilePic from './qwe.jpg';
import WithdrawlRequest from './WithdrawlRequest';
import PurchaseGamesMe from './PurchaseGamesMe';
import WinningAmountByGame from './WinningAmountByGame';

const Profile = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [activeTab, setActiveTab] = useState('purchase');

    return (
        <div className="bg-gray-100 min-h-screen">
            {user ? (
                <div className="container mx-auto p-4 sm:p-6">
                    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center max-w-sm mx-auto mb-6">
                        <img
                            src={profilePic}
                            alt="Profile"
                            className="w-24 h-24 rounded-full mb-4 object-cover"
                        />
                        <h1 className="text-xl sm:text-2xl font-bold mb-2">{user.Name} {user.LastName}</h1>
                        <p className="text-gray-600">{user.Email}</p>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row justify-around mb-6">
                            <button
                                onClick={() => setActiveTab('purchase')}
                                className={`px-4 py-2 rounded mb-2 sm:mb-0 ${activeTab === 'purchase' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                Purchase
                            </button>
                            <button
                                onClick={() => setActiveTab('withdrawal-request')}
                                className={`px-4 py-2 rounded mb-2 sm:mb-0 ${activeTab === 'withdrawal-request' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                Withdrawal Request
                            </button>
                            <button
                                onClick={() => setActiveTab('winning-amount')}
                                className={`px-4 py-2 rounded mb-2 sm:mb-0 ${activeTab === 'winning-amount' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                Winning Amount
                            </button>
                            <button
                                onClick={() => setActiveTab('pending-amount')}
                                className={`px-4 py-2 rounded ${activeTab === 'pending-amount' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                Pending Amount
                            </button>
                        </div>

                        <div className='flex items-center justify-center'>
                            {activeTab === 'purchase' && <div>{<PurchaseGamesMe/>}</div>}
                            {activeTab === 'withdrawal-request' && <div><WithdrawlRequest /></div>}
                            {activeTab === 'winning-amount' && <div><WinningAmountByGame/></div>}
                            {activeTab === 'pending-amount' && <div>Pending Amount content goes here.</div>}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-xl text-gray-700 flex justify-center items-center h-screen">No user data found</div>
            )}
        </div>
    );
};

export default Profile;
