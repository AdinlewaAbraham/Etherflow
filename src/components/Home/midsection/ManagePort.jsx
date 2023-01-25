import React from "react";
import Port from "../../imgs/port.jpg"

const ManagePort = () => {
  return (
    <div className="portMainDiv">
      <div className="portDiv">
        <div>
        <img src={Port} alt=""/>
        </div>
        <div>
          <h1>Create your cryptocurrency portfolio today</h1>
        </div>
      </div>
    </div>
  );
};

export default ManagePort;
