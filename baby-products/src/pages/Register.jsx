import React from 'react'

const Register = () => {
  return (
    <section>
      <h1>Register</h1>
      <form action="">
        <label htmlFor="username">Username:</label>
        <input   
             type="text"
             id='username'
             placeholder='Enter Your Username'    
                 />
        <label htmlFor="">Password:</label>
        <input type="text" />
        <label htmlFor="">Confirm Password</label>
        <input type="text" />
        <button onClick>Sign Up</button>
      </form>
    </section>
  )
}

export default Register