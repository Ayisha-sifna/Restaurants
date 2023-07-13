import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUtensils } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import "./userHome.css"
const PreviewList = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get('http://localhost:3000/restaurant');
                const restaurantData = response.data.message;
                console.log(restaurantData)
                setRestaurants(restaurantData);
            } catch (error) {
                console.error('Error fetching restaurants:', error);
            }
        };

        fetchRestaurants();
    }, []);

    useEffect(() => {
        fetch('http://localhost:3000/categories')
            .then(response => response.json())
            .then(categoryData => {
                setCategories(categoryData);
                console.log(categoryData);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <div>
            {restaurants.map((restaurant) => (
                <div className="cover-image" key={restaurant._id}>
                    <img src={`http://localhost:3000/uploads/${restaurant.restImage}`} alt="Cover Image" />

                </div>
            ))}
            <p>All Categories</p>
            {categories.map(category => (
                <div className="preview-list" key={category._id}>

                    <FaUtensils className="rest-icon" /><Link to={`/categories/${category._id}/subcategories`}>{category.name}</Link>
                </div>
            ))}
        </div>
    );
};

export default PreviewList;
