import React from 'react'
import Follower from '../components/Follower'
import { useIfNotAuthenticated } from '../hooks/useIfNotAuthenticated'
import { useAuth } from "../hooks/useAuth";

export default function Following() {
  const user = useAuth();
  //check to see if user logged in
  const notLoggedInMessage = useIfNotAuthenticated("Following");
  //if not logged in
  if (notLoggedInMessage) {
    return notLoggedInMessage;
  }
  return (
    <div style={{marginBottom: '5%'}}>
        <div className='cards'>
          <Follower />
          <Follower />
        </div>
    </div>
  )
}
