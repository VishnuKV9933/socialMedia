import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import UserLogin from './UserPages/UserLogin'
import UserSignup from './UserPages/UserSignup'
import Orm from './UserPages/Orm';
import AdminPage from './AdminPages/AdminLogin';
import Home from './UserPages/Home'
import Text from './Text';
import "react-toastify/dist/ReactToastify.css" 
import AdminHomePage from './AdminPages/AdminHomePage';

function App() {
    
  return (
   <BrowserRouter>
   <Routes>
   <Route exact path="/" element={<Home/>} />
   <Route exact path="/orm" element={<Orm/>} />
    <Route exact path="/usersignup" element={<UserSignup/>} />
    <Route exact path="/userlogin" element={<UserLogin/>} />

    <Route exact path="/adminlogin" element={<AdminPage/>} /> 

   <Route exact path="/adminhome" element={<AdminHomePage />} /> 

     
 
   </Routes>
   </BrowserRouter>
  );
}

export default App;
