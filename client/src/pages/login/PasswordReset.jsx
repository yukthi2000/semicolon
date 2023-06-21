// import React, { useState } from "react";
// import "./Register.css";
// import A from "../../assets/A.jpg"
// import HomePageLinkIcon from "../../componets/HomePageLinkIcon";
// import LockIcon from '@mui/icons-material/Lock';
// import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';

// const PasswordReset = () => {
//   const [password, setPassword] = useState("");
//   const [passwordError, setPasswordError] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [confirmPasswordError, setConfirmPasswordError] = useState("");
//   const [error, setError] = useState("");

//   const validatePassword = (password) => {
//     const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
//     return regex.test(password);
//   }

//   const handlePasswordChange = (e) => {
//     const value = e.target.value;
//     if (value && !validatePassword(value)) {
//       setPasswordError("Min 8 characters, at least 1 letter, number, special character")
//     } else {
//       setPasswordError("")
//     }
//     setPassword(value)
//   }

//   const handleConfirmPasswordChange = (e) => {
//     const value = e.target.value;
//     if (value !== password) {
//       setConfirmPasswordError("Password missmatch")
//     } else {
//       setConfirmPasswordError("")
//     }
//     setConfirmPassword(value)
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!password || !confirmPassword) {
//       setError("All fields are required");
//     } else {
//       window.location.href = "login";
//     }
//   };

//   return (
//     <div className="reg-form">
//       <img className="airBalloon" src={A} alt="" />
//       <div>
//         <HomePageLinkIcon/>
//       </div>
//       <div className="Register-form">
//         <div><h1>Password Reset</h1></div><br />
//         <div>
//           <form onSubmit={handleSubmit}>
//             <div>
//               <div style={{ position: "relative" }}>
//                 <LockIcon style={{ position: "absolute", top: 20, left: 20 }}/>
//                 <input
//                   className={`input ${passwordError ? "invalid" : ""}`}
//                   type="password"
//                   id="password"
//                   required
//                   placeholder='Password'
//                   value={password}
//                   onChange={handlePasswordChange}
//                   style={{ paddingLeft: 32 }}
//                 />
//               </div>
//               {passwordError && (
//                 <div className="error-message">{passwordError}</div>
//               )}

//               <div style={{ position: "relative" }}>
//                 <EnhancedEncryptionIcon style={{ position: "absolute", top: 20, left: 20 }}/>
//                 <input
//                   className={`input ${confirmPasswordError ? "invalid" : ""}`}
//                   type="password"
//                   id="cpassword"
//                   required
//                   placeholder='Confirm Password'
//                   value={confirmPassword}
//                   onChange={handleConfirmPasswordChange}
//                   style={{ paddingLeft: 32 }}
//                 />
//               </div>
//               {confirmPasswordError && (
//                 <div className="error-message">{confirmPasswordError}</div>
//               )}
//               <div>
//                 <div style={{marginLeft:"10px"}}>
//                   <a href="/login">Back</a>
//                 </div>
//                 <button type="submit" className="btn btn-primary">
//                   SUBMIT
//                 </button>
//                 {error && <p>{error}</p>}
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>

//   )
// }

// export default PasswordReset;


import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams } from "react-router-dom";
const PasswordReset = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  let [searchParams, setSearchParams] = useSearchParams();
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Send a request to the backend to update the password
      await axios.post('http://localhost:3001/passwordReset/resetPassword',  { newPassword, confirmPassword , resetToken:searchParams.get("token")});
      // Clear the input fields and show success message
      setNewPassword('');
      setConfirmPassword('');
      setSuccessMessage('Password updated successfully');
      setError('');
    } catch (error) {
      // Handle error response from the backend
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError('An error occurred');
      }
    }
  };

  return (
    <div>
      <h1>Hello</h1><br/>
      <h1>Hello</h1><br/>

      <h1>Hello</h1><br/>

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleResetPassword}>Submit</button>
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default PasswordReset;
