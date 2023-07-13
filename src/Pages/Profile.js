import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { Link } from 'react-router-dom';

export default function Profile() {
  //initial state null (not logged in)
  const [user, setUser] = useState(null);
  //runs when the component mounts 
  useEffect(() => {
    //trigger when auth state changes (user logs in or out)
    const unsubscribeFromAuthChange = auth.onAuthStateChanged(user => {
      //set user state to new user (null if logged out)
      setUser(user);
    });
    //cleanup (when component unmounts) to avoid memory leaks
    return () => unsubscribeFromAuthChange();
  }, [])
  //handle user not logged in
  if (!user) {
    return (
      <div>
        <p>You're not logged in! Please <Link to="/signin">Sign In</Link> or 
        <Link to="/signup"> Sign Up</Link> to continue.</p>
      </div>
    )
  }

  return (
    <div>
      This is profile of {user.displayName}
    </div>
  )

}
