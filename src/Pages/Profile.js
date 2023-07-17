import { useAuth } from "../hooks/useAuth";
import { useIfNotAuthenticated } from "../hooks/useIfNotAuthenticated";
import PostCard from "../components/PostCard";

export default function Profile() {
  // const user = useAuth();
  // //check to see if user logged in
  // const RedirectMessage = useIfNotAuthenticated();
  // //if not logged in
  // if (RedirectMessage) {
  //   return RedirectMessage;
  // }

  return (
    <div>
      <div className="leftContainer">
        {/* <div>This is profile of {user.displayName}</div> */}
        <div>Profile</div>
        <div class="userProfileContainer">
          <br></br>
          <img src="data:image/jpeg;base64,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"></img>
          <div>
            <p>Name</p>
            <p>Rating</p>
          </div>
        </div>
        <div class="badgeContainer">
          <p>Badge System yet to come</p>
        </div>

        <div className="aboutContainer">
          <h2>About Me</h2>
          <p>First Name: unknown</p>
          <p>Last Name: unknown</p>
          <p>Birthday: 01/01/2023</p>
          <p>Email: unknown@gmail.com</p>
          <p>Number: (123)-456-6789</p>
          <p>Address: Unknown Ave A 11212</p>

          <button className="editAboutMeButton">Edit</button>

        </div>

        <div className="signOutContainer">
          <button className="signOutButton">Sign Out</button>
        </div>
      </div>
      <div className="rightContainer">
        <div className="userPhotos">
          <h1 className="heading"> testing</h1>
        <PostCard url = "https://images.pexels.com/photos/433989/pexels-photo-433989.jpeg?cs=srgb&dl=pexels-pixabay-433989.jpg&fm=jpg"/>

        </div>
      </div>

    </div>



  );
}
