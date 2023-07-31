import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserNameInBackend, fetchUser } from "../../redux/userSlice";

import ProfilePhoto from "./ProfilePhoto";

export default function AboutComponent( {userId} ) {
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
console.log("AboutComp userId: ", userId)
  return (
    <div>
      <div>
        <ProfilePhoto userId = {userId}></ProfilePhoto>
      </div>
    </div>
  );
}