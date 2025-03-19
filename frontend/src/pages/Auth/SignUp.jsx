import React, { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/inputs/Input';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH } from '../../utils/apiPath';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {updateUser} = useContext(UserContext);

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileUrl = '';

    if(!name) {
      setError('Please enter your full name');
      return;
    }
    if(!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if(!password) {
      setError('Please enter a password');
      return;
    }

    setError('');

    // Call the signup API here
    try {

      if(profilePic) {
        const imageUploadRes = await uploadImage(profilePic);
        profileUrl = imageUploadRes.imageUrl || '';
      }
      const response = await axiosInstance.post(API_PATH.AUTH.REGISTER, {
        name,
        email,
        password,
        profileUrl
      });

      const {token, user} = response.data;

      if(token) {
        localStorage.setItem('token', token);
        updateUser(user);
        navigate('/dashboard');
      }
    } catch (error) {
      if(error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong, please try again later');
        console.log(error);
      }
    }
  }

  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join Us today by enetring your details below</p>

        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              value={name}
              onChange={(e) => setFullName(e.target.value)}
              label='Full Name'
              placeholder='John Doe'
              type='text' />

        <Input 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address"
          placeholder="user@example.com"
          type="text" />
        <div className='col-span-2'>
        <Input 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder=""
          type="password" />

      {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

      <button type='submit' className='btn-primary'>
        Sign Up
      </button>

      <p className='text-[13px] text-slate-800 mt-3'>
        Already have an account?{" "}
        <Link className='font-medium text-primary underline' to="/login">
        Login
        </Link>
      </p>
          </div>
          </div>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp