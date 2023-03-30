import React from 'react';
import "./Admin.css";
import PermContactCalendarRoundedIcon from '@mui/icons-material/PermContactCalendarRounded';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import AddLocationRoundedIcon from '@mui/icons-material/AddLocationRounded';

const Dashboard = () => {
  return (
    <div>
      <div className='admin-content-body-stat-data'>
          <div className='stat-data'>
            <div>
              <PermContactCalendarRoundedIcon
                sx={{
                  color: "white",
                  backgroundColor: "orange",
                  borderRadius:"5px",
                  height: "70px",
                  width: "70px",
                  marginTop: "2vh",
                  marginLeft: "10vh",
                }} />
            </div>
            <span className='stat-data-topic'>No of users</span>
          </div>
          <div className='stat-data'>
            <div>
              <AddLocationRoundedIcon
                sx={{
                  color: "white",
                  backgroundColor: "blue",
                  borderRadius:"5px",
                  height: "70px",
                  width: "70px",
                  marginTop: "2vh",
                  marginLeft: "10vh",
                }} />
            </div>
            <span className='stat-data-topic'>Planned trips</span>
          </div>
          <div className='stat-data'>
            <div>
              <MonetizationOnRoundedIcon
                sx={{
                  color: "white",
                  backgroundColor: "red",
                  borderRadius:"5px",
                  height: "70px",
                  width: "70px",
                  marginTop: "2vh",
                  marginLeft: "10vh",
                }} />
            </div>
            <span className='stat-data-topic'>Collections</span>
          </div>
          <div className='stat-data'>
            <div>
              <PermContactCalendarRoundedIcon
                sx={{
                  color: "white",
                  backgroundColor: "green",
                  borderRadius:"5px",
                  height: "70px",
                  width: "70px",
                  marginTop: "2vh",
                  marginLeft: "10vh",
                }} />
            </div>
            <span className='stat-data-topic'>Comments</span>
          </div>
          </div>
          <div className='admin-content-body-admin-details'>admin contact info</div>
    </div>
  )
}

export default Dashboard