import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { FaUserEdit } from "react-icons/fa";
import { Link, useParams, Outlet } from "react-router-dom";
import axios from "axios";
import { Modal, TextField, Button } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const UserProfile = () => {
  let { id } = useParams();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); 
  const [profilePicture, setProfilePicture] = useState(null); // Add this line
  // Edit modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedUserType, setEditedUserType] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // Add this line
  const [isUploadImage, setisUploadImage] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/auth/basicInfo/${id}`)
      .then((response) => {
        setName(response.data.name);
        setEmail(response.data.email);
        setUserType(response.data.userType);

        // Set the initial values for edit modal fields
        setEditedName(response.data.name);
        setEditedEmail(response.data.email);
        setEditedUserType(response.data.userType);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
      axios
      .get(`http://localhost:3001/auth/profile-picture/${id}`, { responseType: 'blob' }) // Add responseType option
      .then((response) => {
        const blobUrl = URL.createObjectURL(response.data); // Create object URL from blob data
        setProfilePicture(blobUrl);
      })
      .catch((error) => {
        console.error("Error fetching profile picture:", error);
      });
  }, [id]);

  const handleSaveProfile = () => {
    // Make an API request to update the user profile data
    axios
      .put(`http://localhost:3001/auth/updateProfile/${id}`, {
        name: editedName,
        email: editedEmail,
        userType: editedUserType,
      })
      .then(() => {
        // Close the modal and display success message
        setIsModalOpen(false);
        alert("Profile updated successfully");
        window.location.reload();
      })
      .catch((error) => {
        // Handle any error that occurs during the API request
        console.error("Error updating profile:", error);
      });
  };

  const handleDeleteAccount = () => {
    // Make an API request to delete the user account
    axios
      .delete(`http://localhost:3001/auth/deleteAccount/${id}`)
      .then(() => {
        // Remove the JWT token from local storage
        localStorage.removeItem("accessToken");
        setName("");
        setEmail("");
        setUserType("");
        history("/");
        window.location.reload();
      })
      .catch((error) => {
        // Handle any error that occurs during the API request
        console.error("Error deleting account:", error);
      });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("image", selectedImage);
  
    axios
      .put(`http://localhost:3001/auth/profile-picture/${id}`, formData)
      .then(() => {
        console.log("Image uploaded successfully");
        window.location.reload();

        // Perform any additional operations after image upload if needed
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };
  

  return (
    <div className="user-profile">
      <div className="left-side">
        <div className="profile-pic-add">
        <AddAPhotoIcon sx={{
          fontSize:"50px"
        }}
            onClick={() => setisUploadImage(true)}
          />
        </div>
     
        <div className="profile-frame">{profilePicture && <img className="user-image" src={profilePicture} alt="Profile" />} {/* Display the profile picture */}</div>
        <div className="proInfo">
          <div className="pro-info-text">
            <FaUserEdit onClick={() => setIsModalOpen(true)} />
            <h2>{name}</h2>
          </div>
          <div className="pro-info-text">
            <h6>{email}</h6>
          </div>
          <div>
            {/* <h5>{userType}</h5> */}
          </div>
         
         
        </div><br/><br/><br/>
        <div className="del-pro">
        <Button
            variant="outlined"
            color="secondary"
            size="small"
            style={{
              color: 'red',
              borderColor: 'red',
              fontSize: '12px',
              padding: '5px 10px',
              minWidth: 'unset',
              minHeight: 'unset',
            }}
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            Delete Account
          </Button>
        </div>
       

        
          


        <Dialog
          open={isUploadImage}
          onClose={() => setisUploadImage(false)}
        >
          <DialogTitle>Image Uplaod</DialogTitle>
          <DialogContent>
            <p>Add profile picture</p>
          <input className="custom-file-input" type="file" accept="image/*" onChange={handleImageUpload} /> {/* Add this line */}
          </DialogContent>
          <DialogActions>
            <Button onClick={uploadImage} color="secondary">
              Upload image
            </Button>
            <Button onClick={() => setisUploadImage(false)} color="primary">
              No
            </Button>
          </DialogActions>
        </Dialog>


        <Dialog
          open={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
        >
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
      
              <ul className="profile-nav">
                <li className="profile-nav2">
                  <Link to={`/userProfile/${id}`} className="link">
                    {" "}
                    Gallery
                  </Link>
                </li>

                <li className="profile-nav2">
                  <Link to={`/userProfile/${id}/review`} className="link">
                    {" "}
                    Review
                  </Link>
                </li>

                <li className="profile-nav2">
                  <Link to={`/userProfile/${id}/plannedTrip`} className="link">
                    {" "}
                    Trip
                  </Link>
                </li>
              </ul>
           
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
