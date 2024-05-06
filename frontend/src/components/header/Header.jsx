import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from "react-icons/md";
import * as PiIcons from "react-icons/pi";
import { IconContext } from 'react-icons/lib';
import './Header.css';

const Nav = () => {

    const [sidebar, setSidebar] = useState(false);

    // toggle sidebar 
    const showSidebar = () => setSidebar(!sidebar);

    // accessibility -- allow to open menu with enter or spacebar
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' || e.code === 'Space')  {
            showSidebar();
        }
    };

    return (
        <IconContext.Provider value={{ color: '#fff' }}>
        <header className='Main-Header'>
            <div className='navbar' on="true">
                <Link to="#" className="menu-bars" onKeyDown={handleKeyPress}><FaIcons.FaBars onClick={showSidebar} /></Link>
            </div>
             <nav role="navigation" className={sidebar ? "nav-menu active" : "nav-menu"}>
                <ul>
                    <li aria-label='Close Menu' className='navbar-toggle'>
                        <Link to='#' className='menu-bars' onClick={showSidebar}>
                        <AiIcons.AiOutlineClose/>
                        </Link>
                    </li>
                    <li className="nav-item" aria-label='Dashboard' ><NavLink to="/dashboard"> <span><MdIcons.MdDashboard/></span> Dashboard</NavLink></li>
                    <li className="nav-item" aria-label='Cards management'><NavLink to="/manage/cards"><span><PiIcons.PiCardsFill /></span> Cards Management</NavLink></li>
                    <li className="nav-item" aria-label='Users management'><NavLink to="/manage/users"><span><FaIcons.FaUsers/></span>Users Management</NavLink></li>
                    <li className="nav-item" aria-label='Log out'><NavLink to="/logout"><span><MdIcons.MdOutlineLogout /></span>Log out</NavLink></li>
                </ul>
            </nav>
        </header>
        </IconContext.Provider>
    );
    };

export default Nav;
