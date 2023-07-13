import { signInWithGoogle } from "../firebase"

export default function SignIn() {
    return (
        <div>
            <h1>Sign In</h1>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    )
}