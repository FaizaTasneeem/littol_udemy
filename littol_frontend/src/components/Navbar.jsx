import { NavLink, Outlet } from "react-router-dom"
import { useLogout } from "../hooks/useLogout";

function Navbar() {
  const {handleLogout} = useLogout();

  return (
    <div className="flex flex-row min-h-screen">
      <div className='flex flex-col mx-8 py-4 bg-gray-200 rounded-lg w-[15%] shadow-2xl shadow'>
          <NavLink to='/dashboard' className='px-4 py-2'>Dashboard</NavLink>
          <NavLink to='/courses' className='px-4 py-2'>Courses</NavLink>
          <NavLink to='/profile' className='px-4 py-2'>Profile</NavLink>

          <button className="p-2 mt-8 bg-violet-500 rounded cursor-pointer" onClick={handleLogout}>Logout</button>
      </div>

      <Outlet/>
    </div>

  )
}

export default Navbar