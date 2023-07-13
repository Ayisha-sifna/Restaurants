// menu.js

import React, { useState, useEffect } from 'react';
import { FaBars, FaFolder, FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Category = () => {
    const [isListVisible, setIsListVisible] = useState({});
    const [categories, setCategories] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [clickedCategory, setClickedCategory] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3000/categories', {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`,
                    },
                });
                setCategories(response.data);
            } catch (error) {
                console.error(error);
                setErrorMessage('Failed to fetch categories');
            }
        };

        fetchCategories();
    }, []);

    const toggleList = (categoryId) => {
        setCategories((prevCategories) => {
            const updatedCategories = prevCategories.map((category) => {
                if (category._id === categoryId) {
                    return {
                        ...category,
                        isListVisible: !category.isListVisible,
                        subcategories: category.subcategories.map((subcategory) => ({
                            ...subcategory,
                            isListVisible: !category.isListVisible,
                        })),
                    };
                }
                return category;
            });
            return updatedCategories;
        });
        setClickedCategory(categoryId);
    };

    const handleDelete = async (categoryId) => {
        if (window.confirm('Are you sure you want to delete the category?')) {
            try {
                const response = await axios.delete(
                    `http://localhost:3000/categories/${categoryId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get('token')}`,
                        },
                    }
                );
                setErrorMessage(response.data.message);
                setCategories((prevCategories) =>
                    prevCategories.filter((category) => category._id !== categoryId)
                );
            } catch (error) {
                console.error(error);
                setErrorMessage('Failed to delete category');
            }
        }
    };

    return (
        <div>
            {categories.map((category, index) => (
                <React.Fragment key={category._id}>
                    <div className="row1">
                        <div className="icon" onClick={() => toggleList(category._id)}>
                            <p>
                                <FaBars className="list-icon" />
                                {category.name}
                            </p>
                        </div>
                        <div className="buttons">
                            <Link to={`/addSubCategory/${category._id}`} className="edit-link">
                                <FaFolder className="edit-icon" />
                            </Link>

                            <button className="edit">
                                <FaPlus className="edit-icon" />
                            </button>
                            <Link to={`/editCategory/${category._id}`} className="edit-link">
                                <FaEdit className="edit-icon" />
                            </Link>
                            <button className="delete" onClick={() => handleDelete(category._id)}>
                                <FaTrashAlt className="delete-icon" />
                            </button>
                        </div>
                    </div>
                    {category.isListVisible && category.subcategories && category.subcategories.length > 0 && (
                        <div className="subcateg-list">
                            {category.subcategories.map((subcategory, subindex) => (
                                <div className="row2" key={subcategory._id}>
                                    <div className="icon" onClick={() => toggleList(subcategory._id)}>
                                        <p>
                                            <FaBars className="list-icon" />
                                            {subcategory.name}
                                        </p>
                                    </div>
                                    <div className="buttons">
                                        <button className="edit">
                                            <FaFolder className="edit-icon" />
                                        </button>
                                        <button className="edit">
                                            <FaPlus className="edit-icon" />
                                        </button>
                                        <button className="edit">
                                            <FaEdit className="edit-icon" />
                                        </button>
                                        <button className="delete">
                                            <FaTrashAlt className="delete-icon" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default Category;
