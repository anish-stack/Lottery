import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const MyWithdrawlRequest = () => {
    const [withdrawals, setWithdrawals] = useState([]);
    const [filteredWithdrawals, setFilteredWithdrawals] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [amountFilter, setAmountFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [withdrawalsPerPage] = useState(10); // Number of withdrawals per page
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchWithdrawals = async () => {
            try {
                const response = await axios.get('http://localhost:5074/api/v1/get-Withdraw', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('LampToken')}`
                    }
                });
                setWithdrawals(response.data.withdrawals);
                setFilteredWithdrawals(response.data.withdrawals);
            } catch (error) {
                setError('Error fetching withdrawals');
                console.error(error);
            }
        };
        fetchWithdrawals();
    }, []);

    // Filter withdrawals based on status, date, and amount
    useEffect(() => {
        let filtered = withdrawals;

        if (statusFilter) {
            filtered = filtered.filter(w => w.status === statusFilter);
        }
        if (dateFilter) {
            filtered = filtered.filter(w => new Date(w.createdAt).toDateString() === new Date(dateFilter).toDateString());
        }
        if (amountFilter) {
            filtered = filtered.filter(w => w.amount === parseInt(amountFilter));
        }

        setFilteredWithdrawals(filtered);
    }, [statusFilter, dateFilter, amountFilter, withdrawals]);

    // Pagination
    const indexOfLastWithdrawal = currentPage * withdrawalsPerPage;
    const indexOfFirstWithdrawal = indexOfLastWithdrawal - withdrawalsPerPage;
    const currentWithdrawals = filteredWithdrawals.slice(indexOfFirstWithdrawal, indexOfLastWithdrawal);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Withdrawal Requests</h1>
            
            <div className="mb-4 grid grid-cols-3 gap-2">
                <div>

                <select
                    className="border border-gray-400 px-4 py-2 rounded w-full mb-2"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">Filter by Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Canceled">Canceled</option>
                    <option value="Completed">Completed</option>
                </select>
                </div>
                <div>

                <input
                    type="date"
                    className="border border-gray-400 px-4 py-2 rounded w-full mb-2"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                />
                </div>
                <div>

                <input
                    type="number"
                    className="border border-gray-400 px-4 py-2 rounded w-full mb-2"
                    placeholder="Filter by Amount"
                    value={amountFilter}
                    onChange={(e) => setAmountFilter(e.target.value)}
                />
                </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            {filteredWithdrawals.length === 0 ? (
                <p>No withdrawals found. Purchase a game for your first withdrawal.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Amount</th>
                                <th className="py-2 px-4 border-b">Payment Method</th>
                                <th className="py-2 px-4 border-b">Details</th>
                                <th className="py-2 px-4 border-b">Status</th>
                                <th className="py-2 px-4 border-b">Created At</th>
                                <th className="py-2 px-4 border-b">Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentWithdrawals.map(withdrawal => (
                                <tr key={withdrawal._id}>
                                    <td className="py-2 px-4 border-b">Rs {withdrawal.amount}</td>
                                    <td className="py-2 px-4 border-b">{withdrawal.paymentMethod}</td>
                                    <td className="py-2 px-4 border-b">
                                        {withdrawal.paymentMethod === 'UPI' && (
                                            <p><strong>UPI ID:</strong> {withdrawal.upiId}</p>
                                        )}
                                        {withdrawal.paymentMethod === 'Bank' && (
                                            <>
                                                <p><strong>Account Number:</strong> {withdrawal.accountNumber}</p>
                                                <p><strong>Bank Name:</strong> {withdrawal.bankName}</p>
                                                <p><strong>IFSC Code:</strong> {withdrawal.ifscCode}</p>
                                                <p><strong>Receiver Name:</strong> {withdrawal.receiverName}</p>
                                            </>
                                        )}
                                        {withdrawal.paymentMethod === 'NEFT' && (
                                            <>
                                                <p><strong>Account Number:</strong> {withdrawal.accountNumber}</p>
                                                <p><strong>Mobile Number:</strong> {withdrawal.mobileNumber}</p>
                                            </>
                                        )}
                                    </td>
                                    <td className="py-2 px-4 border-b">{withdrawal.status}</td>
                                    <td className="py-2 px-4 border-b">{new Date(withdrawal.createdAt).toLocaleString()}</td>
                                    {withdrawal.comments.length > 0 ? withdrawal.comments.map(comment => comment.text).join(', ') : 'No comments'}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {/* Pagination */}
                    <div className="flex justify-center mt-4">
                        {[...Array(Math.ceil(filteredWithdrawals.length / withdrawalsPerPage)).keys()].map(number => (
                            <button
                                key={number}
                                className={`px-4 py-2 ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded mr-2`}
                                onClick={() => paginate(number + 1)}
                            >
                                {number + 1}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyWithdrawlRequest;
