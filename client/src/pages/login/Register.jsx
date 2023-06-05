import React from "react";
import "./Register.css";
import axios from "axios";
import A from "../../assets/A.jpg";
import HomePageLinkIcon from "../../componets/HomePageLinkIcon";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Register = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .matches(/^[a-zA-Z ]*$/, "Invalid name format"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must not exceed 20 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then((response) => {
      console.log(data);
    });
  };

  return (
    <div className="reg-form">
      <img className="airBalloon" src={A} alt="" />
      <div>
        <HomePageLinkIcon />
      </div>
      <div className="Register-form">
        <div>
          <h1>Register</h1>
        </div>
        <br />
        <div>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form>
             
              <div class="form-outline mb-4 form-floating" >
              <Field
                autocomplete="off"
                class="form-control form-control-md"
                id="inputCreateUser"
                name="name"
                placeholder="First name & last name"
              /><label class="form-label" for="name">
              Name
            </label>
              </div>
              <ErrorMessage name="name" component="div" className="text-danger"/>
              <br />
              
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
              <ErrorMessage name="email" component="div" className="text-danger"/>
              <br />
             
              <div class="form-outline mb-4 form-floating" >
              <Field
                class="form-control form-control-md"
                autocomplete="off"
                type="password"
                id="inputCreateUser"
                name="password"
                placeholder="password"
              /><label class="form-label" for="password">
              Password
            </label>
              </div>
              <ErrorMessage name="password" component="div" className="text-danger"/>
              <br />
              
              < div class="form-outline mb-4 form-floating" >
              <Field
                class="form-control form-control-md"
                autocomplete="off"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="confirm password"
              /><label class="form-label" for="confirmPassword">
              Confirm Password
            </label>
              </div>
              <ErrorMessage name="confirmPassword" component="div" className="text-danger"/>
              <br />
              <button type="submit">Sign Up</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
