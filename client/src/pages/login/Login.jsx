import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomePageLinkIcon from "../../componets/HomePageLinkIcon";
import LockIcon from "@mui/icons-material/Lock";
import A from "../../assets/A.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useNavigate();

  const login = () => {
    const data = { email: email, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data);
        history("/");
      }
    });
  };

  return (
    <div className="reg-form">
      <img className="airBalloon" src={A} alt="" />
      <div>
        <HomePageLinkIcon />
      </div>
      <div className="Register-form">
        <div>
        <h5>Login</h5> 
        </div>
        <br />
        <div>
          
            <div>
              <div style={{ position: "relative" }}>
                
                <div class="form-outline mb-4 form-floating">
                  <input
                    type="email"
                    id="email"
                    class="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <label class="form-label" for="email">
                    Email address
                  </label>
                </div>
              </div>

              <div style={{ position: "relative" }}>
              
                <div class="form-outline mb-3 form-floating">
                  <input
                    type="password"
                    id="password"
                    class="form-control form-control-lg"
                    placeholder="Enter password"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <label for="password">Password</label>
                </div>
              </div>
              <div>
                <button className="btn btn-primary btn-lg" onClick={login}>
                  Sign in
                </button>
              </div>
            </div>
          
        </div>
      </div>
    </div>
  );
};

export default Login;

