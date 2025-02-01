import React,{useContext, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginJWT } from '../redux/slices/authSlice';
import { Link } from 'react-router-dom';



const Login = () => {
  const dispatch = useDispatch();
  const {loading,error,isAuthenticated,user} = useSelector((state)=>state.auth);
  const [inputs,setInputs] = useState({
    email: '',
    password: ''
  });
  const [loginerr,setLoginerr] = useState(false);
  //const {login,isAuthenticated} = useContext(AuthContext);
  const navigate = useNavigate();
  

  const handleChange = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setInputs({...inputs,[name]:value})
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
   const success = await dispatch(loginJWT(inputs));

  
     if (isAuthenticated){

     if(user.is_staff){
       navigate('/admin');
     }else{
      return(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Loged In</h2>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            <Link to={'/'}>Close</Link>
            
          </button>
        </div>
      </div>
      )
    
     }
   }; 
  };
  if(loading){
    return(
      <div className="flex items-center justify-center h-screen bg-gray-100 opacity-60">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-blue-500 rounded-full animate-spin"></div>
          <div className="absolute top-2 left-2 w-12 h-12 border-4 border-t-green-400 border-r-transparent border-b-transparent border-l-green-400 rounded-full animate-spin-slow"></div>
        </div>
      </div>
    )
  };
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Login Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Login</h1>
      </div>

      {/* Email Input */}
      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm font-medium text-gray-600 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={inputs.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Password Input */}
      <div className="flex flex-col">
        <label htmlFor="password" className="text-sm font-medium text-gray-600 mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={inputs.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 text-white bg-green-700 opacity-80 rounded-lg font-medium hover:bg-blue-900 transition-colors ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Sign In
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-500 text-sm text-center">
          <p>{error}</p>
        </div>
      )}

      {/* Links */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <Link to={'/register'} className="text-blue-600 hover:underline">
          Don't have an Account? Register
        </Link>
      </div>
    </form>
  </div>
</section>

  )
}

export default Login