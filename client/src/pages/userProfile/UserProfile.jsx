import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { BiDotsVertical } from "react-icons/bi";
import { AiOutlineLogout } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import HomePageLinkIcon from "../../componets/HomePageLinkIcon";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Modal, TextField, Button } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useNavigate } from "react-router-dom";



const UserProfile = () => {

  let { id } = useParams();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("");
  
  //6.30
const [isModalOpen, setIsModalOpen] = useState(false);
const [editedName, setEditedName] = useState("");
const [editedEmail, setEditedEmail] = useState("");
const [editedUserType, setEditedUserType] = useState("");
const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
const history = useNavigate();

const handleSaveProfile = () => {
  // Make an API request to update the user profile data
  axios.put(`http://localhost:3001/auth/updateProfile/${id}`, {
    name: editedName,
    email: editedEmail,
    userType: editedUserType
    
  })
    .then(() => {
      // Close the modal and display success message
      setIsModalOpen(false);
      alert("Profile updated successfully");
    })
    .catch((error) => {
      // Handle any error that occurs during the API request
      console.error("Error updating profile:", error);
    });
};

const handleDeleteAccount = () => {
  // Make an API request to delete the user account
  axios.delete(`http://localhost:3001/auth/deleteAccount/${id}`)
    .then(() => {
      // Remove the JWT token from local storage
      localStorage.removeItem("accessToken");
      setName("");
      setEmail("");
      setUserType("");
      history("/")
      window.location.reload();

     
    })
    .catch((error) => {
      // Handle any error that occurs during the API request
      console.error("Error deleting account:", error);
    });
};

 //6.30 
  useEffect(() => {
    axios.get(`http://localhost:3001/auth/basicInfo/${id}`)
      .then((response) => {
        setName(response.data.name);
        setEmail(response.data.email);
        setUserType(response.data.userType);
      });
  }, []);
  

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="user-profile">
      <div className="left-side">
        <div className="profile-frame"></div>
        <div className="proInfo">
  <div>
  <FaUserEdit onClick={() => setIsModalOpen(true)} />
    <h5>{name}</h5>
  </div>
  <div><h5>{email}</h5></div>
  <div><h5>{userType}</h5></div>
  <Button variant="outlined" color="secondary" onClick={() => setIsDeleteDialogOpen(true)}>
    Delete Account
  </Button>
</div>


<Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
  <DialogTitle>Delete Account</DialogTitle>
  <DialogContent>
    <p>Do you really want to delete this account?</p>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleDeleteAccount} color="secondary">
      Yes
    </Button>
    <Button onClick={() => setIsDeleteDialogOpen(false)} color="primary">
      No
    </Button>
  </DialogActions>
</Dialog>



<Modal
  open={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  aria-labelledby="edit-profile-modal"
>
  <div className="edit-profile-modal">
    <h2>Edit Profile</h2>
    <TextField
      label="Name"
      value={editedName}
      onChange={(e) => setEditedName(e.target.value)}
    />
    <TextField
      label="Email"
      value={editedEmail}
      onChange={(e) => setEditedEmail(e.target.value)}
    />
    <TextField
      label="User Type"
      value={editedUserType}
      onChange={(e) => setEditedUserType(e.target.value)}
    />
    <Button onClick={handleSaveProfile}>Save</Button>
  </div>
</Modal>

      </div>

      <div className="right-side">
        <div className="navBar">
          <div>
           
            <div className="profile-body-up">
              <ul className="profile-nav">
                <li className="profile-nav2">
                <Link to={`/userProfile/${id}`} className="link">
                  
                    Gallery
                  </Link>
                </li>

                <li className="profile-nav2">
                <Link to={`/userProfile/${id}/review`} className="link">
                    
                    Review
                  </Link>
                </li>

                <li className="profile-nav2">
                <Link to={`/userProfile/${id}/plannedTrip`} className="link">              
                    Trip
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="proBody">
          
            <div className="profile-body-down">
              <Outlet />
            </div>
         
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
