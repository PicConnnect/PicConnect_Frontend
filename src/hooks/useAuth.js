import { useState, useEffect } from "react";
import { auth } from "../firebase/firebase";

export function useAuth() {
  //initial state null (not logged in)
  const [user, setUser] = useState(null);
  //runs when the component mounts
  useEffect(() => {
    //trigger when auth state changes (user logs in or out)
    const unsubscribe = auth.onAuthStateChanged((user) => {
      //set user state to new user (null if logged out)
      setUser(user);
    });

    //cleanup (when component unmounts) to avoid memory leaks
    return () => unsubscribe();
  }, []);

  return user;
}
