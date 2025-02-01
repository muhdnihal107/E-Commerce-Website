import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../redux/slices/authSlice'

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {loading,error} = useSelector((state)=>state.auth);
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
    cart: [],
    blocked: false
  });


  const [focus, setFocus] = useState({
    errname: false,
    erremail: false,
    errpassword: false,
    errcpassword: false

  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = inputs;

    try {
      await dispatch(registerUser({name,email,password})).unwrap();
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
      navigate('/login');

    }catch(error){
      alert('registration failed');
      console.error('Registration failed:', error);

    }

  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(inputs);

    setInputs({ ...inputs, [name]: value });
  };
  return (
    <section className='reg-section'>

      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className='reg-form-group'>
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            className='form-control'
            id='name'
            pattern="^[A-Za-z0-9].{2,16}"
            autoComplete='off'
            name='name'
            placeholder='Username'
            value={inputs.name}
            onChange={handleChange}
            onBlur={() => setFocus({ ...focus, errname: true })}
            focus={focus.errname.toString()}
            required />
          <span>Username should have 3-16 Characters</span>
        </div>
        <div className='reg-form-group'>
          <label htmlFor="e-mail">Email:</label>
          <input
            type="email"
            className='form-control'
            name='email'
            id='e-mail'
            placeholder='Email'
            value={inputs.email}
            onChange={handleChange}
            onBlur={() => setFocus({ ...focus, erremail: true })}
            focus={focus.erremail.toString()}
            required />
          <span>Enter a valid Email ID</span>
        </div>
        <div className='reg-form-group'>
          <label htmlFor="pass">Password:</label>
          <input
            type="password"
            className='form-control'
            name='password'
            id='pass'
            pattern='^.{6,}$'
            placeholder='Password'
            value={inputs.password}
            onChange={handleChange}
            onBlur={() => setFocus({ ...focus, errpassword: true })}
            focus={focus.errpassword.toString()}
            required />
          <span>Password must have minimum 8 Characters and include atleast 1 uppercase,1 digit and 1 special character</span>
        </div>
        <div className='reg-form-group'>
          <label htmlFor="cpass">Confirm Password</label>
          <input
            type="password"
            className='form-control'
            id='cpass'
            name='cpassword'
            pattern={inputs.password}
            placeholder='Confirm Password'
            value={inputs.cpassword}
            onChange={handleChange}
            onBlur={() => setFocus({ ...focus, errcpassword: true })}
            focus={focus.errcpassword.toString()}
            required />
          <span>Password is not matching</span>
        </div>
        <div className='reg-btn-con'>
          <button type='submit'>Sign Up</button>
          <p className='navigate-txt'>Already have an account?<Link to={'/login'}>Log In</Link></p>
        </div>

      </form>
    </section>
  )
}

export default Register;