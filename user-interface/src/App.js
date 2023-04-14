import './App.css';
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom"
import UserLogin from './UserPages/UserLogin'
import UserSignup from './UserPages/UserSignup'
import Orm from './UserPages/Orm';
import AdminPage from './AdminPages/AdminLogin';
import Home from './UserPages/Home'

import "react-toastify/dist/ReactToastify.css" 
import AdminHomePage from './AdminPages/AdminHomePage';
import UserOtpLogin from './UserPages/UserOtpLogin';
import Profile from './UserPages/Profile';

import LayOut from './LayOut';
import PeopleProfile from './UserPages/PeopleProfile';



function App() {

  const userId = JSON.parse(localStorage.getItem('userId'));
  
 
  return (
   <BrowserRouter>
   <Routes>
   <Route element={userId?<LayOut/>:<Navigate to="userlogin"/>} >
   <Route  path="/" element={userId?<Home/>:<Navigate to="userlogin"/>} />
   <Route  path="/profile" element={userId?<Profile/>:<Navigate to="userlogin"/>} /> 
   <Route  path="/peopleprofile/:id" element={userId?<PeopleProfile/>:<Navigate to="userlogin"/>} /> 
   </Route>
   <Route  path="/orm" element={userId?<Orm/>:<Navigate to="userlogin"/>} />
    <Route exact path="/usersignup" element={<UserSignup/>} />
    <Route exact path="/userlogin" element={<UserLogin/>} />
    <Route exact path="/userotplogin" element={<UserOtpLogin/>} />
    <Route exact path="/userotplogin" element={<UserOtpLogin/>} />
    {/* <Route exact path="/layout" element={<LayOut/>} /> */}

    <Route exact path="/adminlogin" element={<AdminPage/>} /> 

   <Route exact path="/adminhome" element={<AdminHomePage />} /> 


 
   </Routes>
   </BrowserRouter>
  );
}

export default App;
