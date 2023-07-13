import React, { useState } from 'react'
import './navbar.css'
import HeroImg from "../assets/pro.png"
import restaurant from "../assets/restaurant.png"
import menu from "../assets/menu.png"
import { FaUtensils, FaBars, FaClipboardList, FaChartBar } from 'react-icons/fa';
import { Link } from 'react-router-dom'
export const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    return (
        <nav className="navbar">
            <h4 className="nav-logo">Thandoorhut</h4>
            <ul className='nav-icon'>
                <li><img className="menu-toggle" alt="HeroImg" src={HeroImg} onClick={toggleMenu}></img></li>
            </ul>
            <div className={`navbar-menu ${showMenu ? 'show' : ''}`}>
                <ul className='list'>
                    <Link className="nav-item" to="/dashboard"> <FaChartBar className="link-icon" />Dashboard</Link>
                    <Link className="nav-item" to="/restaurant"><FaUtensils className="link-icon" />Restaurant</Link>
                    <Link className="nav-item" to="/menu"><FaBars className="link-icon" />Menu</Link>
                    <Link className="nav-item" to="/order"><FaClipboardList className="link-icon" />Orders</Link>

                </ul>
            </div>

        </nav>
    )
}
export default Navbar