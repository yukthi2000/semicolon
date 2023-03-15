import React from "react";
import "./Register.css";
import regMan from "../../assets/regMan.png"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const Register = () => {

  return (
    <div className="reg-form">
      <div className="form">
        <div><h1>Register</h1></div>
        <div>
          <form>
            <div>
              <div>
                <AccountCircleIcon/>
                <input
                  className='input'
                  type="text"
                  id="name"
                  required
                  placeholder='First name & Last name'
                />
              </div>
              <div>
                <EmailIcon/>
                <input
                  className='input'
                  type="email"
                  id="email"
                  required
                  placeholder='email'
                />
              </div>              
              <div>
                <LockIcon/>
                <input
                  className='input'
                  type="password"
                  id="password"
                  required
                  placeholder='Password'
                />
              </div>
              <div>
                <EnhancedEncryptionIcon/>
                <input
                  className='input'
                  type="password"
                  id="cpassword"
                  required
                  placeholder='Confirm Password'
                />
              </div>
              <div><Checkbox {...label} />I agree all statements in services</div>
              <div><button className="sign-up-btn">SIGN UP</button></div>
            </div>
          </form>
        </div>
      </div>
      <div className="reg-man">
        <div>
          <img className="regMan-img" src={regMan} alt=""></img>
        </div>
        <div>
          <a href="/login">I am already member</a>
        </div>
      </div>


    </div>

  )
}

export default Register;