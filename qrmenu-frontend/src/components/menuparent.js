import Category from "./menu"
import "./menu.css";
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'



const ParentMenu = () => {
    return (
        <>
            <div className='menu-container'>
                <div className='manage'>
                    <h4>Manage Menu</h4>
                    <Link to="/addCategory" className="addcategory-button" >Add Category</Link>
                </div>

                <Category />

            </div>
        </>
    )
}
export default ParentMenu;