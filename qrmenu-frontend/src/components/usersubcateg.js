import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import Navbaruser from './navuser';
import './usersubcateg.css'
import backgroundImg from '../assets/photo.jpeg'
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';
const SubcategoryList = () => {
    const { categoryId } = useParams();
    const [subcategories, setSubcategories] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [restaurantData, setRestaurantData] = useState(null);

    useEffect(() => {
        const fetchSubcategories = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/categories/${categoryId}/subcategories`);
                const subcategoryData = response.data;
                setSubcategories(subcategoryData);
            } catch (error) {
                console.error('Error fetching subcategories:', error);
            }
        };

        fetchSubcategories();
    }, [categoryId]);
    useEffect(() => {
        const fetchRestaurantData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/restaurant');
                const restaurantDatas = response.data.message;
                setRestaurantData(restaurantDatas[0]);
                console.log(restaurantDatas, "data")
            } catch (error) {
                console.error('Error fetching restaurant data:', error);
            }
        };

        fetchRestaurantData();
    }, []);

    const handleToggleExpand = () => {
        setIsExpanded(prevExpanded => !prevExpanded);
    };
    //console.log(restaurantData, "img")

    // const backgroundImageUrl = restaurantData.coverImage;
    return (
        <div>
            <Navbaruser />

            <div
                className="restaurant-info">
                {restaurantData && (
                    <img className="background-image" src={`http://localhost:3000/uploads/${restaurantData.restImage}`} alt="Restaurant" />

                )}
                <div className="text-overlay">
                    {restaurantData && (
                        <div className="left-section">
                            <img src={`http://localhost:3000/uploads/${restaurantData.coverImage}`} alt="Restaurant" />
                            <div className="info-text">
                                <h3>{restaurantData.restname}</h3>
                                <p>{restaurantData.subtitle}</p>
                            </div>
                        </div>
                    )}
                    <div className="right-section">
                        <div className="time"><FaClock />{restaurantData && restaurantData.time}</div>
                        <div className="location"><FaMapMarkerAlt />{restaurantData && restaurantData.location}</div>
                    </div>
                </div>
            </div>
            <ul className={`subcategory-list ${isExpanded ? 'expanded' : ''}`}>
                {subcategories.map(subcategory => (
                    <li key={subcategory._id}>{subcategory.name}  <FaChevronDown onClick={handleToggleExpand} className={isExpanded ? 'expanded' : ''} /></li>
                ))}
            </ul>

        </div>

    );
};

export default SubcategoryList;
