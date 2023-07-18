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
    <div style={{marginBottom: "1%"}}>
      <UserProfile user={user} />
    </div>
  );
}
