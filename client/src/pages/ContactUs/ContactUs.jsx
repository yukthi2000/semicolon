import "./ContactUs.css";
import React, { useState } from "react";

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
      <div>
        <h2>
          <center>Contact Us</center>
        </h2>
      </div>

      <div className="cUsContent">
        <div className="contPara">
          <div>
            <h4>
              <p>
                <br />
                We value your connection and are eager to hear from you.
                JourneyJive, your trusted travel companion, is always just a
                message away. Whether you have questions, feedback, or simply
                want to share your travel stories, we're here to listen and
                assist. Our team is dedicated to providing exceptional support
                and ensuring that your journey with us is nothing short of
                extraordinary. Get in touch with us through the contact
                information provided below, and let's embark on a conversation
                that brings your travel aspirations to life. Together, let's
                create meaningful memories and explore the world with
                JourneyJive.
              </p>
            </h4>
          </div>
          <div>
            <h4>Happy travels!</h4>
          </div>
        </div>

        <div className="contForm">
          <div className="contact-us container-fluid">
            {/* <div className='paragraph'>
        <div className='header'>Get in touch..<br/></div>
        <div className='para'>
        Fill out this form and we will get back to you shortly<br/><br/>
        Address:<br/>
        Students’ Union,<br/>
        Faculty of Information Technology,<br/>
        University of Moratuwa<br/><br/>
        Telephone:<br/>
        +94775467896<br/><br/>
        Email:<br/>
        abd@gmail.com<br/>
        </div>
      </div> */}
            <div className="form">
              <form onSubmit={handleSubmit}>
                <div>
                  <div>
                    <input
                      className="input"
                      type="text"
                      id="name"
                      required
                      placeholder="name"
                    />
                  </div>
                  <div>
                    <input
                      className="input"
                      type="email"
                      id="email"
                      required
                      placeholder="email"
                    />
                  </div>
                  <div>
                    <textarea
                      className="message"
                      id="message"
                      required
                      placeholder="Message"
                    />
                  </div>
                  <div>
                    <button
                      type="reset"
                      className="CUform-button"
                      onClick={handleReset}
                    >
                      Reset
                    </button>
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

export default ContactUs;
