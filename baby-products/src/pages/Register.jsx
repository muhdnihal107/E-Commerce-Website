import React,{useContext, useState} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [inputs,setInputs] =useState({
    username: '',
    email: '',
    password: '',
    cpassword: ''
  });
  const [focus,setFocus] = useState({
    errname: false,
    erremail: false,
    errpassword: false,
    errcpassword: false

  });
  const {register} =useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleSubmit =(e)=>{
    e.preventDefault();
    console.log(inputs);
    register(inputs);
    navigate('/login');
    
  }
  
  const handleChange =(e)=>{
    const name = e.target.name;
    const value = e.target.value;
    console.log(inputs);
    
     setInputs({...inputs,[name]: value});
  }
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
             name='username'
             placeholder='Username'
             value={inputs.username}
             onChange={handleChange}
             onBlur={()=>setFocus({...focus,errname: true})}
             focus={focus.errname.toString()} 
             required  />
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
                onBlur={()=>setFocus({...focus,erremail: true})}
                focus={focus.erremail.toString()}  
                required/>
                <span>Enter a valid Email ID</span>
        </div>
        <div className='reg-form-group'>
          <label htmlFor="pass">Password:</label>
        <input 
                type="password"
                className='form-control'
                name='password'
                id='pass'
                pattern='(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'
                placeholder='Password'
                value={inputs.password}
                onChange={handleChange}
                onBlur={()=>setFocus({...focus,errpassword: true})}
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
                onBlur={()=>setFocus({...focus,errcpassword: true})}
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

export default Register