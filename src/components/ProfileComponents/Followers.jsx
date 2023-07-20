import React from "react";
import Follower from "../Follower";

const Followers = () => {
  return (
    <div className="bg-[#D9D9D9] mb-2 flex flex-col items-center justify-center p-2">
      <h1 className="heading">Followers</h1>
      <div className="miniPosts" style={{height:"378px"}}>
        <Follower following={true} follower={false} />
        <Follower following={true} follower={false} />
        <Follower following={true} follower={false} />
        <Follower following={true} follower={false} />
        <Follower following={true} follower={false} />
        <Follower following={true} follower={false} />
        <Follower following={true} follower={false} />
      </div>
    </div>
  );
};

export default Followers;
