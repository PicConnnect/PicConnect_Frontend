import { useAuth } from "../hooks/useAuth";
import { useIfNotAuthenticated } from "../hooks/useIfNotAuthenticated";
import UserProfile from "../components/UserProfile";
import Footer from "../components/Footer"

export default function Profile() {
  const user = useAuth();
  //check to see if user logged in
  const notLoggedInMessage = useIfNotAuthenticated();
  //if not logged in
  if (notLoggedInMessage) {
    return notLoggedInMessage;
  }

  return (
    <div>
      {/* <div>This is profile of {user.displayName}</div> */}
      <h1 className="heading">Profile</h1>
      <UserProfile user={user} />
      <Footer />
    </div>



  );
}
