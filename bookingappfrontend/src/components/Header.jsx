import React from 'react'
import logo from '../assets/images/logo.svg'
import { Link } from 'react-router-dom'
import {
    FaUser,
    FaSignInAlt,
    FaSignOutAlt,
    FaBuilding
} from 'react-icons/fa'


const Header = () => {
  
  return (
    <header className="bg-gray-100 " >
      {/*Inline styles*/}
      <style>
        {`
          .inLine {
            display: inline-block;
            vertical-align: middle;
          }
          .mr-1 {
            margin-right: 0.25rem;
          }
        `}
      </style>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/">
              <img className="h-12 w-12" src={logo} alt="Bookit"/>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
                >
                  Rooms
                </Link>
                {/*<!-- Logged In Only -->*/}
                <Link
                  to="/bookings.html"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
                >
                  Bookings
                </Link>
                <Link
                  to="/add-room.html"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
                >
                  Add Room
                </Link>
              </div>
            </div>
          </div>
          {/*<!-- Right Side Menu -->*/}
          <div className="ml-auto">
            <div className="ml-4 flex items-center md:ml-6">
              {/*<!-- Logged Out Only -->*/}
              <Link
                to="login.html"
                className="mr-3 text-gray-800 hover:text-gray-600"
              >
                <FaSignInAlt className='inLine mr-1'/> Login
              </Link>
              <Link
                to="register.html"
                className="mr-3 text-gray-800 hover:text-gray-600"
              >
                <FaUser className='inLine mr-1'/>  Register
              </Link>
              <Link to="my-rooms.html">
                <FaBuilding className='inLine mr-1'/> My Rooms
              </Link>
              <Link
                to="login.html"
                className="mx-3 text-gray-800 hover:text-gray-600"
              >
                <FaSignOutAlt className='inLine mr-1'/> Sign Out
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/*<!-- Mobile menu -->*/}
      <div className="md:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          <Link
            to="/"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
          >
            Rooms
          </Link>
          {/*<!-- Logged In Only -->*/}
          <Link
            to="/bookings.html"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
          >
            Bookings
          </Link>
          <Link
            to="/add-room.html"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
          >
            Add Room
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
