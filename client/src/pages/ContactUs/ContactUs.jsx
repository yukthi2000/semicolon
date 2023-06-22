import "./ContactUs.css";
import React, { useState, useEffect } from "react";

const ContactUs = () => {
  const [status, setStatus] = useState("Send");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending..");
    const { name, email, message } = e.target.elements;
    let details = {
      name: name.value,
      email: email.value,
      message: message.value,
    };

    try {
      let response = await fetch("http://localhost:3001/contactUs/contact", {
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

  const handleReset = (e) => {
    e.preventDefault();
    const { name, email, message } = e.target.form;
    name.value = "";
    email.value = "";
    message.value = "";
  };

  return (
    <div className="contactUs">
      <div className="cUsContent">
        <div className="contForm">
          <div className="contact-us container-fluid">
            <div className="form">
              <form onSubmit={handleSubmit}>
                <div>
                  <div>
                    <input
                      className="input-cUS"
                      type="text"
                      id="name"
                      required
                      placeholder="name"
                    />
                  </div>
                  <div>
                    <input
                      className="input-cUS"
                      type="email"
                      id="email"
                      required
                      placeholder="email"
                    />
                  </div>
                
                  <div>
                    <textarea
                      className="message-cUS"
                      id="message"
                      required
                      placeholder="Message"
                    />
                  </div>
                  <div className="cUs-btn">
                    <button
                      type="reset"
                      className="CUform-btn-reset"
                      onClick={handleReset}
                    >
                      Reset
                    </button>
                    <button type="submit" className="CUform-btn-submit">
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

export default ContactUs;
