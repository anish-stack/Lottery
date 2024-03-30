  import React, { useCallback, useState } from 'react'
  import { Link,redirect } from 'react-router-dom';
    import { RiLockPasswordFill } from "react-icons/ri";
  import axios from 'axios'
  const ResetPassword = () => {
    const [formdata,setFormdata] = useState({
      Email:"",
      Password:""
    })
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormdata((prevData) => ({
          ...prevData,
          [name]: value
      }));
  };
  const handleReset = useCallback(async () => {
    try {
      // Create an object with only the email field
      const emailData = {
        Email: formdata.Email.trim()
      };

      // Send a POST request with only the email data
      const res = await axios.post('http://localhost:5002/api/v1/Password-Change-Request', emailData);
      console.log(res.data);
      if (res.data.success === true) {
        // Redirect to the password reset OTP page with email and password parameters
      window.location.href=`/ResetPasswordOtp/${formdata.Password}/${formdata.Email}`
      }
    } catch (error) {
      console.log(error);
    }
  }, [formdata]);

    return (
      <div className='w-full min-h-screen bg-white '>
      <div className='container  h-full '>
        <div className='heading text-center flex mt-5 px-5 py-3 items-center gap-2 justify-center'>
          <RiLockPasswordFill className='text-5xl mr-5 text-orange-500 font-bolder' />   <h2 className=' font text-xl font-extrabold  sm:text-2xl md:text-5xl'>Reset Password</h2>
        </div>

        <div className='form-container'>
          <form action="" className='max-w-2xl p-5 shadow-xla mx-auto '>
          
            <div className=' w-full flex flex-col px-2 py-4'>
              <label className='text-2xl md:font-bold mb-1' htmlFor="Email">Email</label>
              <input type="email" value={formdata.Email} name='Email' onChange={handleChange} placeholder='Enter Your Email' className=' capitalize border-[2px] rounded-[44px] py-2 px-5 outline-2 text-black text-xl focus:outline-blue-400 border-orange-400' />
            </div>
            <div className=' w-full flex flex-col px-2 py-4'>
              <label className='text-2xl md:font-bold mb-1' htmlFor="Password">New Password</label>
              <input type="text" value={formdata.Password} name='Password' onChange={handleChange} placeholder='Enter Your Password' className=' capitalize border-[2px] rounded-[44px] py-2 px-5 outline-2 text-black text-xl focus:outline-blue-400 border-orange-400' />
            </div>
            
          
            <div className='flex w-full items-center justify-center mt-5'>
              <Link onClick={handleReset} className='button-ctas hover:bg-orange-400'>Verify</Link>
            </div>

            <div className="text-center flex gap-5 items-center justify-center mt-2">
              <Link to="/Register" className='text-[#f55e13]'>New to Website Name? Create an account</Link>
              <Link to="/ResetPassword" className='text-[#1b1c1b]'>Forget Password ?</Link>

            </div>
          </form>
        </div>
      </div>
    </div>
    )
  }

  export default ResetPassword