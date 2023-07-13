import React, { useRef, useState } from 'react';
import "./img.css"
const FileUpload = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const fileInputRef = useRef(null);

    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];
    //     // Handle the selected file
    //     console.log('Selected file:', file);
    //     setSelectedImage(URL.createObjectURL(file));
    // };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
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
                onChange={(event) => {
                    console.log(event.target.files[0]);
                    setSelectedImage(event.target.files[0]);
                }}
            />
            <button className="restupload" onClick={handleButtonClick}>Upload Restaurant Image</button>
        </div>
    );
};

export default FileUpload;
