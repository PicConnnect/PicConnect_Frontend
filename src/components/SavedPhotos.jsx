import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';
import axios from 'axios';
import { auth } from "../firebase/firebase";

export default function SavedPhotos() {
  const [likedPhotos, setLikedPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikedPhotos = async () => {
      const userId = auth.currentUser?.uid;
      try {
        const response = await axios.get(`http://localhost:8000/api/users/${userId}/likes`);
        const photoData = response.data;
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error('Invalid response format');
        }
        setLikedPhotos(photoData);
        //console.log(photoData);
      } catch (error) {
        console.error('Error fetching liked photos:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikedPhotos();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div  className="usersLikedPhotos border-solid border-2 border-gray-700" style={{height: '51%'}}>
        <h1 className="heading"> User's Liked Photos</h1>
        <div className="miniPosts">
            <div className="cards">
             {likedPhotos.map(photo => (
                <PostCard key={photo.id} url={photo.urls} size="small" removeButton={true} />
              ))}
            </div>
        </div>
      </div>
  );
}