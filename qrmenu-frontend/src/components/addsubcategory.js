import React, { useState } from 'react';
import './addcategory.css';
import { IoClose } from 'react-icons/io5';
import axios from 'axios';
const SubCategoryBox = () => {
    const [category, setCategory] = useState('');
    const [isOpen, setIsOpen] = useState(true);

    const handleInputChange = (event) => {
        setCategory(event.target.value);
    };

    const handleSave = async () => {
        try {
            const response = await axios.post('/categories/:categoryId/subcategories', {
                name: category
            });
            console.log('Subcategory saved:', response.data);
            setCategory('');
        } catch (error) {
            console.error('Error saving subcategory:', error);
        }
    }
    const handleClose = () => {
        setIsOpen(false);
    };

    if (!isOpen) {
        return null; // Render nothing if the box is closed
    }

    return (
        <div className="main-container">
            <div className="header">
                <h5>Add SubCategory</h5>
                <button className="close-btn" onClick={handleClose}><IoClose /></button>
            </div>
            <hr />
            <div className="content">
                <input
                    type="text"
                    placeholder="Enter subCategory"
                    className="category-input"
                    value={category}
                    onChange={handleInputChange}
                />
                <button className="save-btn" onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default SubCategoryBox;
