import React, { useEffect, useState } from "react";
import axios from "axios";
import {Switch} from  "antd"

const Showtrips = () => {
  const [data, setdata] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3001/Trips/data", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((res) => {
        setdata(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="body">
        <div className="table-responsive">
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
              </tr>
            </thead>
            <tbody>
              {Object.values(data).map((datas) => (
                <tr key={datas.UserId}>
                  <td>{datas.date}</td>
                  <td>{datas.vehicleType}</td>

                  <td>
                    <span style={{ margin: "0 5px" }}></span>
                    <div className="Button">
                      <button
                        className="btn btn-danger equal-width delete-button"
                        type="button"
                        //   onClick={() => handleCancel(datas.UserId)}
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
        <Switch defaultChecked={false} checkedChildren="aaaaaaaa" unCheckedChildren="bbbbbb" />
      </div>
    </div>
  );
};

export default Showtrips;
