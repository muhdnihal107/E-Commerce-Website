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

const register = (newUser)=>{
    localStorage.setItem('user',JSON.stringify(newUser));
    setUser(newUser);
    setIsAuthenticated(true);
}
const login = (email ,password) =>{
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if(storedUser && storedUser.email === email && storedUser.password === password){
        setUser(storedUser);
        setIsAuthenticated(true);
        return true;
    }
    else{
        setIsAuthenticated(false);
        return false;
    }
}
const logout = ()=>{
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
}
  return (
    <AuthContext.Provider value={{user, isAuthenticated, setUser,setIsAuthenticated,register,login,logout}} >
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider