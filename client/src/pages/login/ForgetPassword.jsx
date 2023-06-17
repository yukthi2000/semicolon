
import React, { useState } from "react";

const ForgetPassword = () => {
  const [status, setStatus] = useState("Send");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending..");
    const { email } = e.target.elements;
    let details = {
      email: email.value,
    };

    try {
      let response = await fetch("http://localhost:3001/passwordReset/resetLink", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(details),
      });

      setStatus("Submit");

      if (!response.ok) {
        throw new Error("Error occurred during request");
      }

      let result = await response.json();
      alert(result.status);
    } catch (error) {
      console.error(error);
      alert("An error occurred during the request.");
    }
  };


  return (
    <div className="contactUs">
      <div>
        <h2>
          <center>Forget password</center>
        </h2>
      </div>

      <div className="cUsContent">
        <div className="contForm">
          <div className="contact-us container-fluid">
            <div className="form">
              <form onSubmit={handleSubmit}>
                <div>
                 
                  <div>
                    <label>Email</label>
                    <input
                      className="input"
                      type="email"
                      id="email"
                      required
                      placeholder="email"
                    />
                  </div>      
                  <div>
                    <button type="submit" className="CUform-button1">
                      {status}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
