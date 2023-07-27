import React, { useEffect, useState } from "react";

import PostCard from "./PostCard";

export default function UsersPhoto({ userId }) {
  const [photos, setPhotos] = useState([]);

  //console.log("userId from useParams:", userId);

  useEffect(() => {
    const fetchPhotos = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/photos/user/${userId}`
      );
      if (!response.ok) {
        console.log("Response:", response);
        throw new Error("Failed to fetch photos");
      }
      const data = await response.json();
      setPhotos(data);
    };
    fetchPhotos();
  }, [userId]);
  console.log(photos);
  return (
    <div className="usersPhotos border-solid border-2 border-gray-700">
      <h1 className="heading"> User's Photos</h1>
      <div className="miniPosts">
        <div className="cards">
          {photos.map((photo) => (
            <PostCard
              key={photo.id}
              url={photo.urls}
              size="small"
              title={photo.title}
              postId={photo.id}
              removeButton={true}
              userLikedPhotos={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
