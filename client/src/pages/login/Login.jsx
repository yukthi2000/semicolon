import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomePageLinkIcon from "../../componets/HomePageLinkIcon";
import A from "../../assets/A.jpg";
import { AuthContext } from "../../helpers/AuthContext";
import ReCAPTCHA from 'react-google-recaptcha';




const Login = () => {
   // Define email and password as state variables.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setAuthState}= useContext(AuthContext);

  const history = useNavigate();

  const login = () => {
    // Set data object with email and password
    const data = { email: email, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
        email: response.data.email, 
        id:response.data.id, 
        name: response.data.name,
        status: true,})
        console.log(response.data)
        history("/");
      }
    });
  };

  return (
    <div className="reg-form">
      <img className="airBalloon" src={A} alt="" />
      {/* <div>
        <HomePageLinkIcon />
      </div> */}
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
              <div><a href="register">Don't have an account</a></div>
              <div><a href="forget-password">Forget password</a></div>
              <div>
                <button className="reg-btn" onClick={login}>
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
