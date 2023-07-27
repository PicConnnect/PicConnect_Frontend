import React from "react";
import axios from "axios";

const SingleFollowingComponent = ({data, currentUserId, fetchFollowingList}) => {
  const followingUserId = data.id; 
  const unfollow = (() => {
    if(data){
      try {
        axios.delete(`http://localhost:8000/api/users/${followingUserId}/deleteFollower/${currentUserId}`)
        .then(() => {
          fetchFollowingList();
        }).catch(() => {
          console.error();
        })
      } catch (error) {
        console.log(error);
      }
    }
  })
  const handleOnClick = (() => {
    unfollow();
  });
  
  return (
    <div>
      <div className="followerContainer">
        <div className="followerContainerImg" style={{float:"right"}}>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHoAAAB6CAMAAABHh7fWAAAAMFBMVEXk5ueutLfBxsjn6eqrsbTIzM7Q09XV2Nrb3t/g4uPY29y1ur2orrG9wsS6v8GxtroaemS9AAAClUlEQVRoge2a0XKEIAxFwQREUfz/vy3qtrttFRM30dkZ7lPfTi8EiDdrTFVVVVVVVVVVVVXVpwgATJ8VYP7rSm5wCYdVdvTmKjgYNyHapxBTewU8g39xH/TYq8Ohj//BC7zpdOHgtsEze1I1DuMueYZ7PTbsLPa3BrVqOyJntpJvaI7Iec1VfIM/Jls7dQrojgDOtkd525AoplWWvKWR85JLoyESyfl0C6PJprNkbcNIJ2MrijYM01a0yGln+se2KJpwkT019JJoBji7dpK2BxZ7FCT3PHSUI/OqLEsQvd8WbQrvQw9yL+cHofFGtBj5zgo34bZzbYCHbiTRE4cseoczX64gR+b1R7LvtQEGGhtZNGPFUbJTyOrp6CjciEMim5buw+m2pU3Td1t6p2cRvzRly3sVkM625PX9wqY8neGuRAPV8qtydqWZIB351vO8sPf7FYzaSWWXttsGdKrcFd7+T+4QR6XS/sM2PtmXYBpxai4BL3DofDNl5vwPRNdeNgV40DM/hM5cOvtYqX3b+lltv/L1qSZ4l9a1fspOyfm+U+PP06WVunm2ll1XwefCGuM29ZU/Jd+JFl3221hil4KY5OZeAD6yPnzQOpE7dXuudWj9/UvmFHilj+85B0/d4i3n7vyeQyAm/3vweLZ1eMfyN/zcl/ZRN0Q0zt9xMG9bfsC5XRMEGbBlT/xo7T5RrHwDWjkwjw1BlMyaLguT6SM/+jSNwaaRmYEoTZQPfmAOG4gilZrCci/sw6CaHQKT0cczPyXTxyGLmumMTmXbGgfrR+XdZoSCbJWLnBc+c1X8KQEvcmertOK0WO6siump5DO9gS4kiTrX91OF4yXSCe4LC5MJcI2uCiUOyiqUWVVVVdWn6guTZh4+pagl5AAAAABJRU5ErkJggg=="></img>
        </div>
        <div style={{flex:"2", textAlign: "center"}}>
          <h1>{data.name}</h1>
        </div>
        <div style={{flex:"3", textAlign: "center"}}>
          <h2>Likes Number</h2>
        </div>
        <div>
          <button onClick={handleOnClick}>Unfollow</button>
        </div>
      </div>
    </div>
  );
};

export default SingleFollowingComponent;