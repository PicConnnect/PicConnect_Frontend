import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserNameInBackend, fetchUser } from "../../redux/userSlice";

import ProfilePhoto from "./ProfilePhoto";

export default function AboutComponent( userId ) {
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.user.status);

  const items = useSelector((state) => state.user.items);
  //console.log(items);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (userStatus === "loading") {
    return <div>Loading...</div>; // or some other loading indicator
  }

  if (userStatus === "failed") {
    return <div>Error loading user data.</div>; // or some other error message
  }

  return (
    <div className="aboutContainer flex">
      <div className="flex items-center space-x-4 mt-4">
        <ProfilePhoto userId = {userId.userId.user}></ProfilePhoto>
      </div>
    </div>
  );
}