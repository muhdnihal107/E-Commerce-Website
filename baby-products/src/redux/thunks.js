import axios from 'axios';
import { login, setUser } from './slices/authSlice';

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:4000/api/auth/login', { email, password });
    const user = response.data;
    dispatch(setUser(user));
    dispatch(login(user));
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('Login failed', error);
  }
};
