import './App.css';
import React, {useState, createContext} from "react";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import SignIn from './Components/Signin';
import SignUp from './Components/Signup';
import { Routes,Route } from 'react-router-dom';
import { LoginContext } from "./context/LoginContext";



function App() {

  const [userLogin, setUserLogin] = useState(false);
  return (
    <>
<LoginContext.Provider value={{ setUserLogin}}>
    <Navbar value={userLogin}/>
            <Routes>
            <Route path="/" element={<Home/>}></Route>
           <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/signin" element={<SignIn/>}></Route>
            
           
    </Routes>
    </LoginContext.Provider>
    </>
  );
}

export default App;
