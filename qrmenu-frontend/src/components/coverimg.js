import React, { useRef, useState } from 'react';
import "./img.css";

const CoverUpload = ({ onImageSelect }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
        onImageSelect(file);
    };

    return (
        <div>
            {selectedImage && (
                <div>
                    <img
                        alt="not found"
                        width={"250px"}
                        src={URL.createObjectURL(selectedImage)}
                    />
                    <br />
                    <button onClick={() => setSelectedImage(null)}>Remove</button>
                </div>
            )}
            <input
                type="file"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleImageSelect}
            />
            <button className="restupload" onClick={handleButtonClick}>Upload Cover Image</button>
        </div>
    );
};

export default CoverUpload;
