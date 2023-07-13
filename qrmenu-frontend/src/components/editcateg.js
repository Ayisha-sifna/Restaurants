import React, { useState, useEffect } from 'react';
import './addcategory.css';
import { IoClose } from 'react-icons/io5';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditCategory = ({ onClose }) => {
    const { categoryId } = useParams();
    const [category, setCategory] = useState({ name: "" });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        console.log(categoryId)
        // Fetch the category details from the server using the categoryId
        const fetchCategory = async (categoryId) => {
            try {
                const response = await axios.get(`http://localhost:3000/categories/${categoryId}`);
                const categoryData = response.data;
                setCategory(categoryData.name);
            } catch (error) {
                console.error(error);
                setErrorMessage('Failed to fetch category details');
            }
        };

        fetchCategory(categoryId);
    }, [categoryId]);

    const handleInputChange = (event) => {
        setCategory({ ...category, name: event.target.value });
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/categories/${categoryId}`, { categname: category.name });

            const responseData = response.data;
            console.log(responseData)
            if (responseData.success) {
                setSuccessMessage(responseData.message);
                setErrorMessage('');
            } else {
                setErrorMessage(responseData.message);
                setSuccessMessage('');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Failed to save category');
            setSuccessMessage('');
        }
    };

    return (
        <div className="main-container">
            <div className="header">
                <h5>Edit Category</h5>
                <button className="close-btn" onClick={onClose}>
                    <IoClose />
                </button>
            </div>
            <hr />
            <div className="content">
                <input
                    type="text"
                    placeholder="Enter category"
                    className="category-input"
                    value={category.name}
                    onChange={handleInputChange}
                />
                <button className="save-btn" onClick={handleSave}>
                    Save
                </button>
            </div>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    );
};

export default EditCategory;
