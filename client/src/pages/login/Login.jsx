import React, { useState } from "react";
import "./Register.css";
import A from "../../assets/A.jpg"
import HomePageLinkIcon from "../../componets/HomePageLinkIcon";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("")
  const [error, setError] = useState("");


  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(password);
  }

  const handleEmailChange = (e) => {
    const value = e.target.value;
    if (value && !validateEmail(value)) {
      setEmailError("Please enter a valid email address")
    } else {
      setEmailError("")
    }
    setEmail(value)
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    if (value && !validatePassword(value)) {
      setPasswordError("Minimum 8 characters, at least one letter, one number and one special character")
    } else {
      setPasswordError("")
    }
    setPassword(value)
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if ( !email || !password ) {
      setError("All fields are required");
    } else {
      window.location.href = "login";
    }
  };
  
  return (
    <div className="reg-form">
      <img className="airBalloon" src={A} alt="" />
      <div>
        <HomePageLinkIcon/>
      </div>
      <div className="login-form">
        <div><h1>Sign In</h1></div><br />
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <div style={{ position: "relative" }}>
                <EmailIcon style={{ position: "absolute", top: 20, left: 20 }}/>
                <input
                  className={`input ${emailError ? "invalid" : ""}`}
                  type="email"
                  id="email"
                  required
                  placeholder='email'
                  value={email}
                  onChange={handleEmailChange}
                  style={{ paddingLeft: 32 }}
                />
              </div>
              {emailError && (
                <div className="error-message">{emailError}</div>
              )}

              <div style={{ position: "relative" }}>
                <LockIcon style={{ position: "absolute", top: 20, left: 20 }}/>
                <input
                  className={`input ${passwordError ? "invalid" : ""}`}
                  type="password"
                  id="password"
                  required
                  placeholder='Password'
                  value={password}
                  onChange={handlePasswordChange}
                  style={{ paddingLeft: 32 }}
                />
              </div>
              {passwordError && (
                <div className="error-message">{passwordError}</div>
              )}

              <div><br/>
                <div style={{marginLeft:"10px"}}>
                  <a href="/register">Don't have an account</a><br/>
                  <a href="/forget-password">Forget Password</a>
                </div>
                <button type="submit" className="btn btn-primary">
                  LOG IN
                </button>
                {error && <p>{error}</p>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Login;