import { useState } from 'react';
import "./restaurantform.css";
import FileUpload from './restimage';
import CoverUpload from './coverimg';
import axios from 'axios';
import { Link } from 'react-router-dom'
function RestaurantForm() {
    const [inputs, setInputs] = useState({});
    const [coverImage, setCoverImage] = useState(null);
    const [restImage, setRestImage] = useState(null);

    const handleChange = (event) => {
        setInputs((values) => ({ ...values, [event.target.name]: event.target.value }));
    };

    const handleImageSelect = (event) => {
        setCoverImage(event.target.files[0]);
    };

    const handleImageSelect2 = (event) => {
        setRestImage(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('restname', inputs.restname);
        formData.append('slug', inputs.slug);
        formData.append('subtitle', inputs.subtitle);
        formData.append('time', inputs.time);
        formData.append('description', inputs.description);
        formData.append('location', inputs.location);
        formData.append('waiter', inputs.waiter);

        if (coverImage) {
            formData.append('coverImage', coverImage);
        }
        if (restImage) {
            formData.append('restImage', restImage);
        }

        axios.post('http://localhost:3000/save-restaurant', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="main">
            <h4>Manage Restaurant</h4>

            <div className="container">
                <nav className="heading">
                    <p>Restaurant Information</p>
                    <Link to="/preview" className="livePreview-button" >Live Preview</Link>
                </nav>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <label>
                            Restaurant Name
                            <input
                                type="text"
                                placeholder="Thandoor Hut"
                                name="restname"
                                value={inputs.restname || ""}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Restaurant Slug
                            <input
                                type="text"
                                placeholder="your-dining-partner"
                                name="slug"
                                value={inputs.slug || ""}
                                onChange={handleChange}
                            />
                        </label>
                        <p>Use only alphanumeric value without space. (Hyphen(-) allowed)</p>
                        <div className="inputPair">
                            <label>
                                Restaurant Sub Title
                                <input
                                    type="text"
                                    placeholder="non veg"
                                    name="subtitle"
                                    value={inputs.subtitle || ""}
                                    onChange={handleChange}
                                />
                            </label>

                            <label>
                                Restaurant Timing
                                <input

                                    placeholder="9.00 am to 10.00 pm"
                                    name="time"
                                    value={inputs.time || ""}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <label>
                            Restaurant Description
                            <input
                                type="text"
                                name="description"
                                value={inputs.description || ""}
                                onChange={handleChange}
                            />
                        </label>

                        <div className="image-section">
                            <div className="file">
                                <label htmlFor="coverImage">Cover Image</label>
                                <input
                                    type="file"
                                    id="coverImage"
                                    name="coverImage"
                                    accept="image/*"
                                    onChange={handleImageSelect}
                                />
                            </div>
                            <div className="cover">
                                <label htmlFor="restImage">Restaurant Image</label>
                                <input
                                    type="file"
                                    id="restImage"
                                    name="restImage"
                                    accept="image/*"
                                    onChange={handleImageSelect2}
                                />
                            </div>
                        </div>

                        <label>
                            Restaurant Location
                            <input
                                type="text"
                                name="location"
                                value={inputs.location || ""}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Allow Call to Waiter
                            <select name="waiter" value={inputs.waiter || ""} onChange={handleChange}>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </label>

                        <button className="submit">save</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RestaurantForm;
