import { Link } from 'react-router'
import { useLazyLogoutUserQuery,  } from '../redux/api/authApi.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { resetStates } from '../redux/features/userSlice.js';
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
    <header className='bg-gray-500/30 backdrop-blur-lg shadow-xl border border-white/20'>
      <div className='mx-auto mx-w-6xl p-4'>
        <div className='flex items-center justify-between max-[500px]:flex-col max-[500px]:gap-4'>
          <div className='flex flex-col ml-4 gap-2'>
             <h1 className='text-3xl font-bold max-[500px]:text-center bg-[linear-gradient(90deg,rgba(73,230,230,1)_0%,rgba(126,221,230,1)_50%,rgba(9,106,121,1)_100%)] text-transparent bg-clip-text'>Code Arena</h1>
            <p className='text-md font-normal text-gray-100 max-[500px]:text-center'>Turn Based Collaboration Room</p> 
            
          </div>


          {user ? (
            <Link to="/" className='bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-800' onClick={handleLogout}> Logout</Link>)
            : (
              <Link to="/" className='bg-blue-600 text-white px-4 py-2 rounded-md '> Login</Link>
            )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
