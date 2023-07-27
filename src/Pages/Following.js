import React from "react";
import { useIfNotAuthenticated } from "../hooks/useIfNotAuthenticated";
import { useAuth } from "../hooks/useAuth";
import FollowingsList from "../components/Follows/Following/FollowingsList";

export default function Following({ follower }) {
  follower = false;
  const user = useAuth();
  //check to see if user logged in
  const notLoggedInMessage = useIfNotAuthenticated("Following");
  //if not logged in
  if (notLoggedInMessage) {
    return notLoggedInMessage;
  }
  return (
    <div
      style={{ display: "flex", justifyContent: "center", alignItems:"center", marginBottom: "5%"}}
    >
      <div style={{ width: "40%" }}>
          <div style={{ width: "100%" }}>
            <FollowingsList/>
          </div>
      </div>
    </div>
  );
}
