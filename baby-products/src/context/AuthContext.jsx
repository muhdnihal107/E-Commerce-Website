import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext();
const BASE_URL = 'http://localhost:4000';

const AuthProvider = ( {children}) => {
const [user,setUser] = useState(null);
const [isAuthenticated,setIsAuthenticated] = useState(false);
const [totalUser,setTotalUser] = useState([]);
const [isAdmin,setIsAdmin] = useState(false);

  useEffect(()=>{
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if(storedUser){
        setUser(storedUser);
        setIsAuthenticated(true);
        setIsAdmin(storedUser.role === 'admin')
    }
  },[]);

  const fetchUsers = async()=>{
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
    fetchUsers();
  },[]);

  const deleteUser = async(userId)=>{
    try{
      const responce = await axios.delete(`${BASE_URL}/users/${userId}`);
      const filteredUser = totalUser.filter((prevUser)=>prevUser.id !== userId);
      setTotalUser(filteredUser);
      
    }catch(error){
      console.error("error while deleting user");
      
    }
  };

  const blockedUser = async(userId,userBlock)=>{
    try{
      const updateBlock = !userBlock;
      const responce = await axios.patch(`${BASE_URL}/users/${userId}`,{blocked:updateBlock});
      console.log('updated blocked status', updateBlock);
      const updatedUser = responce.data;
      setTotalUser((prevUser)=>prevUser.map((user)=> user.id === updatedUser.id? updatedUser:user));
      console.log("totaluser After block user",totalUser);
      
    }catch(error){
      console.error('Error while blocking/unblocking user:', error);
    alert('Error occurred while updating user status');
    }
  }

const register = async(newUser)=>{
  try{
    /* const userId = totalUser.length > 0 ? Math.max(...totalUser.map(item=>item.id)):0;
     const userwithId ={...newUser,id: userId + 1};*/

     const responce = await axios.post('http://localhost:4000/users', newUser);
    const registeredUser =responce.data;
    localStorage.setItem('user',JSON.stringify(registeredUser));
    setUser(registeredUser);
    setTotalUser((prevUser)=>[...prevUser,registeredUser])
    setIsAuthenticated(true);
  }
    catch(error) {
      console.log('Error during registration:', error);
      
    }
};
const login = async(email ,password) =>{
  try{
      const responce = await axios.get('http://localhost:4000/users');
      const adminResponce = await axios.get('http://localhost:4000/admins');
      const foundUser = responce.data.find((user)=> user.email === email);
      const foundAdmin = adminResponce.data.find((admin) => admin.email === email);
      if (foundAdmin) {
        if (foundAdmin.password === password) {
          setUser(foundAdmin);
          setIsAuthenticated(true);
          setIsAdmin(true);
          localStorage.setItem('user', JSON.stringify(foundAdmin));
          return 'admin';
        } else {
          alert('Incorrect password for admin!');
          return false;
        }
      }

      if (foundUser) {
        if (foundUser.blocked) {
          alert('Admin has blocked you!');
          return false;
        }
        if (foundUser.password === password) {
          setUser(foundUser);
          setIsAuthenticated(true);
          setIsAdmin(false);
          localStorage.setItem('user', JSON.stringify(foundUser));
          return 'user';
        } else {
          alert('Incorrect password!');
          return false;
        }
      }

      alert('User not found!');
      return false;
    } catch (error) {
      console.log('Error during login:', error);
      return false;
    }
};

const logout = ()=>{
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
};
console.log(isAuthenticated);

  return (
    <AuthContext.Provider value={{user, isAuthenticated,isAdmin,totalUser,setTotalUser, setUser,setIsAuthenticated,register,login,logout,fetchUsers,deleteUser,blockedUser}} >
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider