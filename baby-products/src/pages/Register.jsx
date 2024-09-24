import React,{useState} from 'react'

const Register = () => {
  const [inputs,setInputs] =useState({
    username: '',
    email: '',
    password: '',
    cpassword: ''
  })
  const handleChange =(e)=>{
    const name = e.target.name;
    const value = e.target.value;
     setInputs({...inputs,[inputs]: value})
  }
  return (
    <section>
      <h1>Register</h1>
      <form onSubmit={}>
        <label htmlFor="username">Username:</label>
        <input   
             type="text"
             name='username'
             placeholder='Username'
             value={inputs.username}
             onChange={handleChange}    
                 />
        <label htmlFor="">Email:</label>
        <input 
                type="email"
                name='email'
                placeholder='Email'
                value={inputs.email}
                onChange={handleChange} />
        <label htmlFor="">Password:</label>
        <input 
                type="text"
                name='password'
                placeholder='Password'
                value={inputs.password}
                onChange={handleChange} />
        <label htmlFor="">Confirm Password</label>
        <input 
                type="text"
                name='cpassword'
                placeholder='Confirm Password'
                value={inputs.password}
                onChange={handleChange} />
        <button onClick>Sign Up</button>
      </form>
    </section>
  )
}

export default Register