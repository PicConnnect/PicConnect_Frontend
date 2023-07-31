import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function FollowUser({ targetUser }) {
  const [isFollowingUser, setIsFollowingUser] = useState(false);
  const currentUser = useSelector((state) => state.user.value);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function checkIsFollowingUser(currentUserId, targetUserId) {
    if(currentUserId && targetUserId){
        try {
            const url = `${process.env.REACT_APP_BACKEND_URL}/api/users/Following/${currentUserId}`;
            const response = await axios.get(url);
            const userData = response.data;
            const followingUsers = userData?.following_id;
            const isFollowing = followingUsers?.some((user) => user?.id === targetUserId);
            return isFollowing;
        } catch (error) {
            console.error('Error occurred while fetching user data:', error);
            return false;
        }
    }
  }

  // Function to follow a user
const followUser = async (id, followerID) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/${followerID}/addFollower/${id}`);
      if(response.status === 200){
        setIsFollowingUser(true);
      }
      return response.data;
    } catch (error) {
      console.error('Error following user:', error);
      throw error;
    }
  };
  
  // Function to unfollow a user
  const unfollowUser = async (id, followerID) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/users/${followerID}/deleteFollower/${id}`);
      if(response.status === 200){
        setIsFollowingUser(false);
      }
      return response.data;
    } catch (error) {
      console.error('Error unfollowing user:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (targetUser && currentUser) {
      setIsLoading(true);
      setError(null);
      checkIsFollowingUser(currentUser?.uid, targetUser)
        .then((isFollowing) => {
          console.log("ll",isFollowing);
          setIsFollowingUser(isFollowing);
        })
        .catch((err) => {
          console.error('Error occurred:', err);
          setError('Error occurred while fetching data.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [targetUser, currentUser]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
            {isFollowingUser?  <button className="px-6 py-2 bg-blue-500 text-white rounded-md text-sm" onClick={()=> unfollowUser(currentUser?.uid, targetUser)}>Unfollow</button> :  
            <button className="px-6 py-2 bg-blue-500 text-white rounded-md text-sm" onClick={()=> followUser(currentUser?.uid, targetUser)}>Follow</button>
            }
        </div>
      )}
    </div>
  );
}
