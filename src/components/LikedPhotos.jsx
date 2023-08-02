import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "./PostCard";
//import axios from 'axios';
import { auth } from "../firebase/firebase";
import { fetchUserLikes, fetchPosts } from "../redux/postSlice";
import Masonry from "react-masonry-css";

export default function LikedPhotos() {

  const dispatch = useDispatch();
  const userId = auth.currentUser?.uid;

  const [loading, setLoading] = useState(true);

  const likedPhotoIds = useSelector((state) => state.posts.likedPhotoIds);
  const allPosts = useSelector((state) => state.posts.posts);

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
  }, [userId]);

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
              likeButton={true}
              userLikedPhotos={true}
            />
          ))}
        </Masonry>
      </div>
    );
  }
}
