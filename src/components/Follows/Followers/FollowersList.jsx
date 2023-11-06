import React,{ useEffect, useState } from "react";
import SingleFollowerComponent from "./SingleFollowerComponent";
import axios from "axios";

const FollowersList = () => {
  const [followerList, setFollowerList] = useState([]);
  const currentPath = window.location.pathname;
  const userId = currentPath.substring(currentPath.lastIndexOf("/") + 1);
  const fetchFollowerList = () => axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/Followers/${userId}`).then((response) => {
    if(response.status >= 200 && response.status < 300){
      console.log('Request was successful!');
      console.log('Response data:', response.data.follower_id);
      setFollowerList(response.data.follower_id);
    }else{
      console.log('Request was not successful. Status code:', response.status);
    }
  }).catch((error) => {
    console.error('An error occurred:', error.message);
  })

  useEffect(() => {
    fetchFollowerList();
    console.log("this is useeffec", followerList);
  },[])
  return (
    <div className="mb-2 items-center justify-center p-2 border-solid border-2 border-gray-700" style={{ height:"100%", width:"100%"}}>
      <h1 className="heading" style={{padding:"5px"}}>{followerList.length > 0? `Followers ${followerList.length}`: 'You have no followers'}</h1>
      <div className="miniPosts" style={{height:"650px"}}>
        {
          followerList.map((usersFollower) =>{
            return <SingleFollowerComponent key={usersFollower.id} data={usersFollower} currentUserId={userId} fetchFollowerList={fetchFollowerList}/>
          })
        }
      </div>
    </div>
  );
};

export default FollowersList;
