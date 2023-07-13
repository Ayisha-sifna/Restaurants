import React from 'react';
import "./sidebar.css";
import { FaUtensils, FaBars, FaClipboardList, FaChartBar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div id="sidebar">
            <ul className="nav flex-column sticky-top">
                <p>Management</p>
                <Link className="nav-item" to="/dashboard">
                    <FaChartBar className="link-icon" />
                    Dashboard
                </Link>
                <Link className="nav-item" to="/restaurant">
                    <FaUtensils className="link-icon" />
                    Restaurant
                </Link>
                <Link className="nav-item" to="/menu">
                    <FaBars className="link-icon" />
                    Menu
                </Link>
                <Link className="nav-item" to="/order">
                    <FaClipboardList className="link-icon" />
                    Orders
                </Link>
            </ul>
        </div>
    );
}

export default Sidebar;
