import React from 'react';
import './adminHome.css';
import { Link } from 'react-router-dom'
const AdminHomePage = () => {
    return (
        <div className="admin-homepage">
            <div className="hero">
                <h1>Welcome, Admin!</h1>
                <p>Manage your restaurant with ease</p>
                <Link to="/join" className="join-now-button">Join Now</Link>
            </div>
        </div>
    );
};

export default AdminHomePage;
