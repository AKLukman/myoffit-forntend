
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../redux/hooks';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { toast } from 'sonner';
import { verifyToken } from '../utils/verifyToken';
import { setUser } from '../redux/features/auth/authSlice';
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email,setEmail] =useState('')
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error,setError]=useState('')
  const [login] = useLoginMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
   
    const toastId = toast.loading('Logging in');

    try {
      const userInfo = {
        email: email,
        password:password,
      };

      const res = await login(userInfo).unwrap();
      console.log(res)


      const user = verifyToken(res.data.accessToken);
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success('Logged in', { id: toastId, duration: 2000 });

      if(res.data){
        navigate("/collections")
      }

      if(user?.role ==='superAdmin' || user?.role==='admin'){
        navigate('/dashboard')
      }

      // if (res.data.needsPasswordChange) {
      //   navigate(`/change-password`);
      // } else {
      //   navigate(`/${user.role}/dashboard`);
      // }
    } catch (err) {
      toast.error('Something went wrong', { id: toastId, duration: 2000 });
      setError('Invalid email or password. Please try again.');
      console.log(err)
    }
  };

  
  return (
   <form onSubmit={onSubmit} className='flex flex-col items-center w-[90%] max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>Log In</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      
      <input onChange={(e)=>setEmail(e.target.value)}  className='w-full px-3 py-2 border border-gray-800' type="email" placeholder='Email' required />
      <div className="relative w-full">
      <input
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800 rounded"
        type={showPassword ? "text" : "password"} // 👈 Dynamic type
        placeholder="Password"
        required
      />

      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-600"
      >
        {showPassword ? "Hide" : "Show"}
      </button>
    </div>

    {error && (
        <div className="w-full text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        <p> <Link className='text-blue-800 font-bold' to={'/signup'}>Create an account</Link></p>
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt4'>LogIn</button>

   </form>
  )
}

export default Login
