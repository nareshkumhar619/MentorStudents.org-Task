import React, {useState} from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {

  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

  const postData = () => {
    //checking email
    if (!emailRegex.test(email)) {
      alert("Invalid email")
      return
    } else if (!passRegex.test(password)) {
      alert("Password must contain at least 8 characters, including at least 1 number and 1 includes both lower and uppercase letters and special characters for example #,?,!")
      return
    }

    // Sending data to server
    fetch("https://mentorstudents-org-task.onrender.com/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        userName: userName,
        email: email,
        password: password

      })
    }).then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error)
        } else {
          alert(data.message)
          navigate("/signin")
        }
        console.log(data)
      })
  }

  return (
    <div className="signUp">
      <div className="form-container">
        <div className="form">
          <img className="signUpLogo" src="" alt="" />
          <p className="loginPara">
            SignUp And Login  <br /> form
          </p>
          <div>
            <input type="email" name="email" id="email" value={email} placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
          </div>
          <div>
            <input type="text" name="name" id="name" placeholder="Full Name" value={name} onChange={((e) => { setName(e.target.value) })} />
          </div>
          <div>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={userName}
              onChange={(e) => { setUserName(e.target.value) }}
            />
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
          <p
            className="loginPara"
            style={{ fontSize: "12px", margin: "3px 0px" }}
          >
           This Data Added in MongoDb Atlas database
          </p>
          <input type="submit" id="submit-btn" value="Sign Up" onClick={() => { postData() }} />
     </div>
        <div className="form2">
          Already have an account ?
          <Link to="/signin">
            <span style={{ color: "blue", cursor: "pointer" }}>Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
