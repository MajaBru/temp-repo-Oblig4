import React from 'react';
import { Link } from "react-router-dom";
import './Header.css';

const Nav = () => {
    return (
        <header className='Main-Header'>
            <nav>
                <ul>
                    <li><Link to="/dashboard" className="nav-item">Dashboard</Link></li>
                    <li><Link to="/manage/cards" className="nav-item">Cards Management</Link></li>
                    <li><Link to="/manage/users" className="nav-item">Users Management</Link></li>
                    <li><Link to="/logout" className="nav-item">Log out</Link></li>
                </ul>
            </nav>
        </header>
    );
    };

export default Nav;