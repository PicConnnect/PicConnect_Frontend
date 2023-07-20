import React from "react";
import Follower from "../Follower";

const Following = () => {
  return (
    <div className="bg-[#D9D9D9] mb-2 flex flex-col items-center justify-center p-2">
      <h1 className="heading">Following</h1>
      <div className="miniPosts" style={{height:"378px"}}>
        <Follower following={false} follower={true} />
        <Follower following={false} follower={true} />
        <Follower following={false} follower={true} />
        <Follower following={false} follower={true} />
        <Follower following={false} follower={true} />
        <Follower following={false} follower={true} />
        <Follower following={false} follower={true} />
        <Follower following={false} follower={true} />
      </div>
    </div>
  );
};
export default Following;
