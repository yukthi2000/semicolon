// import React from "react";
// import "./Register.css";
// import A from "../../assets/A.jpg"
// import HomePageLinkIcon from "../../componets/HomePageLinkIcon";
// import EmailIcon from '@mui/icons-material/Email';



// const ForgetPassword = () => {

//     return (
//         <div className="reg-form">
//             <img className="airBalloon" src={A} alt="" />
//             <div>
//                 <HomePageLinkIcon />
//             </div>
//             <div className="login-form">
//                 <div><h1>Password Reset</h1></div><br />
//                 <div>
//                     <form>
//                         <div><h6>No worries! Enter your email address and we will <br />send you a link to reset password</h6></div><br />
//                         <div>
//                             <div style={{ position: "relative" }}>
//                                 <EmailIcon style={{ position: "absolute", top: 24, left: 20 }}/>
//                                 <input
//                                     className='input'
//                                     type="email"
//                                     id="email"
//                                     required
//                                     placeholder='email'
//                                     style={{ paddingLeft: 32 }}
//                                 />
//                             </div>
//                             <br />
//                             <div><a class="btn btn-primary" href="reset-password" role="button">SEND</a></div>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>

//     )
// }

// export default ForgetPassword;


import React, { useState } from 'react';
import axios from 'axios';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/forgot-password', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Something went wrong. Please try again later.');
    }
  };

  

  return (
    <div>
        <br/><br/><br/>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} required />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgetPassword;
