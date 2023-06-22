import React from "react";
import "./Register.css";
import axios from "axios";
import A from "../../assets/A.jpg";
import HomePageLinkIcon from "../../componets/HomePageLinkIcon";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import { Link } from "react-router-dom";

const Register = () => {
  // Define initialValues for the form
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  // Define validation schema for the form
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(5, "Name must be at least 5 characters")
      .max(30, "Name must not exceed 30 characters")
      .matches(/^[a-zA-Z ]*$/, "Invalid name format"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format"
      ),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%?&])[A-Za-z\d@#$!%?&]{8,50}$/,
        "1 Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
      )
      .min(8, "Password must be at least 8 characters")
      .max(50, "Password must not exceed 50 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  // Handle form submission
  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then((response) => {
      console.log(data);
      navigate("/login");
    });
  };

  // Render the Register form
  return (
    <div className="reg-form">
      <img className="airBalloon" src={A} alt="" />
      {/* <div>
        <HomePageLinkIcon />
      </div> */}
      <div className="Register-form">
        <div>
          <h1>Register</h1>
        </div>
        <br />
        <div>
          {/* Define Formik form with fields and error messages */}
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              <div class="form-outline mb-4 form-floating">
                <Field
                  autocomplete="off"
                  class="form-control form-control-md"
                  id="inputCreateUser"
                  name="name"
                  placeholder="First name & last name"
                />
                <label class="form-label" for="name">
                  Name
                </label>
              </div>
              {/* Show error message if name field is invalid */}
              <ErrorMessage
                name="name"
                component="div"
                className="text-danger"
              />
              {/* <br /> */}

              <div class="form-outline mb-4 form-floating">
                <Field
                  class="form-control form-control-md"
                  autocomplete="off"
                  id="email"
                  name="email"
                  placeholder="Email address"
                />
                <label class="form-label" for="email">
                  Email address
                </label>
              </div>
              {/* Show error message if email field is invalid */}
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
              {/* <br /> */}

              <div class="form-outline mb-4 form-floating">
                <Field
                  class="form-control form-control-md"
                  autocomplete="off"
                  type="password"
                  id="inputCreateUser"
                  name="password"
                  placeholder="password"
                />
                <label class="form-label" for="password">
                  Password
                </label>
              </div>
              {/* Show error message if password field is invalid */}
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
              {/* <br /> */}

              <div class="form-outline mb-4 form-floating">
                <Field
                  class="form-control form-control-md"
                  autocomplete="off"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="confirm password"
                />
                <label class="form-label" for="confirmPassword">
                  Confirm Password
                </label>
              </div>
              {/* Show error message if confirm Password field is invalid */}
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-danger"
              />
              <br />

              <button className="reg-btn" role="button" type="submit">
                Sign Up
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
