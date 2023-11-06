import React, { useEffect, useState } from "react";
import SingleFollowingComponent from "./SingleFollowingComponent";
import axios from "axios";

const FollowingsList = () => {
  const [followingList, setFollowingList] = useState([]);
  const currentPath = window.location.pathname;
  const userId = currentPath.substring(currentPath.lastIndexOf("/") + 1);
  const fetchFollowingList = () => axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/Following/${userId}`).then((response) => {
    if(response.status >= 200 && response.status < 300){
      console.log('Request was successful!');
      console.log('Response data:', response.data.following_id);
      setFollowingList(response.data.following_id);
    }else{
      console.log('Request was not successful. Status code:', response.status);
    }
  }).catch((error) => {
    console.error('An error occurred:', error.message);
  })

  useEffect(() => {
    fetchFollowingList();
    console.log("this is useeffec", followingList);
  },[])
  return (
    <div className=" mb-2  items-center justify-center p-2 border-solid border-2 border-gray-700" style={{ height:"100%", width:"100%"}}>
      <h1 className="heading" style={{padding:"5px"}}>{followingList.length > 0? `Following ${followingList.length}`: 'You are not following anyone.'}</h1>
      <div className="miniPosts" style={{height:"650px"}}>
        {
          followingList.map((usersFollowed) =>{
            return <SingleFollowingComponent key={usersFollowed.id} data={usersFollowed} currentUserId={userId} fetchFollowingList={fetchFollowingList}></SingleFollowingComponent>
          })
        }
      </div>
    </div>
  );
};
export default FollowingsList;
