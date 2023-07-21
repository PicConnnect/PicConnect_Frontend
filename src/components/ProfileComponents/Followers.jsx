import React from "react";
import Follower from "../Follower";

const Followers = () => {
  return (
    <div className="bg-[#D9D9D9] mb-2 items-center justify-center p-2" style={{background:"#D9D9D9", height:"100%", width:"100%"}}>
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
