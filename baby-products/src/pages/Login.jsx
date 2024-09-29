import React,{useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


const Login = () => {
  const [inputs,setInputs] = useState({
    email: '',
    password: ''
  });
  const [loginerr,setLoginerr] = useState(false);
  const {login} = useContext(AuthContext);
  const navigate = useNavigate();
  
  
  const handleChange = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setInputs({...inputs,[name]:value})
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    const success = login(inputs.email, inputs.password);
    if(success){
      console.log('you are sucessfully loged in');
      setLoginerr(false);
      navigate('/');
    }
    else{
      setLoginerr(true);
    }
  }
  return (
    <section className='login-page'>
      <div className='login-sec'>
        <form onSubmit={handleSubmit}>
          <div className='login-head'>
            <h1>Login</h1>
          </div>
          <div className='login-form-group'>
            <label htmlFor="email"></label>
            <input 
                   type="email"
                   id='email'
                   name='email'
                   placeholder='Enter your Email'
                   value={inputs.email}
                   onChange={handleChange}
                   required />
          </div>
          <div className='login-form-group'>
            <label htmlFor="password"></label>
            <input 
                   type="password"
                   id='password'
                   name='password'
                   placeholder='Enter your password'
                   value={inputs.password}
                   onChange={handleChange} />
          </div>
          <div>
            <button className='sign-btn' type='submit'>Sign In</button>
          </div>
          <span id='login-err' className={loginerr ? 'show' : ''}>Your username or password is invalid</span>

        </form>
        
      </div>
    </section>
  )
}

export default Login