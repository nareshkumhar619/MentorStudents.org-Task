import React, { useState , useContext} from "react";
import "./Signin.css";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

export default function SignIn() {
 
  const navigate = useNavigate();
  const { setUserLogin } = useContext(LoginContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const postData = () => {
    //checking email
    if (!emailRegex.test(email)) {
      alert("Invalid email")
      return
    }
    // Sending data to server
    fetch("http://localhost:8000/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password

      })
    }).then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error)
        } else {
          alert("Signed In Successfully")
          console.log(data)
          localStorage.setItem("jwt", data.token)
          localStorage.setItem("user", JSON.stringify(data.user))
          setUserLogin(true)
         navigate("/")
        }
        console.log(data)
      })
  }

  return (
    <div className="signIn">
      <div>
        <div className="loginForm">
          <img className="signUpLogo" src="" alt="" />
          <div>
            <input type="email" name="email" id="email" value={email} placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
            />
          </div>
          <input type="submit" id="login-btn" onClick={() => { postData() }} value="Sign In" />
        </div>
        <div className="loginForm2">
          Don't have an account ?
          <Link to="/signup">
            <span style={{ color: "blue", cursor: "pointer" }}>Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}