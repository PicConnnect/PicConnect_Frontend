import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostCard = () => {
      const navigate = useNavigate();

      const handleViewClick = () => {
        navigate(`/view-post/1`);
      }


    return (
        <center>
            <div>
                <div className="card" style={{ width: '25rem' }}>
                    <div className="cardButton" onClick={()=>{handleViewClick()}} >
                        <img className="mainImage"
                            src="https://img.freepik.com/free-photo/colorful-heart-air-balloon-shape-collection-concept-isolated-color-background-beautiful-heart-ball-event_90220-1047.jpg"
                            // className="card-img-top"
                            alt="..."
                        />
                        <div className="card-body">
                            <p>Photo Title</p>
                            {/* <p className="leftCentered">#Tags</p> */}

                        </div>
                    </div>
                </div>

            </div>
        </center>

    );
};

export default PostCard;