import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "./PostCard";
//import axios from 'axios';
import { auth } from "../firebase/firebase";
import { fetchUserLikes, fetchPosts } from "../redux/postSlice";
import Masonry from "react-masonry-css";

export default function SavedPhotos({removeButton}) {
  // const [likedPhotos, setLikedPhotos] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const userId = auth.currentUser?.uid;

  const [loading, setLoading] = useState(true);

  const likedPhotoIds = useSelector((state) => state.posts.likedPhotoIds);
  console.log(likedPhotoIds);
  const allPosts = useSelector((state) => state.posts.posts);
  console.log(allPosts);
  // const likesStatus = useSelector((state) => state.posts.likesStatus);
  // console.log(likesStatus)

  const likedPosts = allPosts.filter((post) => likedPhotoIds.includes(post.id));

  const loadData = async () => {
    if (userId) {
      await dispatch(fetchPosts());
      await dispatch(fetchUserLikes(userId));
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [loadData, userId]);

  console.log(`likedPhotoIds: ${JSON.stringify(likedPhotoIds)}`);
  console.log(`likedPosts: ${JSON.stringify(likedPosts)}`);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
    500: 1,
  };

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="usersLikedPhotos mt-4">
        {/* <h1 className="heading">User's Liked Photos</h1> */}
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {likedPosts.map((photo) => (
            <PostCard
              key={photo.id}
              postId={photo.id}
              userId={userId}
              url={photo.urls}
              size="small"
              removeButton={removeButton}
              userLikedPhotos={true}
            />
          ))}
        </Masonry>
      </div>
    );
  }

  // return (
  //   <div  className="usersLikedPhotos">
  //       <h1 className="heading"> User's Liked Photos</h1>
  //       <div className="miniPosts">
  //           <div className="cards">
  //             {likedPosts.map(photo => (
  //               <PostCard key={photo.id} postId={photo.id} userId={userId} url={photo.urls} size="small" removeButton={true} userLikedPhotos={true} />
  //             ))}
  //           </div>
  //       </div>
  //     </div>
  // );
}
