import { signInWithGoogle, signInWithFacebook } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();

  const handleSignIn = async (signInMethod) => {
    try {
      await signInMethod(); //try to sign in with google
      navigate("/profile"); // If sign in is successful, navigate to the profile page
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };
  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={() => handleSignIn(signInWithGoogle)}>
        Sign in with Google
      </button>
      <br></br>
      <button onClick={() => handleSignIn(signInWithFacebook)}>
        Sign in with Facebook
      </button>
    </div>
  );
}
