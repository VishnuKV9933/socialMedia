import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLogin from "./UserPages/UserLogin";
import UserSignup from "./UserPages/UserSignup";
import AdminPage from "./AdminPages/AdminLogin";
import Home from "./UserPages/Home";

import "react-toastify/dist/ReactToastify.css";
import AdminHomePage from "./AdminPages/AdminHomePage";
import UserOtpLogin from "./UserPages/UserOtpLogin";
import Profile from "./UserPages/Profile";

import LayOut from "./LayOut";
import PeopleProfile from "./UserPages/PeopleProfile";
import Chat from "./UserPages/Chat";
import AdminPost from "./AdminPages/AdminPost";
import Notification from "./UserPages/Notification";
import AdminDashBoard from "./AdminPages/AdminDashBoard";
import Protect from "./Protect";
import Orm from "./UserPages/Orm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Protect />}>
          <Route element={<LayOut />}>
            <Route exact path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/peopleprofile/:id" element={<PeopleProfile />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/orm" element={<Orm />} />
          </Route>
        </Route>

        <Route exact path="/usersignup" element={<UserSignup />} />
        <Route exact path="/userlogin" element={<UserLogin />} />
        <Route exact path="/userotplogin" element={<UserOtpLogin />} />
        <Route exact path="/userotplogin" element={<UserOtpLogin />} />
        <Route exact path="/adminlogin" element={<AdminPage />} />
        <Route exact path="/admindashboard" element={<AdminDashBoard />} />
        <Route exact path="/adminhome" element={<AdminHomePage />} />
        <Route exact path="/adminpostmangement" element={<AdminPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

{
  /* <Route  path="/peopleprofile/:id" element={userId?<PeopleProfile/>:<Navigate to="userlogin"/>} />  */
}
