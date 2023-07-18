import React,{useState} from 'react'

export default function ProfilePhoto() {
    const [isEditingImage, setIsEditingImage] = useState(false);
    const makeImageEditable = () => {
        setIsEditingImage(true);
    }

    const saveImage = () => {
        setIsEditingImage(false);
    }

    const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1483909796554-bb0051ab60ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybCUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80");

    const handleFileChange = (event) => {
        //first file in the list
        const file = event.target.files[0];
        //if file selected,
        if (file) {
            const reader = new FileReader();
            //when FileReader finishes reading the file data, this will be executed
            reader.onload = function (e) {
                //data url representing the file's data
                setImageUrl(e.target.result);
            };
            //can use this as a source in an img tag to preveiw the picture
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className="bg-[#D9D9D9] mb-2 flex flex-col items-center justify-center p-2">
            <div> 
                {isEditingImage ? (
                    <div>
                        <div>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="w-96 h-96 rounded-full bg-white">
                            <img src={imageUrl} alt="NO PHOTO" className="w-96 h-96 rounded-full"/>
                        </div>
                    </div>

                ) : (
                    <div className="w-96 h-96 rounded-full bg-white object-contain">
                        <img src={imageUrl} alt="NO PHOTO" className="w-96 h-96 rounded-full"/>
                    </div>
                )}
                <button onClick={isEditingImage ? saveImage : makeImageEditable}>
                    {isEditingImage ? 'Save' : 'Edit'}
                </button>
            </div>
            <br></br>
            {/* here */}
            <div>
                <p>Name</p>
                <p>Rating</p>
            </div>
        </div>
    )
}
