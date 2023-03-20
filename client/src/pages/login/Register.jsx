import React, { useState } from "react";
import "./Register.css";
import A from "../../assets/A.jpg"
import HomePageLinkIcon from "../../componets/HomePageLinkIcon";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Register = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [error, setError] = useState("");

  const validateName = (name) => {
    const regex = /^[a-zA-Z ]+$/;
    return regex.test(name);
  }
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(password);
  }

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (value && !validateName(value)) {
      setNameError("Name should only include letters and spaces")
    } else {
      setNameError("")
    }
    setName(value)
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
      setPasswordError("Min 8 characters, at least 1 letter, number, special character")
    } else {
      setPasswordError("")
    }
    setPassword(value)
  }

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    if (value !== password) {
      setConfirmPasswordError("Password missmatch")
    } else {
      setConfirmPasswordError("")
    }
    setConfirmPassword(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
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
      <div className="Register-form">
        <div><h1>Register</h1></div><br />
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <div style={{ position: "relative" }}>
                <AccountCircleIcon style={{ position: "absolute", top: 20, left: 20 }} />
                <input
                  className={`input ${nameError ? "invalid" : ""}`}
                  type="text"
                  id="name"
                  required
                  placeholder='First name & Last name'
                  value={name}
                  onChange={handleNameChange}
                  style={{ paddingLeft: 32 }}
                />
              </div>
              {nameError && (
                <div className="error-message">{nameError}</div>
              )}

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

              <div style={{ position: "relative" }}>
                <EnhancedEncryptionIcon style={{ position: "absolute", top: 20, left: 20 }}/>
                <input
                  className={`input ${confirmPasswordError ? "invalid" : ""}`}
                  type="password"
                  id="cpassword"
                  required
                  placeholder='Confirm Password'
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  style={{ paddingLeft: 32 }}
                />
              </div>
              {confirmPasswordError && (
                <div className="error-message">{confirmPasswordError}</div>
              )}

              <div><Checkbox {...label} />I agree all statements in services</div>
              <div>
                <div style={{marginLeft:"10px"}}>
                  <a href="/login">I am already member</a>
                </div>
                <button type="submit" className="btn btn-primary">
                  SIGN UP
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

export default Register;