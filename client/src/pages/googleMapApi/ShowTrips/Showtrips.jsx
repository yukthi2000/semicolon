import React, { useEffect, useState } from "react";
import axios from "axios";

const Showtrips = () => {
  const [data, setdata] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3001/Trips/data", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((res) => {
        setdata(res.data);
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handledelete = (uid) => {
    console.log(uid);
  };

  return (
    <div>
      <div className="main">
        <div className="table">
          <table
            className="table table-bordered"
            id="dataTable"
            width="100%"
            cellSpacing="0"
          >
            <thead>
              <tr>
                <th></th>
                <th>Date</th>
                <th>Locations</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {Object.values(data).map((datas, index) => (
                <tr key={datas.id}>
                  <td>{index + 1}</td>
                  <td>{datas.date}</td>
                  <td>{datas.vehicleType}</td>

                  <td>
                    <span style={{ margin: "0 5px" }}></span>
                    <div className="Button">
                      <button
                        className="btn btn-danger equal-width delete-button"
                        type="button"
                        onClick={()=>{handledelete(datas.id)}}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Showtrips;
