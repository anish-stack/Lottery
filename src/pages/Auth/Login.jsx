import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import { FiInfo } from "react-icons/fi";
import { RiLoginCircleFill } from "react-icons/ri";
import axios from 'axios'
import Metatag from '../../Meta/Metatag';
const Login = () => {
  const [formdata, setFormdata] = useState({
    Email: "",
    Password: ""
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleLogin = useCallback(async () => {
    try {
      const res = await axios.post('http://localhost:5074/api/v1/login', formdata);
      console.log(res.data);
      if (res.data.success === true) {
        Swal.fire({
          title: 'Success!',
          text: "Login Success Full",
          icon: 'success',
          confirmButtonText: 'Cool'
        });
      }
      const user = res.data.user
      // console.log(user)
      sessionStorage.setItem('token', res.data.token)
      sessionStorage.setItem('user', JSON.stringify(user))
      window.location.href = "/"
    } catch (error) {
      console.log(error);
    }
  }, [formdata]);
  return (
    <div className='w-full min-h-screen bg-white '>
      <Metatag title="Login-Page" keywords="Login,Auth,Hello-world" descriptions="This is Login Page" />
      <div className='container  h-full '>
        <div className='heading text-center flex mt-5 px-5 py-3 items-center gap-2 justify-center'>
          <RiLoginCircleFill className='text-5xl mr-5 text-orange-500 font-bolder' />   <h2 className=' font text-xl font-extrabold  sm:text-2xl md:text-5xl'>Login</h2>
        </div>

        <div className='form-container'>
          <form action="" className='max-w-2xl p-5 shadow-xla mx-auto '>

            <div className=' w-full flex flex-col px-2 py-4'>
              <label className='text-2xl md:font-bold mb-1' htmlFor="Email">Email</label>
              <input type="email" value={formdata.Email} name='Email' onChange={handleChange} placeholder='Enter Your Email' className=' capitalize border-[2px] rounded-[44px] py-2 px-5 outline-2 text-black text-xl focus:outline-blue-400 border-orange-400' />
            </div>
            <div className=' w-full flex flex-col px-2 py-4'>
              <label className='text-2xl md:font-bold mb-1' htmlFor="Password">Password</label>
              <input type="text" value={formdata.Password} name='Password' onChange={handleChange} placeholder='Enter Your Password' className=' capitalize border-[2px] rounded-[44px] py-2 px-5 outline-2 text-black text-xl focus:outline-blue-400 border-orange-400' />
            </div>
            <div className="para flex items-start gap-1 justify-center">
              <FiInfo />
              <p>
                If you've forgotten your password, please CLick below to reset Password Button

              </p>            </div>

            <div className='flex w-full items-center justify-center mt-5'>
              <Link onClick={handleLogin} className='button-ctas hover:bg-orange-400'>Login</Link>
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


export default Login