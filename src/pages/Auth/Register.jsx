import React, { useState } from 'react';
import { FaUserPlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FiInfo, FiEye, FiEyeOff } from "react-icons/fi";
import axios from 'axios';
import Swal from 'sweetalert2';

const Register = () => {
  const [formdata, setFormdata] = useState({
    Name: "",
    LastName: "",
    Email: "",
    Password: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(formdata.Password)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        password: 'Password should be at least 8 characters long, containing at least one alphabetical character, one numeric character, and one special character.'
      }));
      setLoading(false)
      return false;
    }
    return true;
  };
  const handleCheckboxChange = () => {
    setIsChecked(prevChecked => !prevChecked); // Toggle the isChecked state when the checkbox is clicked
  };
  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true)
    if (!isChecked) { // Check if the checkbox is checked
      setErrors(prevErrors => ({
        ...prevErrors,
        checkbox: 'Please agree to the Terms & Conditions.'
      }));
      Swal.fire({
        title: 'Error!',
        text: 'Please agree to the Terms & Conditions and confirm your age.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      setLoading(false);
      return;
    }
    if (!validatePassword()) {
      return;
    }
    try {
      const response = await axios.post('https://www.api.jackpotlamp.com/api/v1/Register', formdata);
      console.log(response.data);
      if (response.data.success === true) {
        Swal.fire({
          title: 'Success!',
          text: response.data.msg,
          icon: 'success',
          confirmButtonText: 'Cool'
        });
        setLoading(false)

        window.location.href = `/Otp-Verification?email=${formdata.Email}`;
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response.data.msg,
        icon: 'error',
        confirmButtonText: 'Next'
      });
      console.log(error);
      setLoading(false)

    }
  };

  return (
    <div className='w-full min-h-screen bg-white '>
      <div className='container  h-full '>
        <div className='heading text-center flex mt-5 px-5 py-3 items-center gap-2 justify-center'>
          <FaUserPlus className='text-5xl mr-5 text-orange-500 font-bolder' />   <h2 className=' font text-xl font-extrabold  sm:text-2xl md:text-5xl'>Register</h2>
        </div>

        <div className='form-container'>
          <form className='max-w-4xl p-5 shadow-xla mx-auto '>
            <div className=' w-full flex flex-col px-2 py-2'>
              <label className='text-2xl md:font-bold mb-2' htmlFor="Name">Name</label>
              <input type="text" value={formdata.Name} name='Name' onChange={handleChange} placeholder='Enter Your Good Name' className=' capitalize border-[2px] rounded-[44px] py-2 px-5 outline-2 text-black text-xl focus:outline-blue-400 border-orange-400' />
            </div>
            <div className=' w-full flex flex-col px-2 py-4'>
              <label className='text-2xl md:font-bold mb-1' htmlFor="LastNamee">LastName</label>
              <input type="text" value={formdata.LastName} name='LastName' onChange={handleChange} placeholder='Enter Your Last Name' className=' capitalize border-[2px] rounded-[44px] py-2 px-5 outline-2 text-black text-xl focus:outline-blue-400 border-orange-400' />
            </div>
            <div className=' w-full flex flex-col px-2 py-4'>
              <label className='text-2xl md:font-bold mb-1' htmlFor="Email">Email</label>
              <input type="email" value={formdata.Email} name='Email' onChange={handleChange} placeholder='Enter Your Email' className=' capitalize border-[2px] rounded-[44px] py-2 px-5 outline-2 text-black text-xl focus:outline-blue-400 border-orange-400' />
            </div>
            <div className=' w-full relative flex flex-col px-2 py-4'>
              <label className='text-2xl md:font-bold mb-1' htmlFor="Password">Password</label>
              <input type={showPassword ? "text" : "password"} value={formdata.Password} name='Password' onChange={handleChange} placeholder='Enter Your Password' className=' capitalize border-[2px] rounded-[44px] py-2 px-5 outline-2 text-black text-xl focus:outline-blue-400 border-orange-400' />
              <button type="button" className={`absolute top-1/2 mr-3 right-3 transform -translate-y-1/2 mt-5 `} onClick={togglePasswordVisibility}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 p-2">{errors.password}</p>}
            {/* <div className="para flex items-start gap-1 justify-center">
              <FiInfo />
             
            </div> */}
            <div class="checkbox-container  mt-2 ml-2 ">
              <div class="checkone">
                <input type="checkbox"  onChange={handleCheckboxChange}  name="age" value="I am 18 years of age or older.*" id="age" class="form-checkbox h-5 w-5 text-blue-600" />
                <label for="age" class="ml-2 text-sm text-gray-700">I am 18 years of age or older.*</label>
              </div>
              <div class="checkTwo">
                <input type="checkbox"  onChange={handleCheckboxChange} name="Term&Condition" value="I Am Read Term & Condition" id="term-condition" class="form-checkbox h-5 w-5 text-blue-600" />
                <label for="term-condition" class="ml-2 text-sm text-gray-700">I agree to the <Link className='underline' target="_blank" to="/termscondition">Terms &amp; Conditions</Link> of this website</label>
              </div>
            </div>

            <div className='flex w-full items-center justify-center mt-5'>
              <Link onClick={handleRegister} className='button-ctas hover:bg-orange-400'>{loading ? 'Please Wait We Are Working...' : 'Next'}</Link>
            </div>
            <div className="text-center mt-2">
              <Link to="/login" className='text-[#f55e13]'>Already have an account. Click to Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
