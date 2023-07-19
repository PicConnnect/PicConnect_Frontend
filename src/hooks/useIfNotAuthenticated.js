import { Link } from "react-router-dom";
import { useAuth } from "./useAuth";

export function useIfNotAuthenticated(pageName) {
  const user = useAuth();
  //check if user is not logged in and assign message to specific pages
  if (!user) {
    return (
      <div>
        {
          pageName === "Following"? 
          <div>
            <h1 className="text-xl mb-5 mt-5 text-red-600">Couldn't See Following</h1>
            <p>It looks like you are trying to see the people you follow.</p>
            <p>To be able to view your following list you have to<Link to="/signin" className="text-blue-500"> Log In.</Link></p>
            <p>If you don't have an account<Link to="/signup" className="text-blue-500"> Sign Up</Link> to Continue.</p>
          </div>:
          pageName === "Upload"?
          <div>
            <h1 className="text-xl mb-5 mt-5 text-red-600">Can't Upload Photo</h1>
            <p>It looks like you are trying to upload a photo.</p>
            <p>To be able to upload a photo you have to<Link to="/signin" className="text-blue-500"> Log In.</Link></p>
            <p>If you don't have an account<Link to="/signup" className="text-blue-500"> Sign Up</Link> to Continue.</p>
          </div>:
          <div>
            <h1 className="text-xl mb-5 mt-5 text-red-600">Can't Display Your Profile</h1>
            <p>It looks like you are trying to see your profile.</p>
            <p>To be able to view your profile you have to<Link to="/signin" className="text-blue-500"> Log In.</Link></p>
            <p>If you don't have an account<Link to="/signup" className="text-blue-500"> Sign Up</Link> to Continue.</p>
          </div>
        }
      </div>
    );
  }

  return null;
}