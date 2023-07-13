import React, { useState } from 'react';
import './addcategory.css';
import { IoClose } from 'react-icons/io5';
import axios from 'axios';

const CategoryBox = () => {
    const [category, setCategory] = useState('');
    const [isOpen, setIsOpen] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [savedCategory, setSavedCategory] = useState(null);

    const handleInputChange = (event) => {
        setCategory(event.target.value);
    };

    const handleSave = async () => {
        try {
            const response = await axios.post('http://localhost:3000/categories', {
                name: category,
                subcategories: []
            });

            const responseData = response.data;

            if (response.status === 200) {
                setSavedCategory(responseData.category.name);
                setSuccessMessage(responseData.message);
                setErrorMessage('');
                setCategory('');
            } else if (response.status === 409) {
                setErrorMessage(responseData.message);
                setSuccessMessage('');
            } else {
                setErrorMessage('Failed to save category');
                setSuccessMessage('');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Failed to save category');
            setSuccessMessage('');
        }
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="main-container">
            <div className="header">
                <h5>Add Category</h5>
                <button className="close-btn" onClick={handleClose}>
                    <IoClose />
                </button>
            </div>
            <hr />
            <div className="content">
                <input
                    type="text"
                    placeholder="Enter category"
                    className="category-input"
                    value={category}
                    onChange={handleInputChange}
                />
                <button className="save-btn" onClick={handleSave}>
                    Save
                </button>
            </div>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {savedCategory && (
                <div className="saved-category">
                    Saved Category: {savedCategory}

                </div>
            )}
        </div>
    );
};

export default CategoryBox;
