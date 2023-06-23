import home1 from "../../assets/home1.jpg";
import "./Register.css";
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
      
      <img className="airBalloon" src={home1} alt="" />
      <br/>  <br/>  <br/>  <br/>  <br/>
      <form className="form-reset-password">

      <h1>Password Reset</h1><br/>
      <input
        type="password"
        className="reset-input"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <br/> <br/>
      <input
        type="password"
        className="reset-input"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <br/> <br/>
      <button onClick={handleResetPassword} className="reg-btn">Submit</button>
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
      </form>
      
    </div>
  );
};

export default PasswordReset;
