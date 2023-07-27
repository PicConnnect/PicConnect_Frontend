import React from "react";
import SingleFollowerComponent from "./SingleFollowerComponent";

const FollowersList = () => {
  return (
    <div className="mb-2 items-center justify-center p-2 border-solid border-2 border-gray-700" style={{ height:"100%", width:"100%"}}>
      <h1 className="heading" style={{padding:"5px"}}>Followers</h1>
      <div className="miniPosts" style={{height:"650px"}}>
        <SingleFollowerComponent following={true} follower={false} />
        <SingleFollowerComponent following={true} follower={false} />
        <SingleFollowerComponent following={true} follower={false} />
        <SingleFollowerComponent following={true} follower={false} />
        <SingleFollowerComponent following={true} follower={false} />
        <SingleFollowerComponent following={true} follower={false} />
        <SingleFollowerComponent following={true} follower={false} />
      </div>
          </div>
  );
};

export default FollowersList;
