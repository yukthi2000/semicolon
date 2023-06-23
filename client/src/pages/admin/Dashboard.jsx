import React from "react";
import "./Admin.css";
import PermContactCalendarRoundedIcon from "@mui/icons-material/PermContactCalendarRounded";
import TourIcon from '@mui/icons-material/Tour';
import RateReviewIcon from '@mui/icons-material/RateReview';
import CollectionsIcon from '@mui/icons-material/Collections';
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import AddLocationRoundedIcon from "@mui/icons-material/AddLocationRounded";
import { useEffect, useState, useContext } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@mui/material';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const { authState } = useContext(AuthContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [userCount, setUserCount] = useState(0);
  const [tripCount, setTripCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [imageCount, setImageCount] = useState(0);
  const [isEmailTaken, setIsEmailTaken] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/auth/admin-info"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCancelDeleteAdmin = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleConfirmDeleteAdmin = async () => {
    if (selectedUser) {
      try {
        console.log('here........')
        console.log(selectedUser)
        await axios.delete(`http://localhost:3001/auth/delete-admin/${selectedUser.id}`);
        setUsers(users.filter((user) => user.id !== selectedUser.id));
        setOpenDialog(false);
        setSelectedUser(null);
      } catch (error) {
        console.error("Error deleting admin:", error);
        setError("An error occurred while deleting the admin");
      }
    }
  };

  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formErrors, setFormErrors] = useState({});
  const onSubmit = (data, { setSubmitting, resetForm }) => {
    axios
      .post("http://localhost:3001/auth/admin", data)
      .then((response) => {
        // Handle successful response if needed
        setSubmitting(false); // Enable the submit button
        resetForm(); // Reset the form fields
        setIsEmailTaken(false); // Reset isEmailTaken
        document.getElementById("closeButton").click(); // Close the modal
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          // Set the form errors with the error messages returned from the server
          setFormErrors(error.response.data.error);
          if (error.response.data.error.email) {
            setIsEmailTaken(true); // Set isEmailTaken to true if email is already taken
          } else {
            setIsEmailTaken(false); // Reset isEmailTaken if there are other errors
          }
        } else {
          console.error(error);
        }
        setSubmitting(false); // Enable the submit button
      });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .matches(/^[a-zA-Z ]*$/, "Invalid name format"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must not exceed 20 characters"),
    confirmPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });
  //fetch user count from database
  useEffect(() => {
    fetch("http://localhost:3001/auth/user-count")
      .then((response) => response.json())
      .then((data) => {
        setUserCount(data.count);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //fetch Trip count from database
  useEffect(() => {
    fetch("http://localhost:3001/Trips/trip-count")
      .then((response) => response.json())
      .then((data) => {
        setTripCount(data.count);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //fetch reviews count from database
  useEffect(() => {
    fetch("http://localhost:3001/reviews/reviews-count")
      .then((response) => response.json())
      .then((data) => {
        setReviewsCount(data.count);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //fetch image count from database
  useEffect(() => {
    fetch("http://localhost:3001/images/images-count")
      .then((response) => response.json())
      .then((data) => {
        setImageCount(data.count);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
       <div className="admin-stat-data">
        <div className="admin-stat-data-user-count">
         
          <div className="item">
            <PermContactCalendarRoundedIcon style={{ fontSize: '60px', color: 'red' }} />
            </div>
          <h2 className="stat-data-header">{userCount}</h2>
          <h6 className="stat-data-header">No of Users</h6>
          
        </div>
        <div className="admin-stat-data-trip-count">
        <div className="item">
            <TourIcon style={{ fontSize: '60px', color: 'green' }} />
            </div>
          <h2 className="stat-data-header">{tripCount}</h2>
          <h6 className="stat-data-header">No of planned trips</h6>
        </div>
        <div className="admin-stat-data-review-count">
        <div className="item">
            <RateReviewIcon style={{ fontSize: '60px', color: 'blue' }} />
            </div>
          <h2 className="stat-data-header">{reviewsCount}</h2>
          <h6 className="stat-data-header">No of reviews</h6>
        </div>
        <div className="admin-stat-data-image-count">
        <div className="item">
            <CollectionsIcon style={{ fontSize: '60px', color: 'orange' }} />
            </div>
          <h2 className="stat-data-header">{imageCount}</h2>
          <h6 className="stat-data-header">No of images</h6>
        </div>
      </div> 
      <div className="admin-info">
        <div className="add-admin-user">
          {authState.userType === "superAdmin" ? (
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              <h6>Add user</h6>
            </button>
          ) : (
            <div></div>
          )}
        </div>
        <div className="admin-info-display">
        <table className="user-table">
  <thead>
    <tr>
      <th>Index</th>
      <th>Name</th>
      <th>Email</th>
      {authState.userType === "superAdmin" && <th>Actions</th>}
    </tr>
  </thead>
  <tbody>
    {users.map((user, index) => (
      <tr key={user.id}>
        <td>{index + 1}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        {authState.userType === "superAdmin" && (
          <td>
            <button onClick={() => handleDeleteClick(user)}>delete</button>
          </td>
        )}
      </tr>
    ))}
  </tbody>
</table>



          <Dialog open={openDialog} onClose={handleCancelDeleteAdmin}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogActions>
          <Button onClick={handleCancelDeleteAdmin} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDeleteAdmin} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
        </div>
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content modaladmin">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Modal title
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                        <Field
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-danger"
                        >
                          {formErrors.name}
                        </ErrorMessage>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <Field
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger"
                        >
                          {formErrors.email}
                        </ErrorMessage>
                        {isEmailTaken && (
                          <div className="text-danger">
                            This email is already taken.
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <Field
                          type="password"
                          id="password"
                          name="password"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-danger"
                        >
                          {formErrors.password}
                        </ErrorMessage>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">
                          Confirm Password
                        </label>
                        <Field
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="text-danger"
                        >
                          {formErrors.confirmPassword}
                        </ErrorMessage>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                          id="closeButton"
                        >
                          Close
                        </button>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting} // Disable the button when submitting the form
                      >
                        Register
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;