import React, {useState} from 'react'

export default function AboutComponent() {
    const [isEditing, setIsEditing] = useState(false);

    //user data in to be converted in json when sedning to database
    const [formData, setFormData] = useState({
        firstName: 'sample data',
        lastName: 'sample data',
        birthday: 'sample data',
        email: 'sample data',
        phoneNumber: 'sample data',
        address: 'sample data'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setIsEditing(false);
    };

    //check if user is editing profile
    const toggleEditing = () => {
        setIsEditing((prevIsEditing) => !prevIsEditing);
    };
    
    return (
        <div className="bg-[#D9D9D9] mb-2 flex flex-col items-center justify-center p-2 overflow-hidden">
            <form onSubmit={handleSubmit}>
                <div className="mb-3 flex items-center gap-40">
                    <label htmlFor="firstName">First Name: </label>
                    {isEditing ? (
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                    ) : (
                        <span>{formData.firstName}</span>
                    )}
                </div>
                <div className="mb-3 flex items-center gap-40">
                    <label htmlFor="lastName" >Last Name: </label>
                    {isEditing ? (
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    ) : (
                        <span>{formData.lastName}</span>
                    )}
                </div>
                <div className="mb-3 flex items-center gap-40">
                    <label htmlFor="birthday">Birthday: </label>
                    <div className="ml-4">
                        {isEditing ? (
                            <input type="date" className="flex items-center justify-center" name="birthday" value={formData.birthday} onChange={handleChange} required/>
                        ) : (
                            <span>{formData.birthday}</span>
                        )}
                    </div>
                </div>
                <div className="mb-3 flex items-center gap-40">
                    <label htmlFor="email" >Email: </label>
                    <div className="ml-10">
                        {isEditing ? (
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                        ) : (
                            <span>{formData.email}</span>
                        )}
                    </div>
                </div>
                <div className="mb-3 flex items-center gap-40">
                    <label htmlFor="phone" className="form-label">Telephone: </label>
                    <div className="ml-1">
                        {isEditing ? (
                            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                        ) : (
                            <span>{formData.phoneNumber}</span>
                        )}
                    </div>
                </div>
                <div className="mb-3 flex items-center gap-40">
                    <label htmlFor="address" >Address:</label>
                    <div className="ml-5">
                        {isEditing ? (
                            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                        ) : (
                            <span>{formData.address}</span>
                        )}
                    </div>
                </div>
                {
                    isEditing? 
                    <div className="flex justify-center justify-evenly">
                        {isEditing? <button type="submit" disabled={!isEditing}>Save</button>: <div></div>}
                        <button type="button" nClick={toggleEditing}>{isEditing ? 'Cancel' : 'Edit'}</button>
                    </div>:
                    <div className="flex justify-center justify-evenly">
                        <button type="button" onClick={toggleEditing}>{isEditing ? 'Cancel' : 'Edit'}</button>
                    </div>
                }
            </form>
        </div>
    )
}
