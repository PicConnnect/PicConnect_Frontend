import { useAuth } from "../hooks/useAuth";
import { useIfNotAuthenticated } from "../hooks/useIfNotAuthenticated";
import { useParams } from 'react-router-dom';
import OtherUserProfile from "../components/OtherUserProfile";

export default function OtherProfile() {

    const { userId } = useParams();
//   const user = useAuth();
//   //check to see if user logged in
//   const notLoggedInMessage = useIfNotAuthenticated();
//   //if not logged in

  return (
    <div style={{marginBottom: '5%'}}>
      <OtherUserProfile userId={userId} />
    </div>
  );
}