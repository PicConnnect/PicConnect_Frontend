import React, { useEffect, useState } from 'react';
import axios from 'axios';

async function CheckIsFollowingUser(currentUserId, targetUserId) {
    try {
        const url = `http://localhost:8000/api/users/Following/${currentUserId}`;

        // Make the API call using Axios
        const response = await axios.get(url);
        const userData = response.data;
    
        // Check if the current user is following the target user
        const followingUsers = userData?.following_id;
        for (const user of followingUsers) {
            if (user?.id === targetUserId) {
                return true;
            }
        }
    
        return false;
    } catch (error) {
      console.error("Error occurred while fetching user data:", error);
      return false;
    }
}

export default function FollowUser({targetUser, currentUser}) {
    const[isFollowingUser, setIsFollowingUser] = useState(false);
    useEffect(() => {
        CheckIsFollowingUser(currentUser, targetUser).then(isFollowing => {
            setIsFollowingUser(isFollowing);
            console.log(isFollowing);
        })
        .catch(err => {
            console.error("Error occurred:", err);
        });
    },[])
    
    return (
        <div>
            {isFollowingUser? <button className="px-6 py-2 bg-blue-500 text-white rounded-md text-sm"> UnFollow</button> : <button className="px-6 py-2 bg-blue-500 text-white rounded-md text-sm"> Follow</button>}
        </div>
    )
}
