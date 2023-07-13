import { signInWithGoogle } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await signInWithGoogle(); //try to sign in with google
      navigate("/profile"); // If sign in is successful, navigate to the profile page
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };
  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={handleSignIn}>Sign in with Google</button>
    </div>
  );
}
