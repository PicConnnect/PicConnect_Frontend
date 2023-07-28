import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from './PostCard';
//import axios from 'axios';
import { auth } from "../firebase/firebase";
import { fetchUserLikes } from '../redux/postSlice';

export default function SavedPhotos() {
  // const [likedPhotos, setLikedPhotos] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const userId = auth.currentUser?.uid;


  const likedPhotoIds = useSelector((state) => state.posts.likedPhotoIds);
  console.log(likedPhotoIds)
  const allPosts = useSelector((state) => state.posts.posts);
  // const likesStatus = useSelector((state) => state.posts.likesStatus);
  // console.log(likesStatus)

  const likedPosts = allPosts.filter((post) => likedPhotoIds.includes(post.id));

  useEffect(() => {
    dispatch(fetchUserLikes(userId));
  }, [dispatch, userId]);

  console.log(`likedPhotoIds: ${JSON.stringify(likedPhotoIds)}`);
  console.log(`likedPosts: ${JSON.stringify(likedPosts)}`);


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