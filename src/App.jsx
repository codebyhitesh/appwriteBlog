import authService from './appwrite/services/auth';
import { Header, Footer } from '../index';
import { Outlet } from 'react-router-dom';
import { login, logout } from './store/authSlice';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  

  return (
    !loading ? (
      <div className='w-screen h-screen bg-slate-200'>
        <Header/>
        <Outlet/>
        <Footer/>
      </div>
    ) : (null)
  );
}

export default App;
