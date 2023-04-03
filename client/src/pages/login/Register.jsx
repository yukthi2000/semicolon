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
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().required("Email is required"),
        password: Yup.string().min(6).max(10).required("Password is required"),
        confirmPassword: Yup.string().min(6).max(10).required("Password is required")

    })

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data).then((response) => {
            console.log(data)
        });
    }

    return (

        <div className="reg-form">
            <img className="airBalloon" src={A} alt="" />
            <div>
                <HomePageLinkIcon />
            </div>
            <div className="Register-form">
                <div><h1>Register</h1></div><br />
                <div>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                    >

                        <Form>
                            <ErrorMessage name="name" component="span" />
                            <Field
                                autocomplete="off"
                                id="inputCreateUser"
                                name="name"
                                placeholder="First name & last name"
                            /><br />
                            <ErrorMessage name="email" component="span" />
                            <Field
                                autocomplete="off"
                                id="inputCreateUser"
                                name="email"
                                placeholder="Email address"
                            /><br />
                            <ErrorMessage name="password" component="span" />
                            <Field
                                autocomplete="off"
                                type="password"
                                id="inputCreateUser"
                                name="password"
                                placeholder="password"
                            /><br />
                            <ErrorMessage name="Password mismatch" component="span" />
                            <Field
                                autocomplete="off"
                                type="password"
                                id="inputCreateUser"
                                name="confirmPassword"
                                placeholder="confirm password"
                            /><br />
                            <button type="submit">Sign Up</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default Register;