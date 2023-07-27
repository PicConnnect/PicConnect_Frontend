import React from "react";
import SingleFollowingComponent from "./SingleFollowingComponent";

const FollowingsList = () => {
  return (
    <div className=" mb-2  items-center justify-center p-2 border-solid border-2 border-gray-700" style={{ height:"100%", width:"100%"}}>
      <h1 className="heading" style={{padding:"5px"}}>Following</h1>
      <div className="miniPosts" style={{height:"650px"}}>
        <SingleFollowingComponent following={false} follower={true} />
        <SingleFollowingComponent following={false} follower={true} />
        <SingleFollowingComponent following={false} follower={true} />
        <SingleFollowingComponent following={false} follower={true} />
      </div>
    </div>
  );
};
export default FollowingsList;
