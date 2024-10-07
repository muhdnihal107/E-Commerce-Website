import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'


export const AuthContext = createContext();
const BASE_URL = 'http://localhost:4000';

const AuthProvider = ( {children}) => {
const [user,setUser] = useState(null);
const [isAuthenticated,setIsAuthenticated] = useState(false);
const [totalUser,setTotalUser] = useState([]);

  useEffect(()=>{
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if(storedUser){
        setUser(storedUser);
        setIsAuthenticated(true);
    }
  },[]);

  const fetchUser = async()=>{
    try{
      const responce = await axios.get(`${BASE_URL}/users`);
      setTotalUser(responce.data);
      console.log('fetched user', responce.data);
    }
    catch (error){
      console.error("error fetching user");
      
    }
  };

  useEffect(()=>{
    fetchUser();
  },[]);

const register = async(newUser)=>{
  try{
     const responce = await axios.post('http://localhost:4000/users', newUser);
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
      const responce = await axios.get('http://localhost:4000/users');
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
    <AuthContext.Provider value={{user, isAuthenticated,totalUser,setTotalUser, setUser,setIsAuthenticated,register,login,logout,fetchUser}} >
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider