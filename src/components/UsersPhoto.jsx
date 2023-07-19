import React, { useEffect, useState } from "react";

import PostCard from "./PostCard";

export default function UsersPhoto({ userId }) {
  const [photos, setPhotos] = useState([]);

  //console.log("userId from useParams:", userId);

  useEffect(() => {
    const fetchPhotos = async () => {
      const response = await fetch(
        `http://localhost:8000/api/photos/user/${userId}`
      );
      if (!response.ok) {
        console.log('Response:', response);
        throw new Error('Failed to fetch photos');
    }
      const data = await response.json();
      setPhotos(data);
    };
    fetchPhotos();
  }, [userId]);
  console.log(photos);
  return (
    <div className="bg-[#D9D9D9] mr-4">
      <h1 className="heading"> User's Photos</h1>
      <div className="overflow-y-auto h-96">
        <div className="flex flex-wrap justify-between">
          {photos.map((photo) => (
            <PostCard
              key={photo.id}
              url={photo.urls}
              size="small"
              title ={photo.title}
              postId={photo.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
