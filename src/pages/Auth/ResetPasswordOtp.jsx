import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';

const ResetPasswordOtp = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const { password, email } = useParams()
  console.log("Email", email)
  console.log("Password", password)




  const handleChange = (index, value) => {
    if (!isNaN(value) && value !== '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value === '' && index > 0) {
        inputRefs.current[index - 1].focus();
      } else if (value !== '' && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      e.preventDefault();
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    const otpNumber = parseInt(otpString, 10); // Specify base 10 for decimal numbers

    try {
      const response = await axios.post('http://localhost:5074/api/v1/Password-verify', {
        Email: password,
        Otp: otpNumber,
        newPassword: email
      });
      console.log(response.data);
      if (response.data.success === true) {
        Swal.fire({
          title: 'Success!',
          text: response.data.msg,
          icon: 'success',
          confirmButtonText: 'Cool'
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error!',
        text: error.response.data.msg,
        icon: 'error',
        confirmButtonText: 'Error'
      });
    }
  };

  return (
    <div className='max-w-lg mx-auto px-5 py-5 m-5 shaode'>
      <div className="flex flex-col items-center h-full w-full min-h-[50vh] justify-center">
        <h1 className="text-2xl md:text-5xl font-semibold font mb-6">Enter OTP</h1>
        <form className="flex items-center justify-center space-x-2 md:space-x-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              className="md:w-12 md:h-12 w-10 h-10 text-center border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(input) => (inputRefs.current[index] = input)}
            />
          ))}
        </form>
        <div className='w-full flex items-center justify-center mt-5'>
          <button
            type="button"
            onClick={handleSubmit}
            className="button-ctas mt-5"
          >
            Submit-Otp
          </button>
        </div>

      </div>
    </div>
  );
};
export default ResetPasswordOtp