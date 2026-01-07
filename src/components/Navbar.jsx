import { Link } from 'react-router'
import { useLazyLogoutUserQuery,  } from '../redux/api/authApi.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { resetStates, setIsAuthenticated } from '../redux/features/userSlice.js';
import { useEffect } from 'react';

const Navbar = () => {

  const navigate = useNavigate();
  const [ logout ] = useLazyLogoutUserQuery();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      toast.success("Logout Successful");
      dispatch(resetStates(null))
      navigate("/");
    } catch (err) {
      toast.error("Logout failed. Please try again.");
    }
  }

  useEffect(() => {
    if(!user && !isAuthenticated){
      navigate("/");
    }
  }, [user, isAuthenticated]);


  return (
    <header className='bg-gray-600 '>
      <div className='mx-auto mx-w-6xl p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col ml-4'>
            <h1 className='text-3xl font-bold text-gray-100'>Relay Code</h1>
            <p className='text-md font-normal text-gray-100'>Create probs for ur coding buddy ...</p>
          </div>


          {user ? (
            <Link to="/" className='bg-red-600 text-white px-4 py-2 rounded-md mr-5' onClick={handleLogout}> Logout</Link>)
            : (
              <Link to="/" className='bg-blue-600 text-white px-4 py-2 rounded-md mr-5 '> Login</Link>
            )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
