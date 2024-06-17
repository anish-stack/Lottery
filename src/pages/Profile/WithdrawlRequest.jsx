import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';


const WithdrawlRequest = () => {
    const [amount, setAmount] = useState('');
    const [selectedAmount, setSelectedAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [upiId, setUpiId] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [bankName, setBankName] = useState('');
    const [ifscCode, setIfscCode] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const validate = () => {
        const newErrors = {};
        if (!amount || parseInt(amount) <= 0) {
            newErrors.amount = 'Please enter a valid amount.';
        }
        if (!paymentMethod) {
            newErrors.paymentMethod = 'Please select a payment method.';
        }
        if (paymentMethod === 'UPI' && !upiId) {
            newErrors.upiId = 'Please enter your UPI ID.';
        }
        if (paymentMethod === 'Bank') {
            if (!accountNumber || isNaN(accountNumber)) {
                newErrors.accountNumber = 'Please enter a valid account number.';
            }
            if (!bankName) {
                newErrors.bankName = 'Please enter your bank name.';
            }
            if (!ifscCode) {
                newErrors.ifscCode = 'Please enter your IFSC code.';
            }
            if (!receiverName) {
                newErrors.receiverName = 'Please enter the receiver name.';
            }
        }
        if (paymentMethod === 'NEFT') {
            if (!accountNumber || isNaN(accountNumber)) {
                newErrors.accountNumber = 'Please enter a valid account number.';
            }
            if (!mobileNumber || isNaN(mobileNumber)) {
                newErrors.mobileNumber = 'Please enter a valid mobile number.';
            }
        }
        return newErrors;
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleTabClick = (selectedAmount) => {
        setSelectedAmount(selectedAmount);
        setAmount(selectedAmount); // Auto-fill amount field when tab is clicked
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        
        if (Object.keys(newErrors).length === 0) {
            Swal.fire({
                title: 'Confirm Submission',
                text: "Are you sure you want to submit the withdrawal request?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, submit it!',
                cancelButtonText: 'No, cancel!',
            }).then(async (result) => {
                
                // Added async keyword here
                 const withdrawalDetails = {
                    amount,
                    paymentMethod,
                    upiId,
                    accountNumber,
                    bankName,
                    ifscCode,
                    receiverName,
                    mobileNumber
                };
                if (result.isConfirmed) {
                    try {
                        const response = await axios.post('http://localhost:5074/api/v1/Create-Withdraw', withdrawalDetails, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('LampToken')}`
                            }
                        });
                        console.log('Withdrawal request submitted:', response.data);
                        // Show success message
                        setSuccessMessage('Withdrawal request submitted successfully!');
                        // Reset form after submission
                        setAmount('');
                        setSelectedAmount('');
                        setPaymentMethod('');
                        setUpiId('');
                        setAccountNumber('');
                        setBankName('');
                        setIfscCode('');
                        setReceiverName('');
                        setMobileNumber('');
                        setErrors({});
                    } catch (error) {
                        console.error('Error submitting withdrawal request:', error);
                    }
                }
            });
        } else {
            setErrors(newErrors);
            setSuccessMessage('');
        }
    };
    

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Withdrawal Request</h1>
            <div className="flex mb-4 flex-wrap">
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
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        type="number"
                        className="border border-gray-400 px-4 py-2 rounded w-full"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={handleAmountChange}
                    />
                    {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
                </div>
                <div className="mb-4">
                    <select
                        className="border border-gray-400 px-4 py-2 rounded w-full"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option value="">Select Payment Method</option>
                        <option value="UPI">UPI</option>
                        <option value="Bank">Bank</option>
                        <option value="NEFT">NEFT</option>
                    </select>
                    {errors.paymentMethod && <p className="text-red-500 text-sm mt-1">{errors.paymentMethod}</p>}
                </div>
                {paymentMethod === 'UPI' && (
                    <div className="mb-4">
                        <input
                            type="text"
                            className="border border-gray-400 px-4 py-2 rounded w-full"
                            placeholder="Enter UPI ID"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                        />
                        {errors.upiId && <p className="text-red-500 text-sm mt-1">{errors.upiId}</p>}
                    </div>
                )}
                {paymentMethod === 'Bank' && (
                    <>
                        <div className="mb-4">
                            <input
                                type="text"
                                className="border border-gray-400 px-4 py-2 rounded w-full"
                                placeholder="Enter Account Number"
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))} // Ensure only numbers
                            />
                            {errors.accountNumber && <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>}
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                className="border border-gray-400 px-4 py-2 rounded w-full"
                                placeholder="Enter Bank Name"
                                value={bankName}
                                onChange={(e) => setBankName(e.target.value)}
                            />
                            {errors.bankName && <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>}
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                className="border border-gray-400 px-4 py-2 rounded w-full"
                                placeholder="Enter IFSC Code"
                                value={ifscCode}
                                onChange={(e) => setIfscCode(e.target.value)}
                            />
                            {errors.ifscCode && <p className="text-red-500 text-sm mt-1">{errors.ifscCode}</p>}
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                className="border border-gray-400 px-4 py-2 rounded w-full"
                                placeholder="Enter Receiver Name"
                                value={receiverName}
                                onChange={(e) => setReceiverName(e.target.value)}
                            />
                            {errors.receiverName && <p className="text-red-500 text-sm mt-1">{errors.receiverName}</p>}
                        </div>
                    </>
                )}
                {paymentMethod === 'NEFT' && (
                    <>
                        <div className="mb-4">
                            <input
                                type="text"
                                className="border border-gray-400 px-4 py-2 rounded w-full"
                                placeholder="Enter Account Number"
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))} // Ensure only numbers
                            />
                            {errors.accountNumber && <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>}
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                className="border border-gray-400 px-4 py-2 rounded w-full"
                                placeholder="Enter Mobile Number"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))} // Ensure only numbers
                            />
                            {errors.mobileNumber && <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>}
                        </div>
                    </>
                )}
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded w-full">
                    Submit
                </button>
                {successMessage && <p className="text-green-500 text-sm mt-4">{successMessage}</p>}
            </form>
        </div>
    );
};

export default WithdrawlRequest;
