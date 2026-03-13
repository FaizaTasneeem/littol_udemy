import { NavLink, Outlet } from "react-router-dom"

function Navbar() {
  return (
    <>
        <div className='flex flex-col m-8 bg-gray-200 rounded-lg min-h-full w-20 shadow-2xl shadow'>
            <NavLink to='/home'>Home</NavLink>
            <NavLink to='/courses'>Courses</NavLink>
        </div>

        <Outlet/>
    </>

  )
}

export default Navbar