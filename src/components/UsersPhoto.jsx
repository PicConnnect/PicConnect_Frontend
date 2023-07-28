import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import Masonry from "react-masonry-css"

export default function UsersPhoto({ userId }) {
  const [photos, setPhotos] = useState([]); 

  
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

  let content;

  if (!photos) {
    content = <div>Loading...</div>;
  } else {
    content = photos.map((photo) => (
      <PostCard
        key={photo.id}
        url={photo.urls}
        size="small"
        title={photo.title}
        postId={photo.id}
        removeButton={true}
        userLikedPhotos={false}
      />
    ));
  }

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="usersPhotos mt-4">
      {/* <h1 className="heading"> User's Photos</h1> */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {content}
      </Masonry>
    </div>
  );
}
  
 // console.log(photos);
  // return (
  //   <div className="usersPhotos">
  //     <h1 className="heading"> User's Photos</h1>
  //     <div className="miniPosts">
  //       <div className="cards">
  //         {photos.map((photo) => (
  //           <PostCard
  //             key={photo.id}
  //             url={photo.urls}
  //             size="small"
  //             title={photo.title}
  //             postId={photo.id}
  //             removeButton={true}
  //             userLikedPhotos={false}
  //           />
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );
