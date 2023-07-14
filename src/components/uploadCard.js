import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UploadCard = ({ url }) => {
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState('');


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.addEventListener('load', function () {
            const imageUrl = reader.result;
            setImageUrl(imageUrl);
        });

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const [inputValues, setInputValues] = useState({
        author: '',
        tags: '',
        description: '',
        photoDetails: '',
        location: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform any necessary actions with the input values
        console.log(inputValues);
    };


    return (
        <center>
            <div class="form-group">
                <form
                    className='form-group'
                    style={{
                        backgroundColor: '#C8DDD3',
                        display: 'inline-block',
                        padding: '1rem 2rem',
                        borderRadius: '10px',
                        margin: '5px',
                    }}
                    onSubmit={handleSubmit}>
                    <center><legend><h3><b>Upload Registration</b></h3></legend></center>
                    <form>
                        <div className='formInput'>
                            <label htmlFor="">Upload Image</label>
                            <div class="imageInput">
                                <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
                            </div>
                        </div>

                    </form>
                    <div class="image-preview">
                        {imageUrl && <img src={imageUrl} style={{paddingTop: '5px', maxWidth: '700px', maxHeight: '700px' }} alt="Preview" />}
                    </div>

                    <div className="formInput">
                        <label class>Author</label>
                        <div>
                            <input
                                type="text"
                                name="author"
                                value={inputValues.author}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="formInput">
                        <label>Tags</label>
                        <div>
                            <input
                                type="text"
                                name="tags"
                                value={inputValues.tags}
                                onChange={handleInputChange}
                            />
                        </div>

                    </div>

                    <div className='formInput'>
                        <label>Description</label>
                        <div>
                            <input
                                type="text"
                                name="description"
                                value={inputValues.description}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className='formInput'>
                        <label>Camera Details:</label>
                        <div>
                            <input
                                type="text"
                                name="photoDetails"
                                value={inputValues.photoDetails}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label>Location</label>
                        <div>
                            <input
                                type="text"
                                name="location"
                                value={inputValues.location}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div>
                        <input className = "submitButton" type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        </center>

    );
};

export default UploadCard;
