import React, { useState, useEffect } from 'react';
import './APaseenger.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PassengerVerification = () => {
  const [passengers, setPassengers] = useState({});

  const fetchPassengerData = () => {
    axios
      .get("http://localhost:5000/verification")
      .then(res => {
        setPassengers(res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPassengerData();
  }, []);

  const showMessage = (message, isError = false) => {
    if (isError) {
      toast.error(message, {
        className: 'toast-error',
      });
    } else {
      toast.success(message);
    }
  };

  const handleVerify = async (UserID) => {
    try {
      await axios.post(`http://localhost:5000/passengerverify/${UserID}`);
      showMessage('Passenger verified successfully');
      fetchPassengerData(); // Update passenger data in the state
    } catch (error) {
      console.error('Error verifying passenger:', error);
      showMessage('Error verifying passenger', true);
    }
  };

  const handleCancel = (UserID) => {
    axios
      .delete(`http://localhost:5000/deleteverifypa/${UserID}`)
      .then(res => {
        showMessage('Passenger deleted successfully');
        setPassengers(prevPassengers => {
          const updatedPassengers = { ...prevPassengers };
          delete updatedPassengers[UserID];
          return updatedPassengers;
        });
      })
      .catch(err => {
        console.log(err);
        showMessage('Error deleting row', true);
      });
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
            <thead>
              <tr>
                <th>User ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>NIC</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(passengers).map(passenger => (
                <tr key={passenger.UserID}>
                  <td>{passenger.UserID}</td>
                  <td>{passenger.First_Name}</td>
                  <td>{passenger.Last_Name}</td>
                  <td>{passenger.Email}</td>
                  <td className="nic-cell">
                    <a href={passenger.Nic_Image} target="_blank" rel="noopener noreferrer">
                      View NIC
                    </a>
                  </td>
                  <td>{passenger.Phone_Number}</td>
                  <td>{passenger.Address}</td>
                  <td>{passenger.Gender}</td>
                  <td>
                    <div className="Button">
                      <button className="btn btn-primary equal-width" onClick={() => handleVerify(passenger.UserID)}>
                        Verify
                      </button>
                    </div>
                    <span style={{ margin: '0 5px' }}></span>
                    <div className="Button">
                      <button className="btn btn-danger equal-width delete-button" type="button" onClick={() => handleCancel(passenger.UserID)}>
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default PassengerVerification;