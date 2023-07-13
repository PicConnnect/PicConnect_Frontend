import './App.css';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from "./Pages/Home";
import Following from './Pages/Following';
import Upload from './Pages/Upload';
import Profile from './Pages/Profile';
function App() {
  return (
   <Router>
      <div className="App">
          <nav className="bg-[#C8DDD3] p-4">
            <ul className="flex justify-between font-bold">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/Following">Following</Link>
              </li>
              <li>
                <Link to="/Upload">Upload</Link>
              </li>
              <li>
                <Link to="/Profile">Profile</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/Following" element={<Following></Following>}></Route>
            <Route path="/Upload" element={<Upload></Upload>}></Route>
            <Route path="/Profile" element={<Profile></Profile>}></Route>
          </Routes>
          
      </div>
   </Router>
  );
}

export default App;
