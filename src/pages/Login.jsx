import { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [_, setCookies] = useCookies('access_token');
  const navigate = useNavigate();

  const messageBg = isSuccess ? 'bg-green-500/50' : 'bg-red-500/50';

  const handleChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', loginInfo);
      if (response.status === 200) {
        setIsSuccess(true);
        setMessage(response.data.message);
        setCookies('access_token', response.data.token);

        setInterval(() => navigate('/'), 3000);
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className='w-full h-screen bg-background text-white flex flex-col justify-center items-center'>
      <form
        className='bg-primary p-10 flex flex-col justify-center items-center gap-2 w-full md:w-1/3 lg:gap-5'
        method='POST'
        onSubmit={handleSubmit}>
        <h1 className='text-3xl font-bold lg:text-4xl'>Login</h1>

        <div className='relative w-full'>
          <input
            type='email'
            name='email'
            id='email'
            value={loginInfo.email}
            onChange={handleChange}
            required
            className='block px-2.5 pb-2.5 pt-5 w-full text-sm text-white bg-secondary rounded-lg border border-white appearance-none focus:outline-none focus:ring-0 focus:border-white peer'
            placeholder=' '
          />
          <label
            htmlFor='email'
            className='absolute text-sm text-white duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'>
            Email
          </label>
        </div>
        <div className='relative w-full'>
          <input
            type='password'
            name='password'
            id='password'
            value={loginInfo.password}
            onChange={handleChange}
            required
            className='block px-2.5 pb-2.5 pt-5 w-full text-sm text-white bg-secondary rounded-lg border border-white appearance-none focus:outline-none focus:ring-0 focus:border-white peer'
            placeholder=' '
          />
          <label
            htmlFor='password'
            className='absolute text-sm text-white duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'>
            Password
          </label>
        </div>

        {message && <p className={`w-full p-2 text-sm px-4 rounded-lg border ${messageBg}`}>{message}</p>}
        <button className='px-4 py-2 bg-secondary rounded-lg' type='submit' disabled={isSuccess}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
