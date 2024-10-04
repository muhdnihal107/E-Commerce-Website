import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'


export const AuthContext = createContext();

const AuthProvider = ( {children}) => {
const [user,setUser] = useState(null);
const [isAuthenticated,setIsAuthenticated] = useState(false);

  useEffect(()=>{
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if(storedUser){
        setUser(storedUser);
        setIsAuthenticated(true);
    }
  },[])

const register = async(newUser)=>{
  try{
     const responce = await axios.post('http://localhost:3000/users', newUser);
    const registeredUser =responce.data;
    localStorage.setItem('user',JSON.stringify(registeredUser));
    setUser(registeredUser);
    setIsAuthenticated(true);
  }
    catch(error) {
      console.log('Error during registration:', error);
      
    }
};
const login = async(email ,password) =>{
  try{
      const responce = await axios.get('http://localhost:3000/users');
      const foundUser = responce.data.find(user=> user.email === email);
       
      if(foundUser && foundUser.password === password){
        setUser(foundUser);
        setIsAuthenticated(true);
        console.log(isAuthenticated);
        
        localStorage.setItem('user',JSON.stringify(foundUser));
        return true;
      }
      else{
        setIsAuthenticated(false);
        return false;
      }
  } catch(error){
     console.log('error during login',error);
     setIsAuthenticated(false);
     return false;
     
  }
   
};
const logout = ()=>{
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
}
console.log(isAuthenticated);

  return (
    <AuthContext.Provider value={{user, isAuthenticated, setUser,setIsAuthenticated,register,login,logout}} >
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider