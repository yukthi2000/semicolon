import home1 from "../../assets/home1.jpg";
import "./Register.css";
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
      let response = await fetch(
        "http://localhost:3001/passwordReset/resetLink",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(details),
        }
      );

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
    <div>
      <img className="airBalloon" src={home1} alt="" />

      <div className="cUsContent">
        <div className="contForm">
          <div className="contact-us container-fluid">
            <div className="form-reset-password1">
              <form onSubmit={handleSubmit}>
                <div>
                  <h2>Forget Password</h2><br/>
                  <div>
                    <input
                      className="reset-input"
                      type="email"
                      id="email"
                      required
                      placeholder="email"
                    />
                  </div>
                  <div>
                    <br />
                    <button type="submit" className="reg-btn">
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
