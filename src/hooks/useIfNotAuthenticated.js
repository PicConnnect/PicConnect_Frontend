import { Link } from "react-router-dom";
import { useAuth } from "./useAuth";

export function useIfNotAuthenticated() {
  const user = useAuth();

  if (!user) {
    return (
      <div>
        <p>You're not logged in! Please <Link to="/signin">Sign In</Link> or 
        <Link to="/signup"> Sign Up</Link> to continue.</p>
      </div>
    );
  }

  return null;
}