import { Routes, Route} from 'react-router-dom';
import { lazy, Suspense, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import { saveUser, deleteUser, saveToken } from './redux/reducer/user-slice';
import { getSingleUser } from './redux/api/userApi';
import Loader from './components/ui/Loader';
import { RootState } from './redux/store';


import Layout from './components/Layout/Layout';
import RequireAuth from './components/RequireAuth';
import toast from 'react-hot-toast';
import { TAccessToken } from './Types/apiTypes';

const NotFound = lazy(() => import('./pages/notfound'));

const Home = lazy(() => import('./pages/home'));











const App = () => {

  const dispatch = useDispatch();

  const { loading: userLoaidng, token} = useSelector((state: RootState) => state.userSlice);




  const fetchSaveSingleUser = useCallback(async (token: TAccessToken) => {
    try{
      const data = await getSingleUser(token?.userId, token?.access_token);

      if('error' in data) throw new Error('User not found');
      const {status, data: {user: mongoUser}} = data;

      if(status !== 'success'){
        throw new Error('User not found');
      }
      dispatch(saveToken(token));
      dispatch(saveUser(mongoUser));
    }
    catch(err){
      if((err as Error).message === 'Unauthorized'){
        toast.error((err as Error).message);
      }
      dispatch(deleteUser());
    }
  },[dispatch]);




  useEffect(() => {
    const local = localStorage.getItem('user');
    const token = local ? JSON.parse(local) : null;

    if (!token) {
      dispatch(deleteUser());
      return;
    }

    fetchSaveSingleUser(token);

  }, [dispatch, fetchSaveSingleUser])



  useEffect(() => {
    if (!token) {
      return;
    }

    const expiry = token.expiry;
    const remainingTime = new Date(expiry).getTime() - new Date().getTime();


    const logoutTimer = setTimeout(() => {
      localStorage.removeItem('user');
      dispatch(deleteUser());
    }, remainingTime); 

    return () => clearTimeout(logoutTimer);
  }, [dispatch, token]);





  if (userLoaidng)
    return <div className='h-screen w-screen title grid place-items-center'>Loading user...</div>;

  return (
    <Routes>

      <Route path="/login" element={<Login /> } />
      <Route path="/signup" element={ <Signup /> } />


      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route element={<RequireAuth />} >

        </Route>
      </Route>


      
      <Route path="*" element={<Suspense fallback={<Loader />}><NotFound /></Suspense>} />
    </Routes>
  )
}



export default App