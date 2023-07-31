import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../../redux/userSlice";

import ProfilePhoto from "./ProfilePhoto";

export default function AboutComponent({removeButton}) {
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.user.status);

  const items = useSelector((state) => state.user.items);

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
    <div>
      <ProfilePhoto removeButton = {removeButton}></ProfilePhoto>
    </div>
  );
}