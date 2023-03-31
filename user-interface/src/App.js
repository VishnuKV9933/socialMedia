import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import UserLogin from './UserPages/UserLogin'
import UserSignup from './UserPages/UserSignup'
import Orm from './UserPages/Orm';
import AdminPage from './AdminPages/AdminLogin';
import Home from './UserPages/Home'

import "react-toastify/dist/ReactToastify.css" 
import AdminHomePage from './AdminPages/AdminHomePage';
import UserOtpLogin from './UserPages/UserOtpLogin';
import Profile from './UserPages/Profile';


function App() {
    
  return (
   <BrowserRouter>
   <Routes>
   <Route exact path="/" element={<Home/>} />
   <Route exact path="/orm" element={<Orm/>} />
    <Route exact path="/usersignup" element={<UserSignup/>} />
    <Route exact path="/userlogin" element={<UserLogin/>} />
    <Route exact path="/userotplogin" element={<UserOtpLogin/>} />

    <Route exact path="/adminlogin" element={<AdminPage/>} /> 

   <Route exact path="/adminhome" element={<AdminHomePage />} /> 
   <Route exact path="/profile" element={<Profile />} /> 


 
   </Routes>
   </BrowserRouter>
  );
}

export default App;
