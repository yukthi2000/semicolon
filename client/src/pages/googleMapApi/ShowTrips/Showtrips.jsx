import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Showtrips = () => {
  const [data, setdata] = useState({});
  const [deletee, setdeltee] = useState(2);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/Trips/data", {
  //       headers: { accessToken: localStorage.getItem("accessToken") },
  //     })
  //     .then((res) => {
  //       setdata(res.data);

  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const handledelete = (data) => {
    try {
      axios.delete(`http://localhost:3001/Trips/trips/${data}`);
      console.log("Trip deleted successfully");
      fetchData();
    } catch (error) {
      console.error("Error deleting trip:", error);
      // Handle any error scenarios here
    }
    // fetchData();
    setdeltee(deletee + 1);
  };

  const fetchData = () => {
    axios
      .get("http://localhost:3001/Trips/dataWithLocationsForUser", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((res) => {
        setdata(res.data);
        console.log(res.data);
        const locationsArray = res.data.map((item) => item.Locations);
        console.log(locationsArray);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [deletee]);

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
                <th width="100px">Date</th>
                <th>Locations</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {Object.values(data).map((datas, index) => (
                <tr key={datas.id}>
                  <td>{index + 1}</td>
                  <td>{datas.date}</td>
                  {/* <td>{datas.vehicleType}</td> */}
                  <td>
                    {datas.Locations.map((location) => (
                      <span key={location.id} style={{ margin: "0 5px" }}>
                        {location.name}
                      </span>
                    ))}
                  </td>
                  <td>
                    <div className="Button1" style={{ marginBottom: 2 }}>
                      <Link
                        to={{
                          pathname: "/ViewTripsonMap",
                          search: `?locations=${encodeURIComponent(
                            JSON.stringify(datas.Locations)
                          )}`,
                        }}
                      >
                        <button
                          style={{
                            width: 72,
                            backgroundColor: "rgb(7, 94, 26)",
                          }}
                          className="btn btn-danger equal-width delete-button"
                          type="button"

                          // onClick={() => {
                          //   //passlocations(datas.Locations);
                          // }}
                        >
                          View
                        </button>
                      </Link>
                    </div>
                    {/* <span style={{ margin: "0 5px" }}></span> */}
                    <div className="Button2">
                      <button
                        className="btn btn-danger equal-width delete-button"
                        type="button"
                        onClick={() => {
                          handledelete(datas.id);
                          handledelete(datas.id);
                        }}
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
