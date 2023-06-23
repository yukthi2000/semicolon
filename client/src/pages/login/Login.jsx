import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomePageLinkIcon from "../../componets/HomePageLinkIcon";
import home1 from "../../assets/home1.jpg";
import { AuthContext } from "../../helpers/AuthContext";


const Login = () => {
  const { setAuthState } = useContext(AuthContext);

  const history = useNavigate();

  const login = (values) => {
    const data = {
      email: values.email,
      password: values.password
    };

    axios.post("http://localhost:3001/auth/login", data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.setItem("accessToken", response.data.token);
          setAuthState({
            email: response.data.email,
            id: response.data.id,
            name: response.data.name,
            userType: response.data.userType,
            password: response.data.password,
            photo: response.data.photo,
            status: true,
          });

          console.log(response.data);

          if (response.data.userType === "public") {
            history("/");
          } else if (
            response.data.userType === "superAdmin" ||
            response.data.userType === "admin"
          ) {
            history(`/admin/${response.data.id}`);
          }
        }
      });
  };

  const initialValues = {
    email: "",
    password: ""
  };

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  return (
    <div className="reg-form">
      <img className="airBalloon" src={home1} alt="" />
      {/* <div>
        <HomePageLinkIcon />
      </div> */}
      <div className="Register-form">
        <div>
        <h5>Login</h5> 
        </div>
        <br />
        <div>
        <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={login}
          >
            <Form>
              <div style={{ position: "relative" }}>
              <div className="form-outline mb-4 form-floating">
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                   
                  />
                   <label className="form-label" htmlFor="email">
                    Email address
                  </label>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className=" text-danger error-message"
                  />
                </div>
              </div>

              <div style={{ position: "relative" }}>
              
              <div className="form-outline mb-3 form-floating">
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                  />
                 <label htmlFor="password">Password</label>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className=" text-danger error-message"
                  />
                </div>
              </div>
              <div>
                <a href="register">Don't have an account</a>
              </div>
              <div>
                <a href="forget-password">Forget password</a>
              </div>
              <div>
              <button className="reg-btn" type="submit">
                  Sign in
                </button>
              </div>
              </Form>
          </Formik>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
