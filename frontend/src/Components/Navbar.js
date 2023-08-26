import React from "react";
import "./Navbar.css"
import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();
  
  const loginStatus = () =>{
   const token = localStorage.getItem("jwt")
   console.log(token) 
   if(token) {
    return [
      <>
      <a class="nav-link" href="/">Home</a>
      <button className="primaryBtn" onClick={()=>{
        localStorage.clear()
        navigate("./signin")
      }}>Logout</button>
      </>
    ]
   }else{
    return [
      <>
     <a class="nav-link" href="/signup">SignUp</a>
     <a class="nav-link" href="/signin">SignIn</a>
      </>
    ]
   }
  }
  
  return (
    <nav class="nav">
         {loginStatus()}
</nav>

  );
}
