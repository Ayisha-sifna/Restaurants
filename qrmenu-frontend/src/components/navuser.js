import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaBell, FaTimes } from 'react-icons/fa';
import './navuser.css'
const Navbaruser = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const handleBar = () => {
        navigate("/preview")
    };
    const handleNotificationClick = () => {
        setShowAlert(true);
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
        setMessage('');
    };
    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendClick = () => {
        // Handle sending the message
        alert(`Sending message: ${message}`);
        setMessage('');
    };


    return (

        <div className="navbaruser">
            <div className="listbar">
                <FaBars onClick={handleBar} className="listbar-icon" />
            </div>
            <div className="notification">
                <FaBell className="notification-icon" onClick={handleNotificationClick} />
            </div>
            {showAlert && (
                <div className="alert">
                    <div className="alert-header">
                        <h5>Call the Waiter</h5>
                        <FaTimes className="close-icon" onClick={handleCloseAlert} />
                    </div>
                    <div className="alert-body">
                        <input type="text" placeholder="Enter your Table no" value={message} onChange={handleInputChange} />
                        <button onClick={handleSendClick}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbaruser;
