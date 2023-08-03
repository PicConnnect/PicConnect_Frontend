import "./App.css";
import "./../index.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, lazy ,Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { setUserData } from "../redux/userSlice";
import { auth, sendTokenToBackend, } from "../firebase/firebase";
import Home from "./../Pages/Home";
import Following from "./../Pages/Following";
import Upload from "./../Pages/Upload";
import Profile from "./../Pages/Profile";
import SignIn from "./../Pages/SignIn";
import SignUp from "./../Pages/SignUp";
import ViewPost from "../Pages/ViewPost";
import Footer from "../components/Footer";
import UsersPhoto from "../components/UsersPhoto";
import Follower from "./../Pages/Follower";
import OtherProfile from "../Pages/OtherProfile";
import Navbar from "../components/navbar";


function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, get the token and send it to backend
        const token = await user.getIdToken(true);
        sendTokenToBackend(token);

        // Dispatch the user data to Redux state
        dispatch(
          setUserData({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
          })
        );
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);
  return (
    <Router>
      <div className="App">
      <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/Following/:userId" element={<Following></Following>}></Route>
          <Route path="/Follower/:userId" element={<Follower></Follower>}></Route>
          <Route path="/Upload" element={<Upload></Upload>}></Route>
          <Route path="/OtherProfile/:userId" element={<OtherProfile></OtherProfile>}></Route>
          <Route path="/Profile" element={<Profile></Profile>}></Route>
          <Route path="/SignIn" element={<SignIn />}></Route>
          <Route path="/SignUp" element={<SignUp />}></Route>
          <Route path="/photos/:postId" element={<ViewPost />}></Route>
          {/* Delete line 40 uncomment line 42 when backend is working */}
          {/* <Route path="/viewPost/:postID" element={<ViewPost />}></Route> */}
        </Routes>
        </Suspense>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
