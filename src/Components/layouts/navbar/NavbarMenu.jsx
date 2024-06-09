import React from 'react'
import { Link } from 'react-router-dom'

const NavbarMenu = ({academy}) => {
  const homeLink = academy ? '/academy/home':'/home'
  const textColors =  academy ? 'text-indigo-500 hover:text-black '  : 'hover:text-gblue-500 text-gray-800 '
  return (
    <ul id="drawer" role="menu" className="lg:mr-32  text-lg md:text-xl lg:gap-12 md:gap-4 sm:gap-2 sm:flex hidden    min-h-screen  sm:static w-48  bg-white sm:shadow-none shadow-xl sm:bg-transparent sm:flex-row sm:w-auto sm:min-h-0  ">
            <li className={`${textColors}`}>
            <Link  to={homeLink} className="">Home</Link>
            </li>
            <li className={`${textColors}`}>
            <Link to={''} className="">Trials</Link>
            </li>
            {
              !academy && 
              <li className={`${textColors}`}>
                <Link to={''} className="">Friends</Link>
              </li>
            }
            
            <li className={`${textColors}`}>
            <Link to={''} className="">Messages</Link>
            </li>
        </ul>
  )
}

export default NavbarMenu
